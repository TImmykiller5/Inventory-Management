import { Loader2Icon } from 'lucide-react'
import React from 'react'

type Props = {}

const LoaderScreen = (props: Props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
        <Loader2Icon className='h-20 w-20 animate-spin'/>
    </div>
  )
}

export default LoaderScreen