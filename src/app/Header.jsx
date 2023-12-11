import Navbar from "./Navbar";
import Image from "next/image";

const Header = () => {
  const playMarioWarCry = () => {
    const audio = new Audio("/public/assets/MarioYahoo.mp3");
    audio.play();
  };

  const playMarioMushroom = () => {
    const audio = new Audio("/public/assets/MarioMushroomSound.mp3");
    audio.volume = 0.3;
    audio.play();
  };

  const playMarioDeath = () => {
    const audio = new Audio("/public/assets/MarioDeath.mp3");
    audio.play();
  };

  return (
    <header className="relative bg-slate-700/70 border-b border-gray-600">
      <Image
        src="/assets/icons/logo.svg"
        alt="logo"
        className="w-80 mx-auto drop-shadow"
        style={{ marginBottom: "-18px" }}
        width={500}
        height={300}
      />
      <div
        id="storeLinks"
        className="w-5/6 mx-auto flex sm:justify-between sm:flex-row flex-col sm:items-center items-end justify-center bg-gradient-to-r from-blue-400 to-blue-800 rounded-t p-2"
      >
        <div className="flex gap-2 text-white font-bold sm:gap-5 sm:order-first order-last">
          <Navbar />
        </div>
        <div id="userBar" className="flex gap-2">
          <Image
            src="/assets/icons/announcement.png"
            alt="announcement"
            className="sm:w-10 w-8 bg-blue-200 p-2 rounded shadow-lg cursor-pointer"
            onClick={playMarioWarCry}
            width={40}
            height={40}
          />
          <Image
            className="sm:w-10 w-8 bg-green-200 p-2 rounded shadow-lg cursor-pointer"
            src="/assets/icons/notification.png"
            alt="notification"
            onClick={playMarioMushroom}
            width={40}
            height={40}
          />
          <div className="flex items-center gap-1">
            <Image
              className="sm:w-10 w-8 bg-red-200 p-2 rounded shadow-lg cursor-pointer"
              src="/assets/icons/user.png"
              alt="user"
              onClick={playMarioDeath}
              width={40}
              height={40}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
