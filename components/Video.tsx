import Image from 'next/image';
import React from 'react'



interface VideoProps{
    label: string;
  }

const Video = (
    {label}: VideoProps
) => {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center"  >
        <div className="mt-7">
            <Image
            src="/video.jpg"
            alt="video"
            width={500}
            height={500}
            />
        </div>
        <p className="text-muted-foreground text-sm text-center">
        {label}
      </p>
    </div>
  )
}

export default Video