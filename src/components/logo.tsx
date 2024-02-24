import Link from "next/link";

const Logo = () => (
  <div title="Web Enginnering By Raul Glogovețan Logo">
    <Link href="/" className="active:opacity-80 select-none">
      <p className="m-0 p-0 mb-[-0.3rem] text-4xl font-semibold tracking-tighter	text-slate-700 dark:text-zinc-100">
        Web Engineering
      </p>
      <span className="m-0 p-0 text-[0.9rem] tracking-tight text-zinc-600 dark:text-zinc-400">
        By Raul Glogovețan
      </span>
      <div className="m-0 p-0 mt-[-35px] ml-[8px] bg-blue-300 dark:bg-blue-900 w-full h-[0.6rem]" />
    </Link>
  </div>
);

export default Logo;
