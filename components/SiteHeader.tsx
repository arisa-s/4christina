"use client";
import { useState } from "react";
import { useSpring, animated } from "react-spring"; // Classic react-spring import
import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";

const LINKS = [
  {
    href: "poetry",
    label: "Poetry",
  },
  {
    href: "misc-prose",
    label: "Misc Prose",
  },
  {
    href: "poet-of-the-month",
    label: "Poet of the month",
  },
  {
    href: "haiku",
    label: "Haiku log",
  },
  {
    href: "rants-essay-pillow-talk",
    label: "Rants essays pillow talk",
  },
  {
    href: "reading-log",
    label: "Reading Log",
  },
  {
    href: "inspiration",
    label: "Inspiration",
  },
];

const NavLink: React.FC<{
  href: string;
  children: React.ReactNode;
  selected?: boolean;
}> = ({ href, children, selected }) => {
  return (
    <a
      href={href}
      className={`${
        selected ? "text-primary font-semibold" : "text-muted"
      } hover:text-primary hover:font-semibold uppercase text-xs`}
    >
      {children}
    </a>
  );
};

const NavigationMenu: React.FC<{ orientation: "horizontal" | "vertical" }> = ({
  orientation,
}) => {
  const pathname = usePathname();
  const currentPathname = pathname.split("/").pop();
  return (
    <nav
      className={
        orientation === "horizontal"
          ? "flex space-x-6"
          : "flex flex-col p-5 space-y-6 text-center"
      }
    >
      {LINKS.map(({ href, label }) => {
        if (orientation === "vertical" && href === currentPathname) return null;
        return (
          <NavLink key={href} href={href} selected={currentPathname == href}>
            {label}
          </NavLink>
        );
      })}
    </nav>
  );
};

const MobileHeader: React.FC<{}> = () => {
  const pathname = usePathname();
  const displayPathname = pathname.split("/").pop()?.replace(/-/g, " ");
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const menuAnimation = useSpring({
    transform: menuOpen ? "translateY(5%)" : "translateY(0%)",
    opacity: menuOpen ? 1 : 0,
  });

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
      <a href="/">
        <Image src={"/logo.png"} alt="logo" width={80} height={20} />
      </a>
      <h2 className="text-primary font-semibold uppercase text-xs mr-12">
        {displayPathname}
      </h2>
      <button
        onClick={toggleMenu}
        className="text-primary focus:outline-none lg:hidden"
        aria-label="Toggle Menu"
        aria-expanded={menuOpen}
      >
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
      <animated.div
        style={menuAnimation}
        className="absolute top-16 left-0 w-full bg-primary-bg lg:hidden"
      >
        <NavigationMenu orientation="vertical" />
      </animated.div>
    </div>
  );
};

const SiteHeader: React.FC = () => {
  return (
    <header className="bg-primary-bg fixed w-full z-10">
      <div className="hidden lg:block">
        <DesktopHeader />
      </div>
      <div className="block lg:hidden">
        <MobileHeader />
      </div>
    </header>
  );
};

const DesktopHeader: React.FC<{}> = () => (
  <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
    <a href="/">
      <Image src={"/logo.png"} alt="logo" width={100} height={20} />
    </a>
    <NavigationMenu orientation="horizontal" />
  </div>
);

export default SiteHeader;