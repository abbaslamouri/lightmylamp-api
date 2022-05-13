"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const default_1 = __importDefault(require("./config/default"));
dotenv_1.default.config();
const dbUrl = `mongodb://${default_1.default.DB_USER}:${default_1.default.DB_PASSWORD}@${default_1.default.DB_IP}:${default_1.default.DB_PORT}`;
// mongoose
//   .connect(dbUrl, { dbName: config.DB_NAME })
//   .then(() => {
//     console.log(colors.magenta.bold(`Database connection succesfull`))
//     app.listen(config.PORT, () => {
//       console.log(colors.cyan.bold(`server running on port ${config.PORT}...`))
//     })
//   })
//   .catch((err) => {
//     console.log(colors.red.bold(`Mongo DB Error ${err}`))
//     console.log(colors.red.bold(`Mongo DB Error Message ${err.message}`))
//   })
app_1.default.listen(default_1.default.PORT, () => {
    console.log(colors_1.default.cyan.bold(`server running on port ${default_1.default.PORT}...`));
});
