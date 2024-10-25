import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Star, MoonStar } from 'lucide-react';
import { ZodiacWheel } from './components/ZodiacWheel';
import { BirthdayCountdown } from './components/BirthdayCountdown';
import { ZodiacCard3D } from './components/ZodiacCard3D';
import { AgeTracker } from './components/AgeTracker';
import { ThemeToggle } from './components/ThemeToggle';
import { getZodiacSign, calculateNextBirthday } from './utils/zodiacData';
import type { UserBirthday } from './types/zodiac';

function App() {
  const [birthday, setBirthday] = useState<UserBirthday | null>(null);
  const [showForm, setShowForm] = useState(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const day = parseInt(formData.get('day') as string);
    const month = parseInt(formData.get('month') as string);
    const year = parseInt(formData.get('year') as string);
    
    setBirthday({ day, month, year });
    setShowForm(false);
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white transition-colors duration-300 relative overflow-hidden"
    >
      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{
              x: Math.random() * 100 + 'vw',
              y: Math.random() * 100 + 'vh',
              scale: Math.random() * 0.5 + 0.5,
              opacity: Math.random() * 0.5 + 0.3,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <ThemeToggle />
      
      {showForm ? (
        <motion.div 
          className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div className="relative mb-8 flex flex-col items-center">
            <MoonStar className="text-yellow-300 w-12 h-12 mb-4 animate-pulse" />
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-center"
              animate={{
                textShadow: [
                  "0 0 8px rgba(167, 139, 250, 0.5)",
                  "0 0 16px rgba(167, 139, 250, 0.7)",
                  "0 0 8px rgba(167, 139, 250, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                Birthday Astrology
              </span>
            </motion.h1>
          </div>
          
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 bg-white/5 backdrop-blur-lg p-8 rounded-xl border border-purple-500/20">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="month" className="block text-sm font-medium mb-2 text-purple-200">Month</label>
                <input
                  required
                  type="number"
                  name="month"
                  min="1"
                  max="12"
                  className="w-full px-4 py-2 bg-purple-900/50 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none text-white placeholder-purple-300"
                  placeholder="MM"
                />
              </div>
              <div>
                <label htmlFor="day" className="block text-sm font-medium mb-2 text-purple-200">Day</label>
                <input
                  required
                  type="number"
                  name="day"
                  min="1"
                  max="31"
                  className="w-full px-4 py-2 bg-purple-900/50 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none text-white placeholder-purple-300"
                  placeholder="DD"
                />
              </div>
              <div>
                <label htmlFor="year" className="block text-sm font-medium mb-2 text-purple-200">Year</label>
                <input
                  required
                  type="number"
                  name="year"
                  min="1900"
                  max={new Date().getFullYear()}
                  className="w-full px-4 py-2 bg-purple-900/50 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none text-white placeholder-purple-300"
                  placeholder="YYYY"
                />
              </div>
            </div>
            
            <motion.button
              type="submit"
              className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium 
                       hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center gap-2
                       shadow-lg shadow-purple-500/20"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Calendar className="w-5 h-5" />
              Discover Your Cosmic Journey
            </motion.button>
          </form>
        </motion.div>
      ) : birthday ? (
        <div className="container mx-auto px-4 py-16 space-y-12">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-2">
              <Sparkles className="text-yellow-300" />
              Your Cosmic Profile
              <Sparkles className="text-yellow-300" />
            </h1>
            <BirthdayCountdown targetDate={calculateNextBirthday(birthday.month, birthday.day)} />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex justify-center items-center">
              <ZodiacWheel />
            </div>
            <div className="space-y-8">
              <ZodiacCard3D sign={getZodiacSign(birthday.month, birthday.day)} />
              <AgeTracker 
                birthDate={new Date(birthday.year, birthday.month - 1, birthday.day)} 
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;