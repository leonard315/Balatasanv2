import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { type Tour } from '@/lib/data';
import { placeholderImages } from '@/lib/placeholder-images';
import { Clock, Tag } from 'lucide-react';

export default function TourCard({ name, price, duration, description, image }: Tour) {
  const placeholder = placeholderImages.find(p => p.id === image);

  return (
    <Card className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          {placeholder ? (
            <Image
              src={placeholder.imageUrl}
              alt={description}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              data-ai-hint={placeholder.imageHint}
            />
          ) : (
            <div className="bg-muted h-full w-full" />
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="font-headline text-lg mb-2">{name}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 flex flex-col items-start space-y-4">
        <div className="flex justify-between w-full text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-primary"/>
                <span>₱{price.toLocaleString()}/person</span>
            </div>
            <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary"/>
                <span>{duration}</span>
            </div>
        </div>
        <Button variant="secondary" className="w-full">Learn More</Button>
      </CardFooter>
    </Card>
  );
}
