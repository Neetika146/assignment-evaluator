import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <nav className="bg-white shadow-md fixed top-0 w-full z-50">
         <div className="container mx-auto flex justify-between items-center p-4">
            <h1 className="text-2xl font-bold text-blue-600">My Website</h1>
            <div className="hidden md:flex space-x-6">
               <a href="#" className="text-gray-600 hover:text-blue-500">Home</a>
               <a href="#" className="text-gray-600 hover:text-blue-500">About</a>
               <a href="#" className="text-gray-600 hover:text-blue-500">Services</a>
               <a href="#" className="text-gray-600 hover:text-blue-500">Contact</a>
            </div>
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
               {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
         </div>

         {isOpen && (
            <div className="md:hidden bg-white shadow-md absolute top-16 left-0 w-full">
               <a href="#" className="block p-4 border-b text-gray-600">Home</a>
               <a href="#" className="block p-4 border-b text-gray-600">About</a>
               <a href="#" className="block p-4 border-b text-gray-600">Services</a>
               <a href="#" className="block p-4 text-gray-600">Contact</a>
            </div>
         )}
      </nav>
   );
};

export default Navbar;
