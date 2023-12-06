import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { WishContext } from "./page";

const Navbar = () => {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("");
  const { wishlist } = useContext(WishContext);

  useEffect(() => {
    setActiveLink(router.pathname);
  }, [router.pathname]);

  return (
    <>
      <Link href={"/"}>
        <a className={activeLink === "/" ? "underline" : undefined}>Home</a>
      </Link>
      <Link href={"/library"}>
        <a className={activeLink === "/library" ? "underline" : undefined}>
          Library
        </a>
      </Link>
      <Link href={"/upcoming"}>
        <a className={activeLink === "/upcoming" ? "underline" : undefined}>
          Upcoming
        </a>
      </Link>
      <Link href={"/wishlist"}>
        <a className={activeLink === "/wishlist" ? "underline" : undefined}>
          {wishlist.length !== 0 ? `Wishlist (${wishlist.length})` : `Wishlist`}
        </a>
      </Link>
    </>
  );
};

export default Navbar;
