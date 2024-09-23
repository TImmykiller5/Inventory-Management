import React from 'react'
import ProductDetail from '../../components/ProductDetail'
import prismadb from '@/lib/prismadb'

type Props = {
    params: {
        productID: string,
        storeId: string
    }
}

const EditProduct = async (props: Props) => {
  const productID = props.params.productID
  console.log(props.params)
  try {
    const product = await prismadb.product.findUnique({
      where: {
        id: productID
      },
      include: {
        category: true,
        owner: true
      }
    })
    if (!product) {
      return <div>Product not found</div>
    }
    return (
      <div><ProductDetail params={props.params} product={product} type="edit" /></div>
    )
  } catch (error) {
    console.log(error)
    return <div>Something went wrong</div>
  }

 
 
}

export default EditProduct