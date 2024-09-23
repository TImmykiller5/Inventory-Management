import { NextResponse } from "next/server"
import prismadb from '@/lib/prismadb';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; 


export async function GET(request: Request, response: Response) {
    const session = await getServerSession(authOptions)
    console.log(session)
    // // const token = await getToken()
    // console.log(session)

    // if (!session) {
    //     return new NextResponse("Unauthorized", { status: 401 });
    // }
    // if(session && session.user) {
    //     console.log(session.user)
    // }
    try {
        const {searchParams} = new URL(request.url)
        const prompt = searchParams.get('name') || ''
        
        const products = await prismadb.product.findMany(
            {
                where: {
                    name:{
                        contains:prompt
                    },
                    
                },
                include: {
                    category: true,
                    owner: true,
                    store: true
                }
            }
        );
        return NextResponse.json(products, { status: 200 });
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error", { status: 500 });
    }

}


export async function POST(request: Request, response: Response) {
    const body = await request.json();
    // const token = await getToken({ request })
    const session = await getServerSession(authOptions)
    console.log(body)
    try {
        // console.log(session)
        // const user = await prismadb.user.findUnique({
        //     where: {
        //         id: body.userId
        //     }
        // })
        // console.log(user)
        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const requiredKeys = ['name', 'description', 'image', 'price', 'category',  'storeId']
        if (!request.body) {
            return new NextResponse("No data", { status: 400 });
        }
        for (const key of requiredKeys) {
            if (!body[key]) {
                return new NextResponse(`${key} is required`, { status: 400 });
            }
        }
    
        console.log(session)
        const { name, description, image, price, category, storeId } = body;
        const product = await prismadb.product.create({
            data: {
                name,
                description,
                image: image,
                price: price,
                // categoryId: category,
                category: { connect: { id: category } },
                // ownerId: userId,
                owner: { connect: { id: session?.user?.id } },
                Restocked: null,
                store: { connect: { id: storeId } }
                

            }
        })
        return NextResponse.json(product, { status: 201 });
        // return new NextResponse("Something went wrong", { status: 200 });
    } catch (error) {
        console.log(error)
        return new NextResponse("Something went wrong", { status: 500 });
    }
   
}