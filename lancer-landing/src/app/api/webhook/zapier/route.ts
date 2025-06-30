import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    if (!body.email || !body.timestamp || !body.source) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Zapier webhook URL
    const zapierWebhookUrl = process.env.ZAPIER_WEBHOOK_URL || 'https://hooks.zapier.com/hooks/catch/18009054/ubw5ltp/';
    
    // Forward the request to Zapier
    const zapierResponse = await fetch(zapierWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: body.email,
        timestamp: body.timestamp,
        source: body.source,
      }),
    });

    if (!zapierResponse.ok) {
      console.error('Zapier webhook failed:', zapierResponse.status, zapierResponse.statusText);
      return NextResponse.json(
        { error: 'Failed to submit to webhook' },
        { status: 500 }
      );
    }

    const zapierData = await zapierResponse.json();
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Email submitted successfully',
        zapierResponse: zapierData 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 