import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Heart, TrendingUp, DollarSign, Zap, Star, ChevronRight, Award, Trophy, Share2 } from 'lucide-react';
import { MOCK_TALENTS } from '../../data/mock';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { NeonButton } from '../ui/NeonButton';

export const Dashboard: React.FC = () => {
  const user = MOCK_TALENTS[0]; // Self as talent

  return (
    <div className="flex-1 bg-black overflow-y-auto pb-32">
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="w-16 h-16 border-2 border-[#00F5FF]">
                <AvatarImage src={user.image} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 bg-[#FF00E5] p-1 rounded-full">
                <Zap size={12} className="text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-black italic uppercase">{user.name}</h2>
              <div className="flex items-center gap-1.5">
                <p className="text-[10px] font-black uppercase text-[#00F5FF]">Elite Level</p>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => <Star key={i} size={8} fill="#00F5FF" className="text-[#00F5FF]" />)}
                </div>
              </div>
            </div>
          </div>
          <button className="p-3 bg-white/5 rounded-2xl border border-white/10">
            <Share2 size={20} className="text-white" />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard 
            icon={<Eye className="text-[#00F5FF]" />} 
            label="Profile Views" 
            value={user.stats.views} 
            trend="+12%" 
          />
          <StatCard 
            icon={<TrendingUp className="text-[#FF00E5]" />} 
            label="Video Views" 
            value={user.stats.videoViews} 
            trend="+24%" 
          />
          <StatCard 
            icon={<DollarSign className="text-emerald-400" />} 
            label="Unlocked Earnings" 
            value={user.stats.earnings} 
            trend="+R2.4K" 
          />
          <StatCard 
            icon={<Heart className="text-red-500" />} 
            label="Total Likes" 
            value={user.stats.likes} 
            trend="+156" 
          />
        </div>

        {/* Earnings Section */}
        <div className="p-6 bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-3xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Earnings Insight</h3>
            <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Last 30 Days</span>
          </div>
          <div className="flex items-end gap-2">
            <p className="text-4xl font-black">{user.stats.earnings}</p>
            <p className="text-xs font-bold text-emerald-400 mb-1.5 uppercase">Available to withdraw</p>
          </div>
          <NeonButton className="w-full py-4 rounded-2xl">
            Withdraw Funds
          </NeonButton>
        </div>

        {/* Gamified Progress */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Profile Strength</h3>
            <span className="text-xs font-bold text-[#00F5FF]">85% Complete</span>
          </div>
          <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '85%' }}
              className="h-full bg-gradient-to-r from-[#00F5FF] to-[#FF00E5]"
            />
          </div>
          <div className="grid grid-cols-1 gap-3">
            <TipCard 
              icon={<Award size={18} className="text-[#FF00E5]" />} 
              title="Add 2 more portfolio videos" 
              desc="Profiles with 5+ videos get 3x more bookings."
            />
            <TipCard 
              icon={<Trophy size={18} className="text-[#00F5FF]" />} 
              title="Respond to 2 more chats" 
              desc="Your current response rate is 98%. Keep it up!"
            />
          </div>
        </div>

        {/* Performance Graph Placeholder */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Performance Insights</h3>
          <div className="aspect-[2/1] bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-around px-8 opacity-20">
               {[1,2,3,4,5,6,7,8].map(i => (
                 <div key={i} className="w-2 bg-[#00F5FF]" style={{ height: `${Math.random() * 80 + 20}%` }} />
               ))}
            </div>
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest relative z-10">Weekly Traffic Trends</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, trend }: { icon: React.ReactNode; label: string; value: string; trend: string }) => (
  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-2">
    <div className="flex items-center justify-between">
      <div className="p-2 bg-white/5 rounded-lg">{icon}</div>
      <span className="text-[10px] font-black text-emerald-400">{trend}</span>
    </div>
    <div>
      <p className="text-xl font-black">{value}</p>
      <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">{label}</p>
    </div>
  </div>
);

const TipCard = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
  <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer group">
    <div className="p-2 bg-white/5 rounded-xl group-hover:scale-110 transition-transform">{icon}</div>
    <div className="flex-1">
      <h4 className="text-xs font-bold">{title}</h4>
      <p className="text-[10px] text-white/40 leading-tight mt-0.5">{desc}</p>
    </div>
    <ChevronRight size={14} className="text-white/20" />
  </div>
);