import { Sailboat, Twitter, Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t bg-card text-card-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Sailboat className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-lg">Balatasan Getaways</span>
          </div>
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Balatasan Beach Resort. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Bulalacao, Oriental Mindoro, Philippines
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
