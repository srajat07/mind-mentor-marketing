import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MindMentor Marketing | AI, Digital Tools & Career Growth",
  description: "Master AI, Digital Tools, and Career Skills with MindMentor Marketing. Empowering your digital journey.",
  icons: {
    icon: '/assets/images/mindmentor-logo.png',
    apple: '/assets/images/mindmentor-logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className={`antialiased flex flex-col min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
