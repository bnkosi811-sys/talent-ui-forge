import React, { useState } from 'react';
import { Search, Filter, TrendingUp, Star, MapPin, Zap, ChevronRight } from 'lucide-react';
import { MOCK_TALENTS } from '../../data/mock';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { motion } from 'framer-motion';

export const Discover: React.FC<{ onSelectTalent: (id: string) => void }> = ({ onSelectTalent }) => {
  const categories = ['Acting', 'Music', 'Dance', 'Comedy', 'Voice', 'Art'];
  
  return (
    <div className="flex-1 bg-black overflow-y-auto pb-32">
      <div className="p-6 space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl font-black italic">DISCOVER</h2>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <Input placeholder="Search skills, names..." className="h-12 pl-12 bg-white/5 border-white/10 rounded-2xl focus-visible:ring-[#00F5FF]" />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Categories Scroller */}
        <div className="flex gap-3 overflow-x-auto pb-2 scroll-hide">
          {categories.map(cat => (
            <Badge key={cat} className="whitespace-nowrap py-2 px-6 rounded-full border border-white/10 bg-white/5 text-white/80 hover:bg-[#00F5FF]/10 hover:border-[#00F5FF] cursor-pointer font-bold uppercase text-[10px]">
              {cat}
            </Badge>
          ))}
        </div>

        {/* Trending Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp size={20} className="text-[#FF00E5]" />
              <h3 className="text-lg font-bold">Trending Talent</h3>
            </div>
            <button className="text-xs font-bold text-white/40 uppercase">View All</button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {MOCK_TALENTS.map((talent, idx) => (
              <motion.div 
                key={talent.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => onSelectTalent(talent.id)}
                className="group relative aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer border border-white/10 shadow-xl"
              >
                <img src={talent.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={talent.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-xs font-black uppercase text-[#00F5FF]">{talent.category}</span>
                  </div>
                  <h4 className="font-black text-sm truncate">{talent.name}</h4>
                  <div className="flex items-center gap-1 text-[10px] text-white/40">
                    <MapPin size={10} className="text-[#FF00E5]" />
                    <span>{talent.location}</span>
                  </div>
                </div>
                {talent.verified && (
                  <div className="absolute top-4 right-4 p-1.5 bg-black/40 backdrop-blur-md rounded-full">
                    <Zap size={12} className="text-[#00F5FF]" fill="#00F5FF" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* New Talent Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star size={20} className="text-[#00F5FF]" />
              <h3 className="text-lg font-bold">Rising Stars</h3>
            </div>
          </div>
          <div className="space-y-3">
            {MOCK_TALENTS.map(talent => (
              <div 
                key={talent.id} 
                onClick={() => onSelectTalent(talent.id)}
                className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-3xl hover:bg-white/10 transition-all cursor-pointer group"
              >
                <Avatar className="w-14 h-14 border-2 border-transparent group-hover:border-[#00F5FF]/50 transition-all">
                  <AvatarImage src={talent.image} />
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-bold">{talent.name}</h4>
                  <p className="text-[10px] text-[#00F5FF] font-black uppercase tracking-widest">{talent.category}</p>
                </div>
                <ChevronRight size={18} className="text-white/20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};