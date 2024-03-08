import Image from 'next/image';
import React from 'react'


interface CodeProps {
    label: string;
}

const Codepage = (
    { label }: CodeProps
) => {
    return (
        <div className="h-full p-20 flex flex-col items-center justify-center">
            <div className=" mt-7" >
                <Image
                    src="/code.jpg"
                    alt="code"
                    width={600}
                    height={600}
                />
                <p className="text-muted-foreground text-sm text-center">
                    {label}
                </p>
            </div>

        </div>
    )
}

export default Codepage;