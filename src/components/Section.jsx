import React from 'react'

function Section({children,...props}) {
  return (
    <section className=' flex flex-col w-full justify-center gap-4' {...props}>
        {children}
    </section>
  )
}

export default Section