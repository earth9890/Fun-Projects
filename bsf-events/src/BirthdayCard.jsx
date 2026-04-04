import  { useState, useEffect } from "react";
import useSound from "use-sound";
import hbsong from "./assets/hbsong.mp3";

function BirthdayCard() {
  const quotes = [
    "Wishing you a great birthday and a memorable year. From all of us.",
    "Hoping your birthday brings you many happy reasons to celebrate!",
    "Wishing you the best on your birthday and everything good in the year ahead.",
    "Hope your day is filled with happiness.",
    "Wishing you a happy birthday and a wonderful year.",
    "Our whole team is wishing you the happiest of birthdays.",
    "Happy Birthday and all the best to you in the year to come!",
    "Wishing you a relaxing birthday and happiness in the year to come.",
    "The whole team wishes you the happiest of birthdays and a great year.",
    "May your birthday be the start of a year filled with good luck, good health and much happiness.",
    "Wishing you much happiness on your special day. Have an unforgettable birthday.",
    "Wishing you a day full of laughter and happiness and a year that brings you much success.",
  ];

  const getRandomQuote = () =>
    quotes[Math.floor(Math.random() * quotes.length)];

  const [quote, setQuote] = useState(getRandomQuote());
  const [fade, setFade] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { pause }] = useSound(hbsong, { volume: 0.5, interrupt: true });

  useEffect(() => {
    const audioCtx = new (window.AudioContext ||
      window.webkitAudioContext)();

    audioCtx
      .resume()
      .then(() => {
        play();
        setIsPlaying(true);
      })
      .catch((err) => {
        console.error("Autoplay blocked:", err.message);
      });

    const quoteInterval = setInterval(() => {
      setFade(false); // Start fade-out
      setTimeout(() => {
        setQuote(getRandomQuote());
        setFade(true); // Fade-in new quote
      }, 300); // Wait for fade-out to finish
    }, 3000);

    return () => clearInterval(quoteInterval);
  }, [play]);

  const toggleAudio = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-sm sm:max-w-md w-full text-center transform transition-all duration-500 hover:scale-105">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-800 mb-6">
          Happy Birthday!
        </h1>

        {/* Magnifying image - responsive */}
        <div className="w-32 h-32 sm:w-44 sm:h-44 mx-auto mb-6 overflow-hidden rounded-full shadow-lg transform transition-transform duration-500 hover:scale-125 cursor-zoom-in">
          <img
            className="w-full h-full object-cover"
            src="https://ca.slack-edge.com/T03V362DL-U9347PJ3A-19960d8bd6a2-512"
            alt="Birthday"
          />
        </div>

        {/* Smooth quote transition - responsive text */}
        <p
          className={`text-base sm:text-lg text-gray-700 mb-6 transition-opacity duration-500 ease-in-out ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          {quote}
        </p>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={toggleAudio}
        >
          {isPlaying ? "Pause Birthday Song" : "Play Birthday Song"}
        </button>
      </div>
    </div>
  );
}

export default BirthdayCard;
