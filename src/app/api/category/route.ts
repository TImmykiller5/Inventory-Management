import { NextResponse } from "next/server"
import prismadb from '@/lib/prismadb';
import { AuthOptions, getServerSession } from "next-auth";
import { getToken } from 'next-auth/jwt'


export async function GET(request: Request, response: Response) {
    const session = await getServerSession()
    // const token = await getToken()
    console.log(session)

    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    // if(session && session.user) {
    //     console.log(session.user)
    // }
    try {
        const {searchParams} = new URL(request.url)
        const name = searchParams.get('name') || ''
        
    } catch (error) {
        
    }
    const categories = await prismadb.category.findMany();

    return NextResponse.json(categories);
}

export async function POST(request: Request, response: Response) {
    const body = await request.json();
    const session = await getServerSession()
    console.log(body)

    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    const requiredKeys = ['name', 'description']
    if (!request.body) {
        return new NextResponse("No data", { status: 400 });
    }
    for (const key of requiredKeys) {
        if (!body[key]) {
            return new NextResponse(`${key} is required`, { status: 400 });
        }
    }
    console.log(session)
    const { name, description } = body;
    const category = await prismadb.category.create({
        data: {
            name,
            description
        }
    })
    return NextResponse.json(category, { status: 201 });
}