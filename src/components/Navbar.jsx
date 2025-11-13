import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";

const Navbar = () => {
  useGSAP(() => {
    gsap.from("nav", {
      y: -100,
      duration: 0.7,
      opacity: 0,
      delay: 0.3,
    });
  });

  return (
    <>
      <nav className="px-4 pt-2 fixed w-full z-50">
        <div className="h-16 rounded-full px-8 flex items-center justify-between shadow bg-white">
          <Link to={"/"}>
            <img
              src="./smartMartLogo.svg"
              alt="smart mart logo"
              className="h-8"
            />
          </Link>
          <ul className="flex items-center">
            <li>
              <Link
                className="font-bold text-sky-700 btn btn-soft btn-info m-1 hover:text-white hover:bg-sky-400 bg-white border-0 rounded-4xl "
                to={"/inventory"}
              >
                Inventory
              </Link>
            </li>
            <li>
              <Link
                className="font-bold text-sky-700 btn btn-soft btn-info m-1 hover:text-white hover:bg-sky-400 bg-white border-0 rounded-4xl "
                to={"/billing"}
              >
                Billing
              </Link>
            </li>
            <li>
              <Link
                className="font-bold text-sky-700 btn btn-soft btn-info m-1 hover:text-white hover:bg-sky-400 bg-white border-0 rounded-4xl "
                to={"/history"}
              >
                History
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="h-20"></div>
    </>
  );
};

export default Navbar;
