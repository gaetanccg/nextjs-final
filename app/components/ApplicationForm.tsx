'use client';

import { useState } from 'react';
import { sendApplication } from '@/app/actions/sendEmail';

interface ApplicationFormProps {
  jobId: string;
  adminEmails: string[];
}

export default function ApplicationForm({ jobId, adminEmails }: ApplicationFormProps) {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setStatus('loading');
    try {
      const result = await sendApplication({ jobId, message, adminEmails });
      if (result.success) {
        setStatus('success');
        setMessage('');
      } else {
        setStatus('error');
        setErrorMsg(result.error || 'Une erreur est survenue.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Une erreur est survenue.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Votre message de candidature..."
        rows={6}
        className="w-full rounded-lg border border-medium bg-white px-4 py-3 text-sm font-medium text-dark placeholder:text-dark/40 focus:border-primary focus:outline-none"
        disabled={status === 'loading'}
        required
      />

      <button
        type="submit"
        disabled={status === 'loading'}
        className="self-start rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
      >
        {status === 'loading' ? 'Envoi en cours...' : 'Envoyer ma candidature'}
      </button>

      {status === 'success' && (
        <p className="text-sm font-medium text-green-600">
          Candidature envoyée avec succès !
        </p>
      )}
      {status === 'error' && (
        <p className="text-sm font-medium text-red-600">{errorMsg}</p>
      )}
    </form>
  );
}
