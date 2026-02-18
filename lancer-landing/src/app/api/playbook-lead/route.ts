import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.email || !body.source) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    await prisma.leadSubmission.create({
      data: {
        id: crypto.randomUUID(),
        email: body.email.trim(),
        upworkUrl: body.upworkUrl?.trim() || '',
        linkedinUrl: body.linkedinUrl?.trim() || null,
        source: body.source,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(
      { success: true, message: 'Lead submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Playbook lead API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
