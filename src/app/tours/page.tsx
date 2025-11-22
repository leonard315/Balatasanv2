'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowLeft,
  BookMarked,
  LifeBuoy,
  Ship,
  Sparkles,
  Utensils,
  User,
} from 'lucide-react';

const includedItems = [
  { icon: Ship, label: 'Boat Transfer' },
  { icon: Utensils, label: 'Lunch' },
  { icon: LifeBuoy, label: 'Snorkel Gear' },
  { icon: User, label: 'Tour Guide' },
];

export default function ToursPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-orange-500 hover:text-orange-400 mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        {/* Hero Image Header */}
        <div className="relative rounded-3xl overflow-hidden mb-12 shadow-2xl h-64 md:h-80">
          <Image
            src="https://www.travelorientalmindoro.ph/Content/img/uploads/1ee534e3-f48a-4ed5-a24e-ee51c1b4a6cf.jpg"
            alt="Balatasan Tours"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Tours
            </h1>
            <p className="text-white/90 text-lg">
              Experience paradise on water
            </p>
          </div>
        </div>

        {/* Description Section */}
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Tours
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            Experience the ultimate relaxation with our island tours - explore traditional bamboo and nipa huts built over the crystal clear waters of Verde Island Passage. Perfect for families, groups, and special occasions.
          </p>
        </div>

        {/* Ready to Explore Card */}
        <Card className="mb-8 bg-slate-800/50 border-slate-700 shadow-xl backdrop-blur-sm">
          <CardContent className="p-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Ready to Explore?
            </h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto text-lg">
              Book your island adventure through our booking system. Choose from 5 amazing tour packages!
            </p>
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-6 text-lg shadow-lg rounded-lg transition-all hover:scale-105"
              asChild
            >
              <Link href="/bookings/new?type=tour">
                <BookMarked className="mr-2 h-5 w-5" />
                Book Your Island Tour Now
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* What's Typically Included */}
        <Card className="mb-8 bg-slate-800/50 border-slate-700 shadow-xl backdrop-blur-sm">
          <CardContent className="p-10">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <LifeBuoy className="h-7 w-7 text-pink-500"/>
              What&apos;s Typically Included
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
              {includedItems.map((item, index) => (
                <div key={index} className="flex flex-col items-center gap-4">
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-5 rounded-full shadow-lg">
                    <item.icon className="h-12 w-12 text-white" />
                  </div>
                  <span className="font-semibold text-slate-200 text-base">{item.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Verde Island Passage */}
        <Card className="mb-8 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white border-0 shadow-2xl">
          <CardContent className="p-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-yellow-300" />
              Verde Island Passage
            </h2>
            <p className="text-white/95 text-lg leading-relaxed">
              Experience the world&apos;s marine biodiversity center! Verde Island Passage
              is recognized as the &quot;Center of the Center of Marine Shorefish
              Biodiversity&quot; with over 60% of the world&apos;s known shore fish
              species!
            </p>
          </CardContent>
        </Card>

        {/* Final CTA */}
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready for an Island Adventure?
          </h2>
          <p className="text-white/95 mb-10 max-w-2xl mx-auto text-lg">
            Book your tour package today and explore the beautiful islands
            around Balatasan!
          </p>
          <Button 
            size="lg" 
            className="bg-white text-blue-700 hover:bg-slate-100 px-10 py-6 text-lg font-semibold shadow-xl rounded-lg transition-all hover:scale-105"
            asChild
          >
            <Link href="/bookings/new">
              Inquire & Book Tours
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
