import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Music, Play, Pause } from 'lucide-react';

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
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
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

const RomanticDecorations = () => {
  const decors = ['🌹', '💌', '💍', '🕊️', '💐', '🎀'];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {Array.from({ length: 15 }).map((_, i) => {
        const decor = decors[Math.floor(Math.random() * decors.length)];
        return (
          <motion.div
            key={`decor-${i}`}
            className="absolute text-5xl opacity-30 blur-[1px]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              duration: Math.random() * 6 + 6,
              repeat: Infinity,
            }}
          >
            {decor}
          </motion.div>
        );
      })}
    </div>
  );
};

const AuroraBackground = () => (
  <div className="fixed inset-0 z-[-1] overflow-hidden bg-pink-50 pointer-events-none">
    <motion.div 
      animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.2, 1] }} 
      transition={{ repeat: Infinity, duration: 10, ease: "linear" }} 
      className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-pink-600/30 blur-[80px]" 
    />
    <motion.div 
      animate={{ x: [0, -40, 0], y: [0, -20, 0], scale: [1, 1.5, 1] }} 
      transition={{ repeat: Infinity, duration: 12, ease: "linear" }} 
      className="absolute top-[20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-pink-400/30 blur-[100px]" 
    />
    <motion.div 
      animate={{ x: [0, 30, 0], y: [0, -40, 0], scale: [1, 1.3, 1] }} 
      transition={{ repeat: Infinity, duration: 15, ease: "linear" }} 
      className="absolute bottom-[-10%] left-[10%] w-[55vw] h-[55vw] rounded-full bg-orange-300/30 blur-[80px]" 
    />
  </div>
);

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
    <div className="min-h-screen flex items-center justify-center p-4 relative transition-colors duration-1000">
      <AuroraBackground />
      <FloatingHearts />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-pink-100 max-w-md w-full z-10 text-center"
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
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-xl transition-colors duration-300 shadow-md hover:shadow-lg active:scale-95"
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
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <AuroraBackground />
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

const FavoritePhotos = () => {
  const [savedPhotos, setSavedPhotos] = useState<(string|null)[]>([null, null, null]);
  const [tempPhotos, setTempPhotos] = useState<(string|null)[]>([null, null, null]);
  const frameRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

  useEffect(() => {
    const d = localStorage.getItem('adibah_best_photos');
    if (d) {
      try {
        const parsed = JSON.parse(d);
        setSavedPhotos(parsed);
        setTempPhotos(parsed);
      } catch(e) {}
    }

    const handleCustomDrop = (e: any) => {
      const { src, x, y } = e.detail;
      let droppedIdx = -1;
      
      const scrollX = window.scrollX || window.pageXOffset;
      const scrollY = window.scrollY || window.pageYOffset;

      frameRefs.forEach((ref, idx) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const absLeft = rect.left + scrollX;
          const absRight = rect.right + scrollX;
          const absTop = rect.top + scrollY;
          const absBottom = rect.bottom + scrollY;
          
          if (x >= absLeft && x <= absRight && y >= absTop && y <= absBottom) {
            droppedIdx = idx;
          }
        }
      });
      
      if (droppedIdx !== -1) {
        setTempPhotos(prev => {
          const newP = [...prev];
          newP[droppedIdx] = src;
          return newP;
        });
      }
    };
    
    window.addEventListener('custom-photo-drop', handleCustomDrop);
    return () => window.removeEventListener('custom-photo-drop', handleCustomDrop);
  }, []);

  // Native Drop Handlers removed in favor of CustomEvent handling

  const handleSave = () => {
    setSavedPhotos(tempPhotos);
    localStorage.setItem('adibah_best_photos', JSON.stringify(tempPhotos));
  };

  const handleCancel = () => {
    setTempPhotos(savedPhotos);
  };

  const handleDeleteAll = () => {
    setTempPhotos([null, null, null]);
    setSavedPhotos([null, null, null]);
    localStorage.removeItem('adibah_best_photos');
  };

  const showButtons = JSON.stringify(tempPhotos) !== JSON.stringify(savedPhotos) && tempPhotos.every(p => p !== null);
  const hasSavedPhotos = savedPhotos.some(p => p !== null);

  return (
    <div className="max-w-4xl mx-auto mt-16 mb-20 text-center px-4 relative z-20">
      <h3 className="text-5xl font-bold text-pink-600 mb-10" style={{ fontFamily: "'Dancing Script', cursive", textShadow: "2px 2px 4px rgba(255,192,203,0.8)" }}>Foto Terbaik</h3>
      <div className="flex flex-wrap justify-center gap-6">
        {[0, 1, 2].map(idx => (
          <div 
            key={idx}
            ref={frameRefs[idx]}
            className="w-40 h-56 md:w-48 md:h-64 border-4 border-dashed border-pink-400 rounded-[2.5rem] flex flex-col items-center justify-center bg-white/40 backdrop-blur-sm relative overflow-hidden group shadow-[0_0_25px_rgba(236,72,153,0.4)] transition-all hover:scale-105"
          >
            {tempPhotos[idx] ? (
               <img src={tempPhotos[idx]!} className="w-full h-full object-cover pointer-events-none" />
            ) : (
               <div className="text-pink-500 flex flex-col items-center p-4">
                 <Heart size={36} className="mb-3 animate-pulse" />
                 <span className="text-sm font-bold opacity-80 text-center leading-tight">Tarik fotomu<br/>ke sini</span>
               </div>
            )}
          </div>
        ))}
      </div>
      {showButtons && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-10 flex justify-center gap-4">
             <button onClick={handleSave} className="px-8 py-3 bg-pink-500 text-white rounded-full font-bold shadow-lg shadow-pink-300 hover:bg-pink-600 transition-colors active:scale-95">Simpan Foto</button>
             <button onClick={handleCancel} className="px-8 py-3 bg-white text-pink-500 border border-pink-300 rounded-full font-bold shadow-lg hover:bg-pink-50 transition-colors active:scale-95">Cancel</button>
          </motion.div>
      )}
      {!showButtons && hasSavedPhotos && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-10 flex justify-center gap-4">
             <button onClick={handleDeleteAll} className="px-8 py-3 bg-red-400 text-white rounded-full font-bold shadow-lg shadow-red-200 hover:bg-red-500 transition-colors active:scale-95">🗑 Hapus Semua Foto</button>
          </motion.div>
      )}
    </div>
  );
};

const NailongTapGame = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'idle' | 'playing' | 'cracked' | 'won'>('idle');
  const [items, setItems] = useState<{ id: number; type: string; left: number }[]>([]);
  const [explosions, setExplosions] = useState<{id: number, left: boolean, particles: {id: number, type: string, color: string}[]}[]>([]);

  const triggerTrumpet = (left: boolean) => {
    const id = Date.now();
    const colors = ['bg-pink-400', 'bg-red-400', 'bg-white', 'bg-pink-300', 'bg-rose-500'];
    const types = ['circle', 'square', 'sliver', 'heart'];
    const particles = Array.from({length: 40}).map((_, i) => ({
      id: i,
      type: types[Math.floor(Math.random() * types.length)],
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    setExplosions(prev => [...prev, { id, left, particles }]);
    setTimeout(() => {
      setExplosions(prev => prev.filter(e => e.id !== id));
    }, 2500);
  };

  // Spawn items
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === 'playing') {
      let idCounter = 0;
      timer = setInterval(() => {
        const rand = Math.random();
        const cuteEmotes = ['🥰', '🥺', '🤣', '😻', '🤩', '🫣', '🤪', '😸', '✨', '💖'];
        let type = cuteEmotes[Math.floor(Math.random() * cuteEmotes.length)];
        if (rand > 0.75) type = '💣';

        setItems((prev) => [
          ...prev,
          {
            id: idCounter++,
            type,
            left: Math.random() * 80 + 10, // 10% to 90%
          },
        ]);
      }, 600);
    }
    return () => clearInterval(timer);
  }, [status]);

  const startGame = () => {
    setStatus('playing');
    setProgress(15);
  };

  const handleTapItem = (id: number, type: string) => {
    if (status !== 'playing') return;
    setItems((prev) => prev.filter((item) => item.id !== id));
    setProgress((prev) => {
      let next = prev;
      if (type === '💣') next -= 20;
      else next += 12; 

      if (next >= 100) {
        setStatus('won');
        setItems([]);
        return 100;
      }
      if (next <= 0) {
        setStatus('cracked');
        setTimeout(() => {
          setStatus('idle');
          setProgress(0);
          setItems([]);
        }, 2500);
        return 0;
      }
      return next;
    });
  };

  const handleAnimationComplete = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center my-16 px-4">
      {/* Trumpet Decorations Outside */}
      <button onClick={() => triggerTrumpet(true)} className="absolute left-[-20px] md:left-4 top-1/2 -translate-y-1/2 text-7xl md:text-[6rem] z-30 hover:scale-110 transition-transform active:scale-95 drop-shadow-xl p-4">🎉</button>
      <button onClick={() => triggerTrumpet(false)} className="absolute right-[-20px] md:right-4 top-1/2 -translate-y-1/2 text-7xl md:text-[6rem] z-30 hover:scale-110 transition-transform active:scale-95 drop-shadow-xl p-4" style={{ transform: 'translateY(-50%) scaleX(-1)' }}>🎉</button>
      
      {explosions.map(exp => (
        <div key={exp.id} className={`absolute top-1/2 -translate-y-1/2 z-20 pointer-events-none ${exp.left ? 'left-10 md:left-32' : 'right-10 md:right-32'}`}>
           {exp.particles.map(p => {
              // Menembakkan confetti ke arah atas luar
              const baseAngle = exp.left ? -Math.PI / 4 : (Math.PI * 5) / 4;
              const angleSpread = Math.PI / 2; // sebaran 90 derajat
              const angle = baseAngle + (Math.random() - 0.5) * angleSpread;
              const velocity = Math.random() * 150 + 100;
              
              let shapeClass = `w-3 h-3 ${p.color}`;
              if (p.type === 'circle') shapeClass += ' rounded-full';
              else if (p.type === 'sliver') shapeClass = `w-1 h-4 ${p.color}`;

              return (
                 <motion.div
                    key={p.id}
                    className={`absolute shadow-sm ${p.type === 'heart' ? 'text-lg text-pink-500 drop-shadow-md bg-transparent' : shapeClass}`}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
                    animate={{
                       x: `${Math.cos(angle) * velocity}px`,
                       y: `${Math.sin(angle) * velocity + 50}px`,
                       opacity: [1, 1, 0],
                       scale: [0, Math.random() * 0.8 + 0.6, 0.4],
                       rotate: Math.random() * 720
                    }}
                    transition={{ duration: 1.5 + Math.random(), ease: "easeOut" }}
                 >
                    {p.type === 'heart' ? '❤️' : ''}
                 </motion.div>
              );
           })}
        </div>
      ))}

      <div className="w-full max-w-md bg-white/60 backdrop-blur-md rounded-[3rem] p-6 shadow-xl border-4 border-pink-200 flex flex-col items-center gap-6 relative overflow-hidden h-[450px]">
        <h3 className="text-3xl z-10 font-bold text-pink-600 text-center drop-shadow-sm mt-2" style={{ fontFamily: "'Dancing Script', cursive" }}>
          Tangkap emot jangan bom
        </h3>
        <p className="text-xs text-pink-500 font-bold -mt-4 z-10 opacity-70">Hanya berkurang saat kena bom!</p>

        {/* Game Area Boundary */}
        <div className="absolute inset-0 top-20 bottom-0 w-full overflow-hidden">
          {status === 'playing' &&
            items.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => handleTapItem(item.id, item.type)}
                className="absolute text-5xl md:text-6xl cursor-pointer drop-shadow-md select-none z-20 hover:scale-110 active:scale-90 p-4"
                style={{ top: 0, left: `${item.left}%`, WebkitTapHighlightColor: 'transparent' }}
                initial={{ y: -100, rotate: -30 }}
                animate={{ y: 600, rotate: 30 }}
                transition={{ duration: 4.8, ease: 'linear' }}
                onAnimationComplete={() => handleAnimationComplete(item.id)}
              >
                {item.type}
              </motion.button>
            ))}
        </div>

        {/* Pre-Game State */}
        {status === 'idle' && (
          <motion.button
            onClick={startGame}
            className="z-30 m-auto px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-full font-bold shadow-lg shadow-pink-300 animate-bounce cursor-pointer active:scale-95"
          >
            Mulai Main!
          </motion.button>
        )}

        {/* Post-Game States */}
        {(status === 'cracked' || status === 'won') && (
          <div className="absolute inset-0 z-30 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center">
            {status === 'won' ? (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1.2 }} className="text-8xl drop-shadow-xl">
                💕
              </motion.div>
            ) : (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: [0, -10, 10, 0] }} className="text-8xl drop-shadow-lg">
                💔
              </motion.div>
            )}
            <p className="font-bold text-pink-600 mt-6 text-xl tracking-wide max-w-[80%] text-center leading-snug">
              {status === 'won' ? 'Cinta Penuh! Luar Biasa!' : 'Yah hatinya bocor... Fokus lagi!'}
            </p>
            {status === 'won' && (
              <button
                onClick={() => {
                  setStatus('idle');
                  setProgress(0);
                }}
                className="mt-8 px-6 py-3 bg-pink-500 text-white rounded-full shadow-md font-bold hover:bg-pink-600 shadow-pink-300 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                Main Lagi
              </button>
            )}
          </div>
        )}

        {/* Visualizer: Two Hearts Fill System */}
        {status !== 'won' && status !== 'cracked' && status !== 'idle' && (
          <div className="z-10 mt-auto mb-2 relative flex items-center justify-center flex-col">
            <div className="flex gap-4 text-pink-200">
              <Heart size={72} strokeWidth={2.5} />
              <Heart size={72} strokeWidth={2.5} />
            </div>
            <div
              className="absolute top-0 flex gap-4 text-pink-500 drop-shadow-md"
              style={{ clipPath: `inset(calc(100% - ${progress}%) 0 0 0)`, transition: 'clip-path 0.3s ease-out' }}
            >
              <Heart size={72} strokeWidth={2.5} fill="currentColor" />
              <Heart size={72} strokeWidth={2.5} fill="currentColor" />
            </div>
            <div className="mt-2 font-bold text-sm text-pink-400 bg-white/40 px-3 py-1 rounded-full shadow-sm">{Math.floor(progress)}%</div>
          </div>
        )}
      </div>
    </div>
  );
};

const SpecialMessages = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [inputVal, setInputVal] = useState('');
  const [sentMessages, setSentMessages] = useState<{ id: number, type: string, icon: string, text: string, time: string }[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('user_secret_messages');
    if (saved) {
      try {
        setSentMessages(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const mailboxes = [
    {
      id: 0,
      type: 'Sad',
      icon: '💙',
      bg: 'bg-blue-50 border-blue-200 text-blue-900',
      headerBg: 'bg-blue-100/50',
      placeholder: 'kalo lagi sedih boleh cerita nih sini...',
      btnBg: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      id: 1,
      type: 'Happy',
      icon: '💚',
      bg: 'bg-green-50 border-green-200 text-green-900',
      headerBg: 'bg-green-100/50',
      placeholder: 'Tulis hal bahagia apa aja deh...',
      btnBg: 'bg-green-500 hover:bg-green-600',
    },
    {
      id: 2,
      type: 'Netral',
      icon: '🩷',
      bg: 'bg-pink-50 border-pink-200 text-pink-900',
      headerBg: 'bg-pink-100/50',
      placeholder: 'Ada cerita apa hari ini? Tulis aja di sini...',
      btnBg: 'bg-pink-500 hover:bg-pink-600',
    }
  ];

  const [isSending, setIsSending] = useState(false);

  const handleSend = async (box: any) => {
    if (!inputVal.trim() || isSending) return;
    
    setIsSending(true);
    const timeString = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute:'2-digit' }) + ' - ' + new Date().toLocaleDateString('id-ID');

    try {
      await fetch("https://formsubmit.co/ajax/ak123k09@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            _subject: `💌 Surat Rahasia Baru: ${box.type}`,
            _template: "table",
            "Kategori Surat": box.type,
            "Pesan dari Dia": inputVal,
            "Waktu Dikirim": timeString
        })
      });

      const newMsg = {
        id: Date.now(),
        type: box.type,
        icon: box.icon,
        text: inputVal,
        time: timeString
      };
      
      const updated = [newMsg, ...sentMessages];
      setSentMessages(updated);
      localStorage.setItem('user_secret_messages', JSON.stringify(updated));
      setInputVal('');
      setOpenIndex(null);
    } catch (error) {
      console.error("Gagal mengirim:", error);
      alert("Oops, pesannya tersangkut. Coba lagi ya!");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 pb-32 pt-16 relative z-10">
      <div className="text-center mb-12">
        <h3 className="text-5xl font-bold text-pink-600 drop-shadow-sm mb-4" style={{ fontFamily: "'Dancing Script', cursive", textShadow: "2px 2px 4px rgba(255,192,203,0.6)" }}>
          Kotak Surat Rahasia 💌
        </h3>
        <p className="text-pink-500 font-medium opacity-80 max-w-xl mx-auto">
          Pesan khusus orang penting woik 😎
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mailboxes.map((box, idx) => (
          <motion.div
            key={box.id}
            layout
            onClick={() => {
               if(openIndex !== idx) {
                  setOpenIndex(idx);
                  setInputVal('');
               }
            }}
            className={`rounded-3xl border-2 shadow-md overflow-hidden cursor-pointer transition-all hover:shadow-lg flex flex-col ${box.bg}`}
            whileHover={openIndex !== idx ? { y: -5 } : {}}
            whileTap={{ scale: 0.98, y: 2 }}
          >
            <div className={`p-6 flex items-center justify-between ${box.headerBg}`}>
              <div className="flex items-center gap-3">
                <span className="text-3xl drop-shadow-sm">{box.icon}</span>
                <span className="font-bold text-xl">{box.type}</span>
              </div>
              <motion.div
                animate={{ rotate: openIndex === idx ? 180 : 0 }}
                className="opacity-50 text-xl font-bold"
              >
                ▼
              </motion.div>
            </div>
            
            <motion.div
              initial={false}
              animate={{ height: openIndex === idx ? 'auto' : 0, opacity: openIndex === idx ? 1 : 0 }}
              className="overflow-hidden"
            >
              <div className="p-5 pt-4 border-t border-black/5 bg-white/40" onClick={e => e.stopPropagation()}>
                <textarea 
                  className="w-full h-32 p-4 text-sm rounded-2xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white/80 resize-none font-medium leading-relaxed shadow-inner"
                  placeholder={box.placeholder}
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                />
                <button
                  disabled={isSending}
                  onClick={() => handleSend(box)}
                  className={`mt-4 w-full py-3 rounded-xl font-bold text-white shadow-md transition-transform hover:scale-105 active:scale-95 ${box.btnBg} ${isSending ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSending ? 'Mengirim...' : `Kirim Surat ${box.icon}`}
                </button>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {sentMessages.length > 0 && (
         <div className="mt-16">
            <h4 className="text-4xl font-bold text-pink-600 text-center mb-8 drop-shadow-sm" style={{ fontFamily: "'Dancing Script', cursive" }}>Riwayat Pesanmu</h4>
            <div className="flex flex-col gap-4 max-w-2xl mx-auto">
               {sentMessages.map((msg) => (
                  <motion.div 
                     key={msg.id}
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-md border border-pink-100 flex gap-4 items-start relative overflow-hidden"
                  >
                     <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-pink-100 to-transparent opacity-50 rounded-bl-3xl"></div>
                     <div className="text-4xl drop-shadow-sm">{msg.icon}</div>
                     <div className="flex-1 min-w-0 z-10">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2 gap-1 border-b border-gray-100 pb-2">
                           <h5 className="font-bold text-slate-800 text-lg">{msg.type} Message</h5>
                           <span className="text-xs text-slate-400 font-semibold">{msg.time}</span>
                        </div>
                        <p className="text-slate-600 font-medium whitespace-pre-wrap text-[15px] leading-relaxed italic">"{msg.text}"</p>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      )}
    </div>
  );
};

const handleDownload = async (src: string) => {
  try {
    const response = await fetch(src);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `foto-untuk-adibah-${Date.now()}.jpeg`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch(e) { console.log(e); }
};

const MainScreen = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [scene, setScene] = useState(0);
  const [draggingSrc, setDraggingSrc] = useState<string|null>(null);
  const [downloadPromptSrc, setDownloadPromptSrc] = useState<string|null>(null);

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

  const shapes = [
    { container: "rounded-3xl border-4 border-pink-200", img: "rounded-2xl" }, 
    { container: "rounded-full aspect-square border-8 border-white", img: "rounded-full aspect-square" }, 
    { container: "rounded-tr-[50%] rounded-bl-[50%] rounded-tl-xl rounded-br-xl border-4 border-pink-300 bg-white p-2", img: "rounded-tr-[50%] rounded-bl-[50%] rounded-tl-lg rounded-br-lg" }, 
    { container: "rounded-t-full rounded-b-2xl border-[6px] border-white aspect-[3/4]", img: "rounded-t-full rounded-b-[14px] w-full h-full" }, 
    { container: "rounded-[3rem] border-[10px] border-pink-100 bg-white p-2", img: "rounded-[2.5rem]" }, 
  ];

  return (
    <div className={`text-pink-900 font-sans relative overflow-x-hidden min-h-screen transition-colors duration-1000 ${scene > 0 ? '' : 'h-screen overflow-hidden'}`}>
      <AuroraBackground />
      <RomanticDecorations />
      <FloatingHearts />

      <AnimatePresence>
        {downloadPromptSrc && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setDownloadPromptSrc(null)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 50 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/90 backdrop-blur-md p-6 rounded-[2rem] shadow-2xl border-4 border-pink-200 max-w-sm w-full text-center flex flex-col items-center gap-4"
            >
              <img src={downloadPromptSrc} className="w-48 h-48 object-cover rounded-2xl shadow-inner mb-2" />
              <h3 className="text-2xl font-bold text-pink-600">Simpan Foto Ini?</h3>
              <p className="text-sm text-pink-500 font-medium">Bawa pulang kenangan manis ini ke perangkatmu?</p>
              <div className="flex gap-4 mt-2 w-full">
                 <button onClick={() => { handleDownload(downloadPromptSrc); setDownloadPromptSrc(null); }} className="flex-1 py-3 bg-pink-500 text-white rounded-xl font-bold shadow-md hover:bg-pink-600 active:scale-95 transition-all">Download</button>
                 <button onClick={() => setDownloadPromptSrc(null)} className="flex-1 py-3 bg-white text-pink-500 border border-pink-200 rounded-xl font-bold shadow-sm hover:bg-pink-50 active:scale-95 transition-all">Batal</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <audio 
        ref={audioRef} 
        src="/music/videoplayback.m4a" 
        loop 
        onTimeUpdate={handleTimeUpdate} 
      />

      <button
        onClick={toggleAudio}
        className="fixed bottom-6 right-6 bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-full shadow-xl z-50 transition-all hover:scale-110 active:scale-90"
        title={isPlaying ? "Jeda Lagu" : "Putar Lagu"}
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </button>

      <div className={`fixed inset-0 z-40 transition-opacity duration-1000 ease-in-out pointer-events-none ${scene === 0 ? 'opacity-100' : 'opacity-0'}`}>
        {scene === 0 && <LoveExplosion />}
      </div>

      <div className={`relative z-10 transition-opacity duration-1000 ${scene > 0 ? 'opacity-100' : 'opacity-0'}`}>
        
        <div className="min-h-[90vh] flex flex-col items-center justify-center pt-20 px-4 relative z-20">
          
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
                  animate={
                    draggingSrc === src 
                    ? { rotate: [-2, 2, -2], zIndex: 50, scale: 1.1 } 
                    : { opacity: 1, scale: 1, y: 0, rotate: index % 2 === 0 ? 3 : -3, zIndex: 1 }
                  }
                  transition={
                    draggingSrc === src 
                    ? { repeat: Infinity, duration: 2, ease: "easeInOut" } 
                    : { duration: 0.8, delay: index * 0.2, type: "spring" }
                  }
                  whileHover={draggingSrc === src ? {} : { scale: 1.05 }}
                  whileTap={draggingSrc === src ? {} : { scale: 0.95, y: 5, rotate: 0 }}
                  onDoubleClick={() => setDownloadPromptSrc(src)}
                  className={`relative overflow-hidden shadow-xl w-48 h-56 md:w-64 md:h-80 cursor-grab active:cursor-grabbing ${style.container}`}
                  drag
                  dragSnapToOrigin
                  onDrag={(event: any) => {
                    let clientY = event.clientY;
                    if (clientY === undefined && event.touches && event.touches.length > 0) {
                      clientY = event.touches[0].clientY;
                    }
                    if (clientY !== undefined) {
                      const edgeThreshold = 100;
                      if (clientY < edgeThreshold) {
                        window.scrollBy({ top: -15 });
                      } else if (window.innerHeight - clientY < edgeThreshold) {
                        window.scrollBy({ top: 15 });
                      }
                    }
                  }}
                  onDragStart={() => {
                    setDraggingSrc(src);
                  }}
                  onDragEnd={(event, info) => {
                    setDraggingSrc(null);
                    const dropEvent = new CustomEvent('custom-photo-drop', { detail: { src, x: info.point.x, y: info.point.y } });
                    window.dispatchEvent(dropEvent);
                  }}
                >
                  <img
                    src={src}
                    alt={`Varied Top ${index}`}
                    draggable={false}
                    className={`w-full h-full object-cover pointer-events-none ${style.img}`}
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-pink-500/20 mix-blend-overlay pointer-events-none"></div>
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className="h-[60vh] flex items-center justify-center opacity-50 flex-col gap-4 text-pink-500 pointer-events-none">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="font-bold tracking-widest text-lg"
          >
            Geser Ke Bawah
          </motion.div>
          <div className="w-[2px] h-32 bg-gradient-to-b from-pink-400 to-transparent"></div>
        </div>

        <div className="text-center px-4 mb-24 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-bold text-pink-600 drop-shadow-lg mx-auto max-w-5xl leading-tight" 
            style={{ fontFamily: "'Dancing Script', cursive", textShadow: "3px 3px 8px rgba(255,192,203,0.9)" }}
          >
            Hal terindah yang pernah kutemukan
          </motion.h2>
        </div>

        <FavoritePhotos />

        <div className="max-w-6xl mx-auto px-4 pb-32 relative z-10">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
            {bottomPhotos.map((src, index) => {
              const style = shapes[index % shapes.length];
              return (
                <motion.div
                  key={`bottom-${src}`}
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  whileInView={draggingSrc === src ? undefined : { opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  animate={
                    draggingSrc === src 
                    ? { rotate: [-2, 2, -2], zIndex: 50, scale: 1.1 } 
                    : { rotate: index % 2 === 0 ? 2 : -2, zIndex: 1 }
                  }
                  transition={
                    draggingSrc === src 
                    ? { repeat: Infinity, duration: 2, ease: "easeInOut" } 
                    : { duration: 0.8, type: "spring" }
                  }
                  whileHover={draggingSrc === src ? {} : { scale: 1.05 }}
                  whileTap={draggingSrc === src ? {} : { scale: 0.95, y: 5, rotate: 0 }}
                  onDoubleClick={() => setDownloadPromptSrc(src)}
                  className={`break-inside-avoid relative overflow-hidden shadow-xl cursor-grab active:cursor-grabbing ${style.container}`}
                  drag
                  dragSnapToOrigin
                  onDrag={(event: any) => {
                    let clientY = event.clientY;
                    if (clientY === undefined && event.touches && event.touches.length > 0) {
                      clientY = event.touches[0].clientY;
                    }
                    if (clientY !== undefined) {
                      const edgeThreshold = 100;
                      if (clientY < edgeThreshold) {
                        window.scrollBy({ top: -15 });
                      } else if (window.innerHeight - clientY < edgeThreshold) {
                        window.scrollBy({ top: 15 });
                      }
                    }
                  }}
                  onDragStart={() => {
                    setDraggingSrc(src);
                  }}
                  onDragEnd={(event, info) => {
                    setDraggingSrc(null);
                    const dropEvent = new CustomEvent('custom-photo-drop', { detail: { src, x: info.point.x, y: info.point.y } });
                    window.dispatchEvent(dropEvent);
                  }}
                >
                  <img
                    src={src}
                    alt={`Varied ${index}`}
                    draggable={false}
                    className={`w-full h-full object-cover pointer-events-none ${style.img}`}
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-pink-500/20 mix-blend-overlay pointer-events-none"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
        
        <NailongTapGame />
        
        <SpecialMessages />
        
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
