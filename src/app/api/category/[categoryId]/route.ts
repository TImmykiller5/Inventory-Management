import { NextResponse } from "next/server"
import prismadb from '@/lib/prismadb';




export async function DELETE(request: Request, { params }: { params: { categoryId: string } }) {
    try {
        const { categoryId } = params
        if (!categoryId) {
            return new NextResponse("Category ID is required", { status: 400 });
        }
        console.log(categoryId)
        const category = await prismadb.category.delete({
            where: {
                id: categoryId
            }
        })
        return NextResponse.json(category)
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error", { status: 500 });
    }
}


export async function PATCH(request: Request, { params }: { params: { categoryId: string } }) {

    try {
    const { categoryId } = params
    console.log(categoryId)
    const body = await request.json();
    const requiredKeys = ['name', 'description']
    if (!request.body) {
        return new NextResponse("No data", { status: 400 });
    }
    for (const key of requiredKeys) {
        if (!body[key]) {
            return new NextResponse(`${key} is required`, { status: 400 });
        }
    }
    const category = await prismadb.category.update({
        where: {
            id: categoryId
        },
        data: {
            name: body.name,
            description: body.description
        }
    })
    return NextResponse.json( {category, message:"Category updated successfully"}, { status: 200,  })
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error", { status: 500 });
    }

}

// next-auth.session-token:"eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..Bl_LEvFLH5amah5o.BzYdgxf3iWhjJ3jLveoUiEgMywWALgsKAgXhcwPQQzLT7BJhnD7jcKbyOQjKuCyk0wmbwb0h6wM4CbX1tvgWCL_bYOnoo_J6Ss-wf5-GH1zz7__Gk0GlC62O2JbHhvBTnsWqo29OOwNVFMikKs_FRy_lQp87xhaEnqFzxR0VzDycAwdLPGr6xz-lgMkCLLdblMLRBUqCtPV_0qtllaIkxNeQfqhvzJB9ZoNuW82UQjvBXlZtLgsTG3vQ5oxsO3MlASPdvEvk2nM47aT1lq4JxlpYyWWXgsfiIc0WS35a1EVXaEKoBr0.vq8FvS2zKSMyv-53nGfCiw"