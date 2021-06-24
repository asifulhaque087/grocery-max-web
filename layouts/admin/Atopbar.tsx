import Link from "next/link";
import {
  MenuIcon,
  QuestionMarkCircleIcon,
  LogoutIcon,
  DesktopComputerIcon,
} from "@heroicons/react/solid";
import { LoginIcon } from "@heroicons/react/outline";
// import Image from "next/image";
import { userSideDrawerVar } from "../../graphql/reactivities/toogleVariable";
import { loggedInUserVar } from "../../graphql/reactivities/userVariable";
import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/router";
const Atopbar = () => {
  const router = useRouter();
  const loggedInUser: any = useReactiveVar(loggedInUserVar);
  return (
    <>
      <div className="fixed w-full bg-white z-10">
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
            <Link href="/admin">
              <div>
                {/* <Image src="/pumpkinLogo.png" height={50} width={50} /> */}
                <h1 className="text-2xl font-bold text-yellow-600">
                  GRC<span className="text-green-500">M</span>
                </h1>
              </div>
            </Link>
          </div>
          {/* search box */}
          <div className="flex-grow px-2 md:px-4">
            <input
              type="text"
              placeholder="Search "
              className="border px-2 py-1 focus:outline-none rounded-full shadow w-full"
            />
          </div>
          {/* admin panel */}
          <div>
            <div className="font-medium cursor-pointer">
              <Link href="/" prefetch={false}>
                <div className="flex">
                  <DesktopComputerIcon className="h-7 text-yellow-500" />
                  <span className="whitespace-nowrap hidden sm:inline">
                    Front
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
                  <QuestionMarkCircleIcon className="h-7 text-green-500" />
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
              {typeof window !== "undefined" && loggedInUser ? (
                <div>
                  <div
                    className="flex"
                    onClick={() => {
                      sessionStorage.removeItem("jwtToken");
                      loggedInUserVar(null);
                      router.push("/admin/login");
                    }}
                  >
                    <LogoutIcon className="h-7 text-yellow-500" />
                    <span className="whitespace-nowrap hidden sm:inline">
                      Sign out
                    </span>
                  </div>
                </div>
              ) : (
                <Link href="/login" prefetch={false}>
                  <div className="flex">
                    <LoginIcon className="h-7 text-yellow-500" />
                    <span className="whitespace-nowrap hidden sm:inline">
                      Sign in
                    </span>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="pt-14"></div>
    </>
  );
};

export default Atopbar;
