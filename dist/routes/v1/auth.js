"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../controllers/auth");
const router = (0, express_1.Router)();
router.route('/signup').post(auth_1.signup);
// router.route('/completeSignup/:token').patch(completeSignup)
// router.route('/signin').post(signin)
// router.route('/signout').get(signout)
// router.route('/forgotpassword').post(forgotPassword)
// router.route('/resetpassword/:token').patch(resetPassword)
// router.use(protect)
// router.route('/updateLoggedInPassword').patch(updateLoggedInPassword)
exports.default = router;
