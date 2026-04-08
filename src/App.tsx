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

const topPhotos = Array.from({ length: 5 }).map((_, i) => `/foto/${i + 1}.jpeg?v=2`);
const bottomPhotos = Array.from({ length: 15 }).map((_, i) => `/foto/${i + 6}.jpeg?v=2`);

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
      if (time >= 6 && scene === 0) {
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

  // Pre-defined random rotations for the polaroid cards
  const rotations = [-8, 5, -4, 7, -6];

  // Interesting shapes array for the bottom photos
  const shapes = [
    { container: "rounded-3xl border-4 border-pink-200", img: "rounded-2xl" }, // Soft rectangle
    { container: "rounded-full aspect-square border-8 border-white", img: "rounded-full aspect-square" }, // Circle
    { container: "rounded-tr-[50%] rounded-bl-[50%] rounded-tl-xl rounded-br-xl border-4 border-pink-300 bg-white p-2", img: "rounded-tr-[50%] rounded-bl-[50%] rounded-tl-lg rounded-br-lg" }, // Leaf-like shape
    { container: "rounded-t-full rounded-b-2xl border-[6px] border-white aspect-[3/4]", img: "rounded-t-full rounded-b-[14px] w-full h-full" }, // Arch shape
    { container: "rounded-[3rem] border-[10px] border-pink-100 bg-white p-2", img: "rounded-[2.5rem]" }, // Puffy
  ];

  return (
    <div className={`bg-pink-50 text-pink-900 font-sans relative overflow-x-hidden transition-colors duration-1000 ${scene > 0 ? '' : 'h-screen overflow-hidden'}`}>
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

      {/* SCENE 1: Scrollable Page */}
      <div className={`relative z-10 transition-opacity duration-1000 ${scene > 0 ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Top Section: First photos mixed shapes + cute characters */}
        <div className="min-h-[90vh] flex flex-col items-center justify-center pt-20 px-4 relative">
          
          {/* Animated Cute Characters */}
          {[
            { char: "🐰", left: "10%", top: "15%", delay: 0 },
            { char: "🌸", left: "85%", top: "20%", delay: 0.5 },
            { char: "🧸", left: "15%", top: "70%", delay: 1 },
            { char: "✨", left: "80%", top: "65%", delay: 1.5 },
            { char: "🐱", left: "5%", top: "40%", delay: 2 },
            { char: "🎀", left: "90%", top: "45%", delay: 2.5 },
          ].map((item, i) => (
             <motion.div
               key={`char-${i}`}
               className="absolute z-0 text-5xl md:text-7xl drop-shadow-md pointer-events-none"
               initial={{ opacity: 0, scale: 0 }}
               animate={{ 
                 opacity: 1, 
                 scale: 1,
                 y: [0, -30, 0],
                 x: [0, 15, -15, 0],
                 rotate: [0, 15, -15, 0]
               }}
               transition={{ 
                 duration: 4 + (i % 3), 
                 repeat: Infinity, 
                 ease: "easeInOut",
                 delay: item.delay 
               }}
               style={{ top: item.top, left: item.left }}
             >
                {item.char}
             </motion.div>
          ))}

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 relative z-10 max-w-5xl mx-auto">
            {topPhotos.map((src, index) => {
              const style = shapes[(index + 3) % shapes.length];
              return (
                <motion.div
                  key={`top-shape-${src}`}
                  initial={{ opacity: 0, scale: 0.6, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2, type: "spring" }}
                  whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 3 : -3 }}
                  className={`relative overflow-hidden shadow-xl w-48 h-56 md:w-64 md:h-80 ${style.container}`}
                >
                  <img
                    src={src}
                    alt={`Varied Top ${index}`}
                    className={`w-full h-full object-cover ${style.img}`}
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-pink-500/20 mix-blend-overlay"></div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Large Scroll Space */}
        <div className="h-[60vh] flex items-center justify-center opacity-50 flex-col gap-4 text-pink-400">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            Geser Ke Bawah
          </motion.div>
          <div className="w-[2px] h-32 bg-gradient-to-b from-pink-400 to-transparent"></div>
        </div>

        {/* Middle Text Area */}
        <div className="text-center px-4 mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-pink-600 drop-shadow-md mx-auto max-w-4xl leading-tight" 
            style={{ fontFamily: "'Dancing Script', cursive", textShadow: "3px 3px 6px rgba(255,192,203,0.8)" }}
          >
            Hal terindah yang pernah kutemukan
          </motion.h2>
        </div>

        {/* Bottom Section: Varied Shapes */}
        <div className="max-w-6xl mx-auto px-4 pb-32">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
            {bottomPhotos.map((src, index) => {
              const style = shapes[index % shapes.length];
              return (
                <motion.div
                  key={`bottom-${src}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, type: "spring" }}
                  whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                  className={`break-inside-avoid relative overflow-hidden shadow-xl ${style.container}`}
                >
                  <img
                    src={src}
                    alt={`Varied ${index}`}
                    className={`w-full h-full object-cover ${style.img}`}
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-pink-500/20 mix-blend-overlay"></div>
                </motion.div>
              );
            })}
          </div>
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
