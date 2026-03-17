import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  imageSize?: number;
  textSize?: string;
  href?: string;
  isAdmin?: boolean;
}

export function Logo({
  className = "",
  imageSize = 40,
  textSize = "text-xl",
  href = "/",
  isAdmin = false
}: LogoProps) {
  return (
    <Link href={href} className={`flex items-center gap-3 group ${className}`}>
      <div className="relative shrink-0">
        <Image
          src="/assets/images/mindmentor-logo.png"
          alt="Mind Mentor Logo"
          width={imageSize}
          height={imageSize}
          className="object-contain"
        />
      </div>
      <span className={`font-bold text-brand-indigo tracking-wide whitespace-nowrap transition-colors ${textSize}`}>
        MIND MENTOR
      </span>
    </Link>
  );
}
