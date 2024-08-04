import Navbar from '@/components/Navbar'
import React from 'react'

export default function HeaderLayout({ children }) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      {children}
    </>
  )
}
