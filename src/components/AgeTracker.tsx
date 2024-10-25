import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Info } from 'lucide-react';
import { differenceInYears, differenceInMonths, differenceInDays } from 'date-fns';

type AgeTrackerProps = {
  birthDate: Date;
};

type AgeMethod = 'western' | 'eastAsian';

export const AgeTracker = ({ birthDate }: AgeTrackerProps) => {
  const [method, setMethod] = useState<AgeMethod>('western');
  const [showInfo, setShowInfo] = useState(false);
  const [age, setAge] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const updateAge = () => {
      const now = new Date();
      const years = differenceInYears(now, birthDate);
      const months = differenceInMonths(now, birthDate) % 12;
      const days = differenceInDays(now, birthDate) % 30;
      const timeDiff = now.getTime() - birthDate.getTime();
      
      setAge({
        years: method === 'western' ? years : years + 1,
        months,
        days,
        hours: Math.floor((timeDiff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((timeDiff / (1000 * 60)) % 60),
        seconds: Math.floor((timeDiff / 1000) % 60)
      });
    };

    const timer = setInterval(updateAge, 1000);
    updateAge();
    return () => clearInterval(timer);
  }, [birthDate, method]);

  return (
    <motion.div
      className="bg-purple-900/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-xl p-6 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-300" />
          <h2 className="text-xl font-semibold text-white">Age Tracker</h2>
        </div>
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="p-2 hover:bg-purple-500/20 rounded-full transition-colors"
        >
          <Info className="w-5 h-5 text-purple-300" />
        </button>
      </div>

      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 text-sm text-purple-200 dark:text-gray-300"
          >
            <p className="mb-2">
              <strong>Western Age:</strong> Calculated from birth date, starting at 0
            </p>
            <p>
              <strong>East Asian Age:</strong> Counts 1 at birth and adds a year on New Year
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-4 mb-6">
        {(['western', 'eastAsian'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMethod(m)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              method === m
                ? 'bg-purple-500/30 text-white'
                : 'text-purple-300 hover:bg-purple-500/20'
            }`}
          >
            {m === 'western' ? 'Western Age' : 'East Asian Age'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <motion.div
          className="col-span-2 md:col-span-3 bg-purple-500/20 p-4 rounded-lg text-center"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-3xl font-bold text-white">{age.years}</span>
          <span className="text-purple-200 ml-2">years old</span>
        </motion.div>

        {Object.entries(age)
          .filter(([key]) => key !== 'years')
          .map(([unit, value]) => (
            <div
              key={unit}
              className="bg-purple-500/10 p-4 rounded-lg text-center"
            >
              <div className="text-2xl font-semibold text-white">{value}</div>
              <div className="text-sm text-purple-200 capitalize">{unit}</div>
            </div>
          ))}
      </div>
    </motion.div>
  );
};