import { ItineraryForm } from '@/components/itinerary/ItineraryForm';
import { tours, watersports } from '@/lib/data';

export default function ItineraryPlannerPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">Intelligent Itinerary Planner</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Select your desired tours and water activities, and our AI will generate an optimized daily schedule to help you make the most of your getaway.
        </p>
      </div>

      <ItineraryForm tours={tours} watersports={watersports} />
    </div>
  );
}
