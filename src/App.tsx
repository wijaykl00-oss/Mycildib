import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Heart, HeartCrack, Music } from 'lucide-react';

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<{ id: number; left: number; delay: number; size: number }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() * 20 + 10,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-[-50px] text-pink-300 opacity-50"
          style={{ left: `${heart.left}%` }}
          animate={{
            y: ['0vh', '-120vh'],
            x: [0, Math.random() * 50 - 25, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: heart.delay,
            ease: 'linear',
          }}
        >
          <Heart size={heart.size} fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
};

const LoginScreen = ({ onLogin }: { onLogin: () => void }) => {
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname.trim().toLowerCase() === 'adibah cahyawati') {
      onLogin();
    } else {
      setError('Nickname salah. Coba ingat lagi siapa dirimu di hatiku.');
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4 relative">
      <FloatingHearts />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-3xl shadow-xl border border-pink-100 max-w-md w-full z-10 text-center"
      >
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Heart size={48} className="text-pink-500" fill="currentColor" />
          </motion.div>
        </div>

        <h1 className="text-2xl font-bold text-pink-800 mb-2">Selamat Datang</h1>
        <p className="text-pink-600 mb-8">Silakan masukkan nickname kamu untuk melanjutkan</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                setError('');
              }}
              placeholder="Nickname kamu..."
              className="w-full px-4 py-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-pink-50/50 text-pink-900 placeholder-pink-300 text-center text-lg"
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-xl transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Masuk
          </button>
        </form>
      </motion.div>
    </div>
  );
};

const photos = Array.from({ length: 20 }).map((_, i) => `/foto/${i + 1}.jpeg`);

const MainScreen = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(e => console.log("Autoplay prevented:", e));
    }
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 text-pink-900 font-sans pb-20 relative">
      <FloatingHearts />

      {/* Background Audio */}
      <audio ref={audioRef} src="/lagu.mp3" loop />

      {/* Floating Music Controller */}
      <button
        onClick={toggleAudio}
        className="fixed bottom-6 right-6 bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-full shadow-xl z-50 transition-all hover:scale-110"
        title={isPlaying ? "Jeda Lagu" : "Putar Lagu"}
      >
        <Music size={24} className={isPlaying ? "animate-pulse" : "opacity-50"} />
      </button>

      <div className="max-w-6xl mx-auto px-4 pt-12 relative z-10">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {photos.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index % 4 * 0.1 }}
              whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
              className="break-inside-avoid relative group"
            >
              <img
                src={src}
                alt={`Cute ${index}`}
                className="rounded-2xl shadow-md w-full object-cover mb-4 border-4 border-white/50 hover:border-pink-300 transition-colors"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <Heart className="text-white drop-shadow-lg" size={32} fill="currentColor" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {isLoggedIn ? (
        <MainScreen />
      ) : (
        <LoginScreen onLogin={() => setIsLoggedIn(true)} />
      )}
    </>
  );
}
