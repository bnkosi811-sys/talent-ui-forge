import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NeonButton } from '../ui/NeonButton';
import { 
  Check, 
  Camera, 
  Video, 
  ArrowRight, 
  MapPin, 
  Sparkles, 
  X, 
  RefreshCw, 
  Circle, 
  Square,
  Play,
  AlertCircle
} from 'lucide-react';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [capturedVideo, setCapturedVideo] = useState<string | null>(null);
  const [skills, setSkills] = useState('');
  
  // Camera/Video State
  const [mode, setMode] = useState<'idle' | 'photo' | 'video'>('idle');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [permissionError, setPermissionError] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextStep = () => setStep(s => s + 1);

  const toggleCategory = (cat: string) => {
    setCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  // Camera Logic
  const startCamera = async (type: 'photo' | 'video') => {
    setPermissionError(false);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: type === 'video'
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setMode(type);
    } catch (err) {
      console.error(err);
      setPermissionError(true);
      toast.error('Camera access denied', {
        description: 'Please check your phone settings to allow camera access, or continue without it.'
      });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setMode('idle');
    setIsRecording(false);
    setRecordingTime(0);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const takePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0);
      setCapturedPhoto(canvas.toDataURL('image/jpeg'));
      stopCamera();
    }
  };

  const startRecording = () => {
    if (!streamRef.current) return;
    const mediaRecorder = new MediaRecorder(streamRef.current);
    mediaRecorderRef.current = mediaRecorder;
    const chunks: Blob[] = [];

    mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/mp4' });
      setCapturedVideo(URL.createObjectURL(blob));
    };

    mediaRecorder.start();
    setIsRecording(true);
    timerRef.current = setInterval(() => {
      setRecordingTime(prev => {
        if (prev >= 30) {
          stopRecording();
          return 30;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      stopCamera();
    }
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  const steps = [
    // Step 1: Welcome
    (
      <motion.div 
        key="step1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="flex flex-col items-center justify-center text-center p-8 space-y-12 h-full pb-[calc(5rem+env(safe-area-inset-bottom,24px))]"
      >
        <div className="space-y-4">
          <h1 className="text-6xl font-black italic tracking-tighter text-white">
            TALENT<span className="text-[#00F5FF]">PLUG</span>
          </h1>
          <p className="text-2xl text-white/80 font-medium">Get Seen. Get Booked.</p>
        </div>
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#00F5FF] to-[#FF00E5] rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <NeonButton onClick={nextStep} className="px-12 py-8 text-xl rounded-full relative">
            Start
          </NeonButton>
        </div>
      </motion.div>
    ),
    // Step 2: User Type
    (
      <motion.div 
        key="step2"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="flex flex-col p-8 space-y-8 h-full pt-20 pb-[calc(5rem+env(safe-area-inset-bottom,24px))]"
      >
        <h2 className="text-4xl font-bold text-white leading-tight">I am looking to...</h2>
        <div className="grid gap-4">
          <button 
            onClick={() => { setUserType('talent'); nextStep(); }}
            className={cn(
              "p-8 rounded-2xl border-2 transition-all text-left group",
              userType === 'talent' ? "border-[#00F5FF] bg-[#00F5FF]/10" : "border-white/10 bg-white/5 hover:border-white/30"
            )}
          >
            <h3 className="text-2xl font-bold text-white group-hover:text-[#00F5FF]">I'm Talent</h3>
            <p className="text-white/60">Share my skills and get booked for gigs.</p>
          </button>
          <button 
            onClick={() => { setUserType('hiring'); nextStep(); }}
            className={cn(
              "p-8 rounded-2xl border-2 transition-all text-left group",
              userType === 'hiring' ? "border-[#FF00E5] bg-[#FF00E5]/10" : "border-white/10 bg-white/5 hover:border-white/30"
            )}
          >
            <h3 className="text-2xl font-bold text-white group-hover:text-[#FF00E5]">I'm Hiring</h3>
            <p className="text-white/60">Find and book professional talent for events.</p>
          </button>
        </div>
      </motion.div>
    ),
    // Step 3: Categories
    (
      <motion.div 
        key="step3"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="flex flex-col p-8 space-y-8 h-full pt-20 pb-[calc(5rem+env(safe-area-inset-bottom,24px))]"
      >
        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-white">Choose categories</h2>
          <p className="text-white/60">Select what interests you (Multi-select)</p>
        </div>
        <div className="flex flex-wrap gap-3 overflow-y-auto max-h-[40vh] py-2">
          {['Acting', 'Music', 'Dance', 'Sports', 'Comedy', 'Magic', 'Voice Over', 'Art', 'Other'].map(cat => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={cn(
                "px-6 py-3 rounded-full border-2 transition-all font-medium",
                categories.includes(cat) 
                  ? "border-[#00F5FF] bg-[#00F5FF] text-black" 
                  : "border-white/20 text-white/60 hover:border-white/40"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="mt-auto">
          <NeonButton 
            disabled={categories.length === 0}
            onClick={nextStep} 
            className="w-full py-6 rounded-2xl"
          >
            Continue <ArrowRight size={20} />
          </NeonButton>
        </div>
      </motion.div>
    ),
    // Step 4: Location
    (
      <motion.div 
        key="step4"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="flex flex-col p-8 space-y-8 h-full pt-20 pb-[calc(5rem+env(safe-area-inset-bottom,24px))]"
      >
        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-white">Where are you based?</h2>
          <p className="text-white/60">We'll show you talent and opportunities nearby.</p>
        </div>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={24} />
          <Input 
            placeholder="e.g. Johannesburg" 
            className="h-16 pl-12 bg-white/5 border-white/10 text-xl text-white rounded-2xl focus-visible:ring-[#00F5FF]"
          />
        </div>
        <div className="mt-auto">
          <NeonButton onClick={nextStep} className="w-full py-6 rounded-2xl">
            Set Location
          </NeonButton>
        </div>
      </motion.div>
    ),
    // Step 5: Profile Creation
    (
      <motion.div 
        key="step5"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="flex flex-col p-8 h-full pt-10 pb-[calc(6rem+env(safe-area-inset-bottom,24px))] overflow-y-auto"
      >
        <h2 className="text-3xl font-bold text-white mb-8">Create your profile</h2>
        
        <div className="space-y-6 flex-1">
          <div className="flex flex-col items-center space-y-4">
            <div 
              onClick={() => startCamera('photo')}
              className="w-32 h-32 rounded-full bg-white/5 border-2 border-dashed border-white/20 flex flex-col items-center justify-center text-white/40 group cursor-pointer hover:border-[#00F5FF]/50 transition-colors overflow-hidden relative"
            >
              {capturedPhoto ? (
                <img src={capturedPhoto} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <>
                  <Camera size={32} className="group-hover:text-[#00F5FF]" />
                  <span className="text-xs mt-2">Add Photo</span>
                  <span className="text-[10px] text-white/20 mt-1">Optional</span>
                </>
              )}
              {capturedPhoto && (
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <RefreshCw size={24} className="text-white" />
                </div>
              )}
            </div>
          </div>

          <div 
            onClick={() => startCamera('video')}
            className="p-6 rounded-2xl bg-white/5 border-2 border-dashed border-[#FF00E5]/30 flex flex-col items-center justify-center text-center space-y-4 group cursor-pointer hover:bg-[#FF00E5]/5 transition-colors overflow-hidden relative"
          >
            {capturedVideo ? (
              <div className="w-full h-40 bg-black rounded-lg flex items-center justify-center overflow-hidden relative">
                <video src={capturedVideo} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                  <Play size={32} className="text-white" />
                </div>
                <div className="absolute top-2 right-2 p-1 bg-black/60 rounded-full">
                  <RefreshCw size={16} className="text-white/70" />
                </div>
              </div>
            ) : (
              <>
                <div className="p-4 rounded-full bg-[#FF00E5]/10 text-[#FF00E5]">
                  <Video size={32} />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-white">Intro Video</p>
                  <p className="text-sm text-white/50">Optional: Show off your skills.</p>
                </div>
              </>
            )}
          </div>

          <div className="space-y-3 pb-4">
            <label className="text-white/60 text-sm font-medium">Add Skills / Tags</label>
            <Input 
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g. Amapiano, Drummer..." 
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-14" 
            />
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-[#00F5FF]/20 text-[#00F5FF] border-none">#Vocalist</Badge>
              <Badge className="bg-[#00F5FF]/20 text-[#00F5FF] border-none">#Live</Badge>
            </div>
          </div>
        </div>

        <div className="mt-auto shrink-0 space-y-3">
          {permissionError && (
            <div className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
              <AlertCircle className="text-amber-500 shrink-0" size={20} />
              <div>
                <p className="text-xs font-bold text-amber-500 uppercase">Permission Denied</p>
                <p className="text-[10px] text-white/60 leading-tight mt-1">Camera access is disabled. You can still complete your profile and add media later in settings.</p>
              </div>
            </div>
          )}
          <NeonButton 
            onClick={nextStep} 
            className="w-full py-6 rounded-2xl"
          >
            Complete Profile
          </NeonButton>
        </div>
      </motion.div>
    ),
    // Step 6: Final
    (
      <motion.div 
        key="step6"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center justify-center text-center p-8 space-y-8 h-full bg-gradient-to-b from-[#00F5FF]/10 to-transparent pb-[calc(5rem+env(safe-area-inset-bottom,24px))]"
      >
        <div className="w-24 h-24 rounded-full bg-[#00F5FF] flex items-center justify-center shadow-[0_0_30px_rgba(0,245,255,0.6)]">
          <Check size={48} className="text-black" />
        </div>
        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-white">You're Live.</h2>
          <p className="text-xl text-white/60">Start exploring the talent world.</p>
        </div>
        <div className="flex flex-col w-full gap-4">
          <NeonButton onClick={onComplete} className="w-full py-6 rounded-2xl text-xl">
            Start Exploring
          </NeonButton>
        </div>
        <Sparkles className="text-[#FF00E5] animate-pulse" size={32} />
      </motion.div>
    )
  ];

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col overflow-hidden">
      <AnimatePresence mode="wait">
        {steps[step - 1]}
      </AnimatePresence>
      
      {/* Progress Dots */}
      {step > 1 && step < 6 && mode === 'idle' && (
        <div className="absolute top-12 left-0 right-0 flex justify-center gap-2">
          {[2, 3, 4, 5].map(s => (
            <div 
              key={s} 
              className={cn(
                "h-1 rounded-full transition-all duration-300",
                step === s ? "w-8 bg-[#00F5FF]" : "w-4 bg-white/20"
              )} 
            />
          ))}
        </div>
      )}

      {/* Camera/Video Overlay */}
      <AnimatePresence>
        {mode !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[60] bg-black flex flex-col"
          >
            <div className="flex-1 relative bg-black">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted={mode === 'photo'}
                className="w-full h-full object-cover"
              />
              
              {/* Close Button */}
              <button 
                onClick={stopCamera}
                className="absolute top-6 right-6 p-2 bg-black/40 backdrop-blur-md rounded-full text-white"
              >
                <X size={24} />
              </button>

              {/* Recording Indicator */}
              {isRecording && (
                <div className="absolute top-6 left-1/2 -translate-y-1/2 flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-red-500/50">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-white text-xs font-mono">00:{recordingTime < 10 ? `0${recordingTime}` : recordingTime} / 30</span>
                </div>
              )}

              {/* Controls */}
              <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-8 pb-[calc(3rem+env(safe-area-inset-bottom,24px))] bg-gradient-to-t from-black/80 to-transparent pt-12">
                <p className="text-white/60 text-sm font-medium">
                  {mode === 'photo' ? 'Take a professional photo' : 'Record a 30s intro'}
                </p>
                
                <div className="flex items-center gap-12">
                  {mode === 'photo' ? (
                    <button 
                      onClick={takePhoto}
                      className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center group"
                    >
                      <div className="w-16 h-16 rounded-full bg-white group-active:scale-90 transition-transform" />
                    </button>
                  ) : (
                    <button 
                      onClick={isRecording ? stopRecording : startRecording}
                      className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center group"
                    >
                      {isRecording ? (
                        <div className="w-8 h-8 rounded-sm bg-red-500 group-active:scale-90 transition-transform" />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-red-500 group-active:scale-90 transition-transform" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};