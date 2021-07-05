import { useReactiveVar } from "@apollo/client";
import { AnimatePresence, motion } from "framer-motion";
import { universalModalVar } from "../../graphql/reactivities/modalVariable";

const UniversalNoticeModal = () => {
  const universalModal = useReactiveVar(universalModalVar);
  return (
    <AnimatePresence>
      {universalModal && (
        <div className="px-5 fixed z-20 h-full w-full flex items-center justify-center top-0 left-0">
          <motion.div
            initial={{ x: "100vw", opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            exit={{
              x: "-100vw",
              opacity: 0,
            }}
            transition={{ type: "spring", bounce: 0, duration: 0.9 }}
            className="absolute z-10 p-5 bg-white h-[90%] w-5/6 rounded text-black "
          >
            <button
              onClick={() => universalModalVar(!universalModalVar())}
              className="absolute top-0 right-0 -mt-4 -mr-4 bg-yellow-600 text-white border
               border-white h-8 w-8 block mb-2 rounded-full z-20"
            >
              &times;
            </button>
            <div className="absolute h-full w-full left-0 right-0 top-0   overflow-hidden ">
              <div className="absolute overflow-y-auto h-full p-5">
                <div>
                  <h1 className="capitalize font-bold text-2xl text-center">
                    plz.., read me
                  </h1>
                </div>
                <div className="">
                  <div>
                    <p className="text-yellow-600 font-bold">
                      some vulnerabilities
                    </p>
                    <p className="py-1">
                      <span className="font-medium">1. bad engineering : </span>{" "}
                      Its a big site when it is consideration of portfolio. And
                      I am very new to graphql, next js and tailwind css. As I
                      have made this completely alone, in some cases I had to go
                      through many troubles finding solutions, where I have used
                      bad practise solutions. But it works. As a example, though
                      its a grocery site, all the products here related to
                      shopping 😁😁. Because I dont have good grocery images.
                    </p>
                    <p className="py-1">
                      <span className="font-medium">2. hard reloading : </span>I
                      dont know why sometimes clicking on Link site gets reload
                      and sometimes doesn't. But in production working fine 90%.
                    </p>
                    {/* <p className="py-1">
                      <span className="font-medium">3. stripe payment : </span>
                      Clicking on stripe payment button, sometimes stripe modal
                      is getting open and sometimes isn't. May be it's a
                      networking issue. But specifically I dont know why it
                      doest that nasty work.
                    </p> */}
                    <p className="py-1">
                      <span className="font-medium">
                        3. send email to spam :{" "}
                      </span>
                      Reset password link and order invoice could be send in
                      spam. But more likely it will behave as normal.
                    </p>
                  </div>
                  <div className="mt-3">
                    <p className="text-yellow-600 font-bold">
                      some features it provides
                    </p>
                    <p className="py-1">
                      <span className="font-medium">
                        1. state management with apollo graphql client :{" "}
                      </span>
                      I am using apollo-client instead of redux because of its{" "}
                      <span className="font-medium text-black">cache</span> and{" "}
                      <span className="font-medium text-black">
                        reactive variables
                      </span>{" "}
                      . If already have data in cache , never request to server
                      again for the same data. I really like that concept.
                    </p>
                    <p className="py-1">
                      <span className="font-medium">
                        2. role based authentication using graphql with multiple
                        layouts :{" "}
                      </span>{" "}
                      For admin panel and for normal I have separated their
                      login and register page and design differently.
                    </p>
                    <p className="py-1">
                      <span className="font-medium">3. send email : </span>
                      Using node mailer and graphql sending email by gmail
                      (reset password link , order invoice)
                    </p>
                    <p className="py-1">
                      <span className="font-medium">
                        4. shopping cart using reactive variables :{" "}
                      </span>
                      the shopping cart is advanced. It will add product
                      according to stock. If stock is 0, product will not add.
                    </p>
                    <p className="py-1">
                      <span className="font-medium">
                        5. skeleton Loading & Responsiveness :{" "}
                      </span>
                      I have used skeleton loading with animation (Admin Panel).
                      And this site is very responsive even if it is 4k monitor.
                    </p>
                  </div>
                  <div className="mt-3">
                    <p className="font-bold text-black">
                      As I have learned those technologies completely by myself
                      from google and youtube , it is very easy to make
                      mistakes. I believe youtube and google is not enough to go
                      dept of those technologies and make big projects. As I
                      have achieved those, I am very very confident that, I can
                      achieve more if I have a chance working with your company.
                    </p>
                  </div>

                  <div className="mt-3">
                    <p className="text-yellow-600 font-bold">how to use it.</p>
                    <div className="py-1">
                      <p className="pb-2">its a demo video. </p>
                      <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/-CIAkWV-u58"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{ type: "spring", bounce: 0, duration: 0.2 }}
            onClick={() => universalModalVar(!universalModalVar())}
            className="bg-[rgba(0,0,0,0.5)]  px-5 fixed h-full w-full flex items-center justify-center
             top-0 left-0"
          />
        </div>
      )}
    </AnimatePresence>
  );
};

export default UniversalNoticeModal;
