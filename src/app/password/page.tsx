'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

function PasswordForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push(redirect);
        router.refresh();
      } else {
        setError('Incorrect password. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg border-0 bg-card/80 backdrop-blur-sm">
      <CardHeader className="text-center space-y-2">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <CardTitle className="text-2xl font-semibold">Welcome</CardTitle>
        <CardDescription className="text-muted-foreground">
          Enter the password to access the store
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 text-center text-lg tracking-wider"
              autoFocus
            />
            {error && (
              <p className="text-sm text-destructive text-center">{error}</p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full h-12 text-base font-medium"
            disabled={isLoading || !password}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Verifying...
              </span>
            ) : (
              'Enter Store'
            )}
          </Button>
        </form>
        <p className="text-xs text-center text-muted-foreground mt-6">
          This store is password protected. Contact the owner for access.
        </p>
      </CardContent>
    </Card>
  );
}

function PasswordFormLoading() {
  return (
    <Card className="w-full max-w-md shadow-lg border-0 bg-card/80 backdrop-blur-sm">
      <CardHeader className="text-center space-y-2">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 animate-pulse" />
        <div className="h-8 w-32 bg-muted rounded mx-auto animate-pulse" />
        <div className="h-4 w-48 bg-muted rounded mx-auto animate-pulse" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-12 w-full bg-muted rounded animate-pulse" />
          <div className="h-12 w-full bg-muted rounded animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function PasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4">
      <Suspense fallback={<PasswordFormLoading />}>
        <PasswordForm />
      </Suspense>
    </div>
  );
}
