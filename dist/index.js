"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.post('/signUp', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, username, password } = req.body;
        const user = yield db_1.prismaClient.user.findFirst({
            where: {
                username: username
            }
        });
        if (user) {
            res.json({
                message: "user exist"
            });
        }
        else {
            yield db_1.prismaClient.user.create({
                data: {
                    name: name,
                    username: username,
                    password: password
                }
            });
            res.json({
                message: "user signed up"
            });
        }
    }
    catch (e) {
        console.error(e);
    }
}));
app.listen(port, () => {
    console.log(`Serving on ${port}`);
});
