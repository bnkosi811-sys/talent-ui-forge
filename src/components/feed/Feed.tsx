import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, Bookmark, Music2, MapPin, MoreVertical, ShieldCheck, Zap } from 'lucide-react';
import { MOCK_TALENTS } from '../../data/mock';
import { NeonButton } from '../ui/NeonButton';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export const Feed: React.FC<{ onBook: (talentId: string) => void; onConnect: (talentId: string) => void }> = ({ onBook, onConnect }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const index = Math.round(containerRef.current.scrollTop / containerRef.current.clientHeight);
    setActiveIndex(index);
  };

  return (
    <div 
      ref={containerRef}
      onScroll={handleScroll}
      className="h-[calc(100vh-64px)] w-full overflow-y-scroll snap-y snap-mandatory hide-scrollbar bg-black"
    >
      {MOCK_TALENTS.map((talent, index) => (
        <VideoCard 
          key={talent.id} 
          talent={talent} 
          isActive={activeIndex === index} 
          onBook={() => onBook(talent.id)}
          onConnect={() => onConnect(talent.id)}
        />
      ))}
    </div>
  );
};

const VideoCard: React.FC<{ 
  talent: typeof MOCK_TALENTS[0]; 
  isActive: boolean;
  onBook: () => void;
  onConnect: () => void;
}> = ({ talent, isActive, onBook, onConnect }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.play().catch(() => {});
    } else if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isActive]);

  return (
    <div className="h-full w-full snap-start relative bg-black overflow-hidden flex flex-col justify-end">
      {/* Video / Background */}
      <video 
        ref={videoRef}
        src={talent.videoUrl}
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        loop
        muted
        playsInline
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 pointer-events-none" />

      {/* Content Overlay */}
      <div className="relative z-10 p-6 flex flex-col space-y-6 pb-12">
        <div className="flex items-end justify-between">
          <div className="space-y-4 max-w-[70%]">
            <div className="flex items-center gap-2">
              <Avatar className="w-12 h-12 border-2 border-[#00F5FF]">
                <AvatarImage src={talent.image} />
                <AvatarFallback>{talent.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-1">
                  <h3 className="text-xl font-bold text-white">{talent.name}</h3>
                  {talent.verified && <ShieldCheck size={16} className="text-[#00F5FF]" />}
                </div>
                <p className="text-[#00F5FF] text-sm font-semibold">{talent.category}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <MapPin size={14} className="text-[#FF00E5]" />
              <span>{talent.location}</span>
            </div>

            <p className="text-white/70 text-sm line-clamp-2 leading-relaxed">
              {talent.bio}
            </p>

            <div className="flex gap-2">
              <NeonButton 
                variant="outline" 
                className="flex-1 py-5 rounded-xl text-sm"
                onClick={onConnect}
              >
                Connect
              </NeonButton>
              <NeonButton 
                variant="primary" 
                className="flex-1 py-5 rounded-xl text-sm"
                onClick={onBook}
              >
                Book Now
              </NeonButton>
            </div>
          </div>

          {/* Side Actions */}
          <div className="flex flex-col items-center gap-6">
            <button 
              onClick={() => setLiked(!liked)}
              className="flex flex-col items-center gap-1"
            >
              <div className={`p-3 rounded-full bg-white/10 backdrop-blur-md transition-all ${liked ? 'text-red-500 scale-110' : 'text-white'}`}>
                <Heart size={24} fill={liked ? 'currentColor' : 'none'} />
              </div>
              <span className="text-xs font-bold text-white">{talent.stats.likes}</span>
            </button>

            <button 
              onClick={() => setSaved(!saved)}
              className="flex flex-col items-center gap-1"
            >
              <div className={`p-3 rounded-full bg-white/10 backdrop-blur-md transition-all ${saved ? 'text-yellow-500 scale-110' : 'text-white'}`}>
                <Bookmark size={24} fill={saved ? 'currentColor' : 'none'} />
              </div>
              <span className="text-xs font-bold text-white">Save</span>
            </button>

            <button className="flex flex-col items-center gap-1">
              <div className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white">
                <Share2 size={24} />
              </div>
              <span className="text-xs font-bold text-white">Share</span>
            </button>

            <div className="w-12 h-12 rounded-full border-2 border-white/20 p-1 animate-spin-slow">
              <img src={talent.image} alt="" className="w-full h-full rounded-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};