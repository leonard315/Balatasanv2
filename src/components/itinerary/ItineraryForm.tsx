'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { generateItineraryAction } from '@/app/actions';
import type { Tour, WatersportActivity } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bot, PartyPopper, AlertCircle } from 'lucide-react';

const initialState = {
  message: '',
  itinerary: null as string | null,
  error: null as string | null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending} className="w-full md:w-auto bg-accent hover:bg-accent/90">
      <Bot className="mr-2 h-5 w-5" />
      {pending ? 'Generating Your Itinerary...' : 'Generate Itinerary'}
    </Button>
  );
}

export function ItineraryForm({
  tours,
  watersports,
}: {
  tours: Tour[];
  watersports: WatersportActivity[];
}) {
  const [state, formAction] = useActionState(generateItineraryAction, initialState);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <form action={formAction} className="lg:col-span-2 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Select Tour Packages</CardTitle>
            <CardDescription>Choose the adventures you want to embark on.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tours.map((tour) => (
              <div key={tour.id} className="flex items-center space-x-2 p-3 rounded-md border bg-background hover:bg-muted/50 transition-colors">
                <Checkbox id={`tour-${tour.id}`} name="tourPackages" value={tour.name} />
                <Label htmlFor={`tour-${tour.id}`} className="w-full cursor-pointer">
                  <span className="font-semibold">{tour.name}</span>
                  <span className="text-xs text-muted-foreground block">{tour.duration} - ₱{tour.price}</span>
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Select Water Activities</CardTitle>
            <CardDescription>Pick your thrilling water-based activities.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {watersports.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-2 p-3 rounded-md border bg-background hover:bg-muted/50 transition-colors">
                <Checkbox id={`ws-${activity.id}`} name="watersportsActivities" value={activity.name} />
                <Label htmlFor={`ws-${activity.id}`} className="w-full cursor-pointer">
                    <span className="font-semibold">{activity.name}</span>
                    <span className="text-xs text-muted-foreground block">{activity.duration} - ₱{activity.basePrice}</span>
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <SubmitButton />
        </div>
      </form>

      <div className="lg:col-span-1 sticky top-24">
        <Card className="min-h-[300px]">
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center">
              <PartyPopper className="h-6 w-6 mr-2 text-primary" />
              Your Personalized Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            {state.error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}
            {state.itinerary ? (
              <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap font-body">
                {state.itinerary}
              </div>
            ) : (
                !state.error && <p className="text-muted-foreground">Your generated itinerary will appear here once you've made your selections and clicked the generate button.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
