export default function SupportPage() {
  const faqs = [
    {
      q: "How does the 28-Day Challenge work?",
      a: "The challenge consists of daily 5-10 minute lessons and practical exercises. As you complete days, you unlock the next ones and earn streaks."
    },
    {
      q: "Do I need any prior AI experience?",
      a: "Not at all! Our courses are designed for absolute beginners while offering depth for those looking to specialize."
    },
    {
      q: "Can I cancel my subscription at any time?",
      a: "Yes, you can cancel your subscription from your account settings at any time with no hidden fees."
    },
    {
      q: "Will I receive a certificate?",
      a: "Yes, upon completing each major course track, you will receive a verifiable digital certificate you can add to your LinkedIn profile."
    }
  ];

  return (
    <div className="pt-16 pb-24 bg-offwhite min-h-[70vh]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Support & FAQ</h1>
          <p className="text-xl text-muted">
            How can we help you today?
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-border shadow-sm">
              <h3 className="text-lg font-bold text-foreground mb-3">{faq.q}</h3>
              <p className="text-muted">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-primary/5 p-8 rounded-3xl border border-primary/20 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Still need help?</h2>
          <p className="text-muted mb-6 mb-8">Our support team is available 24/7 to assist you with any questions.</p>
          <button className="px-6 py-3 rounded-full bg-white text-primary border border-primary font-semibold hover:bg-primary/5 transition-all cursor-pointer">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
