"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, FlaskConical, Users, ShieldCheck, BookOpen, FileText, ChevronDown, ChevronUp } from "lucide-react";

export default function AboutPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Who is Mind Mentor for?",
      answer: "Anyone curious about AI, digital tools, or freelancing—from students to entrepreneurs."
    },
    {
      question: "How much time do I need?",
      answer: "Mind Mentor is designed around daily micro-training—bite-sized lessons that stick. You only need 5–10 minutes a day to start seeing real progress."
    },
    {
      question: "Do I need a tech background?",
      answer: "Not at all. Our lessons are written in plain English with zero jargon. We start from the basics and guide you every step of the way."
    },
    {
      question: "Is Mind Mentor free?",
      answer: "Mind Mentor offers a free tier to get you started, along with premium plans that unlock advanced features, guided playbooks, and priority support."
    }
  ];

  return (
    <>
      <section className="py-20 min-h-[80vh] bg-[#F9FAFB] bg-[radial-gradient(ellipse_at_center,_#F4F1FF_0%,_#F9FAFB_60%)] flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center w-full">

          {/* Founded Badge */}
          <div className="bg-[#E9E9FF] text-[#5653FE] px-4 py-1.5 rounded-full text-[13px] font-semibold flex items-center gap-2 mb-8 shadow-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-[#5653FE]"></div>
            Founded in 2026
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-semibold mb-6 tracking-tight">
            <span className="text-[#24234C]">About </span>
            <span className="text-[#5653FE]">Mind Mentor</span>
          </h1>

          {/* Subheadline */}
          <p className="text-[#4F5B76] text-xl max-w-[800px] leading-relaxed mb-12">
            Mind Mentor is a world leader in moblile-first EdTech learning, dedicated to empowering our users to build real AI skills through daily guided practice.
          </p>

          {/* Metric Cards */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full">

            {/* Left Card */}
            <div className="flex items-center gap-4 bg-white border border-[#E3E3E3] rounded-xl px-5 py-3 w-full sm:w-auto sm:min-w-[240px] shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
              <div className="w-12 h-12 rounded-[10px] bg-gradient-to-br from-[#16B364] to-[#3B82F6] flex items-center justify-center shadow-inner shrink-0">
                <span className="text-white font-bold text-[13px] tracking-tight">800k+</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[#24234C] font-bold text-[14px] leading-tight mb-0.5">Learners</span>
                <span className="text-[#4F5B76] text-[12px] leading-tight">Across platforms</span>
              </div>
            </div>

            {/* Right Card */}
            <div className="flex items-center gap-4 bg-white border border-[#E3E3E3] rounded-xl px-5 py-3 w-full sm:w-auto sm:min-w-[240px] shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
              <div className="w-12 h-12 rounded-[10px] bg-gradient-to-br from-[#EC4899] to-[#8B5CF6] flex items-center justify-center shadow-inner shrink-0">
                <span className="text-white font-bold text-[15px]">AI</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[#24234C] font-bold text-[14px] leading-tight mb-0.5">Powered</span>
                <span className="text-[#4F5B76] text-[12px] leading-tight">Learning platform</span>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* Our Story Section */}
      <section className="pt-24 pb-15 bg-white relative">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-16 lg:gap-24 items-start">

            {/* Left Column: Text Content (Approx 60%) */}
            <div className="lg:col-span-3">
              <h2 className="text-4xl font-semibold text-[#24234C] mb-8 tracking-tight">Our story</h2>

              <div className="space-y-6 text-lg text-[#4F5B76] leading-relaxed">
                <p>
                  Mind Mentor was born out of one big question:
                  <br />
                  <span className="italic">
                    "How can I learn to actually use AI in my work and life—without taking a course I'll never finish?"
                  </span>
                </p>
                <p>
                  Our approach combines daily challenges, practical tutorials, and personalized tracks to help anyone go from curious to confident — <span className="font-bold text-[#24234C]">one day at a time.</span>
                </p>
                <p>
                  Our founders—marketers, educators, and tech enthusiasts—saw the rise of AI and remote work, but at the same time saw a growing skills gap. So we built Mind Mentor: a micro-learning platform designed to help you master the most in-demand digital and AI skills without overwhelming your busy schedule.
                </p>
                <p>
                  What began as a small experiment with a handful of lessons grew into a global learning platform used by thousands of people each month.
                </p>
              </div>
            </div>

            {/* Right Column: Key Milestones Box (Approx 40%) */}
            <div className="lg:col-span-3 w-full">
              <div className="bg-[#EEF1FF] rounded-[2rem] p-10 shadow-sm border border-white/50">
                <h3 className="text-[22px] font-semibold text-[#24234C] mb-8">Key milestones</h3>

                <div className="space-y-8">
                  {/* Milestone 1 */}
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center font-bold shrink-0 mt-0.5 text-sm">
                      1
                    </div>
                    <div>
                      <div className="font-bold text-[#24234C] mb-0.5">2025</div>
                      <div className="text-[#4F5B76] text-[15px] leading-snug">
                        Founded and launched our first outcome — first lessons
                      </div>
                    </div>
                  </div>

                  {/* Milestone 2 */}
                  {/* <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-[#3B82F6] text-white flex items-center justify-center font-bold shrink-0 mt-0.5 text-sm">
                      2
                    </div>
                    <div>
                      <div className="font-bold text-[#24234C] mb-0.5">2024</div>
                      <div className="text-[#4F5B76] text-[15px] leading-snug">
                        Mobile app released and 100,000+ learners join!
                      </div>
                    </div>
                  </div> */}

                  {/* Milestone 2 */}
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-[#06B6D4] text-white flex items-center justify-center font-bold shrink-0 mt-0.5 text-sm">
                      2
                    </div>
                    <div>
                      <div className="font-bold text-[#24234C] mb-0.5">2026</div>
                      <div className="text-[#4F5B76] text-[15px] leading-snug">
                        Introduced guided playbooks and AI-assisted workflows
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* Our Vision Section */}
      <section className="bg-white pb-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[2rem] border border-[#E3E3E3] p-10 md:p-16 shadow-[0_2px_15px_rgba(0,0,0,0.03)] text-left">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#24234C] mb-6 tracking-tight">
              Our vision
            </h2>
            <div className="space-y-6 text-lg md:text-[19px] leading-relaxed">
              <p className="text-[#4F5B76] mb-3">
                To make world-class digital education accessible to anyone, anywhere — so learning a new skill is as easy as checking your notifications.
              </p>
              <p className="text-[#4F5B76]">
                <span className="font-bold text-[#4b5563]">We are building a world where using AI is second nature — </span>personalized, intuitive, and seamlessly integrated into how we learn, work and create.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="w-full bg-white flex justify-center py-4">
        <div className="w-full max-w-[1280px] mx-auto h-[1px] bg-[#E5E7EB]"></div>
      </div>

      {/* Mission & Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          <h2 className="text-3xl font-semibold text-[#24234C] mb-12 text-center tracking-tight">
            Mission & Values
          </h2>

          <div className="bg-[#FFFBEB] rounded-[2rem] border border-[#FDE68A] p-10 md:p-12 shadow-sm text-left">
            <p className="text-lg md:text-[19px] text-[#4F5B76] leading-relaxed mb-8 text-center md:text-left">
              <span className="font-bold text-[#F59E0B]">Mission:</span> <span className="text-center">We're here to <span className="font-bold text-[#24234C]">empower the next generation of learners</span>. Our mission is simple, to become the world's first AI Gym! We help our users to:</span>
            </p>

            <ul className="space-y-4 text-lg md:text-[19px] text-[#4F5B76] leading-relaxed">
              <li className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-2.5 shrink-0"></div>
                <span><span className="font-bold text-[#24234C]">Be consistent</span> - through daily hands on exercises.</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-2.5 shrink-0"></div>
                <span><span className="font-bold text-[#24234C]">Be personal</span> - by adjusting our approach based on individual learning needs and level.</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-2.5 shrink-0"></div>
                <span><span className="font-bold text-[#24234C]">Be goal oriented</span> - by having our user work towards daily progress & focus on actual AI tool usage.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="pb-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* Left Column: Core Values Cards */}
            <div>
              <h2 className="text-3xl font-semibold text-[#24234C] mb-8 tracking-tight">Core values</h2>

              <div className="flex flex-col gap-4">
                {/* Accessibility Card */}
                <div className="bg-white border border-[#E3E3E3] rounded-2xl p-6 flex items-center gap-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                  <div className="w-14 h-14 rounded-lg bg-[#8B5CF6] text-white flex items-center justify-center shrink-0">
                    <Zap size={24} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[17px] text-[#24234C] mb-1">Accessibility</h3>
                    <p className="text-[#4F5B76] text-[15px] leading-snug">
                      AI shouldn't feel elite. Everyone deserves access to the skills of the future.
                    </p>
                  </div>
                </div>

                {/* Clarity Card */}
                <div className="bg-white border border-[#E3E3E3] rounded-2xl p-6 flex items-center gap-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                  <div className="w-14 h-14 rounded-lg bg-[#3B82F6] text-white flex items-center justify-center shrink-0">
                    <FlaskConical size={24} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[17px] text-[#24234C] mb-1">Clarity</h3>
                    <p className="text-[#4F5B76] text-[15px] leading-snug">
                      Plain english. Real examples. Zero jargon.
                    </p>
                  </div>
                </div>

                {/* Progress over perfection Card */}
                <div className="bg-white border border-[#E3E3E3] rounded-2xl p-6 flex items-center gap-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                  <div className="w-14 h-14 rounded-lg bg-[#10B981] text-white flex items-center justify-center shrink-0">
                    <Users size={24} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[17px] text-[#24234C] mb-1">Progress over perfection</h3>
                    <p className="text-[#4F5B76] text-[15px] leading-snug">
                      One micro-task at a time.
                    </p>
                  </div>
                </div>

                {/* Empowerment Card */}
                <div className="bg-white border border-[#E3E3E3] rounded-2xl p-6 flex items-center gap-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                  <div className="w-14 h-14 rounded-lg bg-[#F97316] text-white flex items-center justify-center shrink-0">
                    <ShieldCheck size={24} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[17px] text-[#24234C] mb-1">Empowerment</h3>
                    <p className="text-[#4F5B76] text-[15px] leading-snug">
                      Every lesson is about building confidence, not just knowledge.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: What Makes Us Different */}
            <div className="h-full">
              <div className="bg-[#F9FAFB] rounded-[2rem] p-10 md:p-14 h-full flex flex-col border border-[#E3E3E3]/50">
                <h3 className="text-[26px] font-semibold text-[#24234C] mb-6 tracking-tight">
                  What makes us different
                </h3>
                <div className="space-y-6 text-[#4F5B76] text-lg leading-relaxed">
                  <p>
                    Most platforms overwhelm you with hour-long courses. We don't.
                  </p>
                  <p>
                    Mind Mentor is designed around <span className="font-bold text-[#24234C]">daily micro-training</span>—bite-sized lessons that stick. And with built-in support, you're not just memorizing; you're actually applying skills in real life.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="w-full bg-white flex justify-center py-4">
        <div className="w-full max-w-[1280px] mx-auto h-[1px] bg-[#E5E7EB]"></div>
      </div>

      {/* What We Do Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header & Introduction */}
          <div className="flex flex-col items-center justify-center text-center mb-16">
            <h2 className="text-4xl font-semibold text-[#24234C] mb-8 tracking-tight">What we do</h2>
            <div className="max-w-3xl space-y-6 text-[#4F5B76] text-lg leading-relaxed">
              <p>
                We teach AI, digital tools, and freelancing skills in a way that's <span className="font-bold text-[#24234C]">fun, fast, and practical</span>.
              </p>
              <p>
                Think of us as your personal AI tutor—always ready, never boring, and always rooting for you.
              </p>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Learning App Card */}
            <div className="bg-white border border-[#E3E3E3] rounded-2xl p-8 h-full shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 rounded-lg bg-[#7C3AED] text-white flex items-center justify-center mb-6 shrink-0">
                <BookOpen size={24} strokeWidth={2} />
              </div>
              <h3 className="font-semibold text-xl text-[#24234C] mb-4">Learning app</h3>
              <p className="text-[#4F5B76] leading-relaxed">
                Bite-size lessons, hands-on projects, and assessments across AI, content, marketing, research, automation, and more.
              </p>
            </div>

            {/* Guided Playbooks Card */}
            <div className="bg-white border border-[#E3E3E3] rounded-2xl p-8 h-full shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 rounded-lg bg-[#3B82F6] text-white flex items-center justify-center mb-6 shrink-0">
                <FileText size={24} strokeWidth={2} />
              </div>
              <h3 className="font-semibold text-xl text-[#24234C] mb-4">Guided playbooks</h3>
              <p className="text-[#4F5B76] leading-relaxed">
                Curated workflows and templates to ship your next campaign, client proposal, or product experiment.
              </p>
            </div>

            {/* Community & Support Card */}
            <div className="bg-white border border-[#E3E3E3] rounded-2xl p-8 h-full shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 rounded-lg bg-[#10B981] text-white flex items-center justify-center mb-6 shrink-0">
                <Users size={24} strokeWidth={2} />
              </div>
              <h3 className="font-semibold text-xl text-[#24234C] mb-4">Community & support</h3>
              <p className="text-[#4F5B76] leading-relaxed">
                Events, peer feedback, and expert guidance to help you keep momentum and achieve your goals.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Our Learning Process & Customer Problems Section */}
      <section className="pb-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Process Card */}
          <div className="bg-[#F9FAFB] rounded-[2rem] border border-[#E3E3E3] p-10 md:p-14 mb-20 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
            <h2 className="text-2xl font-semibold text-[#24234C] mb-10 text-left">
              Our learning process
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

              {/* Step 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-[60px] h-[60px] rounded-full bg-[#8B5CF6] text-white flex items-center justify-center font-bold text-xl mb-6 shadow-sm">
                  1
                </div>
                <h3 className="font-bold text-[17px] text-[#24234C] mb-3">Micro-Lessons</h3>
                <p className="text-[#4F5B76] text-[14px] leading-relaxed max-w-[220px]">
                  5–10 minutes each, designed for quick wins.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-[60px] h-[60px] rounded-full bg-[#3B82F6] text-white flex items-center justify-center font-bold text-xl mb-6 shadow-sm">
                  2
                </div>
                <h3 className="font-bold text-[17px] text-[#24234C] mb-3">Daily Practice</h3>
                <p className="text-[#4F5B76] text-[14px] leading-relaxed max-w-[220px]">
                  Consistency over cramming: like a gym for your brain.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-[60px] h-[60px] rounded-full bg-[#10B981] text-white flex items-center justify-center font-bold text-xl mb-6 shadow-sm">
                  3
                </div>
                <h3 className="font-bold text-[17px] text-[#24234C] mb-3">Real-World Tasks</h3>
                <p className="text-[#4F5B76] text-[14px] leading-relaxed max-w-[220px]">
                  Apply what you learn immediately with guided exercises.
                </p>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-[60px] h-[60px] rounded-full bg-[#F97316] text-white flex items-center justify-center font-bold text-xl mb-6 shadow-sm">
                  4
                </div>
                <h3 className="font-bold text-[17px] text-[#24234C] mb-3">AI Feedback</h3>
                <p className="text-[#4F5B76] text-[14px] leading-relaxed max-w-[220px]">
                  Smart nudges and personalized tips to keep you on track
                </p>
              </div>

            </div>
          </div>

          {/* How we solve customer problems Text Area */}
          <div className="max-w-7xl mx-auto md:text-left">
            <h2 className="text-2xl font-semibold text-[#24234C] mb-6">
              How we solve customer problems
            </h2>
            <div className="space-y-6 text-[#4F5B76] text-lg leading-relaxed">
              <p>
                We know how overwhelming it can be to navigate the ever-changing landscape of AI and digital tools. That's why we built a platform tailored to your schedule, providing practical, step-by-step guidance that actually <span className="italic text-[#24234C]">gets you</span> results.
              </p>
              <p>
                Instead of hour-long courses that sit unfinished, we focus on what you can achieve in minutes, helping you build a consistent habit for long-term career growth.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Separator */}
      <div className="w-full bg-white flex justify-center py-4">
        <div className="w-full max-w-[1280px] mx-auto h-[1px] bg-[#E5E7EB]"></div>
      </div>

      {/* Get in touch Section */}
      <section className="py-24 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-semibold text-[#24234C] mb-6 tracking-tight">
            Get in touch
          </h2>

          <div className="space-y-6 text-lg leading-relaxed text-[#4F5B76]">
            <p className="mx-auto max-w-lg">
              Got a question? Want to collaborate?<br className="hidden sm:block" />
              Or just curious about how Mind Mentor can help you level up?
            </p>

            <p>
              Email us anytime:{" "}
              <a
                href="mailto:support@acelucid.com"
                className="text-[#5653FE] font-medium hover:underline underline-offset-4 transition-all"
              >
                support@acelucid.com
              </a>
            </p>

            <p>
              Or find us on{" "}
              <a
                href="#"
                className="text-[#5653FE] font-medium hover:underline underline-offset-4 transition-all"
              >
                Instagram
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-[#5653FE] font-medium hover:underline underline-offset-4 transition-all"
              >
                Our Website
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Separator before FAQ */}
      <div className="w-full bg-white flex justify-center py-4">
        <div className="w-full max-w-[1280px] mx-auto h-[1px] bg-[#E5E7EB]"></div>
      </div>

      {/* FAQ Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-[#24234C] mb-4 tracking-tight">
              Frequently asked questions
            </h2>
            <p className="text-[#4F5B76] text-lg">
              Everything you need to know about Mind Mentor and how we can help you succeed.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white border border-[#E3E3E3] rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex justify-between items-center p-6 text-left transition-colors hover:bg-gray-50/50"
                  >
                    <span className="font-semibold text-[#24234C]">Q: {faq.question}</span>
                    <div className="text-[#4F5B76] shrink-0 ml-4 cursor-pointer">
                      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 text-[#4F5B76] leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
}
