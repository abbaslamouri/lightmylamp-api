"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signout = exports.resetPassword = exports.forgotPassword = exports.signin = exports.completeSignup = exports.signup = void 0;
const user_1 = require("../models/user");
// import jwt from 'jsonwebtoken'
const stripe_1 = __importDefault(require("stripe"));
// import sgMail from'@sendgrid/mail'
const crypto_1 = __importDefault(require("crypto"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
// import sendEmail from'../utils/Email'
const stripe = new stripe_1.default(String(process.env.STRIPE_SK), {
    apiVersion: '2020-08-27',
});
const sendTokenResponse = async (res, statusCode, user) => {
    let token = null;
    let auth = null;
    if (user) {
        token = await user.getSinedJwtToken();
        auth = { token, user };
    }
    // res.cookie('auth', JSON.stringify(auth), {
    //   expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production' ? true : false,
    //   path: '/',
    // })
    // res.cookie('token', JSON.stringify(token), {
    //   expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production' ? true : false,
    //   path: '/',
    // })
    user.password = undefined;
    res.status(statusCode).json({
        status: 'success',
        auth,
    });
};
const signup = (0, asyncHandler_1.default)(async (req, res, next) => {
    console.log('RB', req.body);
    // const { user, completeSingupUrl, emailSubject } = req.body
    const { name, email } = req.body;
    // const { user } = req.body
    // const customer = await stripe.customers.create({ ...user })
    // if (customer) user.stripeCustomerId = customer.id
    // console.log('CUSTOMER', customer)
    const doc = await user_1.User.create({
        name,
        email,
        password: '#0elhEHh*3Uyc$r^JQ@Nit3&f!U3i',
    });
    if (!doc)
        return next(new AppError_1.default(`We can't create user ${req.body.name}`, 404, 'unable_to_create_user'));
    // const resetToken = await doc.createPasswordResetToken()
    await doc.save();
    // req.session.user = doc
    // console.log('RS', req.session)
    // req.session.user = doc
    // doc.password = undefined
    // await new sendEmail({
    //   name: user.name,
    //   email: user.email,
    //   emailSubject,
    //   url: `${completeSingupUrl}/?token=${resetToken}`,
    // }).sendCompleteSignup()
    res.status(200).json({
        status: 'success',
        // message: 'Email sent',
        // token: resetToken,
    });
});
exports.signup = signup;
const completeSignup = (0, asyncHandler_1.default)(async (req, res, next) => {
    console.log('RPT', req.params.token);
    const hashedToken = await crypto_1.default.createHash('sha256').update(req.params.token).digest('hex');
    const user = await user_1.User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });
    if (!user)
        return next(new AppError_1.default(`Your registration token is invlaid or has expired`, 400, 'invalid_registration_token'));
    if (user.email !== req.body.email.toLowerCase())
        return next(new AppError_1.default(`Invalid email`, 400, 'invalid_email'));
    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.active = true;
    console.log(user);
    await user.save();
    const url = `${process.env.BASE_URL}`;
    // await new Email(user, url).sendWelcome()
    return await sendTokenResponse(res, 200, user);
});
exports.completeSignup = completeSignup;
const signin = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password)
        return next(new AppError_1.default('Email and Password are required', 401, 'email_password_required'));
    const user = await user_1.User.findOne({ email }).select('+password');
    if (!user)
        return next(new AppError_1.default('Invalid email or password', 401, 'invalid_email'));
    const passwordCheck = await user.checkPassword(password, user.password);
    if (!passwordCheck)
        return next(new AppError_1.default('Invalid email or password', 401, 'invalid_password'));
    sendTokenResponse(res, 200, user);
});
exports.signin = signin;
const signout = (0, asyncHandler_1.default)(async (req, res, next) => {
    const auth = { token: ' ', user: {} };
    // res.cookie('auth', JSON.stringify(auth), {
    //   expires: new Date(Date.now() + 1000),
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production' ? true : false,
    //   // path: '/',
    // })
    res.status(200).json({
        status: 'success',
        data: null,
    });
});
exports.signout = signout;
// const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
// let token = ''
// if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//   token = req.headers.authorization.split(' ')[1]
// } else if (req.cookies && req.cookies.jwt) {
//   token = req.cookies.jwt
// }
// if (!token)
//   return next(new AppError('You are not allowed to access these resources, please login', 401, 'resources_forbiden'))
// const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
// const decodedUser = await User.findById(decoded.id)
// if (!decodedUser)
//   return next(new AppError('We cannot find a user with this token in our database', 401, 'no_user_token'))
// if (await decodedUser.hasPasswordChanged(decoded.iat))
//   return next(new AppError('User changed password recently, please login again', 401, 'password_changed_recently'))
// req.user = decodedUser
// next()
// })
// const authorize = (...roles:string[]) =>
//   asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
//     if (!roles.includes(req.user.role))
//       return next(
//         new AppError('You do not have adequate permisson to perform this action', 403, 'inadequate_permission')
//       )
//     next()
//   })
// const isLoggedIn = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
// if (!req.cookies || !req.cookies.jwt) return next()
// const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET)
// const user = await Model.findById(decoded.id)
// if (!user) return next()
// if (await user.hasPasswordChanged(decoded.iat)) return next()
// res.locals.user = user
// next()
// })
const forgotPassword = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { email, passwordResetUrl, emailSubject } = req.body;
    if (!email)
        return next(new AppError_1.default('Please enter a valid email', 404, 'email_invalid'));
    const user = await user_1.User.findOne({ email });
    if (!user)
        return next(new AppError_1.default('We cannot find user with this email in our database', 404, 'inadequate_permission'));
    const resetToken = await user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
    user.password = undefined;
    // await new sendEmail({
    //   name: user.name,
    //   email: user.email,
    //   emailSubject,
    //   url: `${passwordResetUrl}/?token=${resetToken}`,
    // }).sendResetPassword()
    res.status(200).json({
        status: 'success',
        message: 'Email sent',
    });
});
exports.forgotPassword = forgotPassword;
const resetPassword = (0, asyncHandler_1.default)(async (req, res, next) => {
    console.log('RP', req.params);
    const hashedToken = await crypto_1.default.createHash('sha256').update(req.params.token).digest('hex');
    const user = await user_1.User.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gt: Date.now() } });
    if (!user)
        return next(new AppError_1.default('Token is invlaid or has expired', 400, 'token_expired'));
    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    sendTokenResponse(res, 200, user);
});
exports.resetPassword = resetPassword;
