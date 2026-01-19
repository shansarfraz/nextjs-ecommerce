'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PasswordPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
        router.push('/');
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
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f7',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center'
      }}>
        <h1 style={{ marginBottom: '8px', fontSize: '24px', fontWeight: '600' }}>Welcome</h1>
        <p style={{ marginBottom: '24px', color: '#666', fontSize: '14px' }}>
          Enter the password to access the store
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              marginBottom: '16px',
              boxSizing: 'border-box',
              textAlign: 'center'
            }}
            autoFocus
          />

          {error && (
            <p style={{ color: 'red', fontSize: '14px', marginBottom: '16px' }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading || !password}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              backgroundColor: '#007AFF',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: isLoading || !password ? 'not-allowed' : 'pointer',
              opacity: isLoading || !password ? 0.6 : 1
            }}
          >
            {isLoading ? 'Verifying...' : 'Enter Store'}
          </button>
        </form>

        <p style={{ marginTop: '24px', fontSize: '12px', color: '#999' }}>
          This store is password protected.
        </p>
      </div>
    </div>
  );
}
