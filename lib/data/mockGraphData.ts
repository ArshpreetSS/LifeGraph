export type NodeCategory = 'GOAL' | 'SKILL' | 'PROJECT' | 'DOCUMENT' | 'LEARNING' | 'NOTE';

export interface GraphNodeData {
  id: string;
  label: string;
  category: NodeCategory;
  description: string;
  position: [number, number, number];
  size: number;
  color: string;
  connections: string[];
  metrics?: {
    progress?: number;
    activity?: string;
    lastUpdated?: string;
    tags?: string[];
  };
}

export interface GraphEdgeData {
  id: string;
  source: string;
  target: string;
  strength: number;
}

export const GRAPH_CATEGORIES: Record<NodeCategory, { label: string; color: string; glow: string; bg: string }> = {
  GOAL: {
    label: 'Goal',
    color: '#D4FF00',
    glow: 'rgba(212, 255, 0, 0.4)',
    bg: 'rgba(212, 255, 0, 0.1)',
  },
  SKILL: {
    label: 'Skill',
    color: '#10B981',
    glow: 'rgba(16, 185, 129, 0.4)',
    bg: 'rgba(16, 185, 129, 0.1)',
  },
  PROJECT: {
    label: 'Project',
    color: '#00F0FF',
    glow: 'rgba(0, 240, 255, 0.4)',
    bg: 'rgba(0, 240, 255, 0.1)',
  },
  DOCUMENT: {
    label: 'Document',
    color: '#E2E8F0',
    glow: 'rgba(226, 232, 240, 0.3)',
    bg: 'rgba(226, 232, 240, 0.1)',
  },
  LEARNING: {
    label: 'Learning',
    color: '#FBBF24',
    glow: 'rgba(251, 191, 36, 0.4)',
    bg: 'rgba(251, 191, 36, 0.1)',
  },
  NOTE: {
    label: 'Note',
    color: '#A78BFA',
    glow: 'rgba(167, 139, 250, 0.4)',
    bg: 'rgba(167, 139, 250, 0.1)',
  },
};

export const MOCK_GRAPH_NODES: GraphNodeData[] = [
  // Primary Central Goal
  {
    id: 'g-ml-mastery',
    label: 'Machine Learning Mastery',
    category: 'GOAL',
    description: 'Master autonomous reasoning systems and neural graph architectures.',
    position: [0.1, 0.85, 0.4],
    size: 0.55,
    color: '#D4FF00',
    connections: ['p-ai-agent', 's-ml', 'd-rag-doc', 'l-deep-rl'],
    metrics: { progress: 88, activity: 'Primary Objective', lastUpdated: '1h ago', tags: ['Core', 'AI', 'Mastery'] },
  },

  // Key Skill: Python
  {
    id: 's-python',
    label: 'Python',
    category: 'SKILL',
    description: 'High-performance scientific computing, PyTorch internals, and asynchronous pipelines.',
    position: [-1.4, 0.25, 0.6],
    size: 0.45,
    color: '#10B981',
    connections: ['s-ml', 'p-ai-agent', 'n-syntax-notes'],
    metrics: { progress: 95, activity: 'Core Foundation', lastUpdated: 'Active', tags: ['Language', 'Runtime'] },
  },

  // Skill / Domain: Machine Learning
  {
    id: 's-ml',
    label: 'Machine Learning',
    category: 'SKILL',
    description: 'Graph neural networks, transformer attention mechanisms, and embedding spaces.',
    position: [-0.65, 0.55, 0.8],
    size: 0.48,
    color: '#10B981',
    connections: ['s-python', 'p-ai-agent', 'g-ml-mastery', 'd-rag-doc'],
    metrics: { progress: 82, activity: 'Accelerating', lastUpdated: '2h ago', tags: ['Neural', 'Embeddings'] },
  },

  // Flagship Project: AI Agent Project
  {
    id: 'p-ai-agent',
    label: 'AI Agent Architecture',
    category: 'PROJECT',
    description: 'Autonomous cognitive assistant that synthesizes knowledge across notes and repositories.',
    position: [0.95, 0.35, 0.75],
    size: 0.52,
    color: '#00F0FF',
    connections: ['s-python', 's-ml', 'g-ml-mastery', 'd-agent-spec', 's-threejs'],
    metrics: { progress: 79, activity: 'Active Sprint', lastUpdated: 'Today', tags: ['Autonomous', 'Next.js'] },
  },

  // Supporting Skill: Three.js & Spatial WebGL
  {
    id: 's-threejs',
    label: 'Three.js & Spatial UI',
    category: 'SKILL',
    description: 'Interactive 3D graph topologies, custom shaders, and cinematic camera choreography.',
    position: [1.6, 0.75, 0.2],
    size: 0.42,
    color: '#10B981',
    connections: ['p-ai-agent', 'p-lifegraph', 'l-webgl'],
    metrics: { progress: 90, activity: 'Creative Tech', lastUpdated: 'Just now', tags: ['WebGL', 'GLSL'] },
  },

  // Flagship Platform: LifeGraph
  {
    id: 'p-lifegraph',
    label: 'LifeGraph Interface',
    category: 'PROJECT',
    description: 'Living personal knowledge graph turning disconnected thoughts into coherent understanding.',
    position: [1.2, -0.4, 0.5],
    size: 0.56,
    color: '#00F0FF',
    connections: ['s-threejs', 'g-ml-mastery', 'd-agent-spec', 'n-graph-theory'],
    metrics: { progress: 94, activity: 'Flagship V1', lastUpdated: 'Live', tags: ['Product', 'Second Brain'] },
  },

  // Document: Research Specification
  {
    id: 'd-agent-spec',
    label: 'Agent Protocol Spec',
    category: 'DOCUMENT',
    description: 'Whitepaper detailing vector distillation, context compression, and graph memory.',
    position: [0.35, -0.65, 0.85],
    size: 0.38,
    color: '#E2E8F0',
    connections: ['p-ai-agent', 'p-lifegraph', 'g-ml-mastery'],
    metrics: { progress: 100, activity: 'Canonical', lastUpdated: 'Yesterday', tags: ['Whitepaper', 'RFC'] },
  },

  // Document: RAG Benchmark
  {
    id: 'd-rag-doc',
    label: 'Semantic Retrieval RFC',
    category: 'DOCUMENT',
    description: 'Comparative precision and latency analysis across graph vs hierarchical vector search.',
    position: [-0.95, -0.45, 0.7],
    size: 0.35,
    color: '#E2E8F0',
    connections: ['s-ml', 'g-ml-mastery'],
    metrics: { progress: 85, activity: 'Research', lastUpdated: '3d ago', tags: ['RAG', 'Search'] },
  },

  // Learning / Experience: Deep RL
  {
    id: 'l-deep-rl',
    label: 'Reinforcement Learning',
    category: 'LEARNING',
    description: 'Curriculum learning dynamics and self-supervised policy exploration.',
    position: [-0.2, 1.15, -0.1],
    size: 0.38,
    color: '#FBBF24',
    connections: ['g-ml-mastery', 's-ml'],
    metrics: { progress: 64, activity: 'Studying', lastUpdated: '4d ago', tags: ['Theory', 'Papers'] },
  },

  // Learning: WebGL Shaders
  {
    id: 'l-webgl',
    label: 'GPU Pipeline & WGSL',
    category: 'LEARNING',
    description: 'Instanced buffer attributes and post-processing bloom optimization.',
    position: [1.8, -0.1, -0.2],
    size: 0.36,
    color: '#FBBF24',
    connections: ['s-threejs'],
    metrics: { progress: 72, activity: 'Experimentation', lastUpdated: '5d ago', tags: ['Graphics', 'GPU'] },
  },

  // Note: Syntax & Quick thoughts
  {
    id: 'n-syntax-notes',
    label: 'Async Patterns Note',
    category: 'NOTE',
    description: 'Micro-benchmarks on event loops and thread worker pools.',
    position: [-1.7, 0.7, 0.1],
    size: 0.32,
    color: '#A78BFA',
    connections: ['s-python'],
    metrics: { progress: 100, activity: 'Reference', lastUpdated: '6d ago', tags: ['Notes', 'Async'] },
  },

  // Note: Graph Theory Ideas
  {
    id: 'n-graph-theory',
    label: 'Graph Topology Note',
    category: 'NOTE',
    description: 'Why hierarchical folder structures fail human associative memory.',
    position: [0.6, -0.85, 0.3],
    size: 0.34,
    color: '#A78BFA',
    connections: ['p-lifegraph', 'd-agent-spec'],
    metrics: { progress: 100, activity: 'Mental Model', lastUpdated: '1w ago', tags: ['Cognition', 'Ideas'] },
  },
];

// Generate edges list
export const MOCK_GRAPH_EDGES: GraphEdgeData[] = [];
const edgeSet = new Set<string>();

MOCK_GRAPH_NODES.forEach((node) => {
  node.connections.forEach((targetId) => {
    const edgeKey = [node.id, targetId].sort().join('---');
    if (!edgeSet.has(edgeKey)) {
      edgeSet.add(edgeKey);
      MOCK_GRAPH_EDGES.push({
        id: edgeKey,
        source: node.id,
        target: targetId,
        strength: 0.85,
      });
    }
  });
});
