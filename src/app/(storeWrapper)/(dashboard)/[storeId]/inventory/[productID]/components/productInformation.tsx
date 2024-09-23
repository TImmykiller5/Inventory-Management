import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { product } from '@/lib/types';

type Props = {
  product: product | undefined
}

const ProductInformation = ({ product }: Props) => {
  return (
    <Card className="mb-3 relative">

        <CardHeader>
          <CardTitle>Product Information</CardTitle>
          <CardDescription>
            Details about {product?.name}
          </CardDescription>

        </CardHeader>
        <div className=" absolute top-0 right-0 ">

          <img src={product?.image || ""} alt={`image of ${product?.name}`} className="w-20 m-4 h-20 object-cover object-center rounded-full" title={product?.name} />
        </div>
        <CardContent>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt className="font-medium">Description</dt>
              <dd>{product?.description}</dd>
            </div>
            <div>
              <dt className="font-medium">Price</dt>
              <dd>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format(product?.price as number)}</dd>
            </div>
            {/* <div>
              <dt className="font-medium">SKU</dt>
              <dd>{productData.sku}</dd>
            </div> */}
            <div>
              <dt className="font-medium">Category</dt>
              <dd>{product?.category?.name}</dd>
            </div>
            <div>
              <dt className="font-medium">Stock</dt>
              <dd>{product?.stock} units</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
  )
}

export default ProductInformation