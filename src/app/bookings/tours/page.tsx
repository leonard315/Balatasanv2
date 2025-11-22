'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, CheckCircle, AlertCircle, Calendar, Palmtree } from 'lucide-react';
import { tours } from '@/lib/data';

export default function TourBookingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [selectedTour, setSelectedTour] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [endDate, setEndDate] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
      setTimeout(() => router.push('/dashboard'), 2000);
    } catch (err: any) {
      setError('Failed to create booking');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Link href="/dashboard" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>

        <Card className="shadow-xl border-0 bg-white">
          <CardHeader className="bg-white border-b pb-4">
            <CardTitle className="text-xl flex items-center gap-2 text-gray-800">
              <Calendar className="h-5 w-5 text-orange-500" />
              New Booking
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 bg-white space-y-6">
            {success && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">Booking created successfully!</AlertDescription>
              </Alert>
            )}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bookingDate" className="text-sm text-gray-700">Booking Date</Label>
                  <Input 
                    id="bookingDate" 
                    name="bookingDate" 
                    type="date" 
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="bg-gray-900 text-white border-gray-700 h-11"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate" className="text-sm text-gray-700">End Date (Optional)</Label>
                  <Input 
                    id="endDate" 
                    name="endDate" 
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="bg-gray-900 text-white border-gray-700 h-11"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm text-gray-800 flex items-center gap-2">
                  <Palmtree className="h-4 w-4 text-orange-500" />
                  Available Island Tour Packages
                </Label>
                <p className="text-xs text-gray-600">
                  Explore the natural wonders surrounding Balatasan. Adventure awaits!
                </p>
                
                <div className="border border-gray-300 rounded-md overflow-hidden">
                  <div className="bg-gray-700 text-white px-4 py-3 text-sm font-medium">
                    Select your island adventure
                  </div>
                  <RadioGroup value={selectedTour} onValueChange={setSelectedTour} className="divide-y divide-gray-200">
                    {tours.map((tour) => (
                      <label 
                        key={tour.id}
                        className="flex items-start gap-3 p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <RadioGroupItem value={tour.id} id={tour.id} className="mt-1" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-medium text-gray-900 text-sm">{tour.name}</span>
                            <span className="text-blue-600 font-semibold text-sm whitespace-nowrap">
                              ₱{tour.price.toLocaleString()} ({tour.duration})
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1 leading-relaxed">{tour.description}</p>
                        </div>
                      </label>
                    ))}
                  </RadioGroup>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm text-gray-800 font-medium">Payment Method</Label>
                <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 cursor-pointer transition-colors">
                      <RadioGroupItem value="gcash" id="gcash" />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xs">
                          G
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">GCash</div>
                          <div className="text-xs text-gray-600">Pay via GCash mobile wallet</div>
                        </div>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-md hover:bg-green-100 cursor-pointer transition-colors">
                      <RadioGroupItem value="paymaya" id="paymaya" />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center text-white font-bold text-xs">
                          P
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">PayMaya</div>
                          <div className="text-xs text-gray-600">Pay using PayMaya wallet</div>
                        </div>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 cursor-pointer transition-colors">
                      <RadioGroupItem value="card" id="card" />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-xs">
                          💳
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">Credit/Debit Card</div>
                          <div className="text-xs text-gray-600">Visa, Mastercard, or other cards</div>
                        </div>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-md hover:bg-green-100 cursor-pointer transition-colors">
                      <RadioGroupItem value="cash" id="cash" />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white text-xs">
                          💵
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">Cash on Arrival</div>
                          <div className="text-xs text-gray-600">Pay when you check in at the resort</div>
                        </div>
                      </div>
                    </label>
                  </div>
                </RadioGroup>
              </div>

              <div className="bg-pink-50 border border-pink-200 rounded-md p-4">
                <h4 className="font-semibold text-pink-900 text-sm mb-2 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Payment Instructions:
                </h4>
                <ul className="text-xs text-gray-700 space-y-1 leading-relaxed">
                  <li>• A 50% deposit is required to confirm your booking</li>
                  <li>• Upload proof of payment after making the deposit</li>
                  <li>• Full payment must be completed 3 days before check in</li>
                  <li>• Cancellations made 7 days before check in are fully refundable</li>
                </ul>
              </div>

              <div className="flex gap-3 pt-2">
                <Button 
                  type="submit" 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-11 text-sm font-semibold"
                  disabled={loading || !selectedTour || !selectedPaymentMethod || !bookingDate}
                >
                  {loading ? 'Processing...' : 'Submit Booking Request'}
                </Button>
                <Button 
                  type="button"
                  className="bg-gray-900 hover:bg-gray-800 text-white h-11 px-8 text-sm font-semibold"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
