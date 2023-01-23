import { Link, useMatch } from 'react-router-dom'
import classNames from '../utils/classNames'

export default function Note({ note }) {
  const isActive = useMatch(`/${note.key}`)
  return (
    <Link
      to={`${note.key}`}
      className={classNames('leading-relaxed tracking-wide hover:shadow shadow-green-400 card p-4 break-words transition', isActive ? 'shadow' : '')}
    >
      <h4 className='font-medium'>{note.title}</h4>
      <small>{note.url}</small>
      <p>{note.content}</p>
    </Link>
  )
}
