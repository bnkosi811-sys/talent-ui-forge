import React, { useState } from 'react';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';
import { Feed } from './components/feed/Feed';
import { Discover } from './components/discover/Discover';
import { Auditions } from './components/auditions/Auditions';
import { Messages } from './components/messages/Messages';
import { Dashboard } from './components/dashboard/Dashboard';
import { TalentMatch } from './components/match/TalentMatch';
import { Profile, PaywallModal, BookingModal } from './components/profile/Profile';
import { MOCK_TALENTS, MOCK_NOTIFICATIONS } from './data/mock';
import { Home, Search, Tv, MessageCircle, User, Bell, Zap, X, Users } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';
import { Talent } from './types';

function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [activeTab, setActiveTab] = useState<'feed' | 'discover' | 'auditions' | 'match' | 'messages' | 'profile'>('feed');
  const [selectedTalent, setSelectedTalent] = useState<Talent | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [feedMode, setFeedMode] = useState<'for-you' | 'nearby'>('for-you');

  const closeOverlays = () => {
    setSelectedTalent(null);
    setShowPaywall(false);
    setShowBooking(false);
    setShowNotifications(false);
  };

  const handleNavClick = (tab: 'feed' | 'discover' | 'auditions' | 'match' | 'messages' | 'profile') => {
    setActiveTab(tab);
    closeOverlays();
  };

  if (showOnboarding) {
    return (
      <div className="min-h-screen bg-black overflow-hidden">
        <OnboardingFlow onComplete={() => setShowOnboarding(false)} />
        <Toaster theme="dark" position="top-center" />
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'feed':
        return (
          <Feed 
            onBook={(id) => {
              const t = MOCK_TALENTS.find(x => x.id === id);
              if (t) { setSelectedTalent(t); setShowBooking(true); }
            }}
            onConnect={(id) => {
              const t = MOCK_TALENTS.find(x => x.id === id);
              if (t) { setSelectedTalent(t); setShowPaywall(true); }
            }}
          />
        );
      case 'discover':
        return <Discover onSelectTalent={(id) => {
          const t = MOCK_TALENTS.find(x => x.id === id);
          if (t) setSelectedTalent(t);
        }} />;
      case 'auditions':
        return <Auditions />;
      case 'match':
        return <TalentMatch />;
      case 'messages':
        return <Messages onOpenPaywall={(chat) => {
          const t = MOCK_TALENTS.find(x => x.name === chat.talentName) || MOCK_TALENTS[1];
          setSelectedTalent(t);
          setShowPaywall(true);
        }} />;
      case 'profile':
        return <Dashboard />;
      default:
        return <Feed onBook={() => {}} onConnect={() => {}} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-foreground font-sans overflow-hidden flex flex-col max-w-md mx-auto relative border-x border-white/10 shadow-2xl">
      <Toaster theme="dark" position="top-center" richColors />

      {/* Top Bar (Contextual) */}
      {(activeTab === 'feed' || activeTab === 'discover') && !selectedTalent && (
        <div className="fixed top-0 left-0 right-0 max-w-md mx-auto z-50 p-6 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1 group pointer-events-auto">
            <Zap className="text-[#00F5FF] fill-[#00F5FF] animate-pulse" size={24} />
            <span className="text-2xl font-black italic tracking-tighter text-white">PLUG</span>
          </div>
          
          {activeTab === 'feed' && (
            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md rounded-full p-1 border border-white/10 pointer-events-auto">
              <button 
                onClick={() => setFeedMode('for-you')}
                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${feedMode === 'for-you' ? 'bg-white text-black' : 'text-white/60'}`}
              >
                For You
              </button>
              <button 
                onClick={() => setFeedMode('nearby')}
                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${feedMode === 'nearby' ? 'bg-white text-black' : 'text-white/60'}`}
              >
                Nearby
              </button>
            </div>
          )}

          <button 
            onClick={() => setShowNotifications(true)}
            className="p-2 relative rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white pointer-events-auto"
          >
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-[#FF00E5] rounded-full" />
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 relative overflow-hidden pb-[env(safe-area-inset-bottom,72px)]">
        {renderContent()}
      </div>

      {/* Bottom Nav - Increased Z-Index to stay above overlays as per user request */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-black/80 backdrop-blur-xl border-t border-white/10 z-[110] pb-[env(safe-area-inset-bottom,12px)]">
        <div className="flex items-center justify-around py-4">
          <NavButton active={activeTab === 'feed'} onClick={() => handleNavClick('feed')} icon={<Home size={22} />} label="Feed" />
          <NavButton active={activeTab === 'discover'} onClick={() => handleNavClick('discover')} icon={<Search size={22} />} label="Explore" />
          <NavButton active={activeTab === 'auditions'} onClick={() => handleNavClick('auditions')} icon={<Tv size={22} />} label="Gigs" />
          <NavButton active={activeTab === 'match'} onClick={() => handleNavClick('match')} icon={<Users size={22} />} label="Match" />
          <NavButton active={activeTab === 'messages'} onClick={() => handleNavClick('messages')} icon={<MessageCircle size={22} />} label="Chat" />
          <NavButton active={activeTab === 'profile'} onClick={() => handleNavClick('profile')} icon={<User size={22} />} label="Profile" />
        </div>
      </nav>

      {/* Overlays */}
      <AnimatePresence>
        {selectedTalent && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-black max-w-md mx-auto"
          >
            <Profile 
              talent={selectedTalent} 
              onBack={() => setSelectedTalent(null)} 
              onBook={() => setShowBooking(true)}
              onConnect={() => setShowPaywall(true)}
            />
          </motion.div>
        )}

        {showPaywall && selectedTalent && (
          <PaywallModal 
            talent={selectedTalent} 
            onClose={() => setShowPaywall(false)}
            onSuccess={() => {
              setShowPaywall(false);
              toast.success('Direct Chat Unlocked!', {
                description: `You can now message ${selectedTalent.name} directly.`
              });
              handleNavClick('messages');
            }}
          />
        )}

        {showBooking && selectedTalent && (
          <BookingModal 
            talent={selectedTalent} 
            onClose={() => setShowBooking(false)}
            onSuccess={() => {
              setShowBooking(false);
              toast.success('Booking Request Sent!', {
                description: `${selectedTalent.name} will review your request soon.`
              });
            }}
          />
        )}

        {showNotifications && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-xl max-w-md mx-auto p-6"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black italic">NOTIFICATIONS</h2>
              <button onClick={() => setShowNotifications(false)} className="p-2 bg-white/5 rounded-full"><X size={20} className="text-white"/></button>
            </div>
            <div className="space-y-4">
              {MOCK_NOTIFICATIONS.map(n => (
                <div key={n.id} className={`p-4 rounded-3xl border transition-all ${n.read ? 'bg-white/5 border-white/5 opacity-60' : 'bg-[#00F5FF]/5 border-[#00F5FF]/20 shadow-[0_4px_15px_rgba(0,245,255,0.05)]'}`}>
                  <div className="flex gap-3">
                    <div className={`p-2 rounded-xl bg-white/5 ${!n.read ? 'text-[#00F5FF]' : 'text-white/40'}`}>
                      {n.type === 'follower' && <User size={16} />}
                      {n.type === 'view' && <Zap size={16} />}
                      {n.type === 'booking' && <MessageCircle size={16} />}
                    </div>
                    <div>
                      <p className="text-xs font-bold">{n.text}</p>
                      <p className="text-[10px] text-white/40 mt-1 uppercase font-black">{n.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const NavButton = ({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all duration-300 ${active ? 'text-[#00F5FF] scale-110' : 'text-white/30 hover:text-white/50'}`}
  >
    <div className="relative">
      {icon}
      {active && <motion.div layoutId="nav-dot" className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#00F5FF] rounded-full shadow-[0_0_8px_rgba(0,245,255,0.8)]" />}
    </div>
    <span className="text-[8px] font-black uppercase tracking-widest">{label}</span>
  </button>
);

export default App;