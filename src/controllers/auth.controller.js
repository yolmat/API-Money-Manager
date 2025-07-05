import { prisma } from "../services/prisma"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const authenticate = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!(email && password)) {
            return res.status(401).send({ message: "Usuario e senha são obrigatorios" })
        }

        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if (!user) {
            return res.status(401).send({ message: "Email e/ou senha não existem" })
        }

        if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({
                id: user.id,
                email: user.email,
                name: user.name
            },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "3h"
                }
            )
            return res.status(200).send({ token })
        } else {
            return res.status(401).send({ message: "Email e/ou senha incorretos" })
        }
    } catch (e) {
        return res.status(400).send(e)
    }
}
