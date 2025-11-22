'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CheckCircle, XCircle, Eye, Calendar, User, DollarSign, ArrowLeft } from 'lucide-react';
import { updateBookingStatus, type Booking } from '@/lib/bookings';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showProof, setShowProof] = useState(false);

  useEffect(() => {
    // Real-time listener for all bookings
    const bookingsQuery = query(collection(db, 'bookings'));

    const unsubscribe = onSnapshot(bookingsQuery, (snapshot) => {
      console.log('Admin bookings snapshot received, count:', snapshot.docs.length);
      const bookingsData = snapshot.docs.map(doc => {
        const data = doc.data();
        console.log('Admin booking data:', { id: doc.id, ...data });
        return {
          id: doc.id,
          ...data,
          bookingDate: data.bookingDate?.toDate?.() || new Date(data.bookingDate),
          createdAt: data.createdAt?.toDate?.() || new Date(data.createdAt),
          updatedAt: data.updatedAt?.toDate?.() || new Date(data.updatedAt),
        } as Booking;
      });
      // Sort manually by createdAt
      bookingsData.sort((a, b) => {
        const aTime = a.createdAt instanceof Date ? a.createdAt.getTime() : 0;
        const bTime = b.createdAt instanceof Date ? b.createdAt.getTime() : 0;
        return bTime - aTime;
      });
      console.log('Setting admin bookings:', bookingsData);
      setBookings(bookingsData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching admin bookings:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function handleStatusUpdate(bookingId: string, status: 'approved' | 'rejected') {
    try {
      await updateBookingStatus(bookingId, status);
      // No need to reload - real-time listener will update automatically
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  }

  function getStatusBadge(status: string) {
    const variants: Record<string, { variant: any; label: string }> = {
      pending: { variant: 'default', label: 'Pending' },
      approved: { variant: 'default', label: 'Approved' },
      rejected: { variant: 'destructive', label: 'Rejected' },
      completed: { variant: 'default', label: 'Completed' },
    };
    const config = variants[status] || variants.pending;
    return <Badge variant={config.variant} className={
      status === 'approved' ? 'bg-green-500' :
      status === 'pending' ? 'bg-yellow-500' : ''
    }>{config.label}</Badge>;
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <p>Loading bookings...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <Image
        src="https://i.ytimg.com/vi/GNAkv2CTl_8/maxresdefault.jpg"
        alt="Balatasan Beach Background"
        fill
        className="object-cover -z-10"
      />
      <div className="absolute inset-0 bg-slate-900/85 backdrop-blur-sm -z-10" />
      
      <div className="container mx-auto py-8 px-4 relative">
      <Link
        href="/admin/dashboard"
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Admin Dashboard
      </Link>
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Booking Management</h1>
        <p className="text-muted-foreground">Review and manage all bookings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
          <CardDescription>
            {bookings.length} total booking{bookings.length !== 1 ? 's' : ''}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{booking.userName}</p>
                      <p className="text-xs text-muted-foreground">{booking.userEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">{booking.bookingType}</TableCell>
                  <TableCell>{booking.itemName}</TableCell>
                  <TableCell>
                    {new Date(booking.bookingDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>₱{booking.totalAmount.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {booking.paymentMethod}
                      {booking.paymentProofUrl && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setSelectedBooking(booking);
                            setShowProof(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(booking.status)}</TableCell>
                  <TableCell>
                    {booking.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="default"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleStatusUpdate(booking.id!, 'approved')}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleStatusUpdate(booking.id!, 'rejected')}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {bookings.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No bookings found
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Proof Dialog */}
      <Dialog open={showProof} onOpenChange={setShowProof}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Payment Proof</DialogTitle>
            <DialogDescription>
              {selectedBooking?.userName} - {selectedBooking?.paymentMethod}
            </DialogDescription>
          </DialogHeader>
          {selectedBooking?.paymentProofUrl && (
            <div className="relative w-full h-96">
              <Image
                src={selectedBooking.paymentProofUrl}
                alt="Payment Proof"
                fill
                className="object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
      </div>
    </div>
  );
}
