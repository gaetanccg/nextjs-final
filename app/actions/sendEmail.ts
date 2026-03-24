'use server';

import nodemailer from 'nodemailer';

interface SendApplicationInput {
    jobId: string;
    message: string;
    adminEmails: string[];
}

const DRY_RUN = !process.env.SMTP_HOST;

export async function sendApplication(
    input: SendApplicationInput
): Promise<{ success: boolean; error?: string }> {
    const {jobId, message, adminEmails} = input;

    if (!message.trim()) {
        return {success: false, error: 'Le message ne peut pas être vide.'};
    }

    if (adminEmails.length === 0) {
        return {success: false, error: 'Aucun destinataire configuré pour cette offre.'};
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'sandbox.smtp.mailtrap.io',
        port: Number(process.env.SMTP_PORT) || 587,
        auth: {
            user: process.env.SMTP_USER || '',
            pass: process.env.SMTP_PASS || '',
        },
    });

    const mailOptions = {
        from: process.env.SMTP_FROM || 'noreply@dev-jobs.com',
        to: adminEmails.join(', '),
        subject: `Nouvelle candidature - ${jobId}`,
        text: message,
        html: `<h2>Nouvelle candidature pour l'offre : ${jobId}</h2><p>${message.replace(/\n/g, '<br>')}</p>`,
    };

    if (DRY_RUN) {
        console.log('[Nodemailer] Mode simulation — SMTP non configuré');
        console.log('[Nodemailer] Mail préparé:', JSON.stringify(mailOptions, null, 2));
        return {success: true};
    }

    try {
        await transporter.sendMail(mailOptions);
        return {success: true};
    } catch (err) {
        console.error('[Nodemailer] Erreur:', err);
        return {success: false, error: "Erreur lors de l'envoi de l'email."};
    }
}
