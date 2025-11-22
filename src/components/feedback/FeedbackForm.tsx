'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Star, CheckCircle, AlertCircle } from 'lucide-react';
import { createFeedback } from '@/lib/feedback';
import { getCurrentUser } from '@/lib/auth';

export default function FeedbackForm() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [category, setCategory] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const user = getCurrentUser();
    if (!user) {
      setError('Please login to submit feedback');
      setLoading(false);
      return;
    }

    try {
      await createFeedback({
        userId: user.uid,
        userName: user.displayName || 'Guest',
        userEmail: user.email || '',
        rating,
        category: category as any,
        comment,
      });

      setSuccess(true);
      setRating(0);
      setCategory('');
      setComment('');
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to submit feedback');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Share Your Feedback</CardTitle>
        <CardDescription>Help us improve your experience</CardDescription>
      </CardHeader>
      <CardContent>
        {success && (
          <Alert className="mb-4 bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Thank you for your feedback!
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
          <div className="space-y-2">
            <Label>Rating</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoveredRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <RadioGroup value={category} onValueChange={setCategory}>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center gap-2 p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="service" id="service" />
                  <span className="text-sm">Service</span>
                </label>
                <label className="flex items-center gap-2 p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="facilities" id="facilities" />
                  <span className="text-sm">Facilities</span>
                </label>
                <label className="flex items-center gap-2 p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="food" id="food" />
                  <span className="text-sm">Food</span>
                </label>
                <label className="flex items-center gap-2 p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="activities" id="activities" />
                  <span className="text-sm">Activities</span>
                </label>
                <label className="flex items-center gap-2 p-3 border rounded-md cursor-pointer hover:bg-gray-50 col-span-2">
                  <RadioGroupItem value="overall" id="overall" />
                  <span className="text-sm">Overall Experience</span>
                </label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Your Feedback</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us about your experience..."
              rows={4}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading || rating === 0 || !category}
          >
            {loading ? 'Submitting...' : 'Submit Feedback'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
