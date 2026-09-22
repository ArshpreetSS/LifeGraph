export type EntityType = "PROJECT" | "SKILL" | "GOAL" | "DOCUMENT" | "LEARNING" | "EXPERIENCE";

export interface ProjectItem {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  status: "Active" | "Completed" | "In Progress" | "Experimental";
  category: string;
  skills: string[];
  goals: string[];
  documents: string[];
  learning: string[];
  connectionsCount: number;
  lastUpdated: string;
  highlights: string[];
  aiInsight: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  category: "Languages" | "Frameworks" | "AI / ML" | "Graphics & 3D" | "Systems & Tools";
  yearsExp: string;
  projects: string[];
  learning: string[];
  goals: string[];
  connectionsCount: number;
  description: string;
}

export interface GoalItem {
  id: string;
  title: string;
  description: string;
  targetQuarter: string;
  progress: number;
  status: "In Progress" | "Near Target" | "Initiating";
  connectedProjects: string[];
  requiredSkills: string[];
  learningActivities: string[];
  recentMilestone: string;
  knowledgePath: { step: string; type: EntityType; id: string }[];
}

export interface DocumentItem {
  id: string;
  title: string;
  filename: string;
  fileType: "PDF" | "Markdown" | "Notes" | "Guide";
  fileSize: string;
  date: string;
  relatedProjects: string[];
  relatedSkills: string[];
  relatedGoals: string[];
  extractedConcepts: string[];
  summary: string;
  addedToGraph: boolean;
}

export interface LearningItem {
  id: string;
  title: string;
  platform: string;
  status: "in_progress" | "completed" | "recommended";
  progress: number;
  connectedProjects: string[];
  skillsGained: string[];
  recommendationReason?: string;
  timelineEstimate?: string;
  keyTopics: string[];
}

export interface InsightItem {
  id: string;
  type: "DISCOVERED_CONNECTION" | "KNOWLEDGE_GAP" | "LEARNING_OPPORTUNITY" | "PROJECT_SYNERGY";
  categoryLabel: string;
  title: string;
  description: string;
  impact: "High" | "Medium" | "Strategic";
  connectedNodes: string[];
  actionLabel: string;
  actionRoute: string;
  timestamp: string;
}

export interface ActivityItem {
  id: string;
  timestamp: string;
  dateGroup: "Today" | "Yesterday" | "Earlier this week" | "Previous";
  title: string;
  entityType: EntityType;
  entityName: string;
  entityId: string;
  action: "created" | "connected" | "updated" | "completed" | "uploaded";
  details: string;
}

export interface GraphNode {
  id: string;
  name: string;
  type: EntityType;
  group: string;
  radius: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  connections: string[];
  importance: number; // 1 to 5
}

export interface GraphEdge {
  source: string;
  target: string;
  label?: string;
  strength: number; // 0.1 to 1.0
}

// ==========================================
// CENTRALIZED DATA REPOSITORY (UNPOPULATED)
// Ready for backend / API population
// ==========================================

export const MOCK_PROJECTS: ProjectItem[] = [];
export const MOCK_SKILLS: SkillItem[] = [];
export const MOCK_GOALS: GoalItem[] = [];
export const MOCK_DOCUMENTS: DocumentItem[] = [];
export const MOCK_LEARNING: LearningItem[] = [];
export const MOCK_INSIGHTS: InsightItem[] = [];
export const MOCK_ACTIVITIES: ActivityItem[] = [];
export const GRAPH_NODES: GraphNode[] = [];
export const GRAPH_EDGES: GraphEdge[] = [];

// ==========================================
// ACCESSOR & QUERY HELPERS
// ==========================================

function normalizeStr(s?: string) {
  if (!s) return "";
  return s.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function getProjectById(idOrName: string): ProjectItem | undefined {
  if (!idOrName) return undefined;
  const target = normalizeStr(idOrName);
  return MOCK_PROJECTS.find(
    (p) =>
      p.id === idOrName ||
      p.slug === idOrName ||
      normalizeStr(p.id) === target ||
      normalizeStr(p.slug) === target ||
      normalizeStr(p.name) === target
  );
}

export function getSkillById(idOrName: string): SkillItem | undefined {
  if (!idOrName) return undefined;
  const target = normalizeStr(idOrName);
  return MOCK_SKILLS.find(
    (s) =>
      s.id === idOrName ||
      normalizeStr(s.id) === target ||
      normalizeStr(s.name) === target
  );
}

export function getGoalById(idOrName: string): GoalItem | undefined {
  if (!idOrName) return undefined;
  const target = normalizeStr(idOrName);
  return MOCK_GOALS.find(
    (g) =>
      g.id === idOrName ||
      normalizeStr(g.id) === target ||
      normalizeStr(g.title) === target
  );
}

export function getDocumentById(idOrName: string): DocumentItem | undefined {
  if (!idOrName) return undefined;
  const target = normalizeStr(idOrName);
  return MOCK_DOCUMENTS.find(
    (d) =>
      d.id === idOrName ||
      normalizeStr(d.id) === target ||
      normalizeStr(d.title) === target ||
      normalizeStr(d.filename) === target
  );
}

export function getLearningById(idOrName: string): LearningItem | undefined {
  if (!idOrName) return undefined;
  const target = normalizeStr(idOrName);
  return MOCK_LEARNING.find(
    (l) =>
      l.id === idOrName ||
      normalizeStr(l.id) === target ||
      normalizeStr(l.title) === target
  );
}

export function getAnyEntity(idOrName: string) {
  const p = getProjectById(idOrName);
  if (p) return { type: "PROJECT" as EntityType, entity: p, id: p.id, name: p.name };
  const s = getSkillById(idOrName);
  if (s) return { type: "SKILL" as EntityType, entity: s, id: s.id, name: s.name };
  const g = getGoalById(idOrName);
  if (g) return { type: "GOAL" as EntityType, entity: g, id: g.id, name: g.title };
  const d = getDocumentById(idOrName);
  if (d) return { type: "DOCUMENT" as EntityType, entity: d, id: d.id, name: d.title };
  const l = getLearningById(idOrName);
  if (l) return { type: "LEARNING" as EntityType, entity: l, id: l.id, name: l.title };
  return undefined;
}

export function getConnectedEntities(nodeId: string) {
  const targetIds = new Set<string>();
  GRAPH_EDGES.forEach((edge) => {
    if (edge.source === nodeId || normalizeStr(edge.source) === normalizeStr(nodeId)) {
      targetIds.add(edge.target);
    }
    if (edge.target === nodeId || normalizeStr(edge.target) === normalizeStr(nodeId)) {
      targetIds.add(edge.source);
    }
  });
  return GRAPH_NODES.filter((n) => targetIds.has(n.id) || targetIds.has(normalizeStr(n.id)));
}

export function searchAllKnowledge(query: string, categoryFilter: string = "All") {
  const q = query.toLowerCase().trim();
  const results: {
    id: string;
    name: string;
    type: EntityType;
    category: string;
    description: string;
    connectionsCount: number;
    tags: string[];
    route: string;
  }[] = [];

  if (categoryFilter === "All" || categoryFilter === "Projects") {
    MOCK_PROJECTS.forEach((p) => {
      if (
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.skills.some((s) => s.toLowerCase().includes(q))
      ) {
        results.push({
          id: p.id,
          name: p.name,
          type: "PROJECT",
          category: p.category,
          description: p.tagline,
          connectionsCount: p.connectionsCount,
          tags: p.skills,
          route: `/projects/${p.id}`
        });
      }
    });
  }

  if (categoryFilter === "All" || categoryFilter === "Skills") {
    MOCK_SKILLS.forEach((s) => {
      if (!q || s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)) {
        results.push({
          id: s.id,
          name: s.name,
          type: "SKILL",
          category: s.category,
          description: s.description,
          connectionsCount: s.connectionsCount,
          tags: s.projects,
          route: `/skills`
        });
      }
    });
  }

  if (categoryFilter === "All" || categoryFilter === "Goals") {
    MOCK_GOALS.forEach((g) => {
      if (!q || g.title.toLowerCase().includes(q) || g.description.toLowerCase().includes(q)) {
        results.push({
          id: g.id,
          name: g.title,
          type: "GOAL",
          category: `Target: ${g.targetQuarter}`,
          description: g.description,
          connectionsCount: g.connectedProjects.length + g.requiredSkills.length,
          tags: g.requiredSkills,
          route: `/goals`
        });
      }
    });
  }

  if (categoryFilter === "All" || categoryFilter === "Documents") {
    MOCK_DOCUMENTS.forEach((d) => {
      if (
        !q ||
        d.title.toLowerCase().includes(q) ||
        d.filename.toLowerCase().includes(q) ||
        d.extractedConcepts.some((c) => c.toLowerCase().includes(q))
      ) {
        results.push({
          id: d.id,
          name: d.title,
          type: "DOCUMENT",
          category: `${d.fileType} (${d.fileSize})`,
          description: d.summary,
          connectionsCount: d.relatedProjects.length + d.relatedSkills.length,
          tags: d.extractedConcepts,
          route: `/documents`
        });
      }
    });
  }

  if (categoryFilter === "All" || categoryFilter === "Learning") {
    MOCK_LEARNING.forEach((l) => {
      if (!q || l.title.toLowerCase().includes(q) || l.platform.toLowerCase().includes(q) || l.keyTopics.some((k) => k.toLowerCase().includes(q))) {
        results.push({
          id: l.id,
          name: l.title,
          type: "LEARNING",
          category: l.platform,
          description: l.status === "recommended" ? l.recommendationReason || "" : `${l.progress}% completed`,
          connectionsCount: l.connectedProjects.length + l.skillsGained.length,
          tags: l.skillsGained,
          route: `/learning`
        });
      }
    });
  }

  return results;
}
