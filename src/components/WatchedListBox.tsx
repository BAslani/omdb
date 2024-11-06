import { ReactNode, useState } from 'react'

type Props = {
  children: ReactNode
}

const WatchedListBox = ({ children }: Props) => {
  const [isOpen2, setIsOpen2] = useState(true)

  return (
    <div className='box'>
      <button
        className='btn-toggle'
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? '–' : '+'}
      </button>
      {isOpen2 && <>{children}</>}
    </div>
  )
}

export default WatchedListBox
