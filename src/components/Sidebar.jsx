import React, { useState } from 'react';
import { navLinks } from '../constants';
import { sun } from '../assets';
import { Link, useNavigate } from 'react-router-dom';
import { IconHeartHandshake } from '@tabler/icons-react';

const Icon = ({ styles, name, imageUrl, isActive, handleClick }) => {
  return (
    <div
      className={`relative group h-[48px] w-[48px] rounded-[10px] ${isActive === name && 'bg-[#2c2f32]'} flex items-center justify-center ${styles}`}
      onClick={handleClick}
    >
      <img src={imageUrl} alt="logo" className={`h-6 w-6 ${isActive !== name && 'grayscale'}`} />

      {/* Tooltip */}
      <span className="absolute left-[60px] top-1/2 -translate-y-1/2 z-10 hidden whitespace-nowrap rounded-md bg-gray-800 px-3 py-1 text-sm text-white shadow-md group-hover:flex">
        {name}
      </span>
    </div>
  );
};

const Sidebar = () => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState('dashboard');

  return (
    <div className="sticky top-5 flex h-[93vh] flex-col items-center justify-between">
      <Link to="/">
        <div className="rounded-[10px] bg-[#2c2f32] p-2">
          <IconHeartHandshake size={40} color="#1ec070" />
        </div>
      </Link>

      <div className="mt-12 flex w-[76px] flex-1 flex-col items-center justify-between rounded-[20px] bg-[#1c1c24] py-6">
        <div className="flex flex-col items-center justify-center gap-3 ">
          {navLinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={activeLink}
              handleClick={() => {
                setActiveLink(link.name);
                navigate(link.link);
              }}
            />
          ))}
        </div>

        <Icon styles="bg-[#1c1c24] shadow-secondary" imageUrl={sun} />
      </div>
    </div>
  );
};

export default Sidebar;
