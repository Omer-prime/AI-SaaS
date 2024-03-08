import Image from 'next/image';
import React from 'react'



interface MusicProps{
    label: string;
  }

const Musicpage = (  {label
}: MusicProps) => {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center">
     <div className=" mt-7">
        <Image
        src="/music.jpg"
        alt="music"
        width={400} 
        height={400} 
                />
     </div>
     <p className="text-muted-foreground text-sm text-center">
        {label}
      </p>
    </div>
  )
}

export default Musicpage;