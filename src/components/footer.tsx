import childProcess from "child_process";
import Link from "next/link";
import Image from 'next/image';

import logo from '/public/logo-rdig.svg';

const commitHash = childProcess.execSync('git rev-parse HEAD').toString().trim();

const Footer = () => (
  <footer className="mb-20 max-w-3xl">
    <address className="hidden">
      <Link rel="author" href="/about-raul-glogovetan">Raul Glogovețan</Link>
    </address>
    <div className="">
      <div>
        <div className="flex items-center	">
          <Image className="w-10 mr-2" src={logo} alt="Raul Glogovetan Logo" priority />
          <div>
            <p className="text-sm font-medium text-zinc-500">© Raul Glogovetan</p>
            <p className="mt-0 text-xs text-zinc-400 dark:text-zinc-600">{commitHash}</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
