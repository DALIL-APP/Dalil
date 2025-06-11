import React, { useState, useRef } from 'react';
import Navbar from '../../components/Navbar';
import HeroSection from '../../components/HeroSection';
import ServiceDetails from '../../components/ServiceTemplate';
import Footer from '../../components/Footer';
import filler from '../../assets/filler.png';
import dot from '../../assets/Ellipse 4.png';
import { Play, Pause, Loader2 } from 'lucide-react';

const TextToSpeech: React.FC = () => {
  const [text, setText] = useState('');
  const [playing, setPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioTime, setAudioTime] = useState('0:00');
  const [audioDuration, setAudioDuration] = useState('0:00');
  const [loading, setLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString();
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Convert text to speech using SpeechSynthesis API
  const handlePlay = () => {
    if (!text.trim()) return;
    setLoading(true);
    const utterance = new window.SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-EG';
    utterance.onstart = () => {
      setPlaying(true);
      setLoading(false);
    };
    utterance.onend = () => {
      setPlaying(false);
    };
    window.speechSynthesis.cancel(); // Stop any previous
    window.speechSynthesis.speak(utterance);
  };

  // Stop playback
  const handlePause = () => {
    window.speechSynthesis.cancel();
    setPlaying(false);
  };

  // Handle text input change
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  // Reset
  const handleReset = () => {
    setText('');
    setPlaying(false);
    window.speechSynthesis.cancel();
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <HeroSection
        backgroundImage={filler}
        breadcrumb={
          <span className="flex flex-row items-center gap-2 text-right text-base">
            <span className="text-blue-600">تحويل النص إلى صوت</span>
            <img src={dot} alt="dot" className="w-2 h-2" />
            <span>الخدمات</span>
          </span>
        }
      />
      <ServiceDetails
        serviceName="تحويل النص إلى صوت"
        serviceDescription="خدمة تحويل النص إلى صوت (Text-to-Speech - TTS) هي تقنية مبتكرة لتحويل النصوص المكتوبة إلى صوت بشري مسموع باستخدام الذكاء الاصطناعي. تتيح هذه الخدمة قراءة النصوص الطويلة بطريقة مريحة وسهلة مما يسهل الوصول إلى المحتوى للأشخاص ذوي الإعاقة البصرية أو صعوبات القراءة أو حتى أثناء الاستماع بدل من القراءة."
        serviceMerits={[
          'تساعد الأشخاص ذوي الإعاقة البصرية أو صعوبات القراءة في الوصول إلى المحتوى المكتوب بسهولة. تسهل قراءة النصوص الطويلة والاستماع إليها أثناء القيام بأنشطة أخرى مثل القيادة أو ممارسة الرياضة.',
          'تسهل للطلاب الاستماع إلى المصطلحات أو المواد التعليمية أثناء المراجعة.',
          'تساعد الأشخاص الذين يعانون من ضعف البصر أو صعوبة في قراءة النصوص المطبوعة.',
          'تساعد الأفراد الذين يفضلون الاستماع إلى المحتوى المكتوب بسهولة. تسهل قراءة النصوص الطويلة والاستماع إليها أثناء القيام بأنشطة أخرى مثل القيادة أو ممارسة الرياضة.'
        ]}
      />
      {/* Text Input and Audio Bar Section */}
      <div className="container mx-auto px-4 flex flex-col gap-6 pb-8">
        <textarea
          className="w-full min-h-[120px] border border-gray-300 rounded-lg p-4 text-right text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="أدخل النص الذي تريد تحويله إلى صوت..."
          value={text}
          onChange={handleTextChange}
        />
        {/* Audio Bar and Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          <div className="flex flex-row gap-4 w-full md:w-auto">
            <button
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-2 rounded-lg font-bold text-blue-600 border border-blue-600 hover:bg-blue-50"
              onClick={handleReset}
              disabled={loading}
            >
              إلغاء
            </button>
            <button
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-2 rounded-lg font-bold text-white transition-colors bg-blue-600 hover:bg-blue-700"
              onClick={playing ? handlePause : handlePlay}
              disabled={loading || !text.trim()}
            >
              {playing ? <Pause size={20} /> : <Play size={20} />}
              {playing ? 'إيقاف' : 'تشغيل'}
            </button>
          </div>
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2 min-w-[180px] w-full md:w-auto">
            <Play size={20} className="text-blue-600 shrink-0" />
            <div className="flex-1 flex items-center justify-between">
              {/* Waveform placeholder as a full-width gradient */}
              <div className="flex-1 h-6 mx-2 relative">
                <div className="absolute inset-0 w-full h-full"
                  style={{
                    backgroundImage: `repeating-linear-gradient(to right, #2563eb 0 2px, transparent 2px 10px)`
                  }}
                />
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <span className="text-gray-700">{audioTime} / {audioDuration || '13:57'}</span>
                {loading && <Loader2 size={18} className="animate-spin text-blue-600" />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TextToSpeech;
