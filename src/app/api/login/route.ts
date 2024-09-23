import { NextResponse } from "next/server"
import prismadb from '@/lib/prismadb';
import bcrypt from 'bcrypt'


export async function POST(request: Request) {

    const body = await request.json();
    const { email, password } = body;
    if (!email || !password) {
        return new NextResponse("Email and password are required", { status: 401 });
    }

    const user = await prismadb.user.findUnique({
        where: {
            email
        }
    });
    if (!user) {
        return new NextResponse("Email does not exist", { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        return new NextResponse("Invalid password", { status: 401 });
    }

    return NextResponse.json(user);
}