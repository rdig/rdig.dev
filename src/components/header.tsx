import Link from "next/link";

import { ModeToggle } from "@components/mode-toggle";

const Header = () => (
  <header className="bg-zinc-200 dark:bg-zinc-950">
    <div className="max-w-3xl mx-auto py-20 px-4">
      <div className="flex items-center justify-between">
        <div className="bg-pink-5">
          <Link href="/" className="active:opacity-80 select-none">
            <p className="m-0 p-0 mb-[-0.3rem] text-4xl font-semibold tracking-tighter	text-slate-700 dark:text-zinc-100">
              Web Engineering
            </p>
            <span className="m-0 p-0 text-[0.9rem] tracking-tight text-zinc-600 dark:text-zinc-400">
              By Raul Glogovețan
            </span>
            <div className="m-0 p-0 mt-[-35px] ml-[8px] bg-blue-300 dark:bg-blue-900 w-full h-[0.6rem]"/>
          </Link>
        </div>
        <ModeToggle />
      </div>
    </div>
  </header>
);

export default Header;
