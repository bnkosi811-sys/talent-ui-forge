import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Send, Video, Lock, ArrowLeft, MoreVertical, CheckCircle2, Calendar } from 'lucide-react';
import { MOCK_CHATS } from '../../data/mock';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Input } from '../ui/input';
import { NeonButton } from '../ui/NeonButton';
import { Chat } from '../../types';

export const Messages: React.FC<{ onOpenPaywall: (chat: Chat) => void }> = ({ onOpenPaywall }) => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  return (
    <div className="h-full bg-black relative flex flex-col">
      <AnimatePresence mode="wait">
        {!selectedChat ? (
          <motion.div
            key="chat-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 overflow-y-auto pb-32"
          >
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black italic">CHATS</h2>
                <button className="p-2 bg-white/5 rounded-full text-white/40"><MoreVertical size={20} /></button>
              </div>

              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                <Input placeholder="Search messages..." className="h-12 pl-12 bg-white/5 border-white/10 rounded-2xl focus-visible:ring-[#00F5FF]" />
              </div>

              <div className="space-y-4">
                {MOCK_CHATS.map(chat => (
                  <button
                    key={chat.id}
                    onClick={() => chat.isLocked ? onOpenPaywall(chat) : setSelectedChat(chat)}
                    className="w-full flex items-center gap-4 p-4 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group text-left"
                  >
                    <div className="relative flex-shrink-0">
                      <Avatar className="w-14 h-14 border-2 border-transparent group-hover:border-[#00F5FF]/50 transition-all">
                        <AvatarImage src={chat.avatar} />
                        <AvatarFallback>{chat.talentName[0]}</AvatarFallback>
                      </Avatar>
                      {chat.isLocked && (
                        <div className="absolute -bottom-1 -right-1 p-1 bg-[#FF00E5] rounded-full">
                          <Lock size={12} className="text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-white truncate">{chat.talentName}</h4>
                        <span className="text-[10px] text-white/40 font-bold uppercase">{chat.time}</span>
                      </div>
                      <p className="text-xs text-white/60 truncate italic">{chat.lastMessage}</p>
                    </div>
                    {chat.isLocked && (
                      <div className="flex-shrink-0 p-2 bg-[#FF00E5]/10 text-[#FF00E5] rounded-lg">
                        <span className="text-[8px] font-black uppercase">Unlock</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="active-chat"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="flex-1 flex flex-col h-full bg-black z-50 overflow-hidden"
          >
            {/* Chat Header */}
            <div className="p-6 flex items-center justify-between border-b border-white/10 bg-black/50 backdrop-blur-xl shrink-0">
              <div className="flex items-center gap-4">
                <button onClick={() => setSelectedChat(null)} className="p-2 bg-white/5 rounded-full"><ArrowLeft size={20} /></button>
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 flex-shrink-0">
                    <AvatarImage src={selectedChat.avatar} />
                  </Avatar>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <h4 className="font-bold text-sm truncate">{selectedChat.talentName}</h4>
                      <CheckCircle2 size={14} className="text-[#00F5FF] shrink-0" />
                    </div>
                    <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Online</p>
                  </div>
                </div>
              </div>
              <button className="p-2 bg-white/5 rounded-full"><MoreVertical size={20} /></button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-24">
              <div className="flex justify-center">
                <span className="px-4 py-1.5 bg-white/5 rounded-full text-[10px] font-bold text-white/40 uppercase tracking-widest">Chat Unlocked</span>
              </div>

              {selectedChat.messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.senderId === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl break-words whitespace-pre-wrap overflow-hidden ${
                    msg.senderId === 'user' 
                      ? 'bg-[#00F5FF] text-black rounded-tr-none shadow-[0_4px_15px_rgba(0,245,255,0.3)]' 
                      : 'bg-white/10 text-white rounded-tl-none border border-white/5'
                  }`}>
                    <p className="text-sm font-semibold leading-relaxed break-words">{msg.text}</p>
                    <p className={`text-[10px] mt-2 font-bold opacity-70 ${msg.senderId === 'user' ? 'text-black' : 'text-white'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}

              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FF00E5]/10 to-transparent border border-[#FF00E5]/20 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#FF00E5]/10 text-[#FF00E5] rounded-lg">
                    <Video size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold">New Portfolio Update</p>
                    <p className="text-[10px] text-white/60 uppercase font-black">Video Reel • 0:30</p>
                  </div>
                </div>
                <div className="relative aspect-video rounded-xl overflow-hidden group cursor-pointer">
                  <img src={selectedChat.avatar} className="w-full h-full object-cover opacity-50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                      <Lock size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-6 bg-black border-t border-white/10 shrink-0 pb-[calc(1.5rem+env(safe-area-inset-bottom,24px))]">
              <div className="flex items-center gap-3">
                <button className="p-3 bg-white/5 rounded-xl text-white/40 hover:text-white shrink-0"><Calendar size={20} /></button>
                <div className="flex-1 relative">
                  <Input placeholder="Message..." className="h-12 bg-white/5 border-white/10 rounded-xl pr-12 focus-visible:ring-[#00F5FF] text-white" />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#00F5FF]"><Send size={20} /></button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};