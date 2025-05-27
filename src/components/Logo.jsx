
import React from 'react'

function Logo({ width = '100px' }) {
  return (
    <div className="flex items-center">
      <h1
        className="text-2xl sm:text-3xl font-bold tracking-tight"
        style={{ width }}
      >
        Write
        <span className="text-blue-600">Wave</span>
      </h1>
    </div>
  )
}

export default Logo
