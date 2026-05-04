import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Send, ArrowRight } from 'lucide-react';
import { MOCK_COLLABS } from '../../data/mock';
import { NeonButton } from '../ui/NeonButton';

export const TalentMatch: React.FC = () => {
  return (
    <div className="p-6 space-y-8 pb-32">
      <div className="space-y-2">
        <h2 className="text-3xl font-black italic tracking-tighter text-white">
          TALENT<span className="text-[#FF00E5]">MATCH</span>
        </h2>
        <p className="text-white/60 text-sm">Find collaborators for your next big project.</p>
      </div>

      <div className="space-y-6">
        {MOCK_COLLABS.map((collab, index) => (
          <motion.div
            key={collab.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-[#FF00E5]/50 transition-all shadow-xl"
          >
            <div className="aspect-[16/9] w-full relative overflow-hidden">
              <img src={collab.image} alt={collab.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  <MapPin size={12} className="text-[#FF00E5]" />
                  <span className="text-[10px] font-bold text-white uppercase">{collab.location}</span>
                </div>
                <div className="flex items-center gap-2 bg-[#FF00E5] px-3 py-1.5 rounded-full shadow-lg">
                  <Users size={12} className="text-white" />
                  <span className="text-[10px] font-bold text-white uppercase">{collab.skillNeeded}</span>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">{collab.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{collab.description}</p>
              </div>
              <div className="flex gap-3 pt-2">
                <NeonButton variant="primary" className="flex-1 py-4 rounded-xl text-xs">
                  Apply Now <ArrowRight size={14} className="ml-1" />
                </NeonButton>
                <button className="p-4 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-colors">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};