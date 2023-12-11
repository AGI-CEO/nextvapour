// pages/_app.js
import { useState, useEffect, createContext } from "react";
import axios from "axios";

export const WishContext = createContext();
export const GameContext = createContext();

function MyApp({ Component, pageProps }) {
  const [wishlist, setWishlist] = useState([]);
  const [gameInfo, setGameInfo] = useState({}); // State for game details
  const [showInfo, setShowInfo] = useState(false); // State for showing game details

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

  const getGameDetails = async (id) => {
    // Function to get game details
    try {
      const response = await axios.get(`/api/game/${id}`);
      setGameInfo(response.data);
      setShowInfo(!showInfo);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <WishContext.Provider value={{ wishlist, setWishlist }}>
      <GameContext.Provider value={getGameDetails}>
        <Component {...pageProps} />
      </GameContext.Provider>
    </WishContext.Provider>
  );
}

export default MyApp;
