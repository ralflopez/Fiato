import { User } from '@prisma/client'
import { prisma } from '../../../../db/prisma/client'

export const getUser = async (_: null, args: { user_id: string }) => {
    const user: User | null = await prisma.user.findFirst({
        where: { id: args.user_id }
    })

    return user
}