import React from 'react'
import ProductDetail from '../components/ProductDetail'

type Props = {
  params: {
      productID: string,
      storeId: string
  }
}

const AddProduct = (props: Props) => {
  return (
    <div><ProductDetail params={props.params} type="add" /></div>
  )
}

export default AddProduct