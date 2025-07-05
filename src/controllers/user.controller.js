import bcrypt from "bcrypt"
import { userValidation } from "../validation/user.validation";
import { createUser, deleteUser, getAll, getById, updateUser } from "../repositorys/user.repositorys";

export const create = async (req, res) => {
    try {
        await userValidation.validate(req.body)
        const hashPassword = await bcrypt.hash(req.body.password, 10)
        req.body.password = hashPassword
        const user = await createUser(req.body)
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
}

export const get = async (req, res) => {
    try {
        const skip = Number(req?.query?.skip) || 0
        const take = Number(req?.query?.take) || 20
        const users = await getAll(skip, take)
        res.status(200).send(users)
    } catch (e) {
        res.status(400).send(e)
    }
}

export const getId = async (req, res) => {
    try {
        const user = await getById(Number(req.params.id))
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
}

export const update = async (req, res) => {
    try {
        const user = await updateUser(Number(req.params.id), req.body)
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
}
export const remove = async (req, res) => {
    try {
        await deleteUser(Number(req.params.id))
        res.status(200).send({ message: "Usuario Deletado" })
    } catch (e) {
        res.status(400).send(e)
    }
}