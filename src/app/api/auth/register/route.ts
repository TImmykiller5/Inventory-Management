import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import prismadb from '@/lib/prismadb';


export async function POST(request: Request) {
   
  try {
    const body = await request.json();
    console.log(body);

    const requiredFields = ["firstName", "lastName", "email", "password", "confirmPassword", "phoneNumber"]
    if (!body) {
        return new NextResponse("No data", { status: 400 });
    }
    for (const field of requiredFields) {
        if (!body[field]) {
            return new NextResponse(`${field} is required`, { status: 400 });
        }
    }
    const { firstName, lastName, email, password, confirmPassword, phoneNumber, imageUrl } = body;
    const isValidEmail = email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
    if (!isValidEmail) {
        return new NextResponse("Invalid email", { status: 400 });
    }
    const role = body.role || "EMPLOYEE";
    if (password !== confirmPassword) {
        return new NextResponse("Passwords do not match", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
        data: {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phoneNumber,
            imageUrl,
            role
        }
    });
    return NextResponse.json({ user, message: "User created successfully" }, { status: 201 });
  } catch (e) {
    console.log({ e });
    return new NextResponse("Internal Error", { status: 500 });
  }

}