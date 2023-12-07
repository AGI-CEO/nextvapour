import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { WishContext } from "./page";

const Navbar = () => {
  //const router = useRouter();
  const [activeLink, setActiveLink] = useState("");
  const { wishlist } = useContext(WishContext);

  /*useEffect(() => {
    setActiveLink(router.pathname);
  }, [router.pathname]);*/

  return (
    <>
      <Link href={"/"} className={activeLink === "/" ? "underline" : undefined}>
        Home
      </Link>
      <Link
        href={"/library"}
        className={activeLink === "/library" ? "underline" : undefined}
      >
        Library
      </Link>
      <Link
        href={"/upcoming"}
        className={activeLink === "/upcoming" ? "underline" : undefined}
      >
        Upcoming
      </Link>
      <Link
        href={"/wishlist"}
        className={activeLink === "/wishlist" ? "underline" : undefined}
      >
        {wishlist.length !== 0 ? `Wishlist (${wishlist.length})` : `Wishlist`}
      </Link>
    </>
  );
};

export default Navbar;
