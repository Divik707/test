import express from "express";
import { prismaClient } from "./db";

const app = express();
const port = 3000;

app.use(express.json())

app.post('/signUp', async(req, res) => {
    try {
        const { name, username, password} = req.body;
        const user = await prismaClient.user.findFirst({
            where: {
                username: username
            }
        })
        if(user) {
            res.json({
                message: "user exist"
            })
        }
        else {
            await prismaClient.user.create({
                data: {
                    name: name,
                    username: username,
                    password: password
                }
            })
            res.json({
                message: "user signed up"
            })
        }
    }
    catch(e) {
        console.error(e);
    }
})

app.listen(port, () => {
    console.log(`Serving on ${port}`)
})