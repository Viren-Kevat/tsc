"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (userID) => {
    return jsonwebtoken_1.default.sign({ userID: userID }, process.env.JWT_SECRET, { expiresIn: "1 day" });
};
exports.default = generateToken;
