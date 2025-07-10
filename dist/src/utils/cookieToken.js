"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonweb_1 = __importDefault(require("../helper/jsonweb"));
const setCookie = (user, res) => {
    const token = (0, jsonweb_1.default)(user.id);
    const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };
    user.password = undefined;
    res.status(200).cookie("token", token, options).json({
        token,
        success: true,
        user
    });
};
exports.default = setCookie;
