export interface DocEntry {
  slug: string;
  title: string;
  description: string;
  category: string;
}

export interface DocCategory {
  name: string;
  description: string;
  docs: DocEntry[];
}

const RAW: Omit<DocEntry, "category">[] = [
  {
    slug: "android-hardening-optimization",
    title: "Android Hardening & Optimization Guide",
    description: "Enterprise mobile security, bloatware pruning, and background tuning.",
  },
  {
    slug: "android-device-maintenance",
    title: "Android Device Maintenance",
    description: "Routine upkeep: storage hygiene, thermal care, and update discipline.",
  },
  {
    slug: "battery-wear",
    title: "Battery Wear Diagnostics & Management Guide",
    description: "Cycle baselines, fleet audits, and safe replacement procedures.",
  },
  {
    slug: "managing-app-permissions",
    title: "Managing App Permissions on Android",
    description: "Runtime permissions, special access controls, and ADB auditing.",
  },
  {
    slug: "windows-security-baseline",
    title: "Windows Security Baseline & Hardening Manual",
    description: "GPO enforcement, WDAC policies, and quarterly audit cadence.",
  },
  {
    slug: "safe-driver-updates",
    title: "Safe Driver Updates",
    description: "Signed drivers, staged validation, and rollback procedures.",
  },
  {
    slug: "browser-privacy",
    title: "Browser Privacy Hardening",
    description: "Fingerprinting resistance, telemetry control, and DNS-over-HTTPS.",
  },
  {
    slug: "secure-ssh-basics",
    title: "Secure SSH Fundamentals",
    description: "ed25519 keys, sshd hardening, two-factor, and jump hosts.",
  },
  {
    slug: "vpn-best-practices",
    title: "VPN Best Practices",
    description: "WireGuard vs OpenVPN, split tunneling, kill switches, and key hygiene.",
  },
  {
    slug: "network-architecture-optimization",
    title: "Network Architecture, Optimization & Troubleshooting",
    description: "Traffic shaping, routing hygiene, and connectivity diagnostics.",
  },
  {
    slug: "network-optimizations",
    title: "Network Optimizations",
    description: "TCP tuning, BBR, QoS shaping, and latency reduction.",
  },
  {
    slug: "network-troubleshooting",
    title: "Network Troubleshooting",
    description: "OSI-layered diagnosis, packet capture, and common failure patterns.",
  },
  {
    slug: "storage-backup-dr",
    title: "Storage, Backup & Disaster Recovery Playbook",
    description: "3-2-1 strategies, Borg/Restic recipes, and restore drills.",
  },
  {
    slug: "backup-strategies",
    title: "Backup Strategies",
    description: "The 3-2-1 rule, RPO/RTO planning, and restore verification.",
  },
  {
    slug: "local-backups",
    title: "Local Backups",
    description: "External drives, NAS snapshots, encryption at rest, and restore tests.",
  },
  {
    slug: "disk-health",
    title: "Disk Health Monitoring",
    description: "SMART attributes, error trends, and replacement thresholds.",
  },
  {
    slug: "infrastructure-admin-monitoring",
    title: "Infrastructure Administration & Monitoring SOP",
    description: "Service monitoring, alerting, and secure remote administration.",
  },
  {
    slug: "interpreting-system-logs",
    title: "Interpreting System Logs",
    description: "Journald, event correlation, and verification checklists.",
  },
  {
    slug: "log-rotation",
    title: "Log Rotation & Retention",
    description: "logrotate, journald limits, retention compliance, and storage budgets.",
  },
  {
    slug: "service-monitoring",
    title: "Service Monitoring",
    description: "Health checks, alert thresholds, escalation, and on-call runbooks.",
  },
  {
    slug: "incident-runbook",
    title: "Incident Runbook Template",
    description: "Stabilization checklist, log capture, and escalation playbook.",
  },
  {
    slug: "configuring-automatic-updates",
    title: "Configuring Automatic Updates",
    description: "Staged rollout rings, maintenance windows, and rollback safeguards.",
  },
  {
    slug: "rollback-os-updates",
    title: "Rolling Back OS Updates",
    description: "Recovery environment, kernel pinning, and snapshot rollbacks.",
  },
  {
    slug: "measuring-performance-safely",
    title: "Measuring Performance Safely",
    description: "Benchmark methodology, measurement checklists, and safe tooling.",
  },
  {
    slug: "technical-writing-workflow",
    title: "Technical Writing Workflow",
    description: "Structured authoring, QA checklists, and release hygiene.",
  },
  {
    slug: "editorial-standards",
    title: "Editorial Standards",
    description: "Tone, plain language, and review requirements for every edit.",
  },
  {
    slug: "documentation-qa-framework",
    title: "Documentation & QA Framework",
    description: "Content audits, runnable verification jobs, and accessibility.",
  },
  {
    slug: "content-review-checklist",
    title: "Content Review Checklist",
    description: "A short, repeatable checklist for accuracy and usefulness.",
  },
];

const CATEGORY_BY_SLUG: Record<string, string> = {
  "android-hardening-optimization": "Android & Mobile",
  "android-device-maintenance": "Android & Mobile",
  "battery-wear": "Android & Mobile",
  "managing-app-permissions": "Android & Mobile",
  "windows-security-baseline": "Windows",
  "safe-driver-updates": "Windows",
  "browser-privacy": "Security & Privacy",
  "secure-ssh-basics": "Security & Privacy",
  "vpn-best-practices": "Security & Privacy",
  "network-architecture-optimization": "Networking",
  "network-optimizations": "Networking",
  "network-troubleshooting": "Networking",
  "storage-backup-dr": "Storage & Backups",
  "backup-strategies": "Storage & Backups",
  "local-backups": "Storage & Backups",
  "disk-health": "Storage & Backups",
  "infrastructure-admin-monitoring": "Monitoring & Operations",
  "interpreting-system-logs": "Monitoring & Operations",
  "log-rotation": "Monitoring & Operations",
  "service-monitoring": "Monitoring & Operations",
  "incident-runbook": "Monitoring & Operations",
  "configuring-automatic-updates": "Monitoring & Operations",
  "rollback-os-updates": "Monitoring & Operations",
  "measuring-performance-safely": "Monitoring & Operations",
  "technical-writing-workflow": "Content & Publishing",
  "editorial-standards": "Content & Publishing",
  "documentation-qa-framework": "Content & Publishing",
  "content-review-checklist": "Content & Publishing",
};

const CATEGORY_META: Record<string, string> = {
  "Android & Mobile":
    "Kernel tuning, hardening, permissions, and battery management for Android fleets.",
  Windows: "Hardening baselines, driver safety, and update controls for Windows endpoints.",
  "Security & Privacy": "Privacy hardening, SSH fundamentals, and VPN best practices.",
  Networking: "Architecture, optimization, and troubleshooting of modern networks.",
  "Storage & Backups": "Disaster recovery, local backups, and disk health monitoring.",
  "Monitoring & Operations": "Logging, monitoring, incident response, and safe change management.",
  "Content & Publishing": "Documentation standards, QA frameworks, and review checklists.",
};

function buildCategories(): DocCategory[] {
  const map = new Map<string, DocEntry[]>();
  for (const entry of RAW) {
    const category = CATEGORY_BY_SLUG[entry.slug] ?? "Other";
    const list = map.get(category) ?? [];
    list.push({ ...entry, category });
    map.set(category, list);
  }
  return Array.from(map.entries())
    .map(([name, docs]) => ({
      name,
      description: CATEGORY_META[name] ?? "",
      docs,
    }))
    .filter((c) => c.docs.length > 0);
}

export const DOC_CATEGORIES: DocCategory[] = buildCategories();
export const ALL_DOCS: DocEntry[] = RAW.map((entry) => ({
  ...entry,
  category: CATEGORY_BY_SLUG[entry.slug] ?? "Other",
}));
