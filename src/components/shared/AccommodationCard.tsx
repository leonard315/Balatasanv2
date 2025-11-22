import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { type Accommodation } from '@/lib/data';
import { placeholderImages } from '@/lib/placeholder-images';
import { Users, Tag } from 'lucide-react';

export default function AccommodationCard({ name, price, capacity, description, image }: Accommodation) {
  const placeholder = placeholderImages.find(p => p.id === image);

  return (
    <Card className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
      <CardHeader className="p-0">
        <div className="relative h-56 w-full">
          {placeholder ? (
            <Image
              src={placeholder.imageUrl}
              alt={description}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint={placeholder.imageHint}
            />
          ) : (
            <div className="bg-muted h-full w-full" />
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="font-headline text-xl mb-2">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 flex flex-col items-start space-y-4">
        <div className="flex justify-between w-full text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-primary"/>
                <span>₱{price.toLocaleString()}/night</span>
            </div>
            <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary"/>
                <span>{capacity} Guests</span>
            </div>
        </div>
        <Button className="w-full bg-accent hover:bg-accent/90">Book Now</Button>
      </CardFooter>
    </Card>
  );
}
