'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, TrendingUp, Users, MessageSquare } from 'lucide-react';
import { getAllFeedback, getFeedbackStats, type Feedback } from '@/lib/feedback';
import { format } from 'date-fns';

export default function AdminFeedbackPage() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [feedbackData, statsData] = await Promise.all([
          getAllFeedback(),
          getFeedbackStats(),
        ]);
        setFeedback(feedbackData);
        setStats(statsData);
      } catch (error) {
        console.error('Error loading feedback:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      service: 'bg-blue-100 text-blue-800',
      facilities: 'bg-green-100 text-green-800',
      food: 'bg-orange-100 text-orange-800',
      activities: 'bg-purple-100 text-purple-800',
      overall: 'bg-pink-100 text-pink-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Loading feedback...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Customer Feedback</h1>
        <p className="text-muted-foreground">Monitor and analyze customer satisfaction</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-blue-600" />
              <span className="text-2xl font-bold">{stats?.totalFeedback || 0}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Average Rating</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="text-2xl font-bold">{stats?.averageRating || '0'}</span>
              <span className="text-sm text-muted-foreground">/ 5.0</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Service Rating</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-2xl font-bold">{stats?.categoryAverages?.service || '0'}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Facilities Rating</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-600" />
              <span className="text-2xl font-bold">{stats?.categoryAverages?.facilities || '0'}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feedback List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Feedback</CardTitle>
          <CardDescription>Latest customer reviews and ratings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {feedback.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No feedback yet</p>
            ) : (
              feedback.map((item) => (
                <div key={item.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold">{item.userName}</p>
                      <p className="text-sm text-muted-foreground">{item.userEmail}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getCategoryColor(item.category)}>
                        {item.category}
                      </Badge>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < item.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm">{item.comment}</p>
                  <p className="text-xs text-muted-foreground">
                    {format(item.createdAt, 'PPpp')}
                  </p>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
