"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Rocket, BookOpen, MonitorSmartphone, Settings2, ChevronRight, ChevronLeft, Star, Lock, Check, Trophy, CheckCircle2, ArrowRight, PenTool, CheckSquare, Plus, Minus } from "lucide-react";
import Link from "next/link";

function AnimatedStat({ finalValue, precise, label, suffix }: { finalValue: number, precise: string, label: string, suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const interval = 16;
    const increment = finalValue / (duration / interval);

    const timer = setInterval(() => {
      start += increment;
      if (start >= finalValue) {
        clearInterval(timer);
        setCount(finalValue);
      } else {
        setCount(Math.floor(start));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isInView, finalValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center bg-white p-6 z-20"
    >
      <h3 className="text-[28px] font-medium lg:text-[64px]">
        {count.toLocaleString()}{suffix}
      </h3>
      <div className="text-[16px] font-semibold text-[#5653FE] mb-3 opacity-90">
        {precise}
      </div>
      <p className="text-lg text-[#4F5B76] font-medium text-center">
        {label}
      </p>
    </motion.div>
  );
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const faqs = [
    {
      question: "What is Mind Mentor?",
      answer: "Mind Mentor is an interactive learning platform designed to help you master AI tools. We provide practical courses and challenges to advance your career and improve your everyday productivity."
    },
    {
      question: "How to download and use Mind Mentor?",
      answer: "Mind Mentor is a web-based application. You don't need to download anything. Simply open your preferred web browser, navigate to almmai.com, and log in to your account. Our platform is fully responsive and works seamlessly across desktops, tablets, and mobile devices."
    },
    {
      question: "How to log in into Mind Mentor?",
      answer: "To log in, click the \"Log In\" button at the top right of the screen. Enter the email address and password you used to register."
    },
    {
      question: "How to cancel Mind Mentor subscription?",
      answer: "You can cancel your subscription at any time by navigating to your Account Settings, selecting the Subscription tab, and clicking \"Cancel Subscription\"."
    }
  ];

  const scrollRefNarrow = useRef<HTMLDivElement>(null);

  const scrollLeftNavNarrow = () => {
    if (scrollRefNarrow.current) {
      scrollRefNarrow.current.scrollBy({ left: -280, behavior: 'smooth' });
    }
  };

  const scrollRightNavNarrow = () => {
    if (scrollRefNarrow.current) {
      scrollRefNarrow.current.scrollBy({ left: 280, behavior: 'smooth' });
    }
  };

  const narrowReviews = [
    {
      id: 1,
      name: "Guy Pierce",
      date: "November 24",
      title: "Training never stops and...",
      text: "Training never stops, learning never ends. This is a great...",
      rating: 5,
    },
    {
      id: 2,
      name: "Joyujinbeba$",
      date: "November 23",
      title: "Amazing program",
      text: "Amazing program, I loved the explanations and the format...",
      rating: 5,
    },
    {
      id: 3,
      name: "Cheryl Holiday",
      date: "November 22",
      title: "Mind Mentor is a fantastic lea...",
      text: "Mind Mentor is a fantastic learning platform—easy to use, well-...",
      rating: 5,
    },
    {
      id: 4,
      name: "DandDay",
      date: "November 22",
      title: "Great starter programTo AI",
      text: "This starts out real basic and slowly builds to more...",
      rating: 5,
    },
    {
      id: 5,
      name: "tcitecomish",
      date: "November 22",
      title: "This is a breeze...",
      text: "I have been using ChatGPT but did not know that using...",
      rating: 5,
    }
  ];


  const scrollLeftNav = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRightNav = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  const reviewsList = [
    {
      id: 1,
      name: "Prof. Harvey Crichton",
      date: "November 24",
      title: "Easy and a joy!",
      text: "Easy to follow, engaging courses made very user-friendly and enjoyable. Would recommend for AI as it seems a scary concept but it was well worth it. I enjoyed it and there is a certificate at the end.",
      rating: 5,
    },
    {
      id: 2,
      name: "Kellie Simpson",
      date: "November 17",
      title: "Sam and I love this learning tool",
      text: "I'm really impressed with this learning tool. It delivers clear, concise instructions and—more importantly—explains why each step matters. It's a strategic resource for building stronger prompts, improving how I interact with Sam (my AI), and sharpening my skills.",
      rating: 5,
    },
    {
      id: 3,
      name: "Rock Arenas",
      date: "November 15",
      title: "I'm a 52-year-old dad and AI",
      text: "I'm a 52-year-old dad of kids in their early twenties. I can't wait for them to come around and start utilizing AI more frequently. My home and work life have been so much easier. Thanks, Mind Mentor, for helping me explore AI in a broader view. You have helped open my mind.",
      rating: 5,
    },
    {
      id: 4,
      name: "Sarah Jenkins",
      date: "October 10",
      title: "Transitioned to Data Analyst",
      text: "Mind Mentor completely changed my career trajectory. The AI courses are practical and easy to follow. I landed a new job within 3 months of starting.",
      rating: 5,
    },
    {
      id: 5,
      name: "Elena Rodriguez",
      date: "October 5",
      title: "Marketing Manager",
      text: "The prompt engineering course is a game-changer. My team's productivity has skyrocketed since I implemented what I learned.",
      rating: 4,
    }
  ];

  const stats = [
    { finalValue: 1641, suffix: "k+", precise: "1,641,175", label: "Users learned new skills" },
    { finalValue: 14601, suffix: "k+", precise: "14,601,234", label: "Minutes consumed" },
    { finalValue: 167, suffix: "k+", precise: "167,456", label: "Prompts written" },
  ];

  const choosePaths = [
    { title: "AI-powered business", desc: "Use tools to automate workflows, analyze data, and make smarter decisions that save time and money", icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5V19A9 3 0 0 0 21 19V5" /><path d="M3 12A9 3 0 0 0 21 12" /></svg>, bg: "#FFF4ED" },
    { title: "AI marketing", desc: "Learn how to increase sales with AI-driven tools for ads, social media, and more...", icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="8" x="2" y="2" rx="2" /><rect width="8" height="8" x="14" y="14" rx="2" /><path d="M6 10v4a2 2 0 0 0 2 2h6" /></svg>, bg: "#EBF3FF" },
    { title: "AI productivity", desc: "Simplify your daily tasks with AI tools that save time and increase efficiency", icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>, bg: "#F3F0FF" },
    { title: "AI Content Creation", desc: "Quickly produce high-quality content for blogs, websites, and social media with AI", icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>, bg: "#F0F9FF" },
    { title: "AI affiliate marketing", desc: "Use AI to find products, automate promotions, and boost your passive income flow", icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" /></svg>, bg: "#F5F3FF" },
  ];

  const quotes = [
    "\"Using AI doesn't make you the best... You have to learn to take the best out of it. Mind Mentor helps you do that, perfectly!\"",
    "\"The step-by-step AI training completely changed my workflow. I am saving hours every single day.\"",
    "\"Finally, a course that cuts through the noise. Highly recommended for any serious professional.\""
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [pathSlide, setPathSlide] = useState(0);

  // Duplicate path arrays so desktop grid (3 col) doesn't show blank spaces at the end
  const displayPaths = [...choosePaths, ...choosePaths];

  const slideLeft = () => setPathSlide((prev) => (prev === 0 ? choosePaths.length - 1 : prev - 1));
  const slideRight = () => setPathSlide((prev) => (prev >= choosePaths.length - 1 ? 0 : prev + 1));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [quotes.length]);

  return (
    <>
      <section className="relative overflow-hidden pt-24 pb-20 lg:pt-10 lg:pb-10 bg-white">
        {/* Very subtle noise/gradient mimicking the original site's soft luminous background */}
        <div className="absolute inset-x-0 inset-y-0 pointer-events-none flex justify-center -z-10 bg-gradient-to-br from-[#FCFCFF] via-white to-[#F9F9FF]">
          <div className="w-[800px] h-[600px] bg-[#EEF0FE]/50 blur-[100px] rounded-full absolute top-[-100px] left-[-200px]"></div>
        </div>

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">

            {/* Left Column (60% Split) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-[55%] xl:w-[60%] flex flex-col items-start"
            >
              {/* Top Badge */}
              <div className="inline-flex items-center gap-2 bg-[#F3F4FE] text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-8">
                AI <span className="text-primary/40 font-light">|</span> Mind Mentor <ArrowRight size={14} className="ml-0.5" />
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[62px] font-medium text-[#25244A] mb-8 leading-[1.05] tracking-tight">
                Become the <br /> Master of AI
              </h1>

              <p className="text-lg md:text-[20px] text-[#4F5B76] mb-8 max-w-[600px] leading-snug">
                Learn AI skills to advance your career and stay competitive
              </p>

              <Link href="/quiz" className="px-8 py-3.5 rounded-[2rem] bg-primary text-white font-semibold text-lg flex items-center gap-2 hover:-translate-y-1 hover:shadow-[0_12px_24px_-8px_rgba(86,83,254,0.5)] transition-all duration-300">
                Start Now <ArrowRight size={18} />
              </Link>

              {/* Social Proof Avatars */}
              <div className="mt-10 flex items-center gap-3">
                <div className="flex -space-x-3">
                  <img className="w-[38px] h-[38px] rounded-full ring-2 ring-white object-cover" src="https://i.pravatar.cc/100?img=11" alt="Student" />
                  <img className="w-[38px] h-[38px] rounded-full ring-2 ring-white object-cover" src="https://i.pravatar.cc/100?img=12" alt="Student" />
                  <img className="w-[38px] h-[38px] rounded-full ring-2 ring-white object-cover" src="https://i.pravatar.cc/100?img=13" alt="Student" />
                  <img className="w-[38px] h-[38px] rounded-full ring-2 ring-white object-cover" src="https://i.pravatar.cc/100?img=14" alt="Student" />
                </div>
                <span className="text-sm font-medium text-[#25244A] ml-2">
                  More than 813,333+ people joined
                </span>
              </div>
            </motion.div>

            {/* Right Column (40% Split) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full lg:w-[45%] xl:w-[40%] relative mt-10 lg:mt-0 lg:ml-auto"
            >
              {/* The main image mockup container */}
              <div className="relative w-full aspect-[4/3] lg:aspect-[4/4.5] xl:aspect-square rounded-[24px] overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)]">
                {/* Generic placeholder mapped to similar lighting to the mock */}
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop"
                  alt="Student learning AI at desk"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Glassmorphism Overlays Mimicking the Image */}

                {/* 1. Digital Marketing */}
                <div className="absolute top-8 left-6 bg-white/95 backdrop-blur-sm pl-2 pr-5 py-2 rounded-2xl shadow-lg border border-white flex items-center gap-3">
                  <div className="p-1.5 border border-[#EEF0FE] rounded-xl text-primary">
                    <BookOpen size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-[9px] text-[#4F5B76] font-medium mb-[1px]">New lessons</div>
                    <div className="text-xs font-bold text-[#25244A]">Digital Marketing</div>
                  </div>
                </div>

                {/* 2. Content Creation */}
                <div className="absolute bottom-12 left-10 bg-white/95 backdrop-blur-sm pl-2 pr-5 py-2 rounded-2xl shadow-lg border border-white flex items-center gap-3">
                  <div className="p-1.5 border border-[#EEF0FE] rounded-xl text-primary">
                    <PenTool size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-[9px] text-[#4F5B76] font-medium mb-[1px]">Popular guide</div>
                    <div className="text-xs font-bold text-[#25244A]">Content Creation</div>
                  </div>
                </div>

                {/* 3. Productivity boost */}
                <div className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/95 backdrop-blur-sm pl-2 pr-5 py-2 rounded-2xl shadow-lg border border-white flex items-center gap-3">
                  <div className="p-1.5 border border-[#EEF0FE] rounded-xl text-primary">
                    <CheckSquare size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-[9px] text-[#4F5B76] font-medium mb-[1px]">New guide</div>
                    <div className="text-xs font-bold text-[#25244A]">Productivity boost</div>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonial Slider */}
      <section className="pt-24 pb-12 bg-white relative">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative h-[120px] md:h-[80px] flex items-center justify-center mb-8 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute w-full px-4"
              >
                <p className="italic text-xl md:text-2xl lg:text-[28px] text-[#24234C] font-semibold leading-snug max-w-4xl mx-auto">
                  {quotes[currentSlide]}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center items-center gap-2">
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`rounded-full transition-all duration-300 ${currentSlide === i ? "w-8 h-1.5 bg-[#4F5B76]" : "w-1.5 h-1.5 bg-[#E3E3E3]"
                  }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why People Love Section */}
      <section className="py-12 pb-24 bg-white relative">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Left Column */}
            <div>
              <h2 className="text-[28px] font-medium leading-[32px] tracking-[-1px] lg:text-[42px] lg:leading-[52px] text-[#24234C] mb-4">
                Why people love Mind Mentor
              </h2>
              <p className="text-lg md:text-xl text-[#4F5B76] mb-10 max-w-[500px]">
                Thousands of users trust Mind Mentor to learn AI. Get the tools, skills, and confidence to grow in your career.
              </p>

              <div className="space-y-4">
                <div className="p-6 rounded-2xl border border-[#E3E3E3] bg-white flex gap-5 items-start">
                  <div className="text-[#5653FE] shrink-0 mt-0.5">
                    <Rocket size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-[#24234C] mb-1">Quick and easy to follow:</h3>
                    <p className="text-[#4F5B76] text-base leading-relaxed">
                      Learn AI in just 15 minutes a day—perfect for any age or experience level.
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl border border-[#E3E3E3] bg-white flex gap-5 items-start">
                  <div className="text-[#5653FE] shrink-0 mt-0.5">
                    <BookOpen size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-[#24234C] mb-1">Multiple learning formats:</h3>
                    <p className="text-[#4F5B76] text-base leading-relaxed">
                      Choose from audio lessons, step-by-step guides, and interactive courses to suit your style.
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl border border-[#E3E3E3] bg-white flex gap-5 items-start">
                  <div className="text-[#5653FE] shrink-0 mt-0.5">
                    <MonitorSmartphone size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-[#24234C] mb-1">Accessible anytime, anywhere:</h3>
                    <p className="text-[#4F5B76] text-base leading-relaxed">
                      Our app is available on both the App Store and Play Market for learning on the go.
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl border border-[#E3E3E3] bg-white flex gap-5 items-start">
                  <div className="text-[#5653FE] shrink-0 mt-0.5">
                    <Settings2 size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-[#24234C] mb-1">Practical and actionable:</h3>
                    <p className="text-[#4F5B76] text-base leading-relaxed">
                      Gain hands-on experience with AI tools you can apply immediately to work smarter and stay competitive.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (Phone Mockup) */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-[300px] aspect-[9/19] bg-[#1C1C1E] rounded-[48px] p-2 shadow-2xl ring-4 ring-offset-4 ring-[#E3E3E3]/50 lg:ml-auto z-20">
                {/* Notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[110px] h-[30px] bg-[#1C1C1E] rounded-b-3xl z-30"></div>

                {/* Phone Screen */}
                <div className="w-full h-full bg-[#F9F9FF] rounded-[38px] overflow-hidden relative shadow-inner">
                  {/* Top Bar Mock */}
                  <div className="w-full h-12 bg-white flex items-center justify-between px-6 pt-2">
                    <span className="text-[10px] font-bold tracking-wider">9:41</span>
                    <div className="flex gap-1 items-end h-[10px]">
                      {/* cell mock */}
                      <div className="w-[3px] h-2 bg-black rounded-[1px]"></div>
                      <div className="w-[3px] h-2.5 bg-black rounded-[1px]"></div>
                      <div className="w-[3px] h-3 bg-black rounded-[1px]"></div>
                      <div className="w-[3px] h-3 bg-black opacity-30 rounded-[1px] mr-1"></div>
                      {/* battery mock */}
                      <div className="w-5 h-2.5 bg-black rounded-sm relative">
                        <div className="absolute top-1/2 -right-0.5 -translate-y-1/2 w-[1px] h-1 bg-black opacity-50"></div>
                      </div>
                    </div>
                  </div>

                  {/* Header App Area */}
                  <div className="bg-white px-5 pt-3 pb-5 shadow-sm relative z-10 w-full mb-3 border-b border-[#E3E3E3]/50">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 text-[#5653FE]">
                      <Rocket size={24} strokeWidth={2} />
                    </div>
                    <h3 className="font-bold text-[#24234C] text-[17px] mb-1 leading-tight">AI Mastery</h3>
                    <p className="text-[#4F5B76] text-[10px] leading-relaxed mb-4">
                      Step-by-step program to guide you from beginner to expert in using various AI tools.
                    </p>
                    <button className="w-full bg-[#5653FE] text-white font-semibold text-xs py-[14px] rounded-xl shadow-md hover:-translate-y-0.5 transition-transform">
                      Resume path
                    </button>
                  </div>

                  {/* Mobile App Cards */}
                  <div className="px-4 space-y-3 pb-6 relative z-10">
                    {/* Course 1 */}
                    <div className="bg-white p-3 rounded-2xl border border-[#E3E3E3] shadow-sm flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#00A67E] flex items-center justify-center text-white shrink-0">
                        <BookOpen size={16} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-xs text-[#24234C] mb-0.5">ChatGPT</h4>
                        <p className="text-[9px] text-[#4F5B76]/70 font-medium mb-1.5">Lessons 16 • 3 levels</p>
                        <div className="h-1.5 w-full bg-[#F3F4FE] rounded-full overflow-hidden">
                          <div className="h-full bg-[#5653FE] w-[70%] rounded-full"></div>
                        </div>
                      </div>
                    </div>

                    {/* Course 2 */}
                    <div className="bg-white p-3 rounded-2xl border border-[#E3E3E3] shadow-sm flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white shrink-0">
                        <BookOpen size={16} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-xs text-[#24234C] mb-0.5">Dall-E</h4>
                        <p className="text-[9px] text-[#4F5B76]/70 font-medium mb-1.5">Lessons 16 • 3 levels</p>
                        <div className="h-1.5 w-full bg-[#F3F4FE] rounded-full overflow-hidden">
                          <div className="h-full bg-[#5653FE] w-[30%] rounded-full"></div>
                        </div>
                      </div>
                    </div>

                    {/* Course 3 */}
                    <div className="bg-white p-3 rounded-2xl border border-[#E3E3E3] shadow-sm flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#F9FAFB] border border-[#E3E3E3] flex items-center justify-center text-[#24234C] shrink-0">
                        <BookOpen size={16} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-xs text-[#24234C] mb-0.5">Midjourney</h4>
                        <p className="text-[9px] text-[#4F5B76]/70 font-medium mb-1.5">Lessons 14 • 3 levels</p>
                        <div className="h-1.5 w-full bg-[#F3F4FE] rounded-full overflow-hidden">
                          <div className="h-full bg-[#F3F4FE] w-full rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Phone mockup layered behind */}
              <div className="hidden lg:block absolute top-8 right-12 w-[300px] aspect-[9/19] bg-[#1C1C1E] rounded-[48px] z-10 opacity-60 scale-95 origin-top blur-[2px] border-[6px] border-[#1C1C1E]/80">
                <div className="w-full h-full bg-[#F9F9FF] rounded-[40px] opacity-20"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Choose Your Path Section */}
      <section className="py-15 bg-white relative">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-[28px] font-medium leading-[32px] tracking-[-1px] lg:text-[42px] lg:leading-[52px] text-[#24234C] mb-4">
              Choose your path
            </h2>
            <p className="text-lg text-[#4F5B76] max-w-2xl mx-auto mt-5 leading-relaxed">
              Explore different paths where you could apply AI that will help you grow in today's digital world
            </p>
          </div>
          <div className="relative flex items-center justify-center">
            {/* Left Arrow */}
            <button
              onClick={slideLeft}
              className="p-2 absolute left-0 lg:-left-12 top-1/2 -translate-y-1/2 text-[#24234C] hover:text-primary transition-colors z-10 bg-white/80 rounded-full"
              aria-label="Previous options"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>

            {/* Cards Container - Map logic sliding by pathSlide index */}
            <div className="overflow-hidden w-[100%] max-w-full px-4 lg:px-0 relative">
              <motion.div
                className="flex"
                animate={{ x: `calc(-${pathSlide} * (100% / 3))` }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{ width: `${(displayPaths.length / 3) * 100}%` }}
              >
                {displayPaths.map((card, idx) => (
                  <div key={idx} className="w-[calc(100%/3)] px-3">
                    <div className="h-full border border-[#E3E3E3] rounded-2xl p-8 bg-white flex flex-col items-start min-h-[280px]">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center mb-8" style={{ backgroundColor: card.bg }}>
                        {card.icon}
                      </div>
                      <h3 className="text-[22px] font-semibold text-[#24234C] mb-4">{card.title}</h3>
                      <p className="text-[17px] text-[#4F5B76] leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={slideRight}
              className="p-2 absolute right-0 lg:-right-12 top-1/2 -translate-y-1/2 text-[#24234C] hover:text-primary transition-colors z-10 bg-white/80 rounded-full"
              aria-label="Next options"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          </div>
        </div>
      </section>

      {/* Advance Your Career CTA */}
      <section className="py-15 bg-white relative">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-[#E3E3E3] bg-[linear-gradient(110deg,#F5F3FF_0%,#FFFFFF_45%,#FFF0E6_100%)] p-8 md:p-12 lg:p-16 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* Left Column */}
              <div className="relative z-10 lg:pr-10">
                <h2 className="text-[36px] md:text-[40px] font-semibold text-[#24234C] leading-[1.15] mb-6">
                  Advance your career<br />with AI skills
                </h2>
                <p className="text-[#4F5B76] text-[17px] mb-10 max-w-[420px] leading-relaxed">
                  Learn practical AI tools that top professionals use to work smarter and stay ahead
                </p>
                <Link href="/quiz" className="bg-[#5653FE] text-white px-8 py-3.5 rounded-full font-semibold flex items-center gap-2 hover:-translate-y-1 hover:shadow-[0_12px_24px_-8px_rgba(86,83,254,0.5)] transition-all duration-300 w-max text-[15px]">
                  Take the Quiz <ChevronRight size={18} strokeWidth={2.5} />
                </Link>
              </div>

              {/* Right Column (Visual Graphic: User Orbit) */}
              <div className="relative h-[350px] lg:h-[400px] flex items-center justify-center pointer-events-none mt-8 lg:mt-0">
                {/* Concentric Circles */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full border border-[#E3E3E3]/80"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border border-[#E3E3E3]/80"></div>

                {/* 1. Large Top Right (Joshua) */}
                <div className="absolute top-[10%] right-[10%] lg:right-[15%] z-10">
                  <div className="relative">
                    <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Joshua" className="w-[110px] h-[110px] rounded-full border-[5px] border-white shadow-sm object-cover relative z-10" />
                    {/* Badge */}
                    <div className="absolute bottom-1 -right-8 z-20">
                      <div className="bg-[#00B67A] text-white text-[14px] font-bold px-4 py-1.5 rounded-full shadow-md relative">
                        Joshua
                        <div className="absolute -top-1 left-3 w-3 h-3 bg-[#00B67A] transform rounded-[1px] rotate-45 -z-10"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Middle Left (Smiling Man) */}
                <img src="https://i.pravatar.cc/150?img=12" alt="Student" className="absolute top-[35%] left-[8%] w-[85px] h-[85px] rounded-full border-[5px] border-white shadow-sm object-cover z-10" />

                {/* 3. Center Micro Avatar */}
                <img src="https://i.pravatar.cc/150?img=5" alt="Student" className="absolute top-[50%] left-[45%] w-[50px] h-[50px] rounded-full border-[3px] border-white shadow-sm object-cover z-10" />

                {/* 4. Bottom Left Mini Avatar & Anne Badge */}
                <div className="absolute bottom-[8%] left-[25%] z-10">
                  <div className="relative">
                    <img src="https://i.pravatar.cc/150?img=60" alt="Student" className="w-[50px] h-[50px] rounded-full border-[3px] border-white shadow-sm object-cover relative z-10" />
                    {/* Badge */}
                    <div className="absolute top-1 -left-14 z-20">
                      <div className="bg-[#5653FE] text-white text-[12px] font-bold px-3 py-1 rounded-full shadow-md relative leading-none">
                        Anne
                        <div className="absolute -top-[2px] right-2 w-2.5 h-2.5 bg-[#5653FE] transform rounded-[1px] rotate-45 -z-10"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. Bottom Right Avatar */}
                <img src="https://i.pravatar.cc/150?img=47" alt="Student" className="absolute top-[55%] right-[20%] w-[60px] h-[60px] rounded-full border-[4px] border-white shadow-sm object-cover z-10" />

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Mind Mentor Works Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 lg:mb-24">
            <h2 className="text-[28px] font-medium leading-[32px] tracking-[-1px] lg:text-[42px] lg:leading-[52px] text-[#24234C] mb-4">
              How Mind Mentor works
            </h2>
            <p className="text-lg text-[#4F5B76] max-w-2xl mx-auto">
              Learn at your own pace and discover how AI and digital tools<br className="hidden md:block" />can help you grow
            </p>
          </div>

          <div className="space-y-24 lg:space-y-32">

            {/* Step 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <div className="order-2 lg:order-1 lg:pr-10">
                <h3 className="text-[22px] font-medium leading-[32px] tracking-[-0.3px] lg:text-[28px] mb-4">
                  Step 1: Get your personal learning plan
                </h3>
                <p className="text-[15px] md:text-[16px] text-[#4F5B76] leading-relaxed">
                  You begin by defining your unique goals and needs. From there, a personalized learning plan is created to help you focus on the most relevant skills and tools, ensuring you stay on track and motivated.
                </p>
              </div>
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                {/* Step 1 Mockup */}
                <div className="w-full max-w-[420px] bg-[#42444b] rounded-2xl shadow-xl border border-[#E3E3E3]/10 p-8">
                  <h4 className="text-white text-[24px] font-bold mb-2">Your Plan is Ready!</h4>
                  <p className="text-white/80 text-[14px] leading-relaxed mb-6 pr-4">
                    Let&apos;s dive into the steps you&apos;ll take to become an AI expert and integrate these powerful tools into your daily life.
                  </p>
                  <div className="w-full h-[1px] bg-white/10 mb-8"></div>
                  <div className="flex justify-between items-center mb-10">
                    <span className="text-white text-[20px] font-bold">AI Mastery</span>
                    <span className="bg-[#5653FE] text-white text-[11px] font-semibold px-3 py-1.5 rounded-full">28 modules</span>
                  </div>

                  <div className="flex justify-between items-start relative mt-16 pb-2">
                    <div className="absolute left-[10%] right-[10%] top-[24px] h-[2px] bg-white/10 -z-10"></div>
                    <div className="absolute left-[10%] w-[10%] top-[24px] h-[2px] bg-[#5653FE] -z-10"></div>

                    {/* Active Node */}
                    <div className="flex flex-col items-center relative z-10 w-1/4">
                      <div className="absolute -top-[52px] bg-white text-[#24234C] text-[12px] font-bold px-3 py-1.5 rounded shadow-lg flex flex-col items-center whitespace-nowrap">
                        You&apos;re here
                        <div className="absolute -bottom-[4px] w-2.5 h-2.5 bg-white rotate-45"></div>
                      </div>
                      <div className="w-[48px] h-[48px] bg-[#5653FE] rounded-lg flex items-center justify-center shadow-lg mb-3 border-[3px] border-[#42444b]">
                        <Star fill="white" className="text-white" size={24} strokeWidth={1} />
                      </div>
                      <span className="text-white text-[11px] font-medium text-center">Start here</span>
                    </div>

                    {/* Node 1 */}
                    <div className="flex flex-col items-center relative z-10 w-1/4">
                      <div className="w-[48px] h-[48px] bg-[#00A67E]/20 rounded-lg flex items-center justify-center border-[3px] border-[#42444b] mb-3 overflow-hidden relative">
                        <div className="w-[28px] h-[28px] rounded-full border border-white/20 flex flex-col items-center justify-center">
                          <Lock className="text-white/40 mb-1" size={10} />
                        </div>
                      </div>
                      <span className="text-white text-[11px] font-medium text-center">Step 1</span>
                    </div>

                    {/* Node 2 */}
                    <div className="flex flex-col items-center relative z-10 w-1/4">
                      <div className="w-[48px] h-[48px] bg-black/40 rounded-lg flex items-center justify-center border-[3px] border-[#42444b] mb-3">
                        <Lock className="text-white/40" size={12} />
                      </div>
                      <span className="text-white/70 text-[11px] font-medium text-center">Step 2</span>
                    </div>

                    {/* Node 3 */}
                    <div className="flex flex-col items-center relative z-10 w-1/4">
                      <div className="w-[48px] h-[48px] bg-[#8B8D93]/40 rounded-lg flex items-center justify-center border-[3px] border-[#42444b] mb-3">
                        <Lock className="text-white/40" size={16} />
                      </div>
                      <span className="text-white/70 text-[11px] font-medium text-center">Step 3</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <div className="flex justify-center lg:justify-start">
                {/* Step 2 Mockup */}
                <div className="w-full max-w-[400px] bg-white rounded-2xl shadow-xl border border-[#E3E3E3] p-8 relative overflow-hidden h-[420px] flex items-center justify-center">
                  <div className="relative w-full h-[360px]">
                    {/* SVG Path */}
                    <svg className="absolute inset-0 w-full h-full -z-10" style={{ stroke: '#4ADE80', strokeWidth: 4, fill: 'none' }}>
                      <path d="M 230 -20 L 230 110 L 80 110 L 80 200 L 230 200 L 230 290 L 80 290 L 80 400" />
                    </svg>

                    {/* Nodes via precise positioning */}
                    {/* Top Right Check */}
                    <div className="absolute top-[20px] right-[70px] w-[60px] h-[60px] bg-[#4ADE80] rounded-[18px] flex items-center justify-center shadow-sm overflow-hidden">
                      <Check className="text-white relative z-10" strokeWidth={3} size={32} />
                      <div className="absolute inset-0 bg-black/10" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 100%)' }}></div>
                    </div>

                    {/* Main Purple Banner */}
                    <div className="absolute top-[80px] left-[-20px] right-[-20px] bg-[#5653FE] rounded-xl p-5 shadow-lg z-10 border border-white/10">
                      <p className="text-white/80 text-[10px] font-bold tracking-widest mb-1.5 uppercase">AI MASTERY • MIDJOURNEY: LEVEL 3</p>
                      <h4 className="text-white font-bold text-lg">Master to MidJourney</h4>
                    </div>
                    <span className="absolute top-[170px] left-[15px] text-center text-[12px] text-[#4F5B76] font-medium bg-white px-1 leading-tight">Composition for<br />Marketing</span>

                    {/* Middle Right Check */}
                    <div className="absolute top-[170px] right-[70px] w-[60px] h-[60px] bg-[#4ADE80] rounded-[18px] flex items-center justify-center shadow-sm overflow-hidden z-10 border-[4px] border-white">
                      <Check className="text-white relative z-10" strokeWidth={3} size={32} />
                      <div className="absolute inset-0 bg-black/10" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 100%)' }}></div>
                    </div>
                    <span className="absolute top-[245px] right-[65px] text-center text-[12px] text-[#4F5B76] font-medium bg-white px-1 leading-tight">Ethics in AI Art</span>

                    {/* Bottom Left Trophy */}
                    <div className="absolute top-[260px] left-[50px] w-[60px] h-[60px] bg-[#4ADE80] rounded-[18px] flex items-center justify-center shadow-sm overflow-hidden z-10">
                      <Trophy className="text-white relative z-10" strokeWidth={2.5} size={28} />
                      <div className="absolute inset-0 bg-black/10" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 100%)' }}></div>
                    </div>
                    <span className="absolute top-[335px] left-[35px] text-center text-[12px] text-[#4F5B76] font-medium bg-white px-1 leading-tight">Advanced<br />Discord Features</span>
                  </div>
                </div>
              </div>
              <div className="lg:pl-10">
                <h3 className="text-[22px] font-medium leading-[32px] tracking-[-0.3px] lg:text-[28px] mb-4">
                  Step 2: Learn the skills you need
                </h3>
                <p className="text-[15px] md:text-[16px] text-[#4F5B76] leading-relaxed">
                  Our easy-to-follow lessons will guide you through practical, hands-on learning. You&apos;ll master the AI tools and other skills that fit your goals, making learning simple and efficient—without overwhelming you.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <div className="order-2 lg:order-1 lg:pr-10">
                <h3 className="text-[22px] font-medium leading-[32px] tracking-[-0.3px] lg:text-[28px] mb-4">
                  Step 3: Master AI for your goals
                </h3>
                <p className="text-[15px] md:text-[16px] text-[#4F5B76] leading-relaxed">
                  Once you&apos;ve learned the basics, you&apos;ll dive deeper into applying AI to achieve your personal and professional objectives.
                </p>
              </div>
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                {/* Step 3 Mockup */}
                <div className="w-full max-w-[420px] bg-white rounded-xl shadow-xl border border-[#E3E3E3] overflow-hidden flex flex-col">
                  <div className="p-5 border-b border-[#E3E3E3] flex gap-3 items-start bg-white">
                    <div className="w-[18px] h-[18px] rounded-full bg-[#FDBA31] shrink-0 mt-1"></div>
                    <p className="text-[14px] text-[#24234C] font-medium leading-[1.6]">
                      /imagine Artwork in the style of anime portraits
                    </p>
                  </div>
                  <div className="relative bg-[#F3F4F6] w-full p-4 border-b border-[#00A67E] border-b-[3px]">
                    <div className="absolute top-6 left-6 w-5 h-5 bg-white rounded-md shadow flex items-center justify-center z-10">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-[#4F5B76]"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
                    </div>
                    <div className="flex w-full gap-0 h-[220px]">
                      <img src="https://images.unsplash.com/photo-1601814933824-fd0b574dd592?q=80&w=400&auto=format&fit=crop" className="w-1/2 h-full object-cover rounded-l p-0.5 bg-white" alt="AI art 1" />
                      <img src="https://images.unsplash.com/photo-1544502062-f82887f03d1c?q=80&w=400&auto=format&fit=crop" className="w-1/2 h-full object-cover rounded-r p-0.5 bg-white contrast-125 saturate-50 brightness-75 hue-rotate-180" alt="AI art 2" />
                    </div>
                  </div>
                  <div className="p-7 bg-white relative">
                    <div className="flex items-center gap-2.5 mb-2">
                      <CheckCircle2 className="text-white fill-[#00A67E]" size={26} />
                      <h4 className="text-[#24234C] text-[22px] font-bold">Amazing!</h4>
                    </div>
                    <p className="text-[#4F5B76] text-[14px] mb-6">You&apos;re right on track with your approach</p>
                    <button className="w-full bg-[#16B364] text-white font-semibold py-3.5 rounded-xl hover:bg-[#15A15A] transition-colors text-[16px]">
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-[28px] font-medium leading-[32px] tracking-[-1px] lg:text-[42px] lg:leading-[52px] text-[#24234C] mb-4">
            Mind Mentor in action
          </h2>
          <p className="text-lg text-[#4F5B76] mb-16 md:mb-20 max-w-2xl mx-auto">
            See how Mind Mentor empowers learners: our success in numbers
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 relative z-20">
            {stats.map((stat, i) => (
              <AnimatedStat key={i} {...stat} />
            ))}
          </div>

          {/* World Map Graphic */}
          <div className="mt-16 md:mt-24 w-full h-[300px] sm:h-[400px] flex justify-center items-center opacity-30 pointer-events-none mix-blend-multiply transition-opacity">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg"
              alt="Dotted World Map Graphic"
              className="w-full h-full object-contain filter grayscale"
              style={{
                maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
              }}
            />
          </div>
        </div>
      </section>

      {/* Earn a Certificate Section */}
      <section className="py-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-[#E3E3E3] bg-[linear-gradient(110deg,#F5F3FF_0%,#FFFFFF_45%,#FFF0E6_100%)] p-8 md:p-12 lg:p-16 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* Left Side: Copy & CTA */}
              <div className="order-2 lg:order-1">
                <h2 className="font-semibold text-[#24234C] text-[36px] md:text-4xl leading-[1.2] mb-6 tracking-tight">
                  Earn a certificate that<br className="hidden md:block" /> proves your AI skills
                </h2>
                <p className="text-[#4F5B76] text-lg mb-10 leading-relaxed max-w-[500px]">
                  Complete your AI course and receive a certificate to highlight your expertise. It's proof of the valuable skills you've gained to tackle challenges, achieve your goals, and move forward in your career or personal projects.
                </p>
                <Link href="/quiz" className="bg-[#5653FE] text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:-translate-y-1 hover:shadow-[0_12px_24px_-8px_rgba(86,83,254,0.5)] transition-all duration-300 w-max">
                  Get Certificate Today <ChevronRight size={20} strokeWidth={2.5} />
                </Link>
              </div>

              {/* Right Side: CSS Certificate Mockup */}
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="w-full max-w-[520px] aspect-[1.5] bg-white rounded-xl border border-[#E3E3E3] shadow-sm p-8 flex flex-col relative overflow-hidden">

                  {/* Header Row */}
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-[10px] font-semibold tracking-widest text-[#4F5B76] uppercase">Certificate</span>
                    <span className="text-[5px] text-[#4F5B76]/50 uppercase tracking-widest">Certificate ID: F4A7E283-A67 | 2026-06-15 14:30:00</span>
                  </div>

                  {/* Body Info */}
                  <div className="flex-1 flex flex-col justify-center relative z-10 w-full mt-2">
                    <h3 className="text-3xl font-bold text-[#24234C] mb-8 tracking-tight">[ChatGPT]</h3>

                    <div className="mb-1">
                      <span className="text-[9px] font-bold tracking-widest text-[#4F5B76]/70 uppercase">Issued to</span>
                    </div>
                    <h4 className="text-xl font-bold text-[#24234C] mb-4">Joshua H.</h4>

                    <p className="text-[7.5px] text-[#4F5B76] leading-[1.6] max-w-[55%] font-medium">
                      Awarded for the successful completion of the [ChatGPT], reflecting over [3 hours] of in-depth training and skill development.
                    </p>
                  </div>

                  {/* The Purple Seal Background */}
                  <div className="absolute right-6 top-[45%] -translate-y-1/2 w-44 h-44 flex items-center justify-center pointer-events-none">
                    {/* 16-Point Wavy Rosette SVG Path */}
                    <svg viewBox="0 0 100 100" className="w-full h-full text-[#EEF0FE] drop-shadow-sm" fill="currentColor" stroke="#8A88FF" strokeWidth="2.5">
                      <path d="M50 5 L58 12 L68 9 L73 18 L83 20 L84 30 L93 36 L89 45 L95 53 L86 59 L88 69 L78 72 L75 82 L65 82 L58 90 L50 84 L42 90 L35 82 L25 82 L22 72 L12 69 L14 59 L5 53 L11 45 L7 36 L16 30 L17 20 L27 18 L32 9 L42 12 Z" strokeLinejoin="round" />
                    </svg>
                    {/* Inner icon content */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-[4.5rem] h-[4.5rem] rounded-full border-[3px] border-[#5653FE] flex items-center justify-center">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#5653FE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2v20" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                          <path d="M22 12H2" /><path d="M19 17v-9.5A3.5 3.5 0 0 0 15.5 4h-7A3.5 3.5 0 0 0 5 7.5v9" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Footer Stats & Signatures */}
                  <div className="mt-10 flex items-end justify-between relative z-10 w-full mb-1">
                    {/* Left: Date & Length */}
                    <div className="flex gap-10">
                      <div className="flex flex-col">
                        <span className="text-[6.5px] text-[#4F5B76] mb-1.5 font-medium">Date of issue</span>
                        <span className="text-[8.5px] font-bold text-[#24234C] border-b border-[#E3E3E3] pb-0.5 min-w-[50px]">[14/10/2024]</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[6.5px] text-[#4F5B76] mb-1.5 font-medium">Course Length</span>
                        <span className="text-[8.5px] font-bold text-[#24234C] border-b border-[#E3E3E3] pb-0.5 min-w-[50px]">[3 hours]</span>
                      </div>
                    </div>

                    {/* Right: Signature Area */}
                    <div className="flex items-center gap-14 pr-2">
                      <div className="text-[#5653FE] font-bold text-[13px] opacity-80" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', letterSpacing: '-0.5px' }}>
                        Mind Mentor
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="h-7 w-[4.5rem] relative">
                          {/* Faux Handcrafted Signature SVG */}
                          <svg className="absolute bottom-1 w-full h-full stroke-[#24234C]" fill="none" viewBox="0 0 100 30" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 25 Q 15 5, 25 18 T 40 22 Q 50 10, 48 25 T 65 18 Q 75 0, 78 25 T 90 12" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                            <line x1="0" y1="28" x2="100" y2="28" stroke="#4F5B76" strokeWidth="0.5" strokeOpacity="0.5" />
                          </svg>
                        </div>
                        <span className="text-[5px] text-[#4F5B76] pt-1.5 w-16 text-center tracking-wide">Founders, Mind Mentor</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Block */}
      <section className="py-24 bg-white relative">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Area */}
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-[36px] md:text-4xl font-semibold text-[#24234C] mb-6">
              See how Mind Mentor changes lives
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <span className="text-[26px] font-medium text-[#24234C]">Excellent</span>
              <div className="flex gap-1 pt-0.5">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="w-9 h-9 bg-[#00B67A] flex items-center justify-center rounded-[2px]">
                    <Star fill="white" className="text-white" size={20} />
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[#4F5B76] text-[15px] mt-4 font-medium">
              Rated 4.5 / 5 based on <span className="underline decoration-[#4F5B76] underline-offset-2">98,879 reviews</span> on <Star fill="#00B67A" className="inline-block text-[#00B67A] -mt-1 ml-1" size={18} /> <span className="font-bold text-[#1C1C1C]">Trustpilot</span>
            </p>
          </div>

          <div className="flex justify-between items-end mb-6">
            <p className="text-[#4F5B76] text-[15px]">Showing our favorite reviews</p>
            {/* Scroll Nav */}
            <div className="flex gap-2">
              <button
                onClick={scrollLeftNav}
                className="w-10 h-10 rounded-full border border-[#E3E3E3] flex items-center justify-center text-[#24234C] hover:bg-gray-50 transition-colors"
                aria-label="Previous testimonials"
              >
                <ChevronLeft size={20} strokeWidth={2} />
              </button>
              <button
                onClick={scrollRightNav}
                className="w-10 h-10 rounded-full border border-[#E3E3E3] flex items-center justify-center text-[#24234C] hover:bg-gray-50 transition-colors"
                aria-label="Next testimonials"
              >
                <ChevronRight size={20} strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Carousel */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Hiding scrollbar specifically for webkit inside a scoped class or inline */}
            <style jsx>{`
              div::-webkit-scrollbar { display: none; }
            `}</style>

            {reviewsList.map((review) => (
              <div
                key={review.id}
                className="snap-start shrink-0 w-[300px] sm:w-[350px] md:w-[400px] bg-white rounded-2xl p-8 border border-[#E3E3E3] shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-[2px]">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`w-5 h-5 flex items-center justify-center rounded-[2px] ${i < review.rating ? 'bg-[#00B67A]' : 'bg-gray-200'}`}>
                          <Star size={12} fill="white" className="text-white" />
                        </div>
                      ))}
                    </div>
                    <span className="text-[#4F5B76] text-xs font-medium flex items-center gap-1">
                      <CheckCircle2 size={12} className="text-[#4F5B76]" /> Invited
                    </span>
                  </div>
                  <div className="flex gap-1 items-baseline mb-2">
                    <span className="font-bold text-[#24234C] text-[13px]">{review.name},</span>
                    <span className="text-[#4F5B76] text-[12px]">{review.date}</span>
                  </div>
                  <h3 className="font-bold text-[17px] text-[#24234C] mb-3 leading-snug">{review.title}</h3>
                  <p className="text-[#4F5B76] text-[14px] leading-relaxed relative">
                    {review.text}
                  </p>
                  <button className="text-[#00B67A] text-[13px] font-medium underline underline-offset-2 mt-4 hover:text-[#009b68] transition-colors">
                    Read more
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 28-day Challenge Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full rounded-[2.5rem] border border-[#E3E3E3] shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-[radial-gradient(ellipse_at_top_left,_#F4F4FF_0%,_#FFFFFF_60%,_#FFFFFF_100%)] p-10 md:p-16 relative overflow-hidden">

            {/* Header Area */}
            <div className="w-full mb-8 mx-auto">
              <h2 className="text-[32px] md:text-3xl font-semibold text-[#24234C] leading-tight tracking-tight">
                Learn new AI every day in our 28-day Challenge
              </h2>
              <p className="text-[#4F5B76] text-lg leading-relaxed mt-2">
                Don't let your goals overwhelm you. Learn AI skills tailored to your needs and everyday tasks.
              </p>
            </div>

            {/* Category / Row Label */}
            <div className="border-b-[1px] border-[#5653FE] border-opacity-40 mb-8 pb-[15px]">
              <h3 className="font-bold sm:text-[22px] sm:leading-[30px]">AI Mastery</h3>
              {/* <div className="w-full h-[1px] bg-[#E3E3E3]/80"></div> */}
            </div>

            {/* Cards Row (Horizontally Scrollable) */}
            <div className="flex gap-4 md:gap-6 overflow-x-auto pb-5 snap-x -mx-4 px-4 sm:mx-0 sm:px-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <style jsx>{`
                div::-webkit-scrollbar { display: none; }
              `}</style>

              {/* Day 1: ChatGPT */}
              <div className="flex flex-col items-center gap-3 shrink-0 snap-start">
                <div className="w-[100px] h-[100px] bg-[#10A37F] rounded-2xl flex items-center justify-center shadow-sm relative overflow-hidden">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM12 20a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-[#4F5B76]">Day 1</span>
              </div>

              {/* Day 2: Chat Avatar */}
              <div className="flex flex-col items-center gap-3 shrink-0 snap-start">
                <div className="w-[100px] h-[100px] bg-[#151B26] rounded-2xl flex items-center justify-center shadow-sm">
                  <div className="w-[50px] h-[50px] rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center relative overflow-hidden">
                    <div className="w-[30px] h-[20px] bg-white/20 rounded-full blur-[2px] absolute bottom-2"></div>
                    <div className="w-2 h-2 rounded-full bg-white absolute top-3 left-3 shadow"></div>
                    <div className="w-2 h-2 rounded-full bg-white absolute top-3 right-3 shadow"></div>
                    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 absolute bottom-2 stroke-white stroke-2"><path d="M7 14s2 3 5 3 5-3 5-3" strokeLinecap="round" /></svg>
                  </div>
                </div>
                <span className="text-sm font-medium text-[#4F5B76]">Day 2</span>
              </div>

              {/* Day 3: Midjourney Sailboat */}
              <div className="flex flex-col items-center gap-3 shrink-0 snap-start">
                <div className="w-[100px] h-[100px] bg-[#F7F7F8] rounded-2xl flex items-center justify-center shadow-sm border border-[#E3E3E3]/50">
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#24234C" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 18H2M10 18l-3-8 5-6 7 14M8 18l-3-4 3-2" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-[#4F5B76]">Day 3</span>
              </div>

              {/* Day 4: Otter.ai */}
              <div className="flex flex-col items-center gap-3 shrink-0 snap-start">
                <div className="w-[100px] h-[100px] bg-[#1B64F2] rounded-2xl flex flex-col items-center justify-center shadow-sm">
                  <div className="flex gap-1 mb-1 items-end">
                    <div className="w-[12px] h-[12px] rounded-full bg-white"></div>
                    <div className="w-[5px] h-[18px] rounded-full bg-white"></div>
                    <div className="w-[5px] h-[10px] rounded-full bg-white"></div>
                  </div>
                  <span className="text-white text-[10px] font-bold tracking-tight">Otter.ai</span>
                </div>
                <span className="text-sm font-medium text-[#4F5B76]">Day 4</span>
              </div>

              {/* Day 5: Multi-color Ribbon */}
              <div className="flex flex-col items-center gap-3 shrink-0 snap-start">
                <div className="w-[100px] h-[100px] bg-[#2F2F2F] rounded-2xl flex items-center justify-center shadow-sm overflow-hidden relative">
                  <div className="w-10 h-10 border-4 border-yellow-400 rounded-[10px] absolute -top-1 -left-1 opacity-80 blur-[1px]"></div>
                  <div className="w-10 h-10 border-4 border-pink-500 rounded-[10px] absolute top-5 left-3 blur-[0.5px]"></div>
                  <div className="w-10 h-10 border-4 border-blue-400 rounded-[10px] absolute top-1 right-2 blur-[0.5px]"></div>
                </div>
                <span className="text-sm font-medium text-[#4F5B76]">Day 5</span>
              </div>

              {/* Day 6: Gemini */}
              <div className="flex flex-col items-center gap-3 shrink-0 snap-start">
                <div className="w-[100px] h-[100px] bg-[#F4F8FF] rounded-2xl flex items-center justify-center shadow-sm border border-blue-50">
                  <span className="text-[#4D85F4] font-medium tracking-tight text-[18px]" style={{ fontFamily: 'sans-serif' }}>
                    <span className="text-[#4285F4]">G</span>
                    <span className="text-[#EA4335]">e</span>
                    <span className="text-[#FBBC04]">m</span>
                    <span className="text-[#4285F4]">i</span>
                    <span className="text-[#34A853]">n</span>
                    <span className="text-[#EA4335]">i</span>
                  </span>
                </div>
                <span className="text-sm font-medium text-[#4F5B76]">Day 6</span>
              </div>

              {/* Day 7: Writesonic (WS) */}
              <div className="flex flex-col items-center gap-3 shrink-0 snap-start">
                <div className="w-[100px] h-[100px] bg-[#E1F1FF] rounded-2xl flex items-center justify-center shadow-sm">
                  <div className="w-[48px] h-[36px] bg-gradient-to-r from-blue-500 to-purple-600 rounded-[8px] flex items-center justify-center transform -skew-x-[15deg]">
                    <span className="text-white font-bold italic text-[14px] transform skew-x-[15deg]">WS</span>
                  </div>
                </div>
                <span className="text-sm font-medium text-[#4F5B76]">Day 7</span>
              </div>

              {/* Day 8: Grammarly (G) */}
              <div className="flex flex-col items-center gap-3 shrink-0 snap-start">
                <div className="w-[100px] h-[100px] bg-[#22C55E] rounded-2xl flex items-center justify-center shadow-sm overflow-hidden relative">
                  <div className="w-[60px] h-[60px] rounded-full border-[8px] border-white/90 border-t-transparent -rotate-45 relative">
                    <div className="absolute right-0 top-1 w-[8px] h-4 bg-white/90 rotate-45 rounded-[2px]"></div>
                  </div>
                </div>
                <span className="text-sm font-medium text-[#4F5B76]">Day 8</span>
              </div>
            </div>

            {/* Animated Feature Tags */}
            <div className="flex flex-wrap justify-center gap-3 lg:gap-4 mt-6 mb-8">
              {["AI Skills", "Business Growth", "Boost Productivity", "Save Time", "Advance Career"].map((tag, idx) => (
                <motion.div
                  key={idx}
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    delay: idx * 0.4
                  }}
                  className="bg-white rounded-full px-5 py-2.5 flex items-center gap-2.5 border border-[#E3E3E3] shadow-sm hover:shadow-md transition-shadow cursor-default"
                >
                  <Check size={14} strokeWidth={3} className="text-[#00B67A]" />
                  <span className="text-[13px] md:text-[14px] font-semibold text-[#4F5B76]">{tag}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex justify-center mt-4 mb-2">
              <Link href="/quiz" className="bg-[#5653FE] text-white px-10 py-4 rounded-full font-semibold flex items-center gap-2 hover:-translate-y-1 hover:shadow-[0_12px_24px_-8px_rgba(86,83,254,0.5)] transition-all duration-300 w-full sm:w-auto justify-center text-[16px]">
                Join Our Challenge
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

            {/* Left Column: Heading */}
            <div>
              <h2 className="text-4xl md:text-5xl font-semibold text-[#24234C] leading-tight tracking-tight">
                Frequently asked questions
              </h2>
              <p className="text-[#4F5B76] text-lg mt-6 leading-relaxed">
                Find answers to common questions about Mind Mentor
              </p>
            </div>

            {/* Right Column: Accordion */}
            <div className="flex flex-col">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="border-t border-[#E3E3E3] first:border-0 lg:first:border-t"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full flex justify-between items-center py-6 md:py-8 text-left group hover:bg-gray-50/50 transition-colors"
                    >
                      <h3 className="text-xl md:text-[22px] font-semibold text-[#24234C] pr-8 leading-snug">
                        {faq.question}
                      </h3>
                      <div className="shrink-0 text-[#24234C] cursor-pointer">
                        {isOpen ? <Minus size={24} strokeWidth={2} /> : <Plus size={24} strokeWidth={2} />}
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="text-[#4F5B76] text-lg leading-relaxed pb-8 pr-12">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* Join 300,000+ Learners Section */}
      <section className="py-24 bg-[#FCFCFD] relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Top Grid: Headline + Avatar Orbit */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center mb-24">

            {/* Left: Copy */}
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-[52px] font-semibold text-[#24234C] leading-[1.15] mb-8 tracking-tight">
                Join 300,000+ learners around the world
              </h2>
              <div className="flex items-center gap-2 text-[#4F5B76] text-[17px]">
                More than 16,000+
                <div className="bg-[#00B67A] px-2 py-0.5 rounded-[3px] flex items-center justify-center gap-1 mx-1">
                  <span className="text-white font-bold text-sm">5</span>
                  <Star fill="white" className="text-white" size={12} />
                </div>
                on Trustpilot
              </div>
            </div>

            {/* Right: Avatar Orbit Concept */}
            <div className="relative flex justify-center lg:justify-end items-center h-[200px] w-full">
              {/* Concentric Circle Backdrops */}
              <div className="absolute w-[280px] h-[280px] rounded-full border border-[#E3E3E3]/50"></div>
              <div className="absolute w-[380px] h-[380px] rounded-full border border-[#E3E3E3]/30"></div>

              <div className="relative flex items-center justify-center z-10 w-full max-w-[400px]">

                {/* Laura Badge (Purple) */}
                <div className="absolute -top-10 left-6 z-20 animate-bounce" style={{ animationDuration: '3s' }}>
                  <div className="bg-[#5653FE] text-white px-4 py-1.5 rounded-full font-semibold text-sm shadow-md relative">
                    Laura
                    <svg className="absolute -bottom-2 right-4 w-4 h-4 text-[#5653FE] fill-current" viewBox="0 0 24 24"><path d="M24 0L12 24 0 0h24z" /></svg>
                  </div>
                </div>

                {/* Avatars Container */}
                <div className="flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=150&auto=format&fit=crop" alt="avatar" className="w-[72px] h-[72px] rounded-full object-cover border-4 border-white shadow-sm z-[1] transform scale-90 translate-x-8" />
                  <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop" alt="avatar" className="w-[86px] h-[86px] rounded-full object-cover border-4 border-white shadow-md z-[2] transform scale-95 translate-x-4" />
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop" alt="avatar" className="w-[100px] h-[100px] rounded-full object-cover border-4 border-white shadow-lg z-[3]" />
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop" alt="avatar" className="w-[86px] h-[86px] rounded-full object-cover border-4 border-white shadow-md z-[2] transform scale-95 -translate-x-4" />
                  <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop" alt="avatar" className="w-[72px] h-[72px] rounded-full object-cover border-[3px] border-white shadow-sm z-[1] transform scale-90 -translate-x-8" />
                </div>

                {/* Luke Badge (Green) */}
                <div className="absolute -bottom-12 right-12 z-20 animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
                  <div className="bg-[#00B67A] text-white px-6 py-2 rounded-full font-semibold text-lg shadow-lg relative">
                    Luke
                    <svg className="absolute -top-3 left-2 w-5 h-5 text-[#00B67A] fill-current transform rotate-180" viewBox="0 0 24 24"><path d="M24 0L12 24 0 0h24z" /></svg>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Narrow Review Slider */}
          <div className="relative mb-12 flex items-center group">
            {/* Left Nav */}
            <button
              onClick={scrollLeftNavNarrow}
              className="absolute -left-6 lg:-left-12 z-20 w-10 h-10 bg-white rounded-full border border-[#E3E3E3] flex items-center justify-center text-[#4F5B76] hover:bg-gray-50 hover:text-[#24234C] shadow-sm transition-all"
              aria-label="Previous narrow testimonials"
            >
              <ChevronLeft size={20} strokeWidth={2} />
            </button>

            {/* Slider Wrapper */}
            <div
              ref={scrollRefNarrow}
              className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory pt-2 scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>

              {narrowReviews.map((review) => (
                <div
                  key={review.id}
                  className="snap-start shrink-0 w-[270px] bg-white rounded-2xl p-6 border border-[#E3E3E3]/80 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex gap-[1px]">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={`w-[18px] h-[18px] flex items-center justify-center rounded-[2px] ${i < review.rating ? 'bg-[#00B67A]' : 'bg-gray-200'}`}>
                            <Star size={11} fill="white" className="text-white" />
                          </div>
                        ))}
                      </div>
                      <span className="text-[#4F5B76] text-[11px] font-medium flex items-center gap-1 leading-none pt-0.5">
                        <CheckCircle2 size={11} className="text-[#4F5B76]" /> Invited
                      </span>
                    </div>
                    <h3 className="font-bold text-[15px] text-[#24234C] mb-2 leading-snug">{review.title}</h3>
                    <p className="text-[#4F5B76] text-[13px] leading-relaxed line-clamp-3">
                      {review.text}
                    </p>
                  </div>
                  <div className="flex items-baseline gap-1 mt-6">
                    <span className="font-bold text-[#24234C] text-[11px]">{review.name},</span>
                    <span className="text-[#4F5B76] text-[11px]">{review.date}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Nav */}
            <button
              onClick={scrollRightNavNarrow}
              className="absolute -right-6 lg:-right-12 z-20 w-10 h-10 bg-white rounded-full border border-[#E3E3E3] flex items-center justify-center text-[#4F5B76] hover:bg-gray-50 hover:text-[#24234C] shadow-sm transition-all"
              aria-label="Next narrow testimonials"
            >
              <ChevronRight size={20} strokeWidth={2} />
            </button>
          </div>

          {/* Global Rating Footer */}
          <div className="text-center flex flex-col sm:flex-row items-center justify-center gap-2">
            <p className="text-[#24234C] text-[14px] font-medium tracking-tight">
              Rated 4.5 / 5 based on <span className="underline decoration-[#4F5B76] underline-offset-2">98,879 reviews</span>. Showing our favorite reviews.
            </p>
            <div className="flex items-center gap-1">
              <Star fill="#00B67A" className="text-[#00B67A]" size={20} />
              <span className="font-bold text-[#1C1C1C] text-[15px]">Trustpilot</span>
            </div>
          </div>
        </div>
      </section>

      {/* Start your AI journey CTA Section */}
      <section className="pt-24 pb-40 lg:pb-48 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#F4F1FF] via-white to-white relative">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Double Border Look Container */}
          <div className="bg-white rounded-[2.5rem] border border-[#E3E3E3] p-10 md:p-18 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">

              {/* Left Side: Copy & CTA */}
              <div className="max-w-xl mb-10 md:mb-18">
                <h2 className="text-4xl md:text-[48px] leading-[1.1] font-semibold text-[#24234C] mb-6 tracking-tight">
                  Start your AI journey with Mind Mentor today!
                </h2>
                <p className="text-[#4F5B76] text-lg md:text-xl mb-10 leading-relaxed">
                  Learn today, take control of your future, and build new skills in AI and digital tools
                </p>
                <Link href="/quiz" className="bg-[#5653FE] text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:-translate-y-1 hover:shadow-[0_12px_24px_-8px_rgba(86,83,254,0.5)] transition-all duration-300 w-full sm:w-auto justify-center text-[16px]">
                  Start Now <ChevronRight size={20} strokeWidth={2.5} />
                </Link>
              </div>

              {/* Right Side: Phone Mockup */}
              <div className="flex justify-center relative z-20">
                {/* Outer Phone Frame */}
                <div className="relative w-[300px] h-[550px] bg-[#F8F9FB] rounded-[48px] border-[14px] border-[#1C1C1C] shadow-2xl overflow-hidden flex flex-col">

                  {/* Dynamic Island Notch */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-[90px] h-[26px] bg-[#1C1C1C] rounded-full z-20 flex items-center justify-end px-3">
                    <div className="w-[10px] h-[10px] bg-[#0A0A0A] rounded-full border border-gray-800"></div>
                  </div>

                  {/* Top Status Bar Content */}
                  <div className="pt-4 px-6 flex justify-between items-center text-[#1C1C1C] text-[12px] font-semibold font-sans z-10 relative bg-white">
                    <span>9:41</span>
                    <div className="flex gap-1.5 items-center">
                      {/* Signal */}
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" /></svg>
                      {/* Battery */}
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" /></svg>
                    </div>
                  </div>

                  {/* App Header */}
                  <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100 relative z-10 shadow-sm">
                    <ChevronLeft size={20} className="text-gray-500" />
                    <span className="font-semibold text-[13px] flex items-center gap-1">ChatGPT <ChevronRight size={14} className="rotate-90 text-gray-400" /></span>
                    <div className="w-5"></div>
                  </div>

                  {/* App Body Content */}
                  <div className="flex-1 p-4 flex flex-col items-center bg-[#FAFBFF] relative isolate">

                    {/* Flow Tree Lines (SVG - Placed behind content) */}
                    <svg className="absolute w-full h-[400px] top-[110px] left-0 pointer-events-none -z-10" style={{ stroke: '#E3E3E3', strokeWidth: 3, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }}>
                      {/* Vertical line from basic block downwards */}
                      <path d="M60 20 L60 250" />
                      {/* Horizontal bridge to right block */}
                      <path d="M60 40 L190 40" stroke="#00B67A" strokeWidth="2.5" />
                      {/* Vertical line down to right block */}
                      <path d="M190 40 L190 80" />
                    </svg>

                    {/* Purple Main Card */}
                    <div className="w-full bg-[#5653FE] rounded-xl p-4 text-white shadow-md relative z-10 mt-2">
                      <div className="text-[9px] font-bold tracking-wider opacity-80 mb-1 flex items-center gap-2">
                        <span>AI MASTERY</span>
                        <span className="w-1 h-1 rounded-full bg-white/50"></span>
                        <span>CHATGPT: LEVEL 1</span>
                      </div>
                      <h3 className="font-bold text-[17px] leading-tight mb-2 tracking-tight">ChatGPT Foundations</h3>

                      {/* Floating Play Button Overlap - Aligned Left */}
                      <div className="absolute -bottom-8 left-6 w-[56px] h-[56px] bg-[#F8F9FB] rounded-[18px] shadow-[0_4px_12px_rgba(0,0,0,0.08)] border-2 border-white flex flex-col items-center justify-center p-1 z-20">
                        <span className="text-[10px] font-bold text-[#24234C] mt-0.5">Start</span>
                        <div className="w-8 h-8 rounded-full bg-[#5653FE] text-white flex items-center justify-center -mb-1 shadow border-[2px] border-[#F8F9FB]">
                          <svg className="w-3.5 h-3.5 ml-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                      </div>
                    </div>

                    {/* Basic Usage Label */}
                    <div className="self-start mt-10 ml-[22px] text-[11px] text-[#4F5B76] font-medium tracking-tight">Basic usage</div>

                    {/* Second Module: Right Offset Block */}
                    <div className="absolute top-[200px] right-[42px] w-[60px] h-[60px] bg-[#F8F9FB] border-[2px] border-[#E3E3E3] rounded-2xl flex flex-col items-center justify-center shadow-sm">
                      <BookOpen size={24} className="text-[#A2A8B6]" strokeWidth={2} />
                    </div>
                    {/* Text block for second module */}
                    <div className="absolute top-[270px] right-[24px] text-[10px] text-[#4F5B76] text-center font-medium leading-tight max-w-[90px]">Crafting Simple Prompts</div>

                    {/* Third Module: Bottom Left Block */}
                    <div className="absolute top-[350px] left-8 w-[60px] h-[60px] bg-[#F8F9FB] border-[2px] border-[#E3E3E3] rounded-2xl flex flex-col items-center justify-center shadow-sm pointer-events-none opacity-60">
                      <BookOpen size={24} className="text-[#A2A8B6]" strokeWidth={2} />
                    </div>

                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
