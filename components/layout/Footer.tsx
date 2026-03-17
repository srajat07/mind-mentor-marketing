import Link from "next/link";
import { Youtube, Twitter, Instagram, Facebook } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-offwhite border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Logo imageSize={48} textSize="text-2xl" className="mb-6" />
            <p className="text-muted mb-6 text-sm">
              Become the Master of AI. Learn the skills of tomorrow, today.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted hover:text-primary">
                <span className="sr-only">Facebook</span>
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-muted hover:text-primary">
                <span className="sr-only">Instagram</span>
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-muted hover:text-primary">
                <span className="sr-only">Twitter</span>
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-muted hover:text-primary">
                <span className="sr-only">YouTube</span>
                <Youtube size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Learn</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-muted hover:text-primary">AI Courses</Link></li>
              <li><Link href="#" className="text-sm text-muted hover:text-primary">Digital Tools</Link></li>
              <li><Link href="#" className="text-sm text-muted hover:text-primary">Career Skills</Link></li>
              <li><Link href="#" className="text-sm text-muted hover:text-primary">28-Day Challenge</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-muted hover:text-primary">About Us</Link></li>
              <li><Link href="/reviews" className="text-sm text-muted hover:text-primary">Reviews</Link></li>
              <li><Link href="/admin" className="text-sm text-muted hover:text-primary">Admin CMS</Link></li>
              <li><Link href="#" className="text-sm text-muted hover:text-primary">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-3">
              <li><Link href="/support" className="text-sm text-muted hover:text-primary">Help Center / FAQ</Link></li>
              <li><Link href="#" className="text-sm text-muted hover:text-primary">Terms of Service</Link></li>
              <li><Link href="#" className="text-sm text-muted hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} MindMentor. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link href="#" className="text-sm text-muted hover:text-primary">Terms</Link>
            <Link href="#" className="text-sm text-muted hover:text-primary">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
