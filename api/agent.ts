export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }

  if (req.method === 'GET') {
    return Response.json({
      name: "Signal Blooms Orchestrator",
      status: "active",
      wallet: "0x29536D0bc1004ab274c4F0F59734Ad74D4559b7B",
      platform: "Signal Blooms",
      version: "1.0.0"
    }, { headers: corsHeaders() });
  }

  if (req.method === 'POST') {
    try {
      const body = await req.json();
      return Response.json({
        status: "success",
        message: "Agent control command received",
        agent: "Signal Blooms Orchestrator",
        receivedAt: new Date().toISOString(),
        payload: body
      }, { headers: corsHeaders() });
    } catch (error) {
      return Response.json({ error: "Invalid Agent request" }, { status: 400, headers: corsHeaders() });
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
