# Signal Bloom

Signal Bloom is a serene and visually breathtaking signal-flow garden game integrating on-chain interactions on Base Mainnet.

## Game Concept
You are a **Signal Bloom Weaver** who sends glowing signals through a mystical digital garden to make flowers bloom, crystals resonate, and the entire landscape come alive with beautiful cascading light. 

**Core Gameplay:**
- Tap and drag to send colorful Signal Pulses across the garden.
- Connections trigger blooming light effects, resonance patterns, and cascade blooms.
- Unlock varied signal types such as Light, Pulse, Resonance, Prism, and Void.
- Enjoy an ethereal garden environment with a soothing palette and reactive ambient interactions.

## Features
- **Mobile First:** Optimized for portrait mobile screens and PWA-ready.
- **Canvas-based:** Custom particle engine representing the signal physics and bloom simulations.
- **On-chain Integrations:** 
  - **Most Beautiful Garden / Highest Bloom Score** via SIWE signatures.
  - **ERC-8021 Transaction Attribution System** integrations.
  - **ERC-8004 Trustless Agents** functionality via an embedded orchestrator.
  - Integrates `wagmi` and `viem` directly with the Base Mainnet.

## Trustless Agent Integrations (ERC-8004)
Signal Bloom hosts an active Trustless Agent via MCP (Model Context Protocol).
- **A2A Endpoint:** `/.well-known/agent-card.json`
- **MCP API:** `/api/mcp`
- **Agent control API:** `/api/agent`

These endpoints allow agentic frameworks to detect, recognize patterns, orchestrate bloom automation, and intelligently execute multi-signal growth on behalf of users.

## Development

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
