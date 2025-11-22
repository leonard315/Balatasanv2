'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  AlertTriangle,
  Anchor,
  Bike,
  Contact,
  Feather,
  Fish,
  Flag,
  Ship,
  Sparkles,
  Ticket,
  Users,
  Waves,
  Wind,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { placeholderImages } from '@/lib/placeholder-images';
import { watersports } from '@/lib/data';

const thrillingRides = watersports.filter(
  (w) => w.category === 'Inflatable Rides'
);
const newActivities = watersports.filter((w) => w.category === 'Motorized');
const relaxingActivities = watersports.filter(
  (w) => w.category === 'Self-Powered'
);

const otherActivities = [
  {
    icon: Fish,
    title: 'Snorkeling',
    description: 'Explore vibrant coral reefs and marine life',
    details: [
      'Equipment rental: ₱300/set',
      'Guided tours available',
      'Best spots mapped',
    ],
  },
  {
    icon: Anchor,
    title: 'Fishing Trips',
    description: 'Traditional fishing experience',
    details: [
      'Morning/Evening trips',
      'Equipment provided',
      '₱2,000 per boat (4 pax)',
    ],
  },
  {
    icon: Waves,
    title: 'Scuba Diving',
    description: 'Discover underwater wonders',
    details: [
      'PADI certified instructors',
      'Equipment rental available',
      'From ₱3,500 per dive',
    ],
  },
];

const activityIcons = {
  'Flying Fish': Feather,
  'Banana Boat': Sparkles,
  Hurricane: Wind,
  'Crazy UFO': Ship,
  'Jet Ski': Waves,
  'Pedal Boat': Bike,
  'Hand Paddle Boat': Flag,
};

export default function WaterActivitiesPage() {
  return (
    <div className="bg-muted/20">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-2">
            Water Activities
          </h1>
          <p className="text-lg text-muted-foreground">
            Dive into adventure with our exciting range of water activities and
            marine experiences!
          </p>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
              <Sparkles className="text-primary h-6 w-6" />
              Thrilling Water Rides
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {thrillingRides.map((activity) => {
                const pImage = placeholderImages.find(
                  (p) => p.id === activity.image
                );
                const Icon =
                  activityIcons[
                    activity.name as keyof typeof activityIcons
                  ] || Waves;
                return (
                  <Card
                    key={activity.id}
                    className="overflow-hidden bg-card shadow-lg"
                  >
                    {pImage && (
                      <div className="relative h-56 w-full">
                        <Image
                          src={pImage.imageUrl}
                          alt={activity.name}
                          fill
                          className="object-cover"
                          data-ai-hint={pImage.imageHint}
                        />
                      </div>
                    )}
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className="h-6 w-6 text-primary" />
                        <h3 className="text-xl font-bold">{activity.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {activity.description}
                      </p>
                      <div className="text-sm space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Capacity:
                          </span>
                          <span className="font-semibold">
                            {activity.capacity} pax
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Duration:
                          </span>
                          <span className="font-semibold">
                            {activity.duration}
                          </span>
                        </div>
                        <div className="flex justify-between items-baseline">
                          <span className="text-muted-foreground">Price:</span>
                          <div className="text-right">
                            <p className="font-bold text-lg text-primary">
                              ₱{activity.basePrice.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              + ₱{activity.excessCharge}/person
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          <section>
            {newActivities.map((activity) => {
              const pImage = placeholderImages.find(
                (p) => p.id === activity.image
              );
              const Icon =
                activityIcons[activity.name as keyof typeof activityIcons] ||
                Waves;
              return (
                <Card
                  key={activity.id}
                  className="overflow-hidden bg-card shadow-lg border-2 border-primary"
                >
                  <div className="relative h-64 w-full">
                    <Image
                      src={pImage?.imageUrl || ''}
                      alt={activity.name}
                      fill
                      className="object-cover"
                      data-ai-hint={pImage?.imageHint}
                    />
                    <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                      New Activity
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="h-6 w-6 text-primary" />
                      <h3 className="text-xl font-bold">{activity.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {activity.description}
                    </p>
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Capacity:</span>
                        <span className="font-semibold">
                          Up to {activity.capacity} pax
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Duration:
                        </span>
                        <span className="font-semibold">
                          {activity.duration}
                        </span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-muted-foreground">Price:</span>
                        <div>
                          <p className="font-bold text-lg text-primary">
                            ₱{activity.basePrice.toLocaleString()}/minute
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Minimum 5 mins, Maximum 60 mins
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </section>

          <section>
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
              <Waves className="text-cyan-500 h-6 w-6" />
              Relaxing Water Activities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relaxingActivities.map((activity) => {
                const pImage = placeholderImages.find(
                  (p) => p.id === activity.image
                );
                const Icon =
                  activityIcons[
                    activity.name as keyof typeof activityIcons
                  ] || Waves;
                return (
                  <Card
                    key={activity.id}
                    className="overflow-hidden bg-card shadow-lg"
                  >
                    {pImage && (
                      <div className="relative h-56 w-full">
                        <Image
                          src={pImage.imageUrl}
                          alt={activity.name}
                          fill
                          className="object-cover"
                          data-ai-hint={pImage.imageHint}
                        />
                      </div>
                    )}
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className="h-6 w-6 text-cyan-500" />
                        <h3 className="text-xl font-bold">{activity.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {activity.description}
                      </p>
                      <div className="text-sm space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Duration:
                          </span>
                          <span className="font-semibold">
                            {activity.duration}
                          </span>
                        </div>
                        <div className="flex justify-between items-baseline">
                          <span className="text-muted-foreground">Price:</span>
                          <p className="font-bold text-lg text-cyan-500">
                            ₱{activity.basePrice.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherActivities.map((activity) => (
              <Card key={activity.title} className="p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <activity.icon className="h-6 w-6 text-pink-500" />
                  <h3 className="font-bold text-lg">{activity.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {activity.description}
                </p>
                <ul className="text-sm space-y-1 text-muted-foreground list-disc list-inside">
                  {activity.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <div className="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 p-4 rounded-r-lg">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              <h3 className="font-bold text-xl text-red-700 dark:text-red-300">
                Safety First
              </h3>
            </div>
            <p className="text-red-600 dark:text-red-200 mt-2 ml-9">
              All water activities include safety briefings, life
              jackets, and are supervised by certified instructors. Weather
              conditions are monitored daily for your safety.
            </p>
          </div>

          <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center shadow-lg">
            <h2 className="text-3xl font-bold mb-2">Adventure Awaits!</h2>
            <p className="text-primary-foreground/90 mb-6 max-w-lg mx-auto">
              Book your water activities adventure today!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="bg-white/90 text-primary hover:bg-white"
              >
                <Link href="/bookings/new?type=watersport">
                  <Ticket className="mr-2" />
                  Book Now
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10">
                <Link href="#">
                  <Contact className="mr-2" />
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
