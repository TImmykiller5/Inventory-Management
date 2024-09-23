import { getServerSession } from 'next-auth';
import React from 'react'

type Props = {
    children: React.ReactNode
}

const Layout = async ({children}: Props) => {
  const session = await getServerSession();
  console.log(session)
  return (
    <div>{children}</div>
  )
}

export default Layout