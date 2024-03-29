import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-blue-500 py-4">
            <div className="container mx-auto flex justify-center items-center">
                <h1 className="text-white text-2xl font-semibold flex items-center">
                    <span className="mr-2">Recipe Finder</span>
                    <img src="../burger.svg" alt="Logo" className="h-8 w-8" />
                </h1>
            </div>
        </nav>
    );
};

export default Navbar;
