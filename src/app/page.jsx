"use client";
import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "./Header";
import FrontPage from "./FrontPage";
import GameInfo from "./GameInfo";
import Library from "./Library";
import Wishlist from "./Wishlist";
import Footer from "./Footer";
import Upcoming from "./Upcoming";
import Link from "next/link";
const WishContext = createContext();
export { WishContext };
const GameContext = createContext();
export { GameContext };

export default function App() {
  const [gameInfo, setGameInfo] = useState({});
  const [showInfo, setShowInfo] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  //const router = useRouter();

  const getGameDetails = async (id) => {
    try {
      const response = await axios.get(`/api/game/${id}`);
      setGameInfo(response.data);
      setShowInfo(!showInfo);
    } catch (error) {
      console.error(error);
    }
  };

  const getWishlist = async () => {
    try {
      const response = await axios.get("api/videogames");
      setWishlist(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  const handleCloseButton = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div className="min-h-[100dvh]">
      <WishContext.Provider value={{ wishlist, setWishlist }}>
        <Header />
        <GameContext.Provider value={getGameDetails}>
          <Link href="/">FrontPage</Link>
          <Link href="/upcoming">Upcoming</Link>
          <Link href="/library">Library</Link>
          <Link href="/wishlist">Wishlist</Link>
        </GameContext.Provider>
      </WishContext.Provider>
      {showInfo && (
        <GameInfo gameInfo={gameInfo} handleCloseButton={handleCloseButton} />
      )}
      <Footer />
    </div>
  );
}
