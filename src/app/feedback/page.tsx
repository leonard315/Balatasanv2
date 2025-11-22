'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import FeedbackForm from '@/components/feedback/FeedbackForm';

export default function FeedbackPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>

        <FeedbackForm />
      </div>
    </div>
  );
}
