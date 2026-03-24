'use client';

import {useEffect, useState} from 'react';
import {sendApplication} from '@/app/actions/sendEmail';
import {useApplicationStore} from '@/app/store/useApplicationStore';

interface ApplicationFormProps {
    jobId: string;
    adminEmails: string[];
}

export default function ApplicationForm({jobId, adminEmails}: ApplicationFormProps) {
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const {addApplication, hasApplied} = useApplicationStore();
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    const alreadyApplied = hydrated && hasApplied(jobId);

    if (alreadyApplied || status === 'success') {
        return (
            <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
                    <circle cx="12" cy="12" r="10" fill="#16a34a" />
                    <path d="M8 12.5l2.5 2.5L16 9.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                    <p className="text-sm font-bold text-green-800">Candidature envoyée</p>
                    <p className="text-sm text-green-700">Vous avez déjà postulé à cette offre.</p>
                </div>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        setStatus('loading');
        try {
            const result = await sendApplication({jobId, message, adminEmails});
            if (result.success) {
                setStatus('success');
                setMessage('');
                addApplication(jobId);
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
          className="w-full rounded-lg border border-dark/10 bg-white px-4 py-3 text-sm font-medium text-dark placeholder:text-dark/40 focus:border-primary focus:outline-none"
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

            {status === 'error' && (
                <p className="text-sm font-medium text-red-600">{errorMsg}</p>
            )}
        </form>
    );
}
