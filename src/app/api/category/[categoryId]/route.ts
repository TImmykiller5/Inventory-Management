import { NextResponse } from "next/server"
import prismadb from '@/lib/prismadb';




export async function DELETE(request: Request, response: Response, { params }: { params: { categoryId: string } }) {

    const { categoryId } = params
    console.log(categoryId)
//     const category = await prismadb.category.delete({
//         where: {
//             id: categoryId
//         }
//     })
//     return NextResponse.json(category)
}

// next-auth.session-token:"eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..Bl_LEvFLH5amah5o.BzYdgxf3iWhjJ3jLveoUiEgMywWALgsKAgXhcwPQQzLT7BJhnD7jcKbyOQjKuCyk0wmbwb0h6wM4CbX1tvgWCL_bYOnoo_J6Ss-wf5-GH1zz7__Gk0GlC62O2JbHhvBTnsWqo29OOwNVFMikKs_FRy_lQp87xhaEnqFzxR0VzDycAwdLPGr6xz-lgMkCLLdblMLRBUqCtPV_0qtllaIkxNeQfqhvzJB9ZoNuW82UQjvBXlZtLgsTG3vQ5oxsO3MlASPdvEvk2nM47aT1lq4JxlpYyWWXgsfiIc0WS35a1EVXaEKoBr0.vq8FvS2zKSMyv-53nGfCiw"