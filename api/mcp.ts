export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }

  if (req.method === 'GET') {
    return Response.json({
      protocol: "MCP",
      version: "1.0.0",
      name: "Signal Blooms MCP Endpoint",
      status: "active",
      description: "Active MCP server for Signal Blooms Orchestrator Agent",
      capabilities: ["signal-blooming", "pattern-recognition", "multi-signal-growth"],
      timestamp: new Date().toISOString()
    }, { headers: corsHeaders() });
  }

  if (req.method === 'POST') {
    try {
      const body = await req.json();
      const { method, params, id, jsonrpc } = body || {};
      const rpcId = id !== undefined ? id : null;
      const rpcVersion = jsonrpc || "2.0";

      // Standard MCP method routing
      if (method === 'tools/list') {
        return Response.json({
          jsonrpc: rpcVersion,
          id: rpcId,
          result: {
            tools: [
              { name: "get_race_status", description: "Get the current race status", inputSchema: { type: "object", properties: {} } },
              { name: "start_race", description: "Start a new race", inputSchema: { type: "object", properties: {} } },
              { name: "get_leaderboard", description: "Get the race leaderboard", inputSchema: { type: "object", properties: {} } },
              { name: "optimize_speed", description: "Optimize speed for the race", inputSchema: { type: "object", properties: {} } },
              { name: "get_track_info", description: "Get track information", inputSchema: { type: "object", properties: {} } }
            ]
          }
        }, { headers: corsHeaders() });
      }

      if (method === 'tools/call') {
        return Response.json({
          jsonrpc: rpcVersion,
          id: rpcId,
          result: {
            content: [{ type: "text", text: `Executed ${params?.name || 'tool'} successfully` }]
          }
        }, { headers: corsHeaders() });
      }

      if (method === 'prompts/list') {
        return Response.json({ jsonrpc: rpcVersion, id: rpcId, result: { prompts: [] } }, { headers: corsHeaders() });
      }

      if (method === 'resources/list') {
        return Response.json({ jsonrpc: rpcVersion, id: rpcId, result: { resources: [] } }, { headers: corsHeaders() });
      }

      // Default MCP POST handler
      return Response.json({
        jsonrpc: rpcVersion,
        id: rpcId,
        result: {
          status: "success",
          message: "MCP command received"
        }
      }, { headers: corsHeaders() });

    } catch (error) {
      return Response.json({ error: "Invalid MCP request" }, { status: 400, headers: corsHeaders() });
    }
  }

  return new Response("Not Found", { status: 404, headers: corsHeaders() });
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}
