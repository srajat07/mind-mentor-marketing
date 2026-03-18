"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

export default function ReviewsPage() {
  const [activePlatform, setActivePlatform] = useState<"google" | "trustpilot">("google");

  return (
    <>
      <section className="pb-24 md:pb-32 pt-15 bg-white flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-col items-center">

          <h1 className="text-4xl md:text-[52px] leading-[1.15] font-bold text-[#24234C] mb-12 tracking-tight">
            Mind Mentor Reviews:<br className="hidden sm:block" />
            119,000+ Real User Testimonials
          </h1>

          <div className="bg-[#FFFBEB] rounded-[2rem] border border-[#FDE68A] p-8 md:p-10 mb-12 flex flex-col items-center shadow-sm w-[340px] max-w-full">
            <div className="flex gap-1.5 mb-4">
              <Star fill="#FACC15" className="text-[#FACC15]" size={36} strokeWidth={1} />
              <Star fill="#FACC15" className="text-[#FACC15]" size={36} strokeWidth={1} />
              <Star fill="#FACC15" className="text-[#FACC15]" size={36} strokeWidth={1} />
              <Star fill="#FACC15" className="text-[#FACC15]" size={36} strokeWidth={1} />
              <div className="relative w-9 h-9">
                <Star className="absolute text-[#FACC15]" size={36} strokeWidth={1} />
                <div className="absolute inset-0 overflow-hidden w-[50%]">
                  <Star fill="#FACC15" className="text-[#FACC15]" size={36} strokeWidth={1} />
                </div>
              </div>
            </div>
            <div className="text-[#D97706] font-bold text-3xl md:text-4xl mb-1 mt-1">4.5 out of 5</div>
            <div className="text-[#92400E] text-[14px] font-medium mt-2">119,000+ reviews</div>
          </div>

          <p className="text-[#4F5B76] text-lg leading-relaxed max-w-3xl mx-auto">
            Real people. Real progress. At Mind Mentor, we're proud that our learners don't just <span className="italic">finish</span> our lessons — they actually use them to get ahead in their 9-5, studies, and side hustles. But don't just take our word for it. Here's what our community of more than 800,000 is saying across <span className="font-bold text-[#24234C]">Google Play</span> and <span className="font-bold text-[#24234C]">Trustpilot</span>.
          </p>

        </div>
      </section>

      {/* Reviews Across Platforms Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12">
            <h2 className="text-4xl font-semibold text-[#24234C] mb-4 tracking-tight">
              Reviews Across Platforms
            </h2>
            <p className="text-[#4F5B76] text-lg">
              Authentic feedback from learners across different platforms and communities.
            </p>
          </div>

          {/* Platform Selector (Top Row) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">

            {/* Google Play Card */}
            <div
              onClick={() => setActivePlatform("google")}
              className={`cursor-pointer bg-white rounded-2xl p-6 transition-all duration-300 ${activePlatform === "google"
                ? "border-2 border-[#5653FE] shadow-[0_0_20px_rgba(86,83,254,0.15)]"
                : "border border-[#E3E3E3] hover:border-[#5653FE]/50"
                }`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#10B981] to-[#3B82F6] shadow-inner flex shrink-0"></div>
                  <div>
                    <h3 className={`font-semibold text-[15px] ${activePlatform === "google" ? "text-[#5653FE]" : "text-[#24234C]"}`}>Google Play</h3>
                    <p className="text-[#4F5B76] text-[13px]">Android app reviews</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    <Star fill="#FACC15" className="text-[#FACC15]" size={16} strokeWidth={1} />
                    <Star fill="#FACC15" className="text-[#FACC15]" size={16} strokeWidth={1} />
                    <Star fill="#FACC15" className="text-[#FACC15]" size={16} strokeWidth={1} />
                    <Star fill="#FACC15" className="text-[#FACC15]" size={16} strokeWidth={1} />
                    <div className="relative w-4 h-4">
                      <Star className="absolute text-[#FACC15]" size={16} strokeWidth={1} />
                      <div className="absolute inset-0 overflow-hidden w-[50%]">
                        <Star fill="#FACC15" className="text-[#FACC15]" size={16} strokeWidth={1} />
                      </div>
                    </div>
                  </div>
                  <span className="font-bold text-[#24234C] text-[15px]">4.5</span>
                </div>
                <span className="text-[#4F5B76] text-[13px] font-medium">39,000</span>
              </div>
            </div>

            {/* Trustpilot Card */}
            <div
              onClick={() => setActivePlatform("trustpilot")}
              className={`cursor-pointer bg-white rounded-2xl p-6 transition-all duration-300 ${activePlatform === "trustpilot"
                ? "border-2 border-[#5653FE] shadow-[0_0_20px_rgba(86,83,254,0.15)]"
                : "border border-[#E3E3E3] hover:border-[#5653FE]/50"
                }`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#3B82F6] shadow-inner flex shrink-0"></div>
                  <div>
                    <h3 className={`font-semibold text-[15px] ${activePlatform === "trustpilot" ? "text-[#5653FE]" : "text-[#24234C]"}`}>Trustpilot</h3>
                    <p className="text-[#4F5B76] text-[13px] opacity-70">Independent reviews</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-2">
                  <div className={`flex gap-0.5 ${activePlatform === "trustpilot" ? "" : "opacity-60"}`}>
                    <Star fill="#FACC15" className="text-[#FACC15]" size={16} strokeWidth={1} />
                    <Star fill="#FACC15" className="text-[#FACC15]" size={16} strokeWidth={1} />
                    <Star fill="#FACC15" className="text-[#FACC15]" size={16} strokeWidth={1} />
                    <Star fill="#FACC15" className="text-[#FACC15]" size={16} strokeWidth={1} />
                    <div className="relative w-4 h-4">
                      <Star className="absolute text-[#FACC15]" size={16} strokeWidth={1} />
                      <div className="absolute inset-0 overflow-hidden w-[50%]">
                        <Star fill="#FACC15" className="text-[#FACC15]" size={16} strokeWidth={1} />
                      </div>
                    </div>
                  </div>
                  <span className={`font-bold text-[15px] ${activePlatform === "trustpilot" ? "text-[#24234C]" : "text-[#4F5B76]"}`}>4.5</span>
                </div>
                <span className="text-[#4F5B76] text-[13px] font-medium opacity-70">80,000</span>
              </div>
            </div>

          </div>

          {/* Testimonial Slider Card */}
          <div className="bg-white rounded-[2.5rem] border border-[#E3E3E3] p-10 md:p-14 shadow-sm relative w-full flex flex-col">
            <div className="flex items-stretch h-full">

              {/* Left Accent Bar */}
              <div className="w-1 bg-[#5653FE] rounded-full mr-8 shrink-0"></div>

              {/* Review Content */}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-semibold text-[#24234C] text-[22px] mb-2 tracking-tight">
                      Great introduction to AI
                    </h3>
                    <div className="text-[#4F5B76] text-[15px] flex items-center gap-2 font-medium">
                      Phillip.B <span className="opacity-50">•</span> USA
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3 hidden sm:flex">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        <Star fill="#FACC15" className="text-[#FACC15]" size={16} strokeWidth={1} />
                        <Star fill="#FACC15" className="text-[#FACC15]" size={16} strokeWidth={1} />
                        <Star fill="#FACC15" className="text-[#FACC15]" size={16} strokeWidth={1} />
                        <Star fill="#FACC15" className="text-[#FACC15]" size={16} strokeWidth={1} />
                        <Star fill="#FACC15" className="text-[#FACC15]" size={16} strokeWidth={1} />
                      </div>
                      <span className="bg-[#E9E9FF] text-[#5653FE] text-[12px] font-medium px-2 py-0.5 rounded ml-2">Verified</span>
                    </div>
                    {/* Navigation */}
                    <div className="flex gap-2">
                      <button className="w-8 h-8 rounded border border-[#E3E3E3] flex items-center justify-center text-[#4F5B76] hover:bg-gray-50 hover:text-[#24234C] transition-all">
                        <ChevronLeft size={16} />
                      </button>
                      <button className="w-8 h-8 rounded border border-[#E3E3E3] flex items-center justify-center text-[#4F5B76] hover:bg-gray-50 hover:text-[#24234C] transition-all">
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Mobile version top nav */}
                <div className="flex justify-between items-center sm:hidden mb-6">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      <Star fill="#FACC15" className="text-[#FACC15]" size={14} strokeWidth={1} />
                      <Star fill="#FACC15" className="text-[#FACC15]" size={14} strokeWidth={1} />
                      <Star fill="#FACC15" className="text-[#FACC15]" size={14} strokeWidth={1} />
                      <Star fill="#FACC15" className="text-[#FACC15]" size={14} strokeWidth={1} />
                      <Star fill="#FACC15" className="text-[#FACC15]" size={14} strokeWidth={1} />
                    </div>
                    <span className="bg-[#E9E9FF] text-[#5653FE] text-[11px] font-medium px-1.5 py-0.5 rounded">Verified</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 rounded border border-[#E3E3E3] flex items-center justify-center text-[#4F5B76] hover:bg-gray-50 hover:text-[#24234C] transition-all">
                      <ChevronLeft size={16} />
                    </button>
                    <button className="w-8 h-8 rounded border border-[#E3E3E3] flex items-center justify-center text-[#4F5B76] hover:bg-gray-50 hover:text-[#24234C] transition-all">
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                <p className="text-[#24234C] text-[17px] leading-relaxed mb-8">
                  "This is a great introduction to AI — clear, practical, and easy to follow. It gets you started on the path to becoming an AI prompting pro. The lessons focus on real-world, practical skills that apply to any field, making it valuable whether you're in healthcare, business, tech, or creative work. Highly recommended for anyone who wanting to get an edge in their field"
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-[14px] mt-auto">
                  <div className="flex items-center gap-2 text-[#4F5B76]">
                    <span>👍</span> 43 people found this helpful
                  </div>
                  <a href="#" className="text-[#5653FE] hover:underline underline-offset-4 font-medium transition-all">
                    View original review →
                  </a>
                </div>

              </div>
            </div>

            {/* Pagination Dots */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#5653FE]"></div>
              <div className="w-3 h-3 rounded-full bg-[#E5E7EB]"></div>
            </div>
          </div>

        </div>
      </section>

      {/* Our Learning Outcomes Section */}
      <section className="py-24 bg-[radial-gradient(ellipse_at_top,_#EFF6FF_0%,_#FFFFFF_70%)] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="bg-white rounded-[2.5rem] border border-[#E3E3E3] p-10 md:p-16 shadow-[0_4px_30px_rgb(0,0,0,0.03)] relative">

            {/* Header Area */}
            <div className="flex flex-col items-center text-center mb-16">
              <div className="bg-[#E9E9FF] text-[#5653FE] px-4 py-1.5 rounded-full text-[13px] font-semibold flex items-center gap-2 mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-[#5653FE]"></div>
                Results You Can Expect
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                <span className="text-[#24234C]">Our Learning </span>
                <span className="text-[#5653FE]">Outcomes</span>
              </h2>

              <p className="text-[#4F5B76] text-lg">
                So... what can you expect after joining Mind Mentor?
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Card 1 */}
              <div className="bg-white rounded-2xl p-8 lg:p-10 border border-[#F3F4F6]">
                <h3 className="font-bold text-[#24234C] text-[19px] mb-4">Confidence with AI tools</h3>
                <p className="text-[#4F5B76] text-[15px] leading-relaxed">
                  No more guessing what buttons do. Master the tools with hands-on practice.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-2xl p-8 lg:p-10 border border-[#F3F4F6]">
                <h3 className="font-bold text-[#24234C] text-[19px] mb-4">Career-ready skills</h3>
                <p className="text-[#4F5B76] text-[15px] leading-relaxed">
                  From freelancing basics to automation workflows that employers value.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-2xl p-8 lg:p-10 border border-[#F3F4F6]">
                <h3 className="font-bold text-[#24234C] text-[19px] mb-4">Time saved, not wasted</h3>
                <p className="text-[#4F5B76] text-[15px] leading-relaxed">
                  Learning fits into your schedule, not the other way around.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-white rounded-2xl p-8 lg:p-10 border border-[#F3F4F6]">
                <h3 className="font-bold text-[#24234C] text-[19px] mb-4">Consistent progress</h3>
                <p className="text-[#4F5B76] text-[15px] leading-relaxed">
                  Daily micro-lessons that actually stick and compound over time.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Frequently Asked Questions Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-semibold text-[#24234C] mb-4 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-[#4F5B76] text-lg">
              Common questions about our reviews and learner feedback process.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">

            {/* Box 1 */}
            <div className="bg-white rounded-2xl border border-[#E3E3E3] p-8 md:p-10 shadow-[0_2px_15px_rgb(0,0,0,0.02)]">
              <h3 className="font-bold text-[#24234C] text-[18px] mb-4">Are these reviews real?</h3>
              <p className="text-[#4F5B76] leading-relaxed text-[16px]">
                Yes. 100%. All reviews come directly from Google Play and Trustpilot.
              </p>
            </div>

            {/* Box 2 */}
            <div className="bg-white rounded-2xl border border-[#E3E3E3] p-8 md:p-10 shadow-[0_2px_15px_rgb(0,0,0,0.02)]">
              <h3 className="font-bold text-[#24234C] text-[18px] mb-4">What do people usually learn first?</h3>
              <p className="text-[#4F5B76] leading-relaxed text-[16px]">
                Most learners start with the basics of ChatGPT, MidJourney and DALL-E before moving into deeper workflows like Claude 3.7, Jasper AI, Stable Diffusion and Deepseek.
              </p>
            </div>

            {/* Box 3 */}
            <div className="bg-white rounded-2xl border border-[#E3E3E3] p-8 md:p-10 shadow-[0_2px_15px_rgb(0,0,0,0.02)]">
              <h3 className="font-bold text-[#24234C] text-[18px] mb-4">Do outcomes really show up fast?</h3>
              <p className="text-[#4F5B76] leading-relaxed text-[16px]">
                Absolutely. Many users report feeling more confident using new tools in less than two weeks.
              </p>
            </div>

            {/* Box 4 */}
            <div className="bg-white rounded-2xl border border-[#E3E3E3] p-8 md:p-10 shadow-[0_2px_15px_rgb(0,0,0,0.02)]">
              <h3 className="font-bold text-[#24234C] text-[18px] mb-4 leading-normal">Is Mind Mentor worth it compared to free YouTube tutorials?</h3>
              <p className="text-[#4F5B76] leading-relaxed text-[16px]">
                Here's the difference: we make learning structured, consistent, and motivating. That's why people actually finish our lessons — and see results.
              </p>
            </div>

          </div>

        </div>
      </section>
    </>
  );
}
