import React, { useRef } from 'react'
import Button from './Button'
import HorizontalDivider from './HorizontalDivider'
import Section from './Section'
import Input from './Input'
import uuid from 'react-uuid'
import ListItem from './ListItem'

function Title ({children, className}){
    return (
        <h1 className={`text-3xl font-bold text-slate-700 ${className}`}>{children}</h1>
    )
}

function Tasks ({tasks,handleTaskUpdate,prjId}){
    return ( 
        <ul className='flex flex-col-reverse gap-2'>
            {
                tasks.map((task)=>{
                    return (
                        <ListItem key={task.id} className='p-4 bg-slate-50 rounded-md flex justify-between items-center border-2 border-slate-200'>
                        <span>{task.value}</span>
                        <Button label='clear' className='bg-transparent text-gray-800 hover:text-white ml-2' onClick={()=>handleTaskUpdate(prjId,task,'clear')}/>
                        </ListItem>
                        )
                })
            }
        </ul>
    )

}

function ExpandProject({data,updateProjectTasks,handleClick}) {
    console.log(data)
    const inputRef = useRef(null)
    const handleSubmit = (e)=>{
        e.preventDefault()

        // update newely added task.
        updateProjectTasks(data.id,{value:inputRef.current.value,id:uuid()})

        // reset input value.
        inputRef.current.value = ""
    }

  return (
    <div className='w-full p-24 overflow-auto'>
        <header className='w-full flex justify-between'>
         {/* <h1 className='text-3xl font-bold text-slate-700'>{data.title}</h1> */}
         <Title>{data.title}</Title>
         <div>
            <Button label='Close' className=' bg-slate-100 text-gray-600 hover:text-yellow-50 mr-1' onClick={()=>handleClick('close')}/>
            <Button label='Delete' className=' bg-transparent text-gray-600 hover:text-yellow-50' onClick={()=>handleClick('delete',data)}/>
         </div>
         
        </header>
        <Section >
            <p className='text-xl font-semibold text-gray-400'>{new Date(data.date).toDateString()}</p>
            <p className='text-xl text-gray-600' > {data.description} </p>
            <HorizontalDivider />
        </Section>
        <Section className=' mt-4'>
            <Title>Tasks</Title>
            <form action="#" className='flex my-4' onSubmit={handleSubmit}>
                <Input type='text'className="w-[50%] " ref={inputRef} required/>
                <Button className=' bg-transparent text-xl text-gray-800 hover:text-white ml-4' label={'Add Task'}/>
            </form>
            {data.tasks.length > 0 ? <ul><Tasks tasks={data.tasks} handleTaskUpdate={updateProjectTasks} prjId={data.id}/></ul> : <p className='text-xl'>This project does not have any tasks yet.</p>}
        </Section>
        
    </div>
  )
}

export default ExpandProject