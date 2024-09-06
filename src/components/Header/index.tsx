import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import SearchForm from "@/components/Header/SearchForm";
import useColorMode from "@/hooks/useColorMode";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const [colorMode, setColorMode] = useColorMode();
  return (
    <header className="sticky top-0 z-999 flex w-full border-b border-stroke bg-white dark:border-stroke-dark dark:bg-gray-dark">
      <div className="flex flex-grow items-center justify-between px-4 py-2 shadow-2">
        <div className="flex items-center gap-2 sm:gap-4">
          <Link className="block flex-shrink-0" href="/">
            <Image
              width={176}
              height={32}
              src={"/images/logo/Logo_RGB_Blue.svg"}
              alt="Logo"
              priority
              className="dark:hidden"
            />
            <Image
              width={176}
              height={32}
              src={"/images/logo/Logo_RGB_White_Blue.svg"}
              alt="Logo"
              priority
              className="hidden dark:block"
            />
          </Link>
        </div>

        <div className="flex items-center justify-normal gap-2 2xsm:gap-4 lg:w-full lg:justify-between xl:w-auto xl:justify-normal">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- Search Form --> */}
            <SearchForm />
            {/* <!-- Search Form --> */}

            {/* <!-- Dark Mode Toggle --> */}
            {/* <DarkModeSwitcher /> */}
            {/* <!-- Dark Mode Toggle --> */}

            {/* <!-- Notification Menu Area --> */}
            <DropdownNotification />
            {/* <!-- Notification Menu Area --> */}
          </ul>

          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
