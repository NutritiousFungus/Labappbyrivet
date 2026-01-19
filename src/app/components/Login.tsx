import { useState, useEffect } from 'react';
import { Mail, Lock, User, Building, AlertCircle } from 'lucide-react';
import { HEARTHSTONE_GRADIENT } from '@/app/constants/theme';
import { motion, AnimatePresence } from 'motion/react';
import logoImage from 'figma:asset/70a773257adca7df2225bb5f63c4e668abae4133.png';

interface LoginProps {
  onLogin: () => void;
}

const quotes = [
  {
    text: "The nation that destroys its soil destroys itself.",
    attribution: "Franklin D. Roosevelt"
  },
  {
    text: "Where tillage begins, other arts follow. The farmers therefore are the founders of human civilization.",
    attribution: "Daniel Webster"
  },
  {
    text: "Farmers who wait for perfect weather never plant. If they watch every cloud, they never harvest.",
    attribution: "Ecclesiastes 11:4"
  },
  {
    text: "A man reaps what he sows.",
    attribution: "Galatians 6:7"
  },
  {
    text: "To everything there is a season... a time to plant and a time to uproot.",
    attribution: "Ecclesiastes 3:1-2"
  },
  {
    text: "Where there is no vision, there is no hope.",
    attribution: "George Washington Carver"
  },
  {
    text: "If you cannot measure it, you cannot improve it.",
    attribution: "Lord Kelvin"
  },
  {
    text: "Fortune favors the prepared mind.",
    attribution: "Louis Pasteur"
  },
  {
    text: "Be sure you know the condition of your flocks, give careful attention to your herds.",
    attribution: "Proverbs 27:23"
  }
];

export function Login({ onLogin }: LoginProps) {
  const [randomQuote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);
  
  // Recognized user info
  const recognizedUser = {
    name: 'Austin Russell',
    email: 'austin_russell@rockriverlab.com',
    initials: 'AR'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-400 via-stone-300 to-slate-500 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Hearthstone-style overlay for metallic effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,.15) 0%, transparent 50%, rgba(0,0,0,.15) 100%)',
        }}
      />
      
      {/* Subtle animated gradient accents */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-700/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-700/20 to-transparent rounded-full blur-3xl" />
      </div>
      
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative z-10"
        style={{
          boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 2px 0 rgba(255,255,255,0.5)'
        }}
      >
        {/* Header */}
        <div 
          className="bg-[#1e3a5f] text-white p-6 text-center relative overflow-hidden"
          style={HEARTHSTONE_GRADIENT}
        >
          {/* Main logo display - even larger and perfectly centered */}
          <div className="relative h-32 mb-8 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={0}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1]
                }}
                className="flex items-center justify-center"
              >
                <img 
                  src={logoImage}
                  alt="Laboratory Logo"
                  className="w-96 h-auto max-h-full object-contain"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Welcome Back Section */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* User Profile */}
          <div className="text-center space-y-4">
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex justify-center"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-white">{recognizedUser.initials}</span>
              </div>
            </motion.div>

            {/* Greeting */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold text-gray-800">
                Welcome back, {recognizedUser.name.split(' ')[0]}!
              </h2>
              <p className="text-sm text-gray-500 mt-1">{recognizedUser.email}</p>
            </motion.div>
          </div>

          {/* Sign In Button */}
          <motion.button
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            type="submit"
            className="w-full bg-[#F7DC6F] hover:bg-[#F4D03F] text-gray-900 py-3.5 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl text-lg"
          >
            Sign In
          </motion.button>

          {/* Not You Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="text-center"
          >
            <button
              type="button"
              className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Not you? <span className="text-blue-600 font-medium hover:text-blue-700">Sign in with a different account</span>
            </button>
          </motion.div>
        </form>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 text-center text-xs text-gray-500 border-t border-gray-200">
          <div className="group cursor-default">
            <p className="italic text-gray-400 text-sm">
              "{randomQuote.text}"
            </p>
            <p className="text-[10px] text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              - {randomQuote.attribution}
            </p>
          </div>
          
          {/* Legacy Website Link - Subtle and unobtrusive */}
          <div className="mt-3 pt-3 border-t border-gray-200">
            <a 
              href="https://rockriverlab.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[10px] text-gray-400 hover:text-gray-600 transition-colors underline decoration-dotted"
            >
              Access Legacy Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}