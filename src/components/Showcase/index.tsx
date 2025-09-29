import React from 'react'
import Left from './left'
import Right from './right'

const Showcase = () => {
  return (
    <section className='grid grid-cols-1 lg:grid-cols-2 gap-8 w-full min-h-[80vh] items-center' id='home'>
      {/* Left side with content */}
      <div className="order-2 lg:order-1">
        <Left />
      </div>
      
      {/* Right side with image */}
      <div className="order-1 lg:order-2">
        <Right />
      </div>
    </section>
  )
}

export default Showcase