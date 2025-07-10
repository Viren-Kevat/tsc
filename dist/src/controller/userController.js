"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findById = exports.deleteById = exports.updateById = exports.signUp = void 0;
const index_1 = __importDefault(require("../prisma/index"));
const cookieToken_js_1 = __importDefault(require("../utils/cookieToken.js"));
const safeUser = {
    name: true,
    email: true,
    phone: true
};
const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ error: "Name, email, and password are required" });
            return;
        }
        const user = await index_1.default.user.create({
            data: {
                name,
                email,
                password
            }
        });
        (0, cookieToken_js_1.default)(user, res);
    }
    catch (err) {
        console.log(err);
    }
};
exports.signUp = signUp;
const updateById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        if (!id) {
            throw new Error("id required");
        }
        const updateUser = await index_1.default.user.update({
            where: { id },
            data: data
        });
        res.status(200).send({ user: updateUser }).json({
            updateUser
        });
    }
    catch (err) {
        console.log(err);
    }
};
exports.updateById = updateById;
const deleteById = async (req, res) => {
    try {
        const { id } = req.params;
        const del = await index_1.default.user.delete({
            where: { id }
        });
        console.log("deleted");
    }
    catch (err) {
        console.log("error", err);
    }
};
exports.deleteById = deleteById;
const findById = async (req, res) => {
    try {
        const { id } = req.params;
        const srch = await index_1.default.user.findFirst({
            where: { id },
            select: safeUser
        });
        if (!srch) {
            res.status(404).json({ error: "user not found" });
            return;
        }
        srch.id = undefined;
        res.status(200).json({
            srch: srch
        });
        console.log(srch);
    }
    catch (err) {
        console.log("err : ", err);
    }
};
exports.findById = findById;
