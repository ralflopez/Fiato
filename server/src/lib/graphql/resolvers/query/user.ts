import { User } from '@prisma/client'
import { prisma } from '../../../../db/prisma/client'

export const getUser = async (_: null, args: { id: string }) => {
    const user: User | null = await prisma.user.findFirst({
        where: { id: args.id }
    })

    if (user) {
        return {
            id: user.id,
            email: user.email,
            username: user.username
        }
    } else {
        return {
            id: 'error',
            email: 'error',
            username: 'error'
        }
    }
}