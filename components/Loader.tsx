import Image from 'next/image'
import React from 'react'

const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-10 h-10 relative animate-bounce     ">
        <Image
        alt="logo"
        src="/think.png"
        fill
        />
      </div>
      <p className="text-sm text-muted-foreground">
        Gen X is thinking...
      </p>
    </div>
  )
}

export default Loader