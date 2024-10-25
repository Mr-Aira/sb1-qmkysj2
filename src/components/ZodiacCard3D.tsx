import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Sparkles, Flower } from 'lucide-react';
import type { ZodiacSign } from '../types/zodiac';
import { CelebrationEffects } from './CelebrationEffects';

type ZodiacCard3DProps = {
  sign: ZodiacSign;
};

export const ZodiacCard3D = ({ sign }: ZodiacCard3DProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  return (
    <div className="relative perspective-1000">
      {showCelebration && <CelebrationEffects />}
      
      <motion.div
        className="relative w-full h-full preserve-3d cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        onClick={handleFlip}
      >
        {/* Front of card */}
        <motion.div
          className={`absolute w-full backface-hidden ${
            isFlipped ? 'hidden' : 'block'
          } bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur-lg rounded-xl p-6 shadow-xl`}
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <motion.span 
              className="text-5xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              {sign.symbol}
            </motion.span>
            <div>
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                {sign.name}
              </h2>
              <p className="text-purple-200">{sign.date}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-300" />
              <span className="text-lg text-purple-200">{sign.element} Element</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {sign.traits.map((trait) => (
                <motion.span
                  key={trait}
                  className="px-3 py-1 bg-purple-500/20 rounded-full text-sm"
                  whileHover={{ scale: 1.1 }}
                >
                  {trait}
                </motion.span>
              ))}
            </div>
          </div>

          <motion.div
            className="absolute bottom-4 right-4 text-purple-300/50"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-6 h-6" />
          </motion.div>
        </motion.div>

        {/* Back of card */}
        <motion.div
          className={`absolute w-full backface-hidden ${
            isFlipped ? 'block' : 'hidden'
          } bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-lg rounded-xl p-6 shadow-xl`}
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <Flower className="w-5 h-5 text-pink-400" />
                Birth Flower
              </h3>
              <div className="flex items-center gap-4">
                <img
                  src={sign.birthFlower.image}
                  alt={sign.birthFlower.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <p className="font-medium text-purple-200">{sign.birthFlower.name}</p>
                  <p className="text-sm text-purple-300">{sign.birthFlower.description}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-300" />
                Birthstone
              </h3>
              <div className="flex items-center gap-4">
                <img
                  src={sign.birthstone.image}
                  alt={sign.birthstone.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <p className="font-medium text-purple-200">{sign.birthstone.name}</p>
                  <p className="text-sm text-purple-300">{sign.birthstone.description}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Lucky Numbers</h3>
            <div className="flex gap-2">
              {sign.luckyNumbers.map((number) => (
                <motion.span
                  key={number}
                  className="w-8 h-8 flex items-center justify-center bg-purple-500/20 rounded-full"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                >
                  {number}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};