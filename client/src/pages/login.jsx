import React, { useState } from "react";
import MyH1 from "../components/myH1";
import InputField from "../components/inputField";
import ErrorMsg from "../components/errorMsg";
import { serverUrls } from "../utils/serverUrls";
import { FiEye, FiEyeOff } from "react-icons/fi";
import HomeIcon from "../components/icons/homeIcon";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MyButton from "../components/myButton";
import { loginThunk } from "../redux/slices/authSlice";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be atleast 6 characters")
    .required("Password is required"),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPswd, setShowPswd] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginThunk(values));
    },
  });
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-screen">
      <div className="flex w-full flex-col max-w-[400px] items-center space-y-3">
        <MyH1 title="User Login" />
        <div className="w-[270px] sm:w-full mt-8">
          <div className="mt-2">
            <form onSubmit={formik.handleSubmit} noValidate>
              <InputField
                name="email"
                type="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email && (
                <ErrorMsg error={formik.errors.email} />
              )}
              <div className="relative">
                <InputField
                  name="password"
                  type={showPswd === true ? "text" : "password"}
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 mx-2"
                  onClick={() => setShowPswd(!showPswd)}
                >
                  {showPswd ? (
                    <FiEye color="white" />
                  ) : (
                    <FiEyeOff color="white" />
                  )}
                </button>
              </div>
              {formik.errors.password && formik.touched.password && (
                <ErrorMsg error={formik.errors.password} />
              )}

              <MyButton text="Login" style={{ marginTop: 8 }} type="submit" />
              <Link
                to={serverUrls.register}
                className="myTextColor myBorder text-[10px] sm:text-sm h-8 md:h-10 border-2 mt-2 w-full rounded-full px-4 text-sm font-semibold flex items-center justify-center"
              >
                Signup
              </Link>
            </form>
            <Link
              className="h-12 w-full px-4 py-8 text-[#E0CDB6] flex items-center justify-center"
              to={serverUrls.landing}
            >
              <HomeIcon />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
