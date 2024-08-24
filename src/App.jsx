import React,{useEffect, useState} from 'react'

import Button from './components/Button'
import PlusIcon from './components/PlusIcon'
import logo from './assets/logo.png'
import CreateProjectForm from './components/CreateProjectForm'
import Project from './components/Project'
import ExpandProject from './components/ExpandProject'
import ListItem from './components/ListItem'

const App = ()=>{

  const[projects,setProjects] = useState(JSON.parse(localStorage.getItem('projects'))??[])
  const[showForm,setShowForm] = useState(false)
  const[isProjectExpanded,setIsProjectExpanded] = useState({flag:false,data:[]}) 

  const handleClick = (tag,data)=>{
    console.log('clicked')

    switch(tag){

      case 'close':
        setIsProjectExpanded(prev=>({...prev, flag:false}))
        break;
      case 'cancel':
        setShowForm(false);
        break;
      case 'delete':
        // remove the project whose id is given.
        setProjects(prev=>prev.filter(prj=>prj.id !== data.id))
        // After removal save the data in the local storage.
        localStorage.setItem('projects',JSON.stringify([...projects.filter(prj=>prj.id !== data.id)]))
        // Also close the expanded form of the project.
        setIsProjectExpanded(prev=>({...prev, flag:false}))
        break;
      case 'save':
        setShowForm(false)
        // Update the projects to hold new data
        setProjects(prevData=>{
          return [...prevData,data]
          })
        // Subsequently update the localstorage with relevant data
        localStorage.setItem('projects',JSON.stringify([...projects,data]))
        break;
      case 'expand':
          setIsProjectExpanded(prev=>{
            return {...prev,flag:true,data}
          })
          break;
      default:
        setShowForm(true)
        if(isProjectExpanded.flag){
          setIsProjectExpanded(prev=>({...prev,flag:false}))
        }
        break; 
    }
  }


  const handleListItemClick = (e)=>{
    const data = projects.filter(item=>item.id===e.target.id)
    handleClick('expand',data[0])
  }

  

  const handleTasksUpdate = (id,task,tag='update')=>{

    console.log(task)
    const reqdProject = projects.filter(project=>project.id === id)

    let taskList
    if(tag==='clear'){
      taskList = reqdProject[0].tasks.filter(taskItem=>taskItem.id !== task.id)
    }else{
      taskList = [...reqdProject[0].tasks,task]
    }

    const getItemIndex = projects.findIndex(project=>project.id === id)
    
    setProjects(prevPrj=>{
      return [...prevPrj.filter(project=>project.id !== id),{...prevPrj[getItemIndex], tasks:taskList}]
    })
    localStorage.setItem('projects',JSON.stringify([...projects.filter(project=>project.id !== id),{...projects[getItemIndex], tasks:taskList}]))
    
    const data = {...projects[getItemIndex], tasks : taskList}
    handleClick('expand',data)
    
  }

  useEffect(()=>{
    console.log(projects)

  },[projects])

  return(
    <div className='w-[100vw] h-[100vh] bg-slate-800 flex justify-center'>
      <div className='my-10 bg-yellow-50 w-full h-auto'>
        <div id="content-container" className='w-full h-[90%] mt-9 flex overflow-hidden'>
          <div id="sidebar" className="w-[25%] bg-slate-800 h-full rounded-tr-3xl ">
              <div id="sidebar-content">
                <div id="sidebar-top" className='mt-14 ml-10'>
                    <h2 className=' uppercase text-white text-2xl font-bold mb-6'>your projects</h2>
                     <Button label='Add Project' onClick={handleClick} className={`bg-gray-600 flex gap-2`} Icon={PlusIcon}/>
                </div>
                {projects.length>0 && <div id="sidebar-bottom" className='mt-12 ml-12 text-yellow-50'>
                    <ul className=' list-disc'>
                      {projects.map(prj=>{
                        return(
                          // <li key={prj.id} id={prj.id} className='mb-2 p-2 bg-slate-600 mr-2' onClick={handleListItemClick}>{prj.title}</li>
                          <ListItem key={prj.id} id={prj.id} className='mb-2 p-2 bg-slate-600 mr-2 cursor-pointer hover:bg-sky-700' onClick={handleListItemClick}>{prj.title}</ListItem>
                        )
                      })}
                    </ul>
                </div>
                }
              </div>
          </div>
          {isProjectExpanded.flag ? <ExpandProject data={isProjectExpanded.data} updateProjectTasks={handleTasksUpdate} handleClick={handleClick}/> : (
            showForm ? 
            <CreateProjectForm handleClick={handleClick} /> : 
            (projects.length > 0 ? <Project projects={projects} handleClick={handleClick}/>:
            <div id="no-project-content" className='flex w-full flex-col h-auto gap-6 items-center text-gray-600 pt-24'>
                <img src={logo} alt="projectLogo" className=' w-20 h-auto'/>
                <h3 className='text-2xl font-bold'>No Project Selected</h3>
                <p className='text-xl text-gray-400'>Select a project or get started with a new one</p>
                <Button label='Create new project' onClick={handleClick}/>
            </div>
            )
          ) 
          }

        </div>
          
      </div>
      
    </div>
    
  )
}

export default App