import { NextResponse } from "next/server"
import prisma from "@repo/db/client";

//const client = new PrismaClient();

export const GET = async () => {
    await prisma.user.create({
        data: {
            email: "asd",
            name: "adsads",
            number:"12345",
            password: "12345"
        }
    })
    return NextResponse.json({
        message: "hi there"
    })
}