import { NextRequest, NextResponse } from 'next/server';

const BASE44_URL = 'https://ctc-strength-ai.base44.app';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  const resolvedParams = await params;
  return proxyRequest(request, resolvedParams);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  const resolvedParams = await params;
  return proxyRequest(request, resolvedParams);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  const resolvedParams = await params;
  return proxyRequest(request, resolvedParams);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  const resolvedParams = await params;
  return proxyRequest(request, resolvedParams);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  const resolvedParams = await params;
  return proxyRequest(request, resolvedParams);
}

async function proxyRequest(
  request: NextRequest,
  params: { path?: string[] }
) {
  // Build the target URL
  const path = params.path ? params.path.join('/') : '';
  const searchParams = request.nextUrl.searchParams.toString();
  const targetUrl = `${BASE44_URL}/${path}${searchParams ? `?${searchParams}` : ''}`;

  try {
    // Forward the request to Base44
    const headers = new Headers(request.headers);
    
    // Remove host header to avoid conflicts
    headers.delete('host');
    
    const body = request.method !== 'GET' && request.method !== 'HEAD' 
      ? await request.text() 
      : undefined;

    const response = await fetch(targetUrl, {
      method: request.method,
      headers,
      body,
      redirect: 'manual', // Handle redirects manually
    });

    // Clone the response headers
    const responseHeaders = new Headers(response.headers);
    
    // Remove headers that could cause issues
    responseHeaders.delete('content-encoding');
    responseHeaders.delete('transfer-encoding');

    // Return the proxied response
    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return new NextResponse('Proxy error', { status: 500 });
  }
}
