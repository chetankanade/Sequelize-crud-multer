const express = require("express");
const router = express.Router();
const controller = require("../controllers/users");

const passport = require("passport");
require("../utils/passportJs.js");
const authenticate = passport.authenticate("jwt", { session: false });

router.post("/signup", controller.signup);
router.post("/login", controller.login);
router.post("/updateProfile", authenticate, controller.updateProfile);
module.exports = router;
