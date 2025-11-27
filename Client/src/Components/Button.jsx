import React from 'react'

const Button = ({className,onClick,children}) => {
    const base  = 'px-2 py-2 active:scale-y-[0.1] hover:scale-[2px] hover:bg-black/75  transition-transform duration-150 rounded-md bg-black/80 shadow-input  justify-center text-white flex items-center gap-1'
  return (
    <button className={` ${base} ${className}`}  onClick={onClick}>
        {children}
    </button>
  )
}

export default Button