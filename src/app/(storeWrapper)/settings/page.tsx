"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'


type Props = {}

const Page = (props: Props) => {
    const router = useRouter()
    useEffect(() => {
        router.push('/settings/general')
    },[])

  return null
}

export default Page