import React from 'react'
import Button from './Button'

function Project({projects,handleClick}) {

    
    
  return (
    <div className='flex w-full flex-col gap-6 items-center text-gray-600 pt-24 overflow-auto h-auto'>
        {projects.map(project=>{
            const localDate = new Date(project.date).toLocaleDateString()
            return (
                <div key={project.id} className='flex w-[95%] flex-col justify-center items-start bg-red-200 p-4 rounded-lg gap-2'>
                    <header className='w-full flex justify-between'>
                      <h2 className='text-2xl text-slate-900'>TITLE : {project.title}</h2>
                      <Button label='expand' onClick={()=>handleClick('expand',project)}/>
                    </header>
                    
                    <p className=' text-slate-500'>DESCRIPTION : {project.description}</p>
                    <h3 className='text-md font-bold text-slate-600'>DUE DATE : {localDate}</h3>
                    {/* <hr className='text-slate-700 bg-slate-950 w-full border-b-2'/> */}
                </div>
               
            )
        })}
        
    </div>
  )
}

export default Project