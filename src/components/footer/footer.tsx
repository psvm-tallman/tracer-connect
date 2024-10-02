import React from "react";
import Image from "next/image";
import Link from "next/link";
import mitLogo from "@/assets/logos/mit-logo.webp";
import Tracer from "@/assets/logos/Tracer.svg";
import byteswriteLogo from "@/assets/logos/BW.svg";
import Instagram from "@/assets/logos/instagram-color.svg";
import Facebook from "@/assets/logos/facebook-color.svg";
import LinkedIn from "@/assets/logos/linkedin-color.svg";
import Twitter from "@/assets/logos/twitter-x.svg";

type FooterLink = {
  label: string | React.ReactNode;
  link: string;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

const footerSections: FooterSection[] = [
  {
    title: "About College",
    links: [
      { label: "About Us", link: "#" },
      { label: "Why MIT-WPU?", link: "#" },
      { label: "Management Leadership", link: "#" },
      { label: "Board of Management", link: "#" },
    ],
  },
  {
    title: "About Us",
    links: [
      { label: "Schools", link: "#" },
      { label: "UG Programs", link: "#" },
      { label: "PG Programs", link: "#" },
      { label: "Ph.D. Programs", link: "#" },
    ],
  },
  {
    title: "Miscellaneous",
    links: [
      { label: "Privacy Policy", link: "#" },
      { label: "Terms and Conditions", link: "#" },
    ],
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#11111d] py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-y-4 md:gap-y-0">
          <div className="flex flex-col sm:flex-row items-center gap-y-4 sm:gap-y-0 sm:gap-x-4">
            <Image
              src={mitLogo}
              width={180}
              height={80}
              alt="mitwpu-logo"
              className="w-40 h-auto"
            />
            <Image
              src={Tracer}
              width={180}
              height={80}
              alt="tracer-logo"
              className="w-40 h-auto"
            />
          </div>
          <p className="text-stone-gray text-center lg:text-left mb-2">
            Powered by <span className="h5-s font-bold">BytesWrite</span>
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-bold mb-4">{section.title}</h3>
              <ul className="text-stone-gray gap-y-2">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <a href={link.link} className="hover:underline">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="flex flex-col items-start">
            <Image
              src={byteswriteLogo}
              width={120}
              height={60}
              alt="BytesWrite Logo"
              className="w-32 h-auto"
            />
          </div>
        </div>
        <hr className="border-t mt-8 md:mt-14 border-gray-600" />
        <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-y-4 md:gap-y-0">
          <p className="text-stone-gray text-center md:text-left text-sm">
            &copy; 2024 MIT-WPU. All rights reserved. Developed with ❤️ by
            BytesWrite Team.
          </p>
          <div className="flex items-center justify-center gap-x-6">
            {[
              {
                href: "https://x.com/BytesWrite",
                src: Twitter,
                alt: "twitter-logo",
                className: "brightness-0 invert opacity-50 hover:opacity-100",
              },
              {
                href: "https://www.instagram.com/byteswrite_2905?igsh=MWN2aXVuOGV5NHBrOA==",
                src: Instagram,
                alt: "instagram-logo",
                className: "filter grayscale hover:filter-none",
              },
              {
                href: "https://www.linkedin.com/company/byteswrite/",
                src: LinkedIn,
                alt: "linkedin-logo",
                className: "filter grayscale hover:filter-none",
              },
              {
                href: "/",
                src: Facebook,
                alt: "facebook-logo",
                className: "filter grayscale hover:filter-none",
              },
            ].map((social, index) => (
              <Link key={index} href={social.href}>
                <div className="w-8 h-8 flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <Image
                    src={social.src}
                    width={34}
                    height={34}
                    alt={social.alt}
                    className={`transition-all duration-300 ${social.className}`}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
