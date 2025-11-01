import React from 'react'

const Button = ({className,onClick,children}) => {
    const base  = 'px-2 py-2 rounded-md shadow-input bg-amber-300'
  return (
    <button className={` ${base} ${className}`} onClick={onClick}>
        {children}
    </button>
  )
}

export default Button