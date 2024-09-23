"use client"
import { useStore } from '@/context/storeContext'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

type Props = {
    children: React.ReactNode
}

const Layout = ({children}: Props) => {
    const router = useRouter()
    const {setStoreDetails, storeDetails, loading} = useStore();
    if (!storeDetails && !loading) {
      return router.push('/settings/general')
    } else {

      return (
        <div className=" bg-muted/40 w-full h-full">
          <div className='mx-auto  max-w-[1720px]'>
            {children}
          </div>
        </div>
      )
    }
  
}

export default Layout