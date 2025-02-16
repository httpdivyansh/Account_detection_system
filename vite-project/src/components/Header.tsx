import { SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const { isSignedIn } = useUser(); // Get user sign-in status

  return (
    <header className="sticky z-50 p-8">
      <nav className="bg-[#71BBB2] border-gray-200 rounded-md lg:px-6 py-2.5">
        <div className="pl-4 flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <div className="text-white text-[18px] font-semibold border-b-2">
            <Link to="/">Fake Account Detector</Link>
          </div>
          <div className="flex items-center lg:order-2">
            {!isSignedIn && (
              <div className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">
                <SignInButton forceRedirectUrl="/App">Get started</SignInButton>
              </div>
            )}
            {isSignedIn && (
              <div className="pt-2">
                <UserButton />
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
