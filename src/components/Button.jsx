import React from 'react'

const button_style_classes = 'cursor-pointer py-3 px-5 bg-slate-900 text-gray-300 rounded-lg hover:bg-sky-700 text-xl'

function Button({label,Icon,className,...props}) {
  return (
    <button className={`${button_style_classes} ${className}`} {...props} >
        {Icon && <span><Icon /></span>} 
        {label}
    </button>
  )
}

export default Button