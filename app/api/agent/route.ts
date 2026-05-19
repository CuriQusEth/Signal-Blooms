import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    name: "Signal Blooms Orchestrator",
    status: "active",
    wallet: "0x29536D0bc1004ab274c4F0F59734Ad74D4559b7B",
    platform: "Signal Blooms",
    version: "1.0.0"
  }, {
    headers: corsHeaders()
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    return NextResponse.json({
      status: "success",
      message: "Agent control command received",
      agent: "Signal Blooms Orchestrator",
      receivedAt: new Date().toISOString(),
      payload: body
    }, { headers: corsHeaders() });
  } catch (error) {
    return NextResponse.json({ error: "Invalid Agent request" }, { status: 400, headers: corsHeaders() });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders()
  });
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}
