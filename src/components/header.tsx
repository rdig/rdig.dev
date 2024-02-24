import { ModeToggle } from "@components/mode-toggle";
import Logo from "@components/logo";

const Header = () => (
  <header className="bg-zinc-200 dark:bg-zinc-950">
    <div className="max-w-3xl mx-auto py-20 px-4">
      <div className="flex items-center justify-between">
        <Logo />
        <ModeToggle />
      </div>
    </div>
  </header>
);

export default Header;
