import React, { useCallback, useState } from 'react';
import { menu, search } from '../assets';
import CustomButton from './CustomButton';
import { usePrivy } from '@privy-io/react-auth';
import { IconHeartHandshake } from '@tabler/icons-react';
import { navLinks } from '../constants';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const { ready, authenticated, login, user, logout } = usePrivy();
    console.log("user info", user);
    
    const handleLoginLogout = useCallback(() => {
        if (authenticated) {
            logout();
        } else {
            login().then(() => {
                if (user) {
                    console.log(user);
                    // fetch data
                }
            });
        }
    }, [authenticated, login, logout, user]);

    const [ToggleDrawer, setToggleDrawer] = useState(false);
    const [isActive, setisActive] = useState('dashboard');

    return (
        <div className="mb-[35px] flex flex-col-reverse justify-between gap-6 md:flex-row">
            {/* Search Bar */}
            <div className="flex h-[52px] min-w-[458px] flex-row rounded-[100px] bg-[#1c1c24] py-2 pl-4 pr-2 lg:flex-1">
                <h1 className="text-3xl text-white">Healthify</h1>
            </div>

            {/* Button */}
            <div className="hidden sm:flex flex-row justify-end gap-2">
                <CustomButton
                    btnType="button"
                    title={authenticated ? 'Logout' : 'Login'}
                    styles={authenticated ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
                    handleClick={handleLoginLogout}
                />
            </div>

            {/* Mobile Menu */}
            <div className="relative flex items-center justify-between sm:hidden">
                <div className="flex h-[40px] cursor-pointer items-center justify-between px-3 w-full rounded-[10px] bg-[#2c2f32]">
                    <IconHeartHandshake size={40} color="#1ec070" className="p-2" />
                    <img src={menu} alt="menu" className="h-[34px] w-[34px] object-contain cursor-pointer"
                        onClick={() => setToggleDrawer(prev => !prev)}
                    />
                </div>
            </div>

            {/* Drawer */}
            <div className={`absolute left-0 right-0 top-[60px] z-10 bg-[#1c1c24] py-4 shadow-secondary 
                ${!ToggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'}
                transition-all duration-700
            `}>
                <ul className="mb-4">
                    {navLinks.map((link) => (
                        <li key={link.name} 
                            className={`flex p-4 text-white ${isActive === link.name && "bg-[#3a3a43] text-green-500"}`}
                            onClick={() => {
                                setisActive(link.name); 
                                setToggleDrawer(false); 
                                navigate(link.link);
                            }}
                        >
                            <img src={link.imageUrl} alt={link.name} className="h-[28px] w-[28px] object-contain mr-4" /> {/* Display the link icon */}
                            {link.name} {/* Display the link name */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
