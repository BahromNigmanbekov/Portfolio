import React, { useState } from "react";
import { Link } from "react-scroll";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import logo from "../../assets/logo.png";

function Header() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <nav
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50
        flex items-center justify-between
        w-[95%] md:w-auto
        px-7 py-3 rounded-full
        bg-white/10 backdrop-blur-xl
        border border-white/20
        shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
      >
        {/* Logo */}
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black/20">
          <img
            src={logo}
            alt="Logo"
            className="w-10 h-10 object-contain select-none"
            draggable="false"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-7 text-black font-medium ml-8">
          

          <Link
            to="about"
            smooth
            duration={500}
            className="cursor-pointer transition hover:text-orange-400"
          >
            About me
          </Link>

          <Link
            to="contact"
            smooth
            duration={500}
            className="cursor-pointer transition hover:text-orange-400"
          >
            Contact us
          </Link>

          <Link
            to="projects"
            smooth
            duration={500}
            className="cursor-pointer transition hover:text-orange-400"
          >
            Projects
          </Link>
        </div>

        {/* Desktop Button */}
        <a
          href="https://khaem-modelverse-now.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block ml-8 px-5 py-2 rounded-full
          bg-orange-500
          text-white font-semibold
          transition duration-300
          hover:bg-orange-600 hover:scale-105"
        >
          Visit my site
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-3xl text-black"
        >
          {open ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-24 left-1/2 -translate-x-1/2 z-40
        w-[92%] rounded-3xl
        bg-white/95 backdrop-blur-xl
        shadow-2xl
        overflow-hidden
        transition-all duration-300
        ${
          open
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-5 invisible"
        }
        md:hidden`}
      >
        <div className="flex flex-col items-center py-7 gap-6">

          <Link
            to="about"
            smooth
            duration={500}
            onClick={closeMenu}
            className="cursor-pointer text-lg font-medium hover:text-orange-500"
          >
            About me
          </Link>

          <Link
            to="contact"
            smooth
            duration={500}
            onClick={closeMenu}
            className="cursor-pointer text-lg font-medium hover:text-orange-500"
          >
            Contact us
          </Link>

          <Link
            to="projects"
            smooth
            duration={500}
            onClick={closeMenu}
            className="cursor-pointer text-lg font-medium hover:text-orange-500"
          >
            Projects
          </Link>

          <a
            href="https://khaem-modelverse-now.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="px-6 py-3 rounded-full
            bg-orange-500
            text-white
            font-semibold
            hover:bg-orange-600
            transition"
          >
            Visit my site
          </a>
        </div>
      </div>
    </>
  );
}

export default Header;