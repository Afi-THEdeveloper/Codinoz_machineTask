import React from "react";
import MyButton from "../components/myButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/inputField";
import MyH1 from "../components/myH1";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/slices/loadingSlice";
import { serverUrls } from "../utils/serverUrls";
import ErrorMsg from "../components/errorMsg";
import userRequest from "../../helper/instance";
import { apiEndpoints } from "../utils/api";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Username must be 3 characters")
      .required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.number()
      .typeError("Invalid number") // Handles non-numeric input
      .positive("Phone number must be a positive number") // Handles negative numbers
      .integer("Phone number must be an integer") // Handles non-integer input
      .test(
        "len",
        "Phone number must be exactly 10 characters",
        (val) => val && val.toString().length === 10
      )
      .required("Phone number is required"),
    address: Yup.string()
      .min(10, "address must be 10 characters")
      .required("address is required"),
    password: Yup.string()
      .min(6, "Password must be atleast 6 characters")
      .required("Password is required"),
    Cpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "password must match")
      .required("password Confirmation is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      Cpassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(showLoading());
      userRequest
        .post(apiEndpoints.postRegister, values)
        .then((res) => {
          if (res?.data?.success) {
            navigate(serverUrls.otp, { state: { email: res.data?.email } });
          } else {
            toast.error(res?.data?.error);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
        })
        .finally(() => {
          dispatch(hideLoading());
        });
    },
  });
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br">
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen">
        <div className="flex w-full flex-col max-w-[400px] items-center space-y-3 py-2">
          <MyH1 title="Register User" />
          <div className="w-[270px] sm:w-full mt-10">
            <form onSubmit={formik.handleSubmit} noValidate>
              <InputField
                name="username"
                type="text"
                placeholder="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.username && formik.touched.username && (
                <ErrorMsg error={formik.errors.username} />
              )}
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
              <InputField
                name="phone"
                type="number"
                placeholder="Phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.phone && formik.touched.phone && (
                <ErrorMsg error={formik.errors.phone} />
              )}
              <textarea
                name="address"
                type="text"
                placeholder="address"
                className="block w-full rounded-xl p-4 border-2"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.address && formik.touched.address && (
                <ErrorMsg error={formik.errors.address} />
              )}
              <InputField
                name="password"
                type="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.password && formik.touched.password && (
                <ErrorMsg error={formik.errors.password} />
              )}
              <InputField
                name="Cpassword"
                type="password"
                placeholder="Confirm Password"
                value={formik.values.Cpassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.Cpassword && formik.touched.Cpassword && (
                <ErrorMsg error={formik.errors.Cpassword} />
              )}

              <MyButton text="Register" style={{ marginTop: 10 }} />
              <Link to={serverUrls.landing}>
                <MyButton text="Back to home" style={{ marginTop: 10 }} />
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
