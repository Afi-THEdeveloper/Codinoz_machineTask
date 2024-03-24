const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcrypt");
const otpMailer = require("../utils/otpMailer");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

exports.loginUser = catchAsync(async (req, res) => {
  console.log(req?.body);
  return res.status(200).json({ message: "success" });
});

//hashing  password
const securePassword = async (password) => {
  const passwordHash = await bcrypt.hash(password, 10);
  return passwordHash;
};

exports.registerUser = catchAsync(async (req, res) => {
  console.log(req?.body);
  const { username, email, phone, address, password } = req.body;
  const isUserExists = await User.findOne({ email: req.body.email });
  if (isUserExists) {
    return res.status(400).json({ error: "user already exists" });
  } else {
    //hashing password
    const secPassword = await securePassword(password);
    //otp generation
    // Generate a timestamp
    const timestamp = Date.now().toString();
    const data = email + timestamp; // Concatenate the email and timestamp
    // Hash the email using SHA-256
    const hash = crypto.createHash("sha256").update(data).digest("hex");
    const otp = hash.substring(0, 4); // Take the first 4 characters of the hash

    const user = new User({
      username,
      email,
      phone,
      address,
      password: secPassword,
      otp: { code: otp, generatedAt: Date.now() },
    });
    const userData = await user.save();

    if (userData) {
      const options = {
        from: process.env.EMAIL,
        to: email,
        subject: "User verification otp",
        html: `<center> <h2>Verify Your Email </h2> <br> <h3>OTP :${otp} </h3><br><p>This otp is only valid for 5 minutes only</p></center>`,
      };
      await otpMailer
        .sendMail(options)
        .then((res) => console.log("otp sended"))
        .catch((err) => console.log(err.message));
      return res.status(200).json({ success: "ok", email });
    } else {
      res.status(500).json({ error: "user registration failed" });
    }
  }
});

exports.verifyOtp = catchAsync(async (req, res) => {
  const { otp, email } = req.body;
  const user = await User.findOne({ email: email });
  const generatedAt = new Date(user?.otp?.generatedAt).getTime();
  console.log(Date.now());
  console.log(generatedAt);

  //check whether the otp validity is expired or not
  if (Date.now() - generatedAt <= 60 * 5000) {
    //5 mmin validity
    if (otp === user?.otp.code) {
      user.isVerified = true;
      user.otp = {};
      await user.save();
      return res.status(200).json({ success: "user registered successfully" });
    } else {
      return res.status(400).json({ error: "otp is invalid" });
    }
  } else {
    return res.status(400).json({ error: "otp expired" });
  }
});

exports.ResendOtp = catchAsync(async (req, res) => {
  console.log(req.body);
  if (!req.body.email) {
    return console.log("email missing");
  }
  const user = await User.findOne({ email: req.body.email });

  //otp generation
  // Generate a timestamp
  const timestamp = Date.now().toString();
  const data = req?.body.email + timestamp; // Concatenate the email and timestamp
  // Hash the email using SHA-256
  const hash = crypto.createHash("sha256").update(data).digest("hex");
  const otp = hash.substring(0, 4); // Take the first 4 characters of the hash
  const options = {
    from: process.env.EMAIL,
    to: req?.body?.email,
    subject: "User verification otp",
    html: `<center> <h2>Verify Your Email </h2> <br> <h3>OTP :${otp} </h3><br><p>This otp is only valid for 5 minutes only</p></center>`,
  };
  await otpMailer
    .sendMail(options)
    .then((res) => console.log("otp sended"))
    .catch((err) => console.log(err.message));

  user.otp.code = otp;
  user.otp.generatedAt = Date.now();
  await user.save();
  return res
    .status(200)
    .json({ success: "Otp Resended", email: req.body.email });
});

exports.loginUser = catchAsync(async (req, res) => {
  console.log(req.body);
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ error: "user not found" });
  }
  const isMatch = await bcrypt.compare(req.body.password, user?.password);
  if (!isMatch) {
    return res.status(400).json({ error: "password is not matching" });
  }

  if (!user.isVerified) {
    await User.findOneAndDelete({ email: req.body.email });
    return res.status(400).json({ error: "Account Not Verified SignUp Again" });
  }

  const token = jwt.sign({ id: user._id, user }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  user.password = "";
  res.status(200).json({ success: "Login successful", token, user });
});

exports.fetchUser = catchAsync(async (req, res) => {
  console.log('userId',req?.userId);
  const user = await User.findById(req.userId);
  console.log('user',user);
  if (user) {
    return res.status(200).json({ success: "user fetched", user });
  }
});
