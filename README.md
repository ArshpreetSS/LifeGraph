# LifeGraph — Interactive 3D Digital Art & Knowledge Graph

LifeGraph is an interactive, cinematic 3D web experience built around personal knowledge, continuous scrollytelling, and associative graph visualization.

---

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 3. Production Build
```bash
npm run build
npm run start
```

---

## Tech Stack

- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **3D & Canvas**: Three.js, React Three Fiber, React Three Drei
- **Animation & Physics**: GSAP, Lenis Smooth Scroll
- **Styling**: Tailwind CSS
- **3D Assets**: PBR GLB format (`public/models/avatar.glb`)

---

## Project Structure

```
├── app/                  # Next.js App Router (pages, layout, globals.css)
├── components/
│   ├── 3d/               # Three.js canvas, character choreography, constellation graph
│   └── cinematic/        # Scrollytelling chapters & editorial typography
├── lib/                  # Utilities and mock graph structures
├── public/
│   └── models/           # 3D models (avatar.glb)
└── package.json          # Dependencies and scripts
```

---

## Backend Integration

For backend developers building the knowledge graph and API services:

### Suggested Endpoints:
- `GET /api/graph` — Returns current knowledge nodes and associative edges.
- `POST /api/ingest` — Ingests user notes/documents and triggers entity extraction.
- `POST /api/query` — Semantic search / natural language queries across the graph.
- `GET /api/stats` — Node counts, clusters, and connectivity metrics.

### Node & Edge Contract:
```typescript
interface GraphNode {
  id: string;
  label: string;
  category: "SKILL" | "PROJECT" | "GOAL" | "UNDERSTANDING" | "DOCUMENT";
  position?: [number, number, number];
  color?: string;
}

interface GraphEdge {
  source: string;
  target: string;
  relationship?: string;
}
```

Connect the frontend to your backend by configuring `.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```
