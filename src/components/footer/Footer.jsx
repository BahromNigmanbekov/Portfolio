import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#000000] text-white px-6 py-8 md:px-12 md:py-10 border-t border-white">
      {/* Asosiy grid qismi */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-8 md:gap-16">
        
       

        {/* O'ng tomon: Footer menyusi va ma'lumotlar */}
        <div className="flex flex-col justify-end space-y-6 md:space-y-0">
          
          {/* Pastki qator */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-y-4 gap-x-2 text-sm border-t border-black pt-6">
            <span className="hidden md:block">Architecture + Conservation</span>
            <span>© 2026</span>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="tel:+44194921100" className="hover:underline">+44 1949 21100</a>
            <a href="mailto:email@example.com" className="hover:underline">Email</a>
            <div className="flex gap-4">
              <a href="#" className="hover:underline">Twitter</a>
              <a href="#" className="hover:underline">Instagram</a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobil uchun qo'shimcha text */}
      <p className="md:hidden text-xs mt-8">Architecture + Conservation</p>
    </footer>
  );
}