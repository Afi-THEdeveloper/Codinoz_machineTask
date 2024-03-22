const catchAsync = require("../utils/catchAsync");

exports.loginUser = catchAsync(async (req, res) => {
  console.log(req?.body);
  return res.status(200).json({ message: "success" });
});
