"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import { createClient } from 'redis'
// import connectRedis from 'connect-redis'
// import session from 'express-session'
const errorHandler_1 = __importDefault(require("./utils/errorHandler"));
const default_1 = __importDefault(require("./config/default"));
const categories_1 = __importDefault(require("./routes/v1/categories"));
const auth_1 = __importDefault(require("./routes/v1/auth"));
const users_1 = __importDefault(require("./routes/v1/users"));
// declare module 'express-session' {
//   export interface SessionData {
//     user: { [key: string]: any }
//   }
// }
// let RedisStore = connectRedis(session)
// let redisClient = createClient({
//   url: `${config.REDIS_IP}:${config.REDIS_PORT}`,
//   legacyMode: true,
// })
const app = (0, express_1.default)();
app.enable('trust proxy');
app.use((0, cors_1.default)({}));
// app.use(
//   session({
//     store: new RedisStore({ client: redisClient }),
//     secret: config.SESSION_SECRET,
//     resave: true,
//     saveUninitialized: true,
//     cookie: { secure: false, maxAge: 300000, httpOnly: true },
//   })
// )
app.use(express_1.default.json({ limit: '1000kb' }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/v1/categories', categories_1.default);
app.use('/api/v1/auth', auth_1.default);
app.use('/api/v1/users', users_1.default);
app.get('/api/v1/ping', async (req, res) => {
    console.log(`Sending response from container ${os_1.default.hostname()}`);
    res.status(200).json({
        status: `success ${default_1.default.PORT}`,
        message: 'pong',
        response: `Sending response from container ${os_1.default.hostname()}`,
    });
});
app.use(errorHandler_1.default);
exports.default = app;
