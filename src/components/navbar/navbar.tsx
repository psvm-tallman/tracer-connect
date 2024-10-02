"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import mitLogo from "@/assets/logos/mit-logo.webp";
import { Menu } from "lucide-react";
import { X } from "lucide-react";

import { GradientButton } from "../button/gradientButton";
import { Button } from "../ui/button";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { text: "Home", path: "/" },
    { text: "Faculties", path: "/faculties" },
    { text: "Publications", path: "/publications?tab=Journal+Papers" },
    { text: "Patents", path: "/patents?tab=Tech+Patents" },
  ];

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  const whiteFilter = {
    filter: "invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%)",
  }

  return (
    <nav className="flex justify-between items-center top-0 sticky z-50 h-20 w-full p-10 bg-neutral">
      <Link href="https://mitwpu.edu.in" className="flex items-center justify-center relative cursor-pointer">
        <Image
          src={mitLogo}
          width={180}
          height={150}
          alt="mitwpu-logo"
          className="rounded-sm relative drop-shadow-[0_0_0.18rem_#f0f9ff]"
        />
      </Link>

      <div className="hidden lg:flex items-center justify-end gap-5">
        {links.map((link, index) => (
          <Link key={index} href={link.path} className="py-2 px-3 h6-s text-stone-gray hover:text-white">
            {link.text}
          </Link>
        ))}

        <Link href="https://tracer-mitwpu.com">
          <GradientButton text="Log In" className="px-5 py-1.5 h6-s rounded-lg transition-all text-stone-gray hover:text-white hover:bg-neutral hover:scale-110" />
        </Link>
      </div>

      <div className="lg:hidden">
        <Button onClick={toggleMobileMenu} className="text-white">
          <Image
            src={isMobileMenuOpen ? X : Menu}
            width={24}
            height={24}
            alt={isMobileMenuOpen ? "Close menu" : "Open menu"}
            style={whiteFilter}
          />
        </Button>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">

          <div className="fixed inset-y-0 right-0 w-full bg-neutral px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10" />

          <div className="flex items-center justify-between">
            <button onClick={toggleMobileMenu} className="text-white">
              <Image
                src={X}
                width={24}
                height={24}
                alt="Close menu"
                style={whiteFilter}
              />
            </button>
          </div>

          <div className="mt-20 flow-root">
            <div className="gap-y-2 py-6 flex flex-col items-start">
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.path}
                  className="block py-2 h5-s leading-7 text-stone-gray hover:text-white"
                  onClick={toggleMobileMenu}
                >
                  {link.text}
                </Link>
              ))}

              <Link href="https://tracer-mitwpu.com" onClick={toggleMobileMenu}>
                <GradientButton text="Log In" className="px-5 py-2 rounded-lg border-2 h5-s transition-all text-stone-gray hover:text-white hover:bg-gray-800 hover:scale-110" />
              </Link>

            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;