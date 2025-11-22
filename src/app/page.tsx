import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { accommodations, tours, watersports } from '@/lib/data';
import AccommodationCard from '@/components/shared/AccommodationCard';
import TourCard from '@/components/shared/TourCard';
import WatersportCard from '@/components/shared/WatersportCard';
import { placeholderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const heroImage = placeholderImages.find(p => p.id === 'hero-1');

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 p-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold !text-white tracking-tight">
            Discover Your Paradise at Balatasan Beach
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto !text-gray-200">
            Unwind in our serene accommodations, embark on thrilling adventures, and create unforgettable memories.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/itinerary-planner">
                Plan Your Getaway <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/accommodations">Explore Stays</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="accommodations" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">Our Accommodations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {accommodations.slice(0, 3).map((item) => (
              <AccommodationCard key={item.id} {...item} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="link" className="text-primary text-lg">
              <Link href="/accommodations">View all accommodations <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="tours" className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">Thrilling Tour Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tours.slice(0, 4).map((item) => (
              <TourCard key={item.id} {...item} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="link" className="text-primary text-lg">
              <Link href="/tours">Explore all tours <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="watersports" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">Gorgo Water Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {watersports.slice(0, 3).map((item) => (
              <WatersportCard key={item.id} {...item} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="link" className="text-primary text-lg">
              <Link href="/water-activities">See all water activities <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Craft Your Perfect Day</h2>
          <p className="max-w-2xl mx-auto text-lg mb-8">
            Use our Intelligent Itinerary Tool to plan your activities. Select your favorite tours and water activities, and let our AI create an optimized schedule for you.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/itinerary-planner">
              Create My Itinerary
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
