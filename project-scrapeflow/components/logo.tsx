import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

function Logo({
    fontSize = "2xl",
    imageSize = 40,
}: {
    fontSize?: string,
    imageSize?: number
}) {
  return (
    <Link href="/" className={cn("text-2xl font-extrabold flex items-center gap-2", fontSize)}>
        <div className="relative" style={{ width: imageSize, height: imageSize }}>
          <Image 
            src="/logo.svg" 
            alt="ScrapeFlow Logo" 
            fill 
            style={{ objectFit: 'contain' }} 
            priority
          />
        </div>
        <div>
            <span className="text-[#04ff57] font-light">SCRAPE</span>
            <span className="text-stone-600 dark:text-stone-200">FLOW</span>
        </div>
    </Link>
  )
}

export default Logo