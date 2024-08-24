import React,{forwardRef} from 'react'
const inputDefaultStyle = "px-4 py-2 bg-gray-100 border-b-2 border-b-gray-300 w-[100%]"

const Input = forwardRef(function ({tag,labelText,type,richText,className,...props},ref) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
        <label htmlFor={tag} className='uppercase font-semibold text-lg'>{labelText}</label>
        {richText ? 
        <textarea id={tag} cols="30" rows="5" className={inputDefaultStyle} ref={ref} {...props}/> 
        : 
        <input type={type} id={tag} className={inputDefaultStyle} ref={ref} {...props}/>
        }
    </div>
  )
})

export default Input