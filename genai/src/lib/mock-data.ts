export type RiskLevel = "low" | "medium" | "high" | "critical";
export type PluginStatus = "Allowed" | "Blocked" | "Pending Review" | "Monitored";
export type PluginType =
  | "Chrome extension"
  | "Edge extension"
  | "Google OAuth app"
  | "Microsoft OAuth app"
  | "Gmail add-on"
  | "VS Code plugin"
  | "JetBrains plugin";

export interface Plugin {
  id: string;
  name: string;
  type: PluginType;
  publisher: string;
  publisherVerified: boolean;
  users: number;
  riskScore: number;
  riskLevel: RiskLevel;
  status: PluginStatus;
  lastChanged: string;
  dataAccess: string[];
  permissions: string[];
  scopes: string[];
  domains: string[];
  versions: { version: string; date: string; note: string }[];
  drift: { date: string; event: string; severity: RiskLevel }[];
  aiRelated: boolean;
  sensitiveScopes: boolean;
  description: string;
}

export const plugins: Plugin[] = [
  {
    id: "p1",
    name: "ChatMail Assistant",
    type: "Gmail add-on",
    publisher: "Nimbus AI Labs",
    publisherVerified: false,
    users: 142,
    riskScore: 92,
    riskLevel: "critical",
    status: "Pending Review",
    lastChanged: "2 days ago",
    dataAccess: ["Gmail read", "Gmail send", "Contacts"],
    permissions: ["Read all email", "Send mail as user", "Access contacts"],
    scopes: ["gmail.readonly", "gmail.send", "contacts.readonly"],
    domains: ["api.nimbus-ai.io", "telemetry.chatmail.app", "cdn.openai-relay.net"],
    versions: [
      { version: "3.2.0", date: "2026-05-28", note: "Added outbound domain telemetry.chatmail.app" },
      { version: "3.1.4", date: "2026-04-12", note: "Added gmail.send scope" },
      { version: "3.0.0", date: "2026-02-01", note: "Initial AI summary feature" },
    ],
    drift: [
      { date: "2 days ago", event: "Requested Gmail send scope", severity: "critical" },
      { date: "12 days ago", event: "New outbound domain detected", severity: "high" },
      { date: "1 month ago", event: "Publisher ownership changed", severity: "high" },
    ],
    aiRelated: true,
    sensitiveScopes: true,
    description:
      "AI email composition add-on that drafts replies inside Gmail. Recently expanded scopes and added new outbound network endpoints.",
  },
  {
    id: "p2",
    name: "AI Meeting Summarizer Pro",
    type: "Chrome extension",
    publisher: "Confer Systems",
    publisherVerified: true,
    users: 318,
    riskScore: 74,
    riskLevel: "high",
    status: "Monitored",
    lastChanged: "5 days ago",
    dataAccess: ["All websites", "Microphone", "Clipboard"],
    permissions: ["Read and change all data on all websites", "Access microphone", "Read clipboard"],
    scopes: [],
    domains: ["api.confer.ai", "transcripts.confer.ai"],
    versions: [
      { version: "5.4.1", date: "2026-05-25", note: "Added access to all websites" },
      { version: "5.3.0", date: "2026-03-18", note: "Microphone permission introduced" },
    ],
    drift: [
      { date: "5 days ago", event: "Added access to all websites", severity: "high" },
    ],
    aiRelated: true,
    sensitiveScopes: false,
    description:
      "Records and summarizes web-based meetings. Recent update broadened host permissions from meeting domains to all websites.",
  },
  {
    id: "p3",
    name: "CodePilot Helper",
    type: "VS Code plugin",
    publisher: "Sundial Software",
    publisherVerified: true,
    users: 256,
    riskScore: 58,
    riskLevel: "medium",
    status: "Allowed",
    lastChanged: "3 weeks ago",
    dataAccess: ["Workspace files", "Git history"],
    permissions: ["Read workspace files", "Read git metadata", "Network access"],
    scopes: [],
    domains: ["api.sundial.dev"],
    versions: [
      { version: "1.9.0", date: "2026-05-09", note: "Added workspace file read permission" },
      { version: "1.8.2", date: "2026-04-02", note: "Bug fixes" },
    ],
    drift: [
      { date: "3 weeks ago", event: "Added workspace file read permission", severity: "medium" },
    ],
    aiRelated: true,
    sensitiveScopes: false,
    description:
      "AI code completion plugin. Reads workspace files to provide context-aware suggestions.",
  },
  {
    id: "p4",
    name: "Prompt Saver Plus",
    type: "Chrome extension",
    publisher: "Indie Maker LLC",
    publisherVerified: false,
    users: 47,
    riskScore: 81,
    riskLevel: "high",
    status: "Pending Review",
    lastChanged: "1 day ago",
    dataAccess: ["Clipboard", "All websites"],
    permissions: ["Read clipboard", "Read and change all data on all websites"],
    scopes: [],
    domains: ["prompts.indiemaker.xyz"],
    versions: [
      { version: "2.1.0", date: "2026-05-29", note: "Publisher changed ownership" },
    ],
    drift: [
      { date: "1 day ago", event: "Publisher changed ownership", severity: "high" },
      { date: "1 day ago", event: "Added access to all websites", severity: "high" },
    ],
    aiRelated: true,
    sensitiveScopes: false,
    description:
      "Saves and organizes AI prompts. Recent ownership change and permission expansion flagged for review.",
  },
  {
    id: "p5",
    name: "Gmail Smart Reply AI",
    type: "Gmail add-on",
    publisher: "Replyflow Inc.",
    publisherVerified: true,
    users: 612,
    riskScore: 44,
    riskLevel: "medium",
    status: "Allowed",
    lastChanged: "2 months ago",
    dataAccess: ["Gmail read"],
    permissions: ["Read messages"],
    scopes: ["gmail.readonly"],
    domains: ["api.replyflow.com"],
    versions: [{ version: "4.0.0", date: "2026-03-30", note: "GA release" }],
    drift: [],
    aiRelated: true,
    sensitiveScopes: true,
    description: "Generates suggested replies inside Gmail. Verified publisher, stable permission profile.",
  },
  {
    id: "p6",
    name: "PDF Summarizer Extension",
    type: "Edge extension",
    publisher: "Docusense Ltd",
    publisherVerified: false,
    users: 89,
    riskScore: 67,
    riskLevel: "high",
    status: "Monitored",
    lastChanged: "1 week ago",
    dataAccess: ["PDF files", "All websites"],
    permissions: ["Read file URLs", "Read and change all data on all websites"],
    scopes: [],
    domains: ["pdf.docusense.io", "ingest.docusense.io"],
    versions: [{ version: "2.3.1", date: "2026-05-22", note: "Added new outbound domain" }],
    drift: [{ date: "1 week ago", event: "New outbound domain detected", severity: "medium" }],
    aiRelated: true,
    sensitiveScopes: false,
    description: "Summarizes PDF documents using AI. Unverified publisher.",
  },
  {
    id: "p7",
    name: "RepoInsight AI",
    type: "JetBrains plugin",
    publisher: "Sundial Software",
    publisherVerified: true,
    users: 134,
    riskScore: 38,
    riskLevel: "medium",
    status: "Allowed",
    lastChanged: "1 month ago",
    dataAccess: ["Workspace files"],
    permissions: ["Read workspace files", "Network access"],
    scopes: [],
    domains: ["api.sundial.dev"],
    versions: [{ version: "1.2.0", date: "2026-04-29", note: "Performance improvements" }],
    drift: [],
    aiRelated: true,
    sensitiveScopes: false,
    description: "Repository-aware AI assistant for JetBrains IDEs.",
  },
  {
    id: "p8",
    name: "Calendar Copilot Add-on",
    type: "Google OAuth app",
    publisher: "Tempora Labs",
    publisherVerified: false,
    users: 23,
    riskScore: 88,
    riskLevel: "critical",
    status: "Blocked",
    lastChanged: "4 days ago",
    dataAccess: ["Calendar", "Drive read", "Contacts"],
    permissions: ["Full calendar access", "Drive readonly", "Contacts readonly"],
    scopes: ["calendar", "drive.readonly", "contacts.readonly"],
    domains: ["temporalabs.app"],
    versions: [{ version: "0.9.0", date: "2026-05-26", note: "Requested Drive readonly scope" }],
    drift: [
      { date: "4 days ago", event: "Unverified publisher requesting Drive access", severity: "critical" },
    ],
    aiRelated: true,
    sensitiveScopes: true,
    description: "AI calendar scheduler. Unverified publisher requesting sensitive Drive access.",
  },
];

export interface ReviewRequest {
  id: string;
  employee: string;
  email: string;
  plugin: string;
  pluginType: PluginType;
  dataAccess: string[];
  justification: string;
  riskScore: number;
  riskLevel: RiskLevel;
  recommendation: "Approve" | "Block" | "Allow with conditions";
  requestedAt: string;
}

export const reviewRequests: ReviewRequest[] = [
  {
    id: "r1",
    employee: "Maya Okafor",
    email: "maya.o@acme.com",
    plugin: "ChatMail Assistant",
    pluginType: "Gmail add-on",
    dataAccess: ["Gmail read", "Gmail send"],
    justification: "Need AI drafting help for customer support replies.",
    riskScore: 92,
    riskLevel: "critical",
    recommendation: "Block",
    requestedAt: "2h ago",
  },
  {
    id: "r2",
    employee: "Daniel Reyes",
    email: "daniel.r@acme.com",
    plugin: "Prompt Saver Plus",
    pluginType: "Chrome extension",
    dataAccess: ["Clipboard", "All websites"],
    justification: "Manage AI prompts across teams.",
    riskScore: 81,
    riskLevel: "high",
    recommendation: "Allow with conditions",
    requestedAt: "5h ago",
  },
  {
    id: "r3",
    employee: "Ingrid Sato",
    email: "ingrid.s@acme.com",
    plugin: "AI Meeting Summarizer Pro",
    pluginType: "Chrome extension",
    dataAccess: ["All websites", "Microphone"],
    justification: "Summarize external customer calls.",
    riskScore: 74,
    riskLevel: "high",
    recommendation: "Allow with conditions",
    requestedAt: "1d ago",
  },
  {
    id: "r4",
    employee: "Owen Bennett",
    email: "owen.b@acme.com",
    plugin: "CodePilot Helper",
    pluginType: "VS Code plugin",
    dataAccess: ["Workspace files"],
    justification: "Improve productivity on internal repos.",
    riskScore: 58,
    riskLevel: "medium",
    recommendation: "Approve",
    requestedAt: "2d ago",
  },
];

export interface Publisher {
  id: string;
  name: string;
  verified: boolean;
  plugins: number;
  riskHistory: RiskLevel;
  ownershipChanges: number;
  lastUpdate: string;
  trust: "Trusted" | "Watchlist" | "Unknown" | "Suspicious";
}

export const publishers: Publisher[] = [
  { id: "pub1", name: "Sundial Software", verified: true, plugins: 4, riskHistory: "low", ownershipChanges: 0, lastUpdate: "3 weeks ago", trust: "Trusted" },
  { id: "pub2", name: "Replyflow Inc.", verified: true, plugins: 2, riskHistory: "low", ownershipChanges: 0, lastUpdate: "2 months ago", trust: "Trusted" },
  { id: "pub3", name: "Confer Systems", verified: true, plugins: 3, riskHistory: "medium", ownershipChanges: 1, lastUpdate: "5 days ago", trust: "Watchlist" },
  { id: "pub4", name: "Nimbus AI Labs", verified: false, plugins: 1, riskHistory: "critical", ownershipChanges: 1, lastUpdate: "2 days ago", trust: "Suspicious" },
  { id: "pub5", name: "Indie Maker LLC", verified: false, plugins: 1, riskHistory: "high", ownershipChanges: 1, lastUpdate: "1 day ago", trust: "Suspicious" },
  { id: "pub6", name: "Tempora Labs", verified: false, plugins: 1, riskHistory: "critical", ownershipChanges: 0, lastUpdate: "4 days ago", trust: "Suspicious" },
  { id: "pub7", name: "Docusense Ltd", verified: false, plugins: 1, riskHistory: "medium", ownershipChanges: 0, lastUpdate: "1 week ago", trust: "Unknown" },
];

export interface AlertItem {
  id: string;
  title: string;
  severity: RiskLevel;
  timestamp: string;
  users: number;
  recommendation: string;
  plugin: string;
  type:
    | "High-risk install"
    | "Sensitive scope"
    | "Broad host permissions"
    | "Publisher ownership"
    | "Malicious clone"
    | "Outbound telemetry";
}

export const alerts: AlertItem[] = [
  { id: "a1", title: "ChatMail Assistant requested Gmail send scope", severity: "critical", timestamp: "10 min ago", users: 142, recommendation: "Block install enterprise-wide", plugin: "ChatMail Assistant", type: "Sensitive scope" },
  { id: "a2", title: "AI Meeting Summarizer Pro added all-sites permission", severity: "high", timestamp: "1h ago", users: 318, recommendation: "Move to review queue", plugin: "AI Meeting Summarizer Pro", type: "Broad host permissions" },
  { id: "a3", title: "Prompt Saver Plus publisher ownership changed", severity: "high", timestamp: "1 day ago", users: 47, recommendation: "Quarantine until reverified", plugin: "Prompt Saver Plus", type: "Publisher ownership" },
  { id: "a4", title: "Calendar Copilot — unverified publisher requesting Drive access", severity: "critical", timestamp: "4 days ago", users: 23, recommendation: "Already blocked. Notify affected users.", plugin: "Calendar Copilot Add-on", type: "Sensitive scope" },
  { id: "a5", title: "Known malicious clone of Grammarly detected", severity: "critical", timestamp: "2 days ago", users: 3, recommendation: "Force-uninstall via Chrome Enterprise", plugin: "Grammar-ly Plus", type: "Malicious clone" },
  { id: "a6", title: "CodePilot Helper added outbound telemetry endpoint", severity: "medium", timestamp: "6 days ago", users: 256, recommendation: "Monitor outbound traffic", plugin: "CodePilot Helper", type: "Outbound telemetry" },
  { id: "a7", title: "New high-risk install attempt: ChatMail Assistant", severity: "high", timestamp: "2h ago", users: 1, recommendation: "Block and notify employee", plugin: "ChatMail Assistant", type: "High-risk install" },
];

export const riskTrend = [
  { day: "Mon", low: 120, medium: 42, high: 11, critical: 2 },
  { day: "Tue", low: 124, medium: 44, high: 13, critical: 2 },
  { day: "Wed", low: 128, medium: 47, high: 14, critical: 3 },
  { day: "Thu", low: 130, medium: 49, high: 17, critical: 3 },
  { day: "Fri", low: 134, medium: 52, high: 19, critical: 4 },
  { day: "Sat", low: 136, medium: 53, high: 20, critical: 5 },
  { day: "Sun", low: 138, medium: 55, high: 22, critical: 6 },
];

export const coverage = [
  { name: "Chrome Enterprise", connected: true, devices: 1284 },
  { name: "Microsoft Edge", connected: true, devices: 412 },
  { name: "Google Workspace", connected: true, devices: 1620 },
  { name: "Microsoft 365", connected: true, devices: 980 },
  { name: "GitHub", connected: true, devices: 312 },
  { name: "VS Code Marketplace", connected: false, devices: 0 },
];

export const policies = [
  { id: "pol1", name: "Block unverified publishers requesting Gmail or Drive access", enabled: true, action: "Block", scope: "Google OAuth", matches: 12 },
  { id: "pol2", name: "Require review for extensions requesting all-site access", enabled: true, action: "Require review", scope: "Chrome / Edge", matches: 28 },
  { id: "pol3", name: "Auto-block plugins with publisher ownership changes", enabled: true, action: "Block", scope: "All types", matches: 3 },
  { id: "pol4", name: "Allow approved AI writing assistants only for non-sensitive domains", enabled: true, action: "Allow with conditions", scope: "Gmail add-ons", matches: 5 },
  { id: "pol5", name: "Require security approval for IDE plugins that read workspace files", enabled: false, action: "Require review", scope: "VS Code / JetBrains", matches: 9 },
];

export const stats = {
  total: 221,
  highRisk: 14,
  pending: 7,
  blocked: 19,
  sensitiveOAuth: 11,
  drifted: 6,
};
