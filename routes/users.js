const express = require("express");
const router = express.Router();
const { signup, login, updateProfile } = require("../controllers/users");
const Multer = require("../utils/multer");

const passport = require("passport");
require("../utils/passportJs.js");
const authenticate = passport.authenticate("jwt", { session: false });

router.post("/signup", signup);
router.post("/login", login);
router.post(
  "/updateProfile",
  authenticate,
  Multer.single("image"),
  updateProfile
);
module.exports = router;
