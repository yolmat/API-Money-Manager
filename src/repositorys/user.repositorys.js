import { prisma } from "../services/prisma";

export const createUser = async (data) => {
    const user = await prisma.user.create({
        data,
        select: {
            id: true,
            name: true,
            email: true,
            password: false,
            createdAt: true,
            updatedAt: true,
        }
    })
    return user
}

export const getAll = async (skip, take) => {
    const [users, total] = await prisma.$transaction([
        prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                password: false,
                createdAt: true,
                updatedAt: true,
            },
            skip, take
        }),
        prisma.user.count()
    ])

    const totalPage = Math.ceil(total / take)

    return { total, totalPage, users }
}

export const getById = async (id) => {
    const user = await prisma.user.findUnique({
        where: {
            id: id
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: false,
            createdAt: true,
            updatedAt: true,
        }

    })

    return user
}

export const updateUser = async (id, data) => {
    const user = await prisma.user.update({
        where: {
            id: id
        },
        data,
        select: {
            id: true,
            name: true,
            email: true,
            password: false,
            createdAt: true,
            updatedAt: true,
        }
    })
    return user
}

export const deleteUser = async (id) => {
    await prisma.user.delete({
        where: {
            id: id
        }
    })
    return
}