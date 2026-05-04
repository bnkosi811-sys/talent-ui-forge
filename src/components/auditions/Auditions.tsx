import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Clock, CreditCard, ChevronRight, Search, SlidersHorizontal, ArrowLeft, Check, Video, FileText } from 'lucide-react';
import { MOCK_AUDITIONS } from '../../data/mock';
import { NeonButton } from '../ui/NeonButton';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { toast } from 'sonner';

export const Auditions: React.FC = () => {
  const [selectedAudition, setSelectedAudition] = useState<typeof MOCK_AUDITIONS[0] | null>(null);
  const [showApply, setShowApply] = useState(false);

  return (
    <div className="h-full bg-black overflow-hidden flex flex-col">
      <AnimatePresence mode="wait">
        {!selectedAudition ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 overflow-y-auto pb-32"
          >
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black italic">AUDITIONS</h2>
                <button className="p-2 bg-white/5 rounded-full"><SlidersHorizontal size={20} /></button>
              </div>

              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                <Input placeholder="Search gigs, casting calls..." className="h-12 pl-12 bg-white/5 border-white/10 rounded-2xl focus-visible:ring-[#FF00E5]" />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2 scroll-hide">
                {['Acting', 'Music', 'Dance', 'Comedy', 'All'].map((cat, i) => (
                  <Badge key={cat} className={`whitespace-nowrap py-2 px-6 rounded-full border-none font-bold uppercase text-[10px] tracking-widest ${i === 4 ? 'bg-[#FF00E5] text-white shadow-[0_0_10px_rgba(255,0,229,0.3)]' : 'bg-white/10 text-white/60'}`}>
                    {cat}
                  </Badge>
                ))}
              </div>

              <div className="space-y-6">
                {MOCK_AUDITIONS.map((audition, idx) => (
                  <motion.div
                    key={audition.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => setSelectedAudition(audition)}
                    className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden cursor-pointer hover:border-[#FF00E5]/50 transition-all"
                  >
                    <div className="aspect-video w-full relative overflow-hidden">
                      <img src={audition.image} alt={audition.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <Badge className="bg-black/60 backdrop-blur-md border-white/10 text-[#FF00E5] font-black">{audition.category}</Badge>
                        <Badge className="bg-emerald-500 text-white border-none font-black">{audition.payment}</Badge>
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold">{audition.title}</h3>
                        <div className="flex items-center gap-4 text-white/50 text-xs font-bold uppercase">
                          <div className="flex items-center gap-1">
                            <MapPin size={12} className="text-[#FF00E5]" />
                            <span>{audition.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={12} className="text-[#00F5FF]" />
                            <span>{audition.deadline}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex -space-x-2">
                          {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-black bg-white/10" />)}
                          <div className="w-6 h-6 rounded-full border-2 border-black bg-white/10 flex items-center justify-center text-[8px] font-bold text-white/40">+12</div>
                        </div>
                        <span className="text-[10px] font-bold text-[#FF00E5] uppercase tracking-widest">Apply Now</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : !showApply ? (
          <motion.div
            key="detail"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="flex-1 overflow-y-auto bg-black pb-32"
          >
            <div className="relative h-64">
              <img src={selectedAudition.image} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
              <button 
                onClick={() => setSelectedAudition(null)}
                className="absolute top-6 left-6 p-2 rounded-full bg-black/50 backdrop-blur-md"
              >
                <ArrowLeft size={20} />
              </button>
            </div>

            <div className="p-6 space-y-8 -mt-12 relative z-10">
              <div className="space-y-4">
                <Badge className="bg-[#FF00E5] text-white border-none">{selectedAudition.category}</Badge>
                <h2 className="text-3xl font-black">{selectedAudition.title}</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3">
                    <div className="p-2 bg-[#FF00E5]/10 text-[#FF00E5] rounded-lg"><CreditCard size={18} /></div>
                    <div>
                      <p className="text-[10px] text-white/40 uppercase font-black">Payment</p>
                      <p className="text-sm font-bold">{selectedAudition.payment}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3">
                    <div className="p-2 bg-[#00F5FF]/10 text-[#00F5FF] rounded-lg"><Calendar size={18} /></div>
                    <div>
                      <p className="text-[10px] text-white/40 uppercase font-black">Deadline</p>
                      <p className="text-sm font-bold">{selectedAudition.deadline}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold">Description</h3>
                <p className="text-white/60 leading-relaxed text-sm">{selectedAudition.description}</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold">Requirements</h3>
                <div className="space-y-3">
                  {selectedAudition.requirements.map(req => (
                    <div key={req} className="flex items-center gap-3 text-sm text-white/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00F5FF]" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              <NeonButton onClick={() => setShowApply(true)} className="w-full py-6 rounded-2xl text-lg">
                Apply for Audition
              </NeonButton>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="apply"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="flex-1 bg-black p-6 space-y-8 flex flex-col"
          >
            <div className="flex items-center justify-between">
              <button onClick={() => setShowApply(false)} className="p-2 bg-white/5 rounded-full"><ArrowLeft size={20} /></button>
              <h3 className="text-lg font-bold">Submit Application</h3>
              <div className="w-10" />
            </div>

            <div className="flex-1 space-y-8 overflow-y-auto">
              <div className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#00F5FF]/10 flex items-center justify-center text-[#00F5FF]">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold">Your Profile</h4>
                    <p className="text-xs text-white/50">Current stats & portfolio included</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-white/5 rounded-xl border border-white/10">
                  <Check size={14} className="text-[#00F5FF]" />
                  <span className="text-xs font-medium">Verified Talent ID</span>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-widest text-white/40">Upload Intro Video (Optional)</h4>
                <div className="p-12 border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center text-center space-y-4 hover:border-[#FF00E5]/50 transition-colors cursor-pointer group">
                  <div className="p-4 bg-white/5 rounded-full text-white/40 group-hover:text-[#FF00E5]">
                    <Video size={32} />
                  </div>
                  <p className="text-sm font-medium">Click to upload a custom audition video</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-widest text-white/40">Personal Message</h4>
                <textarea 
                  className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-[#00F5FF] resize-none"
                  placeholder="Tell them why you're a good fit..."
                />
              </div>
            </div>

            <div className="pt-4 pb-12">
              <NeonButton 
                onClick={() => {
                  toast.success('Application Sent!', { description: 'The casting director will review your profile.' });
                  setShowApply(false);
                  setSelectedAudition(null);
                }} 
                className="w-full py-6 rounded-2xl text-lg"
              >
                Submit Application
              </NeonButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};