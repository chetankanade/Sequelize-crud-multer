const { User } = require("../models"); // ✔️
const bcrypt = require("bcrypt");
const { hashpassword, token, verifypass } = require("../utils/utils");

exports.signup = async (req, res) => {
  console.log(this.signup);
  try {
    let { firstName, email, password } = req.body;
    const isUser = await User.findOne({
      where: {
        email,
      },
    });
    if (isUser) {
      throw new Error("user alrady exist");
    }

    const hashpass = await hashpassword(password);
    const user = await User.create({
      firstName,
      email,
      password: hashpass,
    });
    const jwtToken = await token(user.id);
    res
      .status(200)
      .json({ status: true, msg: "signup successfully", user, jwtToken });
  } catch (err) {
    res.status(400).json({
      msg: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    const isUser = await User.findOne({
      where: {
        email,
      },
    });
    if (!isUser) {
      throw new Error("User Email not exists");
    }
    const verifypassword = await verifypass(password, isUser.password);
    if (!verifypassword) {
      throw new Error("Please check your email or password");
    }

    const jwttoken = await token(isUser.id);
    res
      .status(200)
      .json({ status: true, msg: "User login successfull", isUser, jwttoken });
  } catch (err) {
    res.json({
      status: false,
      message: err.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    let { firstName, lastName, email, password, image } = req.body;
    let { id } = req.user;
    console.log(req.user.id);

    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw new Error("user not found");
    }
    let updateData = {
      firstName,
      email,
      password,
      image,
    };

    let update = await User.update({ updateData }, { where: { id } });
    if (!update) throw new Error();
    res.status(200).json({ status: true, msg: "success", user });
  } catch (err) {
    res.status(400).json({ status: false, msg: err.message });
  }
};
