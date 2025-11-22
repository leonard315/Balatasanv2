import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { type WatersportActivity } from '@/lib/data';
import { placeholderImages } from '@/lib/placeholder-images';
import { Users, Tag, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function WatersportCard({ name, basePrice, capacity, intensity, image }: WatersportActivity) {
  const placeholder = placeholderImages.find(p => p.id === image);

  return (
    <Card className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
      <CardHeader className="p-0">
        <div className="relative h-56 w-full">
          {placeholder ? (
            <Image
              src={placeholder.imageUrl}
              alt={name}
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
        <div className="flex justify-between items-start">
            <CardTitle className="font-headline text-xl mb-2">{name}</CardTitle>
            <Badge variant={intensity === 'Extreme' || intensity === 'High' ? 'destructive' : 'secondary'}>{intensity}</Badge>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-2">
            <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-primary"/>
                <span>From ₱{basePrice.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary"/>
                <span>Up to {capacity}</span>
            </div>
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Button variant="secondary" className="w-full">Add to Plan</Button>
      </CardFooter>
    </Card>
  );
}
