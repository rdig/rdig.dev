import { ModeToggle } from "@components/mode-toggle";
import Logo from "@components/logo";
import Menu from "@components/menu";

const Header = () => (
  <header className="">
    <div className="max-w mt-16 mb-40 sm:mb-24">
      <div className="flex items-center justify-between relative">
        <Logo />
        <Menu />
        <ModeToggle />
      </div>
    </div>
  </header>
);

export default Header;
