import { Home, Plus, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import Profile from '../profile/profile';
import clsx from 'clsx';
import { toast } from 'sonner';

const BottomBar = () => {

    return (
        <div className='fixed bottom-4 w-screen flex justify-center'>
            <div className='bg-[#1c1f2690] backdrop-blur-sm rounded-full flex items-center gap-6 border border-[#272b34] p-1'>
                <NavLink to="/">
                {({isActive}) => (
                <div className={clsx('p-2', 'rounded-full',  'transition', isActive ? 'text-white' : 'text-[#717889]', isActive ? 'bg-gradient-to-r from-[#6c5ce7] to-[#958aec]' :  'bg-transparent', isActive ? 'hover:bg-gradient-to-r from-[#6c5ce7] to-[#958aec]' : 'hover:bg-[#272b34]')}>
                    <Home/>
                    </div>
                )}
                </NavLink>
                <NavLink to={localStorage.getItem('authToken') ? "/createpost" : '/'}>
                {({isActive}) => (
                <div onClick={() => localStorage.getItem('authToken')  ? null : toast('To Create a Post your gonna have to signup or Login')}  className={clsx('p-2', 'rounded-full',  'transition', isActive && localStorage.getItem('authToken') ? 'text-white' : 'text-[#717889]', isActive && localStorage.getItem('authToken') ? 'bg-gradient-to-r from-[#6c5ce7] to-[#958aec]' :  'bg-transparent', isActive && localStorage.getItem('authToken') ? 'hover:bg-gradient-to-r from-[#6c5ce7] to-[#958aec]' : 'hover:bg-[#272b34]')}>
                    <Plus/>
                    </div>
                )}
                </NavLink>
                <NavLink to={localStorage.getItem('authToken') ? "/profile" : '/'}>
                {({isActive}) => (
                <div onClick={() => localStorage.getItem('authToken')  ? null : toast('To visit Profile your gonna have to signup or Login')} className={clsx('p-2', 'rounded-full',  'transition', isActive && localStorage.getItem('authToken') ? 'text-white' : 'text-[#717889]', isActive && localStorage.getItem('authToken') ? 'bg-gradient-to-r from-[#6c5ce7] to-[#958aec]' :  'bg-transparent', isActive && localStorage.getItem('authToken') ? 'hover:bg-gradient-to-r from-[#6c5ce7] to-[#958aec]' : 'hover:bg-[#272b34]')}>
                    <User/>
                    </div>
                )}
                </NavLink>
            </div>
        </div>
    )
}

export default BottomBar