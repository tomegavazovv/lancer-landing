import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

// MailerLite API configuration
const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;
const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID; // The group ID for your onboarding flow

// Calendly webhook signature verification
const verifyCalendlyWebhook = (signature: string, payload: string) => {
  // Implement Calendly webhook signature verification
  // This is a placeholder - you should implement proper signature verification
  return true;
};

export async function POST(request: Request) {
  try {
    const headersList = headers();
    const signature = headersList.get('calendly-webhook-signature');
    
    if (!signature) {
      return NextResponse.json({ error: 'No signature provided' }, { status: 401 });
    }

    const payload = await request.text();
    
    // Verify the webhook signature
    if (!verifyCalendlyWebhook(signature, payload)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const data = JSON.parse(payload);
    
    // Check if this is a booking confirmation event
    if (data.event === 'invitee.created') {
      const { email, name } = data.payload.invitee;
      
      // Add subscriber to MailerLite
      const mailerLiteResponse = await fetch('https://api.mailerlite.com/api/v2/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-MailerLite-ApiKey': MAILERLITE_API_KEY!,
        },
        body: JSON.stringify({
          email,
          name,
          groups: [MAILERLITE_GROUP_ID],
          resubscribe: true,
          autoresponders: true,
        }),
      });

      if (!mailerLiteResponse.ok) {
        throw new Error('Failed to add subscriber to MailerLite');
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 