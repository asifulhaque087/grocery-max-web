import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="border-t py-10">
      <div className="grid sm:grid-cols-2 px-7">
        {/* left */}
        <div>
          <div>
            <Link href="/">
              <div>
                <Image src="/pumpkinLogo.png" height={80} width={80} />
              </div>
            </Link>
          </div>
          <p className="text-gray-500 text-sm">
            Grocery Max is an online e-commerce shop in Dhaka, Bangladesh. Our
            objective, to deliver fresh, organic, brand products, quality
            services for the people of Dhaka City. They do not need to spend
            more time to buy basic products for their daily requirements.
            Grocery Max shall deliver the highest quality, fresh, brand products
            with the best possible price to your door-step within the shortest
            possible time.
          </p>
          <div className="text-center md:text-left">
            <h1 className="py-2">
              <span className="cursor-pointer text-green-400 text-md font-medium ">
                <Link href="/">About Us</Link>
              </span>
            </h1>
            <h1 className=" text-centerr py-2">
              <span className="cursor-pointer text-green-400 text-md font-medium ">
                <Link href="/">FAQ</Link>
              </span>
            </h1>
            <h1 className=" text-centerr py-2">
              <span className="cursor-pointer text-green-400 text-md font-medium ">
                <Link href="/">Privacy Policy</Link>
              </span>
            </h1>
            <h1 className=" text-centerr py-2">
              <span className="cursor-pointer text-green-400 text-md font-medium ">
                <Link href="/">Terms and Conditions</Link>
              </span>
            </h1>
          </div>
        </div>
        {/* right */}
        <div>
          <div className="text-center md:text-right py-16">
            <div className="py-3">
              <h1 className="capitalize font-bold text-lg text-gray-500">
                contact us
              </h1>
              <p className="text-gray-500 text-sm">
                House:1148, Road: Joshimuddin Ave,
              </p>
              <p className="text-gray-500 text-sm">
                Badsherteck, Uttara,Dhaka-1230
              </p>
            </div>
            <div className="py-3">
              <h1 className="capitalize font-bold text-lg text-gray-500">
                +88 01903 709 156
              </h1>
              <p className="text-gray-500 text-sm">
                Or email{" "}
                <span className="font-medium">asifulhaque087@gmail.com</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
