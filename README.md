# Signal Bloom

Signal Bloom is a serene and visually breathtaking signal-flow garden game integrating on-chain interactions on Base Mainnet.

## Project Overview
You are a **Signal Bloom Weaver** who sends glowing signals through a mystical digital garden to make flowers bloom, crystals resonate, and the entire landscape come alive with beautiful cascading light. 

**Core Gameplay:**
- Tap and drag to send colorful Signal Pulses across the garden.
- Connections trigger blooming light effects, resonance patterns, and cascade blooms.
- Unlock varied signal types such as Light, Pulse, Resonance, Prism, and Void.
- Enjoy an ethereal garden environment with a soothing palette and reactive ambient interactions.

## Tech Stack
- Next.js 14 App Router + Web3
- TypeScript
- Tailwind CSS v4
- Canvas & Framer Motion
- viem & wagmi
- SIWE (Sign-In with Ethereum)

## App Details & URLs
- **App Name:** Signal Blooms Orchestrator
- **Platform URL:** https://signal-blooms.vercel.app/
- **Blockchain:** Base Mainnet (eip155:8453)

## Trustless Agent Integrations (ERC-8004)
Signal Bloom hosts an active Trustless Agent via MCP (Model Context Protocol).

- **A2A Endpoint:** `https://signal-blooms.vercel.app/.well-known/agent-card.json`
- **MCP API:** `https://signal-blooms.vercel.app/api/mcp`
- **Agent control API:** `https://signal-blooms.vercel.app/api/agent`

### Agent Capabilities
The AI orchestrator natively supports:
- signal-blooming
- pattern-recognition
- multi-signal-growth
- intelligent-orchestration
- trend-detection
- bloom-automation
- mcp-command-execution

## MCP Connection Guide
The MCP (Model Context Protocol) allows agentic frameworks to detect, recognize patterns, orchestrate bloom automation, and intelligently execute multi-signal growth on behalf of users.

To connect your external Agent/LLM:
1. Ensure your framework supports web standard `fetch` or HTTP protocols over `POST`.
2. Direct all calls to the active MCP server node at: `/api/mcp`
3. Tool discovery uses a `POST` request to `/api/mcp` with `{"method": "tools/list"}` payload.
4. Tool executions use a `POST` request to `/api/mcp` with `{"method": "tools/call", "params": {"name": "target_tool"}}` payload.

## How to Run Locally

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build the project
npm run build

# Start the production server
npm run start
```

## Security & Secrets
Please note: Wallet addresses, private keys, API secrets, and exact registry configuration are kept secure and loaded via standard `.env` variables outside of this repository. Be sure to configure your own environment parameters when deploying.
