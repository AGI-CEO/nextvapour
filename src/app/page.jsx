"use client";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "./Header";
import GameInfo from "./GameInfo";
import Footer from "./Footer";
import Link from "next/link";
import GameCarousel from "./GameCarousel";
import Library from "./Library";
//import { WishContext, GameContext } from "./_app";

export default function App() {
  const [gameInfo, setGameInfo] = useState({});
  const [showInfo, setShowInfo] = useState(false);
  //const { wishlist, setWishlist } = useContext(WishContext);
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
      <Header />

      {/*<GameCarousel />*/}
      <Library />
      {showInfo && (
        <GameInfo gameInfo={gameInfo} handleCloseButton={handleCloseButton} />
      )}
      <Footer />
    </div>
  );
}
