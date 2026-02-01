import { NextRequest, NextResponse } from 'next/server';

const APIURL = 'https://api.lancer.app';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const resolvedParams = await params;
  return handleRequest(request, resolvedParams, 'GET');
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const resolvedParams = await params;
  return handleRequest(request, resolvedParams, 'POST');
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const resolvedParams = await params;
  return handleRequest(request, resolvedParams, 'PATCH');
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const resolvedParams = await params;
  return handleRequest(request, resolvedParams, 'DELETE');
}

async function handleRequest(
  request: NextRequest,
  params: { path: string[] },
  method: string,
) {
  try {
    const path = params.path.join('/');
    const url = `${APIURL}/${path}`;

    // Get query string if present
    const searchParams = request.nextUrl.searchParams.toString();
    const fullUrl = searchParams ? `${url}?${searchParams}` : url;

    // Get request body for POST/PATCH requests
    let body: any = undefined;
    if (method === 'POST' || method === 'PATCH') {
      try {
        body = await request.json();
      } catch {
        // Body might be empty or not JSON
        body = undefined;
      }
    }

    // Forward headers (excluding host and connection)
    const headers: HeadersInit = {};
    request.headers.forEach((value, key) => {
      if (
        !['host', 'connection', 'content-length'].includes(key.toLowerCase())
      ) {
        headers[key] = value;
      }
    });

    // Forward cookies if present
    const cookieHeader = request.headers.get('cookie');
    if (cookieHeader) {
      headers['cookie'] = cookieHeader;
    }

    // Make the request to the external API
    const response = await fetch(fullUrl, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include',
    });

    // Get response data
    const contentType = response.headers.get('content-type');
    let data: any;

    if (contentType?.includes('application/json')) {
      data = await response.json();
    } else if (contentType?.includes('text/event-stream')) {
      // Handle SSE streams
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response body');
      }

      return new Response(response.body, {
        status: response.status,
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        },
      });
    } else {
      data = await response.text();
    }

    // Forward response headers (excluding ones we'll set)
    const responseHeaders: HeadersInit = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Forward content-type from original response
    if (contentType) {
      responseHeaders['Content-Type'] = contentType;
    }

    // Return response preserving original structure
    return NextResponse.json(data, {
      status: response.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      {
        error: 'Failed to proxy request',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
