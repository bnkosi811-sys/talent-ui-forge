import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, MapPin, Heart, Share2, Bookmark, Play, MessageCircle, Calendar, Zap, Check, X, CreditCard, Star, Lock } from 'lucide-react';
import { Talent } from '../../types';
import { NeonButton } from '../ui/NeonButton';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';

interface ProfileProps {
  talent: Talent;
  onBack: () => void;
  onBook: () => void;
  onConnect: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ talent, onBack, onBook, onConnect }) => {
  return (
    <div className="flex flex-col h-full bg-black text-white overflow-y-auto pb-32">
      {/* Header Image */}
      <div className="relative h-[40vh]">
        <img src={talent.image} className="w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10"
        >
          <X size={20} />
        </button>

        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-black">{talent.name}</h1>
              {talent.verified && <ShieldCheck size={20} className="text-[#00F5FF]" />}
            </div>
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <MapPin size={14} className="text-[#FF00E5]" />
              <span>{talent.location}</span>
            </div>
          </div>
          <NeonButton className="h-10 px-6 rounded-full text-xs" variant="primary">
            Follow
          </NeonButton>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-8">
        {/* Intro Video Card */}
        <div className="relative rounded-3xl overflow-hidden aspect-video group cursor-pointer border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          <img src={talent.image} className="w-full h-full object-cover opacity-60" alt="" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[#00F5FF] flex items-center justify-center shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-transform group-hover:scale-110">
              <Play fill="black" size={28} className="ml-1" />
            </div>
          </div>
          <div className="absolute top-4 left-4">
            <Badge className="bg-black/60 backdrop-blur-md border-white/20 text-[#00F5FF]">Intro Video</Badge>
          </div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-3 gap-3">
          <button 
            onClick={onConnect}
            className="flex flex-col items-center gap-2 p-4 bg-white/5 border border-white/10 rounded-2xl group hover:bg-[#00F5FF]/10 transition-colors"
          >
            <div className="p-2 bg-[#00F5FF]/10 text-[#00F5FF] rounded-lg group-hover:bg-[#00F5FF]/20">
              <MessageCircle size={20} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider">Unlock Chat</span>
          </button>
          <button 
            onClick={onBook}
            className="flex flex-col items-center gap-2 p-4 bg-white/5 border border-white/10 rounded-2xl group hover:bg-[#FF00E5]/10 transition-colors"
          >
            <div className="p-2 bg-[#FF00E5]/10 text-[#FF00E5] rounded-lg group-hover:bg-[#FF00E5]/20">
              <Calendar size={20} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider">Book Now</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-white/5 border border-white/10 rounded-2xl group hover:bg-yellow-500/10 transition-colors">
            <div className="p-2 bg-yellow-500/10 text-yellow-500 rounded-lg group-hover:bg-yellow-500/20">
              <Bookmark size={20} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider">Save</span>
          </button>
        </div>

        {/* Stats Section */}
        <div className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-3xl">
          <div className="text-center">
            <p className="text-xl font-black">{talent.stats.views}</p>
            <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Views</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center">
            <p className="text-xl font-black">{talent.stats.likes}</p>
            <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Likes</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center">
            <p className="text-xl font-black">{talent.stats.responseRate}</p>
            <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Reply</p>
          </div>
        </div>

        {/* About Section */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold">About</h3>
          <p className="text-white/70 leading-relaxed text-sm">
            {talent.bio}
          </p>
          {talent.isAvailable && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Available Now</span>
            </div>
          )}
        </div>

        {/* Skills */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {talent.skills.map(skill => (
              <Badge key={skill} className="bg-white/5 hover:bg-white/10 border-white/10 text-white/70 py-2 px-4 rounded-xl">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Portfolio</h3>
            <button className="text-[#00F5FF] text-xs font-bold uppercase tracking-widest">View All</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-white/5 border border-white/10">
                <img src={`https://picsum.photos/seed/${talent.id}${i}/400/500`} className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute top-2 right-2 p-1 bg-black/40 backdrop-blur-md rounded-lg">
                  <Play size={12} fill="white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const PaywallModal: React.FC<{ 
  talent: Talent; 
  onClose: () => void;
  onSuccess: () => void;
}> = ({ talent, onClose, onSuccess }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex flex-col p-6 overflow-y-auto"
    >
      <div className="flex justify-end pt-4">
        <button onClick={onClose} className="p-2 text-white/40 hover:text-white">
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-8 max-w-sm mx-auto w-full">
        <div className="relative">
          <div className="absolute -inset-4 bg-[#FF00E5] blur-[40px] opacity-20 animate-pulse" />
          <Avatar className="w-24 h-24 border-2 border-[#FF00E5]">
            <AvatarImage src={talent.image} />
            <AvatarFallback>{talent.name[0]}</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-2 -right-2 p-2 bg-[#FF00E5] rounded-full shadow-[0_0_15px_rgba(255,0,229,0.5)]">
            <Lock size={20} className="text-white" />
          </div>
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black">Unlock Direct Chat</h2>
          <p className="text-white/60">Connect directly with <span className="text-white font-bold">{talent.name}</span> for bookings and collaborations.</p>
        </div>

        <div className="w-full space-y-4">
          <button 
            onClick={onSuccess}
            className="w-full p-6 rounded-3xl bg-white/5 border-2 border-white/10 hover:border-[#00F5FF] text-left transition-all group relative overflow-hidden"
          >
            <div className="relative z-10 flex justify-between items-center">
              <div>
                <p className="text-lg font-bold">Pay Per Unlock</p>
                <p className="text-sm text-white/50">One-time access to this talent</p>
              </div>
              <p className="text-2xl font-black text-[#00F5FF]">R30</p>
            </div>
            <div className="absolute inset-0 bg-[#00F5FF]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button 
            onClick={onSuccess}
            className="w-full p-6 rounded-3xl bg-gradient-to-br from-[#FF00E5]/20 to-[#8B5CF6]/20 border-2 border-[#FF00E5]/30 hover:border-[#FF00E5] text-left transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 px-3 py-1 bg-[#FF00E5] text-white text-[10px] font-black uppercase rounded-bl-xl">Popular</div>
            <div className="relative z-10 flex justify-between items-center">
              <div>
                <p className="text-lg font-bold">Subscription Plan</p>
                <p className="text-sm text-white/50">Unlimited chats & bookings</p>
              </div>
              <p className="text-2xl font-black text-white">R199<span className="text-xs text-white/60 font-medium">/mo</span></p>
            </div>
            <div className="absolute inset-0 bg-[#FF00E5]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

        <div className="w-full space-y-4">
          <div className="space-y-3">
            {[
              'Direct messaging access',
              'Faster priority responses',
              'Serious opportunities only',
              'Unlock full portfolio'
            ].map(benefit => (
              <div key={benefit} className="flex items-center gap-3 text-sm text-white/80">
                <Check size={18} className="text-[#00F5FF]" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full pt-4 space-y-3">
          <NeonButton onClick={onSuccess} className="w-full py-6 rounded-2xl text-lg" variant="secondary">
            Get Unlimited Access
          </NeonButton>
          <p className="text-[10px] text-center text-white/40">Secure payment via Stripe. Cancel anytime.</p>
        </div>
      </div>
    </motion.div>
  );
};

export const BookingModal: React.FC<{ 
  talent: Talent; 
  onClose: () => void;
  onSuccess: () => void;
}> = ({ talent, onClose, onSuccess }) => {
  const [selectedDay, setSelectedDay] = useState(24);
  const [selectedTime, setSelectedTime] = useState('02:00 PM');

  const days = [24, 25, 26, 27, 28, 29, 30];
  const times = ['10:00 AM', '02:00 PM', '07:00 PM'];

  return (
    <motion.div 
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      className="fixed inset-0 z-[100] bg-black flex flex-col pt-12"
    >
      <div className="px-6 flex items-center justify-between mb-8">
        <h2 className="text-2xl font-black tracking-tighter">BOOK <span className="text-[#00F5FF]">TALENT</span></h2>
        <button onClick={onClose} className="p-2 bg-white/5 rounded-full"><X size={20} /></button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 space-y-8 pb-32">
        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
          <Avatar className="w-16 h-16 border-2 border-[#00F5FF]">
            <AvatarImage src={talent.image} />
          </Avatar>
          <div>
            <h3 className="font-bold text-lg">{talent.name}</h3>
            <p className="text-sm text-white/50">{talent.category}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-widest text-[#FF00E5]">1. Select Date & Time</h4>
          <div className="grid grid-cols-4 gap-2">
            {days.map(day => (
              <button 
                key={day} 
                onClick={() => setSelectedDay(day)}
                className={cn(
                  "flex flex-col items-center p-3 border rounded-xl transition-all duration-300",
                  selectedDay === day 
                    ? "bg-[#00F5FF]/10 border-[#00F5FF] shadow-[0_0_15px_rgba(0,245,255,0.2)]" 
                    : "bg-white/5 border-white/10 hover:border-white/30"
                )}
              >
                <span className={cn("text-[10px] font-bold", selectedDay === day ? "text-[#00F5FF]" : "text-white/40")}>OCT</span>
                <span className={cn("text-lg font-black", selectedDay === day ? "text-white" : "text-white/80")}>{day}</span>
              </button>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            {times.map(time => (
              <button 
                key={time} 
                onClick={() => setSelectedTime(time)}
                className={cn(
                  "p-3 border rounded-xl text-xs font-bold transition-all duration-300",
                  selectedTime === time 
                    ? "bg-[#00F5FF]/10 border-[#00F5FF] text-white shadow-[0_0_15px_rgba(0,245,255,0.2)]" 
                    : "bg-white/5 border-white/10 text-white/60 hover:border-white/30"
                )}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-widest text-[#FF00E5]">2. Event Details</h4>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Event Type</label>
              <Input placeholder="e.g. Music Festival, Private Wedding" className="bg-white/5 border-white/10 h-12 rounded-xl text-white placeholder:text-white/40 px-4" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Location</label>
              <Input placeholder="e.g. Sandton Convention Centre" className="bg-white/5 border-white/10 h-12 rounded-xl text-white placeholder:text-white/40 px-4" />
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-emerald-400">Talent Rate (Est.)</span>
            <span className="text-lg font-black text-white">R2,500 - R4,000</span>
          </div>
          <p className="text-[10px] text-white/40 leading-relaxed italic">The final quote will be discussed with the talent after the request is accepted.</p>
        </div>
      </div>

      <div className="p-6 bg-black border-t border-white/10 pb-12">
        <NeonButton onClick={onSuccess} className="w-full py-6 rounded-2xl text-lg">
          Confirm Request
        </NeonButton>
      </div>
    </motion.div>
  );
};