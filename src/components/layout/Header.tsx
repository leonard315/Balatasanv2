'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, LogOut, Settings, LayoutDashboard, Menu, X } from 'lucide-react';
import { onAuthChange, logout, getUserProfile, type UserProfile } from '@/lib/auth';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthChange(async (authUser) => {
      setUser(authUser);
      if (authUser) {
        const userProfile = await getUserProfile(authUser.uid);
        setProfile(userProfile);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function handleLogout() {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  if (loading) {
    return (
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold">
              Balatasan Resort
            </Link>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-base sm:text-lg md:text-xl font-bold flex items-center gap-1 sm:gap-2">
            <span className="text-lg sm:text-xl">🏖️</span>
            <span className="hidden xs:inline">Balatasan Resort</span>
            <span className="xs:hidden">Balatasan</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            <Link href="/accommodations" className="hover:text-primary transition-colors text-sm xl:text-base">
              Accommodations
            </Link>
            <Link href="/tours" className="hover:text-primary transition-colors text-sm xl:text-base">
              Tours
            </Link>
            <Link href="/water-activities" className="hover:text-primary transition-colors text-sm xl:text-base">
              Water Activities
            </Link>
            <Link href="/itinerary-planner" className="hover:text-primary transition-colors text-sm xl:text-base">
              Itinerary Planner
            </Link>
          </nav>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10">
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 mt-6">
                <Link 
                  href="/accommodations" 
                  className="text-base hover:text-primary hover:bg-accent transition-colors py-3 px-3 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  🏠 Accommodations
                </Link>
                <Link 
                  href="/tours" 
                  className="text-base hover:text-primary hover:bg-accent transition-colors py-3 px-3 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  🗺️ Tours
                </Link>
                <Link 
                  href="/water-activities" 
                  className="text-base hover:text-primary hover:bg-accent transition-colors py-3 px-3 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  🌊 Water Activities
                </Link>
                <Link 
                  href="/itinerary-planner" 
                  className="text-base hover:text-primary hover:bg-accent transition-colors py-3 px-3 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  📅 Itinerary Planner
                </Link>
                {user && (
                  <>
                    <div className="border-t my-3" />
                    <div className="text-xs font-semibold text-muted-foreground px-3 mb-2">ACCOUNT</div>
                    <Link 
                      href="/dashboard" 
                      className="text-base hover:text-primary hover:bg-accent transition-colors py-3 px-3 rounded-md flex items-center gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                    {profile?.role?.toLowerCase() === 'admin' && (
                      <Link 
                        href="/admin/dashboard" 
                        className="text-base hover:text-primary hover:bg-accent transition-colors py-3 px-3 rounded-md flex items-center gap-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4" />
                        Admin Panel
                      </Link>
                    )}
                    <Link 
                      href="/profile" 
                      className="text-base hover:text-primary hover:bg-accent transition-colors py-3 px-3 rounded-md flex items-center gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                    <button 
                      onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                      className="text-base text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors py-3 px-3 rounded-md text-left w-full flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </>
                )}
                {!user && (
                  <>
                    <div className="border-t my-3" />
                    <Link 
                      href="/login" 
                      className="text-base hover:text-primary hover:bg-accent transition-colors py-3 px-3 rounded-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      🔐 Login
                    </Link>
                    <Link 
                      href="/signup" 
                      className="text-base bg-primary text-primary-foreground hover:bg-primary/90 transition-colors py-3 px-3 rounded-md text-center font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      ✨ Sign Up
                    </Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarFallback>
                        {profile?.displayName?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{profile?.displayName}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  {profile?.role?.toLowerCase() === 'admin' && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin/dashboard" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
