'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating personalized itineraries based on user-selected tour packages and water activities.
 *
 * - generateItinerary - A function that generates an optimized daily itinerary.
 * - ItineraryInput - The input type for the generateItinerary function.
 * - ItineraryOutput - The return type for the generateItinerary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ActivitySchema = z.object({
  name: z.string().describe('The name of the activity.'),
  duration: z.string().describe('The duration of the activity (e.g., 15 minutes, 1 hour).'),
});

const ItineraryInputSchema = z.object({
  tourPackages: z.array(ActivitySchema).describe('The list of selected tour packages.'),
  watersportsActivities: z.array(ActivitySchema).describe('The list of selected water activities.'),
  travelTimeBetweenActivities: z
    .string()
    .optional()
    .default('30 minutes')
    .describe('The estimated travel time between activities.'),
});
export type ItineraryInput = z.infer<typeof ItineraryInputSchema>;

const ItineraryOutputSchema = z.object({
  dailyItinerary: z.string().describe('The optimized daily itinerary.'),
});
export type ItineraryOutput = z.infer<typeof ItineraryOutputSchema>;

export async function generateItinerary(input: ItineraryInput): Promise<ItineraryOutput> {
  return itineraryFlow(input);
}

const itineraryPrompt = ai.definePrompt({
  name: 'itineraryPrompt',
  input: {schema: ItineraryInputSchema},
  output: {schema: ItineraryOutputSchema},
  prompt: `You are an itinerary optimization expert for Balatasan Beach Resort.

  Generate an optimized daily itinerary for the user based on their selected tour packages and water activities.
  Consider the duration of each activity and the travel time between activities ({{{travelTimeBetweenActivities}}}).
  Try to minimize conflicts and maximize the enjoyment of the day.

  Tour Packages:
  {{#each tourPackages}}
  - {{this.name}} ({{this.duration}})
  {{/each}}

  Water Activities:
  {{#each watersportsActivities}}
  - {{this.name}} ({{this.duration}})
  {{/each}}
  \nReturn the result in a readable format.
  `,
});

const itineraryFlow = ai.defineFlow(
  {
    name: 'itineraryFlow',
    inputSchema: ItineraryInputSchema,
    outputSchema: ItineraryOutputSchema,
  },
  async input => {
    const {output} = await itineraryPrompt(input);
    return output!;
  }
);
