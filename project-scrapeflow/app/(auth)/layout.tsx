import Logo from '@/components/logo'
import React from 'react'

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen items-center justify-center gap-4">
        <Logo />    
        {children}
    </div>
  )
}

export default layout