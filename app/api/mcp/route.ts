import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    protocol: "MCP",
    version: "1.0.0",
    name: "Signal Blooms MCP Endpoint",
    status: "active",
    description: "Active MCP server for Signal Blooms Orchestrator Agent",
    capabilities: ["signal-blooming", "pattern-recognition", "multi-signal-growth"],
    timestamp: new Date().toISOString()
  }, {
    headers: corsHeaders()
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { method, params } = body || {};

    // Standard MCP method routing
    if (method === 'tools/list') {
      return NextResponse.json({
        tools: [
          { name: "get_race_status", description: "Get the current race status" },
          { name: "start_race", description: "Start a new race" },
          { name: "get_leaderboard", description: "Get the race leaderboard" },
          { name: "optimize_speed", description: "Optimize speed for the race" },
          { name: "get_track_info", description: "Get track information" }
        ]
      }, { headers: corsHeaders() });
    }

    if (method === 'tools/call') {
      return NextResponse.json({
        status: "success",
        result: `Executed ${params?.name || 'tool'} successfully`
      }, { headers: corsHeaders() });
    }

    if (method === 'prompts/list') {
      return NextResponse.json({ prompts: [] }, { headers: corsHeaders() });
    }

    if (method === 'resources/list') {
      return NextResponse.json({ resources: [] }, { headers: corsHeaders() });
    }

    // Default MCP POST handler
    return NextResponse.json({
      status: "success",
      message: "MCP command received",
      agent: "Signal Blooms Orchestrator",
      receivedAt: new Date().toISOString(),
      payload: body
    }, { headers: corsHeaders() });

  } catch (error) {
    return NextResponse.json({ error: "Invalid MCP request" }, { status: 400, headers: corsHeaders() });
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
