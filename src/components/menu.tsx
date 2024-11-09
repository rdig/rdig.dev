"use client";

import Link from "next/link";
import { nanoid } from 'nanoid';
import { usePathname } from "next/navigation";

let spliced = false;

export const menuMap = [
  { href: "/", label: "Home" },
  // { href: "/engineering", label: "Engineering" },
  { href: "/about-raul-glogovetan", label: "About" },
  // { href: "/contact", label: "Contact" },
];

const Menu = () => {

  const currentPath = usePathname();

  return (
    <menu className="w-auto sm:w-full text-right mr-4 order-3 absolute sm:static top-14">
      {menuMap.map(({ href, label }) => (
        <li key={nanoid()} className="inline mr-4">
          <Link className={`!tracking-[0.01rem] dark:!text-white !text-black hover:!no-underline !font-light active:opacity-80 ${currentPath === href ? "!font-medium" : ""}`} href={href}>{label}</Link>
        </li>
      ))}
    </menu>
  );
};

export default Menu;
