import React from 'react';

const Header = () => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-[#74cec8] font-medium text-2xl">Rodexco</h1>
      <div><img src="/logos.png" alt="logo" className='w-13 h-13 rotate-180' /></div>
    </div>
  );
};

export default Header;
