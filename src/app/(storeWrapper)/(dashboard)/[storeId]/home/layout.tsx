import React from 'react'

type Props = {
    children: React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <div className=" w-full">{children}</div>
  )
}

export default Layout