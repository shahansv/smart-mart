import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'


const Navbar = () => {
  useGSAP(() => {
    gsap.from("nav", {
      y: -100,
      duration: 0.7,
      opacity: 0,
      delay: 0.3,
    });
  });

  return (
    <>
      <nav className='px-4 pt-2 fixed w-full'>
        <div className='bg-sky-200 h-16 rounded-full px-8 flex items-center justify-between' >
          <Link to={'/'}>
            <img src="./smartMartLogo.svg" alt="smart mart logo" className='h-1/2' />
          </Link>
          <ul className='flex  items-center'>
            <li className='font-bold text-sky-700'>
              <Link className='navLink px-3 py-2 rounded-full' to={'/inventory'}>Inventory</Link></li>
            <li className='font-bold text-sky-700'><Link className='navLink px-3 py-2 rounded-full' to={'/billing'}>Billing</Link></li>
            <li className='font-bold text-sky-700'><Link className='navLink px-3 py-2 rounded-full' to={'/history'}>History</Link></li>
          </ul>
        </div>

      </nav>
    </>
  )
}

export default Navbar