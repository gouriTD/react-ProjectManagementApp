import React,{useRef,useState} from 'react'
import Button from './Button'
import Input from './Input'
import uuid from 'react-uuid'

const error = <p className='text-red-600 text-center text-xl'>All fields need to be input, check if some field empty!</p>

function CreateProjectForm({handleClick}) {

  const titleRef = useRef(null)
  const descRef = useRef(null)
  const dateRef = useRef(null)
 
  const[isInValid,setIsInvalid] = useState(false)

  const handleSave = ()=>{
    setIsInvalid(false)
    if(titleRef.current.value === "" || descRef.current.value === "" || dateRef.current.value === ""){
      setIsInvalid(true)
      return
    }
    //create uuid for the new prj
    const newUuid = uuid()

    // Add data related to project, title, descprition,date to it.
    const prjData = {
      id:newUuid,
      title : titleRef.current.value,
      description: descRef.current.value,
      date: dateRef.current.value,
      tasks:[]
    }
    console.log(prjData)
    clearInputs()
    handleClick('save',prjData)
  }

  const clearInputs = ()=>{
    titleRef.current.value = ""
    descRef.current.value = ""
    dateRef.current.value = ""
  }

    

  return (
    <div className='w-full p-24'>
        
        {/* BUtton set with save and cancel*/}
        <div className='w-full flex gap-4 justify-end'>
            <Button id="cancel" label='Cancel' className=' bg-transparent text-gray-600 hover:text-gray-100' onClick={()=>handleClick('cancel')}/>
            <Button id="save" label='Save' className='text-gray-400 bg-slate-700 px-6 py-3  rounded-lg hover:text-gray-100' onClick={handleSave}/>
          </div>
        {isInValid && error}  
        {/* form */}
        <form action="#" className='flex flex-col justify-center gap-4 my-4 w-full h-auto'>
            <Input labelText='title' tag='title' type='text' ref={titleRef} required/>
            <Input labelText='description' tag='description' richText ref={descRef} required/>
            <Input labelText='due date' tag='datePicker' type='date' ref={dateRef} required/>
        
        </form>
    </div>
  )
}

export default CreateProjectForm