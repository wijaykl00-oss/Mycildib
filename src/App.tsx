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

        <h1 className="text-2xl font-bold text-pink-800 mb-2">Welcome my favorite person</h1>
        <p className="text-pink-600 mb-8">Hanya nama orang terpilih</p>

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

const photos1 = Array.from({ length: 10 }).map((_, i) => `/foto/${i + 1}.jpeg?v=2`);
const photos2 = Array.from({ length: 10 }).map((_, i) => `/foto/${i + 11}.jpeg?v=2`);

const LoveExplosion = () => {
  const particles = Array.from({ length: 40 });
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-pink-100 overflow-hidden">
      {particles.map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 40 + 20;
        const delay = Math.random() * 2;
        return (
          <motion.div
            key={i}
            className="absolute text-pink-500"
            initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
            animate={{
              x: `${Math.cos(angle) * velocity}vw`,
              y: `${Math.sin(angle) * velocity}vh`,
              opacity: [1, 0.8, 0],
              scale: [0.5, Math.random() * 2 + 1]
            }}
            transition={{ duration: 2.5, repeat: Infinity, delay }}
          >
            <Heart size={Math.random() * 20 + 10} fill="currentColor" />
          </motion.div>
        );
      })}
      <motion.div
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ repeat: Infinity, duration: 0.6 }}
      >
        <Heart size={140} className="text-pink-600 drop-shadow-2xl z-10" fill="currentColor" />
      </motion.div>
    </div>
  );
};

const MainScreen = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [scene, setScene] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(e => console.log("Autoplay prevented:", e));
    }
  }, []);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const time = audioRef.current.currentTime;
      if (time >= 63 && scene !== 2) {
        setScene(2);
      } else if (time >= 6 && time < 63 && scene !== 1) {
        setScene(1);
      }
    }
  };

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
    <div className="min-h-screen bg-pink-50 text-pink-900 font-sans relative overflow-x-hidden transition-colors duration-1000">
      <FloatingHearts />

      {/* Background Audio */}
      <audio 
        ref={audioRef} 
        src="/music/videoplayback.m4a" 
        loop 
        onTimeUpdate={handleTimeUpdate} 
      />

      {/* Floating Music Controller */}
      <button
        onClick={toggleAudio}
        className="fixed bottom-6 right-6 bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-full shadow-xl z-50 transition-all hover:scale-110"
        title={isPlaying ? "Jeda Lagu" : "Putar Lagu"}
      >
        <Music size={24} className={isPlaying ? "animate-pulse" : "opacity-50"} />
      </button>

      {/* SCENE 0: Love Explosion Intro */}
      <div className={`fixed inset-0 z-40 transition-opacity duration-1000 ease-in-out pointer-events-none ${scene === 0 ? 'opacity-100' : 'opacity-0'}`}>
        {scene === 0 && <LoveExplosion />}
      </div>

      {/* SCENE 1 & 2: Photos & Text */}
      <div className={`max-w-6xl mx-auto px-4 pt-12 pb-24 relative z-10 transition-opacity duration-1000 ${scene > 0 ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Beautiful Text on Scene 2 */}
        {scene === 2 && (
          <motion.div 
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-center mb-12 mt-4"
          >
            <h2 
              className="text-5xl md:text-7xl font-bold text-pink-600 drop-shadow-sm px-4" 
              style={{ fontFamily: "'Dancing Script', cursive", textShadow: "2px 2px 4px rgba(255,192,203,0.6)" }}
            >
              Hal terindah yang pernah kutemukan
            </h2>
          </motion.div>
        )}

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {(scene === 2 ? photos2 : photos1).map((src, index) => (
            <motion.div
              key={`${scene}-${src}`}
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1, type: "spring" }}
              whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 3 : -3 }}
              className="break-inside-avoid relative group"
            >
              <img
                src={src}
                alt={`Cute ${index}`}
                className={`w-full object-cover mb-4 transition-all duration-500 shadow-xl
                  ${scene === 2 
                    ? "rounded-[3rem] border-[10px] border-pink-100/80 hover:border-pink-300 p-2 bg-gradient-to-br from-white to-pink-50" 
                    : "rounded-2xl border-4 border-white/50 hover:border-pink-300"
                  }
                `}
              />
              {scene === 2 && (
                <div className="absolute -top-3 -right-3 text-pink-500 drop-shadow-md rotate-12 bg-white/50 rounded-full p-2">
                  <Heart size={28} fill="currentColor" />
                </div>
              )}
              {scene === 2 && (
                <div className="absolute -bottom-3 -left-3 text-pink-400 drop-shadow-md -rotate-12 bg-white/50 rounded-full p-1.5">
                  <Heart size={20} fill="currentColor" />
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <Heart className="text-white/80 drop-shadow-lg" size={scene === 2 ? 48 : 32} fill="currentColor" />
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
