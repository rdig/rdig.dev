import childProcess from "child_process";
import Link from "next/link";
import Image from 'next/image';

import logo from '/public/logo-rdig.svg';

const commitHash = childProcess.execSync('git rev-parse HEAD').toString().trim();


const Footer = () => (
  <>
    <div className="relative mb-[-2rem] mt-20">
      <Image className="w-16 mx-auto" src={logo} alt="Raul Glogovețan Logo" priority />
    </div>
    <footer className="bg-white dark:bg-black">
      <address className="hidden"><a rel="author" href="/about-raul-glogovetan">Raul Glogovețan</a></address>
      <div className="max-w-3xl mx-auto py-32 px-4">
        <div className="flex items-center justify-between">
          <div className="">
            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-500">© Raul Glogovețan</p>
            <p className="mt-0 text-xs font-medium text-zinc-600 dark:text-zinc-500">All rights reserved</p>
            <p className="mt-0 text-xs text-zinc-400 dark:text-zinc-800">{commitHash}</p>
          </div>
          <nav className="ml-auto text-sm font-medium space-x-6 dark:text-zinc-200">
            <Link className="hover:underline active:opacity-80" target="_blank" rel="noopener noreferrer" href="https://github.com/rdig">Github</Link>
            <Link className="hover:underline active:opacity-80" href="/">About</Link>
            <Link className="hover:underline active:opacity-80" href="/">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  </>
);

export default Footer;
