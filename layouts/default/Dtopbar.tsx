import Link from "next/link";
import {
  MenuIcon,
  QuestionMarkCircleIcon,
  UserIcon,
} from "@heroicons/react/solid";
import { LoginIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { userSideDrawerVar } from "../../graphql/reactivities/toogleVariable";
const Dtopbar = () => {
  return (
    <>
      <div className="fixed w-full bg-white">
        <div className=" h-14 flex items-center  shadow">
          {/* hamberger icon */}
          <div
            className="px-2 md:px-4 cursor-pointer"
            onClick={() => userSideDrawerVar(!userSideDrawerVar())}
          >
            <MenuIcon className="h-7" />
          </div>
          {/* the logo */}
          <div className="cursor-pointer">
            <Link href="/">
              <div>
                <Image src="/pumpkinLogo.png" height={50} width={50} />
              </div>
            </Link>
          </div>
          {/* search box */}
          <div className="flex-grow px-2 md:px-4">
            <input
              type="text"
              placeholder="Search for products (e.g. eggs, milk, potato)"
              className="border p-2 focus:outline-none rounded w-full"
            />
          </div>
          {/* admin panel */}
          <div>
            <div className="font-medium cursor-pointer">
              <Link href="/admin" prefetch={false}>
                <div className="flex">
                  <UserIcon className="h-7 text-yellow-500" />
                  <span className="whitespace-nowrap hidden sm:inline">
                    Admin Panel
                  </span>
                </div>
              </Link>
            </div>
          </div>
          {/* help and more */}
          <div className="px-2 md:px-4">
            <div className="font-medium cursor-pointer">
              <Link href="/help" prefetch={false}>
                <div className="flex">
                  <QuestionMarkCircleIcon className="h-7 text-yellow-500" />
                  <span className="whitespace-nowrap hidden sm:inline">
                    Help
                  </span>
                </div>
              </Link>
            </div>
          </div>
          {/* sign in  */}
          <div className=" px-2 md:px-4">
            <div className="font-medium cursor-pointer">
              {/* <Link href="/login"> */}
              <Link href="/login" prefetch={false}>
                <div className="flex">
                  <LoginIcon className="h-7 text-yellow-500" />
                  <span className="whitespace-nowrap hidden sm:inline">
                    Sign in
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-14"></div>
    </>
  );
};

export default Dtopbar;
