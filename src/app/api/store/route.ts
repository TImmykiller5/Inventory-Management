import { NextResponse } from "next/server"
import prismadb from '@/lib/prismadb';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; 


export async function GET(request: Request, response: Response) {
    const session = await getServerSession(authOptions)
    console.log(session)
    // // const token = await getToken()
    // console.log(session)

    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    // if(session && session.user) {
    //     console.log(session.user)
    // }
    try {
        const {searchParams} = new URL(request.url)
        const name = searchParams.get('name') || ''
        
        const stores = await prismadb.store.findMany(
            {
                where: {
                    name:{
                        contains:name
                    },
                    ownerId: session.user.id
                    
                },
                include: {
                    owner: true
                }
            }
        );
        return NextResponse.json(stores, { status: 200 });
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error", { status: 500 });
    }

}

export async function POST(request: Request, response: Response) {
    try {
        const session = await getServerSession(authOptions)
        console.log(session)
        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
    
        const requiredKeys = ['name', 'location']
    
        const body = await request.json();
        if (!request.body) {
            return new NextResponse("No data", { status: 400 });
        }
        for (const key of requiredKeys) {
            if (!body[key]) {
                return new NextResponse(`${key} is required`, { status: 400 });
            }
        }
    
        const { name, location } = body;
        const store = await prismadb.store.create({
            data: {
                name,
                location,
                ownerId: session.user.id
            }
        })
        return NextResponse.json(store, { status: 201 });
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error", { status: 500 });
    }
    

}
