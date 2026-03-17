export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  imageUrl: string;
  content?: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: "mind-mentor-28-day-ai-challenge",
    title: "The MindMentor 28-Day AI Challenge: Your Complete Mastery Roadmap for 2026",
    category: "AI",
    excerpt: "A structured 28-day plan for busy professionals to become confident with AI tools through short daily challenges.",
    author: {
      name: "MindMentor Editorial Team",
      avatar: "CE",
    },
    date: "Feb 18, 2026",
    readTime: "8 MIN",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    content: `
      <h2>Why the 28-Day Challenge?</h2>
      <p>In 2026, AI isn't just a buzzword; it's the engine of productivity. But most people are still stuck at the "How do I start?" phase. The MindMentor 28-Day Challenge is designed to move you from curious to master in less than a month.</p>
      
      <h2>What You'll Learn</h2>
      <p>Each day, you'll spend just 10 minutes on a specific task. We cover everything from advanced prompting to building your own specialized GPTs.</p>
      
      <h3>Week 1: Foundations of Prompting</h3>
      <p>Master the art of the perfect prompt. We'll dive into Persona, Context, and Guardrails.</p>
      
      <h3>Week 2: Image and Media Generation</h3>
      <p>Learn to use Midjourney and DALL-E for professional branding and creative work.</p>
    `
  },
  {
    id: 2,
    slug: "best-ai-tools-for-teachers-2026",
    title: "Best AI Tools for Teachers in 2026: Top 20 Reviewed & Compared",
    category: "AI TOOLS",
    excerpt: "A practical guide to the 20 best AI tools for teachers in 2026 — from free FERPA-compliant options to student-facing tutoring platforms.",
    author: {
      name: "Vlada K.",
      avatar: "VK",
    },
    date: "Mar 13, 2026",
    readTime: "14 MIN",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
    content: `
      <h2>The Shift in Modern Classrooms</h2>
      <p>Teachers today aren't just educators; they're curators of AI-powered learning experiences. We've vetted the top 20 tools that actually save time.</p>
      
      <h2>Top Category: Lesson Planning</h2>
      <p>Curipod and MagicSchool AI remain the leaders in generating standards-aligned lesson plans in seconds.</p>
      
      <h3>Student-Facing Tools</h3>
       <p>Khanmigo leads the pack by providing a Socratic tutor that guides students without giving away answers.</p>
    `
  },
  {
    id: 3,
    slug: "mastering-claude-3-7-prompting",
    title: "Mastering Claude 3.7: Advanced Prompting Techniques for Complex Workflows",
    category: "CHATGPT",
    excerpt: "Learn how to leverage the latest reasoning capabilities in Claude 3.7 to automate complex coding and writing tasks.",
    author: {
      name: "Sahil R.",
      avatar: "SR",
    },
    date: "Mar 10, 2026",
    readTime: "10 MIN",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4628c6789?auto=format&fit=crop&q=80&w=800",
    content: `
      <h2>Reasoning vs. Writing</h2>
      <p>Claude 3.7 introduces a breakthrough in reasoning. Unlike previous models, it can think through multi-step logic before providing an answer.</p>
      
      <h2>Chain of Thought Prompting</h2>
      <p>To get the most out of 3.7, you need to explicitly ask it to "think step by step".</p>
      
      <h3>Code Generation Benchmarks</h3>
      <p>We compared Claude 3.7 to GPT-5 on Python scripting tasks. The results might surprise you.</p>
    `
  },
  {
    id: 4,
    slug: "ai-productivity-hacks-save-hours",
    title: "10 AI Productivity Hacks That Save 5+ Hours Per Week",
    category: "PRODUCTIVITY",
    excerpt: "Simple but effective workflows using ChatGPT and Notion AI that eliminate repetitive tasks from your workday.",
    author: {
      name: "James L.",
      avatar: "JL",
    },
    date: "Mar 05, 2026",
    readTime: "6 MIN",
    imageUrl: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=800",
    content: `
      <h2>Stop Wasting Time on Email</h2>
      <p>Email is the biggest time-sink for most professionals. Use this one prompt to clear your inbox in 15 minutes.</p>
      
      <h2>The Notion AI Workflow</h2>
      <p>Learn how to turn meeting notes into actionable tickets automatically.</p>
    `
  },
  {
    id: 5,
    slug: "future-of-ai-creative-industries",
    title: "The Future of AI in Creative Industries: What to Expect in the Next 2 Years",
    category: "AI",
    excerpt: "An in-depth look at how generative AI is reshaping design, music, and film production for independent creators.",
    author: {
      name: "Emma W.",
      avatar: "EW",
    },
    date: "Feb 28, 2026",
    readTime: "12 MIN",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    content: `
      <h2>The Democratization of High-End Production</h2>
      <p>Sora and other video generation tools have lowered the bar for high-quality video production. What does this mean for small agencies?</p>
      
      <h2>AI in Music Production</h2>
      <p>From stem separation to AI-generated mastering, the studio environment is changing rapidly.</p>
    `
  },
  {
    id: 6,
    slug: "deepseek-vs-chatgpt-data-analysis",
    title: "Deepseek vs. ChatGPT: Which Model Should You Use for Data Analysis?",
    category: "AI TOOLS",
    excerpt: "A head-to-head comparison of performance, accuracy, and cost for professional data analysts and researchers.",
    author: {
      name: "Dr. Chen",
      avatar: "DC",
    },
    date: "Feb 20, 2026",
    readTime: "9 MIN",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    content: `
      <h2>The New Contender: Deepseek</h2>
      <p>Deepseek has quickly become a favorite among researchers for its transparent reasoning and impressive CSV processing capabilities.</p>
      
      <h2>The Versatility of ChatGPT</h2>
      <p>While Deepseek is precise, ChatGPT's ecosystem of plugins and GPTs still offers unmatched versatility.</p>
      
      <h3>Performance Comparison</h3>
      <p>We ran 500 SQL generation queries through both models. Here is the data.</p>
    `
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(post => post.slug === slug);
}
