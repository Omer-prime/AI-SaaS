import React from 'react'
import Image from 'next/image';


interface EmptyProps{
  label: string;
}


const Empty = ({
  label
}: EmptyProps ) => {

  return (
    <div className="h-full p-20 flex flex-col items-center justify-center">
      <div className=" mt-7">
      <Image src="/new.png"
       alt="Empty"
       width={600} 
       height={600}      
/>
      </div>
      <p className="text-muted-foreground text-sm text-center">
        {label}
      </p>
    </div>
  )
}

export default Empty;