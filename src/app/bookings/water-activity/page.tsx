'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Upload, CheckCircle, AlertCircle, Waves } from 'lucide-react';
// Removed direct imports to avoid server action errors
// Will use form action instead
import { watersports } from '@/lib/data';
import { placeholderImages } from '@/lib/placeholder-images';

export default function WaterActivityBookingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [selectedActivity, setSelectedActivity] = useState('');
  const [selectedActivityData, setSelectedActivityData] = useState<any>(null);
  const [participants, setParticipants] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  function handleActivityChange(value: string) {
    setSelectedActivity(value);
    const activity = watersports.find(w => w.name === value);
    setSelectedActivityData(activity);
    calculateTotal(activity, participants);
  }

  function handleParticipantsChange(value: number) {
    const validValue = isNaN(value) || value < 1 ? 1 : value;
    setParticipants(validValue);
    if (selectedActivityData) {
      calculateTotal(selectedActivityData, validValue);
    }
  }

  function calculateTotal(activity: any, pax: number) {
    if (!activity) return;
    
    let total = activity.basePrice;
    
    // For Jet Ski, multiply by number of minutes
    if (activity.name === 'Jet Ski') {
      total = activity.basePrice * pax; // pax represents minutes for Jet Ski
    } else {
      // For other activities, calculate based on participants
      if (activity.excessCharge && pax > activity.capacity) {
        const excess = pax - activity.capacity;
        total += excess * activity.excessCharge;
      }
    }
    
    setTotalAmount(total);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    // For now, just show success message
    // In production, this would connect to your booking system
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (err: any) {
      setError('Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const activityImage = selectedActivityData 
    ? placeholderImages.find(p => p.id === selectedActivityData.image)
    : null;

  return (
    <div className="relative min-h-screen">
      <Image
        src="https://i.ytimg.com/vi/GNAkv2CTl_8/maxresdefault.jpg"
        alt="Balatasan Beach Background"
        fill
        className="object-cover -z-10"
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm -z-10" />
      
      <div className="container mx-auto py-8 px-4 max-w-4xl relative">
      <Link
        href="/water-activities"
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Water Activities
      </Link>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Booking Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Waves className="h-6 w-6 text-primary" />
              Book Water Activity
            </CardTitle>
            <CardDescription>Reserve your water adventure</CardDescription>
          </CardHeader>
          <CardContent>
            {success && (
              <Alert className="mb-4 bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Booking created successfully! Redirecting...
                </AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert className="mb-4" variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" name="fullName" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="activityType">Select Water Activity</Label>
                <Select name="activityType" required onValueChange={handleActivityChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an activity" />
                  </SelectTrigger>
                  <SelectContent>
                    {watersports.map((activity) => (
                      <SelectItem key={activity.id} value={activity.name}>
                        {activity.name} - ₱{activity.basePrice.toLocaleString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="activityDate">Activity Date</Label>
                <Input id="activityDate" name="activityDate" type="date" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="participants">
                  {selectedActivityData?.name === 'Jet Ski' 
                    ? 'Number of Minutes' 
                    : 'Number of Participants'}
                </Label>
                <Input 
                  id="participants" 
                  name="participants" 
                  type="number" 
                  min="1" 
                  max={selectedActivityData?.name === 'Jet Ski' ? '60' : '20'}
                  value={participants || 1}
                  onChange={(e) => handleParticipantsChange(parseInt(e.target.value) || 1)}
                  required 
                />
                {selectedActivityData?.name === 'Jet Ski' && (
                  <p className="text-xs text-blue-600">
                    ₱150 per minute • Min: 5 minutes • Max: 60 minutes
                  </p>
                )}
                {selectedActivityData && selectedActivityData.name !== 'Jet Ski' && participants > selectedActivityData.capacity && (
                  <p className="text-xs text-amber-600">
                    Excess charge: ₱{selectedActivityData.excessCharge}/person applies
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                <Textarea 
                  id="specialRequests" 
                  name="specialRequests" 
                  rows={2} 
                  placeholder="Any special requirements?" 
                />
              </div>

              {totalAmount > 0 && (
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Amount:</span>
                    <span className="text-2xl font-bold text-primary">
                      ₱{totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select name="paymentMethod" required onValueChange={(value) => setSelectedPaymentMethod(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GCash">GCash</SelectItem>
                    <SelectItem value="PayMaya">PayMaya</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="Cash">Cash on Arrival</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Payment Instructions */}
              {selectedPaymentMethod && selectedPaymentMethod !== 'Cash' && (
                <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
                  <CardContent className="pt-4">
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-blue-700 dark:text-blue-300">
                      <AlertCircle className="h-4 w-4" />
                      Payment Instructions
                    </h4>
                    {selectedPaymentMethod === 'GCash' && (
                      <div className="space-y-2 text-sm">
                        <p className="font-semibold">Send payment to:</p>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border">
                          <p className="text-lg font-bold text-blue-600">0917 123 4567</p>
                          <p className="text-xs text-muted-foreground">Account Name: Balatasan Resort</p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          • Take a screenshot of your payment confirmation<br />
                          • Upload it below for faster approval
                        </p>
                      </div>
                    )}
                    {selectedPaymentMethod === 'PayMaya' && (
                      <div className="space-y-2 text-sm">
                        <p className="font-semibold">Send payment to:</p>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border">
                          <p className="text-lg font-bold text-pink-600">0917 123 4567</p>
                          <p className="text-xs text-muted-foreground">Account Name: Balatasan Resort</p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          • Take a screenshot of your payment confirmation<br />
                          • Upload it below for faster approval
                        </p>
                      </div>
                    )}
                    {selectedPaymentMethod === 'Bank Transfer' && (
                      <div className="space-y-2 text-sm">
                        <p className="font-semibold">Bank Details:</p>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border space-y-1">
                          <p><span className="text-muted-foreground">Bank:</span> <span className="font-semibold">BDO</span></p>
                          <p><span className="text-muted-foreground">Account Number:</span> <span className="font-bold">1234-5678-9012</span></p>
                          <p className="text-xs text-muted-foreground">Account Name: Balatasan Beach Resort</p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          • Upload deposit slip or transfer confirmation below
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              <div className="grid gap-2">
                <Label htmlFor="paymentProof">Payment Proof</Label>
                <Input
                  id="paymentProof"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPaymentProof(e.target.files?.[0] || null)}
                />
                <p className="text-xs text-muted-foreground">
                  Upload proof for faster approval
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading || !selectedActivity}
              >
                {loading ? 'Creating Booking...' : 'Submit Booking'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Activity Preview */}
        <div className="space-y-4">
          {selectedActivityData ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>{selectedActivityData.name}</CardTitle>
                  <CardDescription>{selectedActivityData.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {activityImage && (
                    <div className="relative h-64 w-full rounded-lg overflow-hidden mb-4">
                      <Image
                        src={activityImage.imageUrl}
                        alt={selectedActivityData.name}
                        fill
                        className="object-cover"
                        data-ai-hint={activityImage.imageHint}
                      />
                    </div>
                  )}
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category:</span>
                      <span className="font-semibold">{selectedActivityData.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-semibold">{selectedActivityData.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Capacity:</span>
                      <span className="font-semibold">{selectedActivityData.capacity} persons</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {selectedActivityData.name === 'Jet Ski' ? 'Price per Minute:' : 'Base Price:'}
                      </span>
                      <span className="font-semibold text-primary">
                        ₱{selectedActivityData.basePrice.toLocaleString()}
                        {selectedActivityData.name === 'Jet Ski' && '/min'}
                      </span>
                    </div>
                    {selectedActivityData.excessCharge && selectedActivityData.name !== 'Jet Ski' && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Excess Charge:</span>
                        <span className="font-semibold">
                          ₱{selectedActivityData.excessCharge}/person
                        </span>
                      </div>
                    )}
                    {selectedActivityData.name === 'Jet Ski' && (
                      <div className="flex justify-between items-baseline">
                        <span className="text-muted-foreground">Selected Duration:</span>
                        <span className="font-bold text-2xl text-primary">
                          {participants} {participants === 1 ? 'minute' : 'minutes'}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-blue-600" />
                    Safety Information
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Life jackets provided and mandatory</li>
                    <li>Safety briefing before activity</li>
                    <li>Certified instructors on duty</li>
                    <li>Weather conditions monitored</li>
                  </ul>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                <Waves className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Select a water activity to see details and preview</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
