import React from 'react'

function CustomButton({btnType ,  title , handleClick , styles }) {
  return (
    <button 
        type={btnType} className={`rounded-[10px] flex items-center justify-between px-4 font-epilogue  text-[16px] font-semibold leading-[26px] text-white ${styles}`}
        onClick={handleClick}
    >
        {title}
    </button>
  )
}

export default CustomButton