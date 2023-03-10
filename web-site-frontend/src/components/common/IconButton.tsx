import { Children, cloneElement } from 'react'

export default function IconButton({ children, onClick = null, className = '', btnRef=null, ...props }) {
  return (
    <button ref={btnRef} className='bg-inherit focus:outline-inherit' onClick={onClick} {...props}>
      {Children.map(children, (child) =>
        cloneElement(child, {
          className: `w-6 ${child.props.className}`,
        })
      )}
    </button>
  )
}
