import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const Navbar = ({ children }: Props) => {
  return <nav className='nav-bar'>{children}</nav>
}

export default Navbar
