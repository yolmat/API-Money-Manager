import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        return res.status(401).send({ message: "Token Obrigatorio" })
    }

    try {
        const replace = token.replace("Bearer ", "")
        jwt.verify(replace, process.env.TOKEN_KEY)
        console.log(jwt.decode(replace, process.env.TOKEN_KEY))
        next()
    } catch (e) {
        return res.status(401).send({ message: "Credenciais invalidas" })
    }
}