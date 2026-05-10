// ─────────────────────────────────────────────────────────────────────────────
// Family Identity Registry — Master data model for Aegis Vault
// This is the canonical source of truth for all identity, access, and
// governance data. Security, Trust, and Will modules import from here.
// ─────────────────────────────────────────────────────────────────────────────

export type AccessLevel =
  | "Full Control"
  | "View Only"
  | "Restricted"
  | "Locked"
  | "Emergency Access"
  | "Timed Access"
  | "Pending Verification";

export type VerificationState =
  | "verified"
  | "partial"
  | "unverified"
  | "pending";

export type GovernanceRole =
  | "Owner"
  | "Spouse"
  | "Child"
  | "Parent"
  | "Sibling"
  | "Lawyer"
  | "Guardian"
  | "Executor"
  | "Trustee"
  | "Beneficiary"
  | "Emergency Contact"
  | "Family Office";

export interface LinkedAsset {
  name: string;
  type: "property" | "insurance" | "investment" | "bank" | "gold" | "trust";
  value: string;
}

export interface InheritanceCondition {
  description: string;
  triggerType: "age" | "event" | "time" | "approval";
  triggerValue: string;
  status: "locked" | "active" | "released";
}

export interface FamilyMember {
  id: string;
  name: string;
  initials: string;
  governanceRole: GovernanceRole;
  relationshipLabel: string; // e.g. "Primary Owner", "Son · Age 22"
  accessLevel: AccessLevel;
  verificationState: VerificationState;
  trustAllocation: string | null; // e.g. "40%"
  trustRole: string | null; // e.g. "Primary Beneficiary"
  tier: 0 | 1 | 2; // Graph tier (0 = owner, 1 = immediate, 2 = next gen)
  color: string; // Node accent color
  isMinor: boolean;
  linkedAssets: LinkedAsset[];
  inheritanceConditions: InheritanceCondition[];
  systemRoles: string[];
  warnings: string[];
  phone?: string;
  email?: string;
}

export const FAMILY_REGISTRY: FamilyMember[] = [
  {
    id: "sharath",
    name: "Sharath Swaroop",
    initials: "SS",
    governanceRole: "Owner",
    relationshipLabel: "Primary Owner · Account Holder",
    accessLevel: "Full Control",
    verificationState: "verified",
    trustAllocation: null,
    trustRole: "Grantor",
    tier: 0,
    color: "#1D1D1D",
    isMinor: false,
    linkedAssets: [
      { name: "HDFC Primary Account", type: "bank", value: "₹18.4L" },
      { name: "Prestige Whitefield", type: "property", value: "₹1.2Cr" },
      { name: "LIC Term Policy", type: "insurance", value: "₹50L" },
    ],
    inheritanceConditions: [],
    systemRoles: ["Owner", "Grantor", "Vault Admin"],
    warnings: [],
    email: "sharath@swaroopfamily.in",
  },
  {
    id: "priya",
    name: "Priya Swaroop",
    initials: "PS",
    governanceRole: "Spouse",
    relationshipLabel: "Spouse · Co-Owner",
    accessLevel: "Full Control",
    verificationState: "verified",
    trustAllocation: "40%",
    trustRole: "Primary Beneficiary",
    tier: 1,
    color: "#2E5E4E",
    isMinor: false,
    linkedAssets: [
      { name: "HDFC Primary Account", type: "bank", value: "₹18.4L" },
      { name: "Family Vault (All Docs)", type: "trust", value: "Full Access" },
    ],
    inheritanceConditions: [
      {
        description: "Receives 40% of estate upon activation.",
        triggerType: "event",
        triggerValue: "Emergency Activation",
        status: "active",
      },
    ],
    systemRoles: ["Executor", "Emergency Co-Owner", "Nominee"],
    warnings: [],
    phone: "+91 98400 12345",
    email: "priya@swaroopfamily.in",
  },
  {
    id: "rahul",
    name: "Rahul Swaroop",
    initials: "RS",
    governanceRole: "Child",
    relationshipLabel: "Son · Age 22",
    accessLevel: "Locked",
    verificationState: "partial",
    trustAllocation: "30%",
    trustRole: "Beneficiary (Timed)",
    tier: 2,
    color: "#C6A969",
    isMinor: false,
    linkedAssets: [
      { name: "Education Trust Fund", type: "trust", value: "₹12L" },
    ],
    inheritanceConditions: [
      {
        description: "15% released at age 25.",
        triggerType: "age",
        triggerValue: "Age 25",
        status: "locked",
      },
      {
        description: "Remaining 15% released at age 30.",
        triggerType: "age",
        triggerValue: "Age 30",
        status: "locked",
      },
    ],
    systemRoles: ["Nominee"],
    warnings: [
      "No standalone education fund configured.",
      "Guardian not assigned for emergency scenarios.",
    ],
    email: "rahul@swaroopfamily.in",
  },
  {
    id: "anya",
    name: "Anya Swaroop",
    initials: "AS",
    governanceRole: "Child",
    relationshipLabel: "Daughter · Age 17",
    accessLevel: "Locked",
    verificationState: "unverified",
    trustAllocation: null,
    trustRole: null,
    tier: 2,
    color: "#B85C5C",
    isMinor: true,
    linkedAssets: [],
    inheritanceConditions: [],
    systemRoles: [],
    warnings: [
      "Minor — Guardian assignment required.",
      "Not mapped to any nominee or trust allocation.",
      "Missing from inheritance protocol.",
    ],
    email: "anya@swaroopfamily.in",
  },
  {
    id: "father",
    name: "M. Swaroop",
    initials: "MS",
    governanceRole: "Parent",
    relationshipLabel: "Father",
    accessLevel: "View Only",
    verificationState: "partial",
    trustAllocation: "20%",
    trustRole: "Joint Support Beneficiary",
    tier: 1,
    color: "#6B6B6B",
    isMinor: false,
    linkedAssets: [
      { name: "Parent Healthcare Reserve", type: "trust", value: "₹32.4L / ₹50L" },
    ],
    inheritanceConditions: [
      {
        description: "Joint 20% support allocation.",
        triggerType: "event",
        triggerValue: "Emergency Activation",
        status: "active",
      },
    ],
    systemRoles: ["Nominee"],
    warnings: ["Not assigned to emergency notification list."],
    phone: "+91 98400 54321",
  },
  {
    id: "rajiv",
    name: "Rajiv Menon",
    initials: "RM",
    governanceRole: "Lawyer",
    relationshipLabel: "Legal Counsel · Executor",
    accessLevel: "Timed Access",
    verificationState: "verified",
    trustAllocation: null,
    trustRole: "Legal Executor",
    tier: 1,
    color: "#4B7F52",
    isMinor: false,
    linkedAssets: [
      { name: "Will & Trust Drafts", type: "trust", value: "30-Day View Access" },
    ],
    inheritanceConditions: [],
    systemRoles: ["Executor", "Legal Authority", "Dual-Signature Required"],
    warnings: ["Access expires in 5 days. Renewal required."],
    phone: "+91 98400 77890",
    email: "rajiv@menonlegal.in",
  },
];

// ─── Governance metrics derived from registry ─────────────────────────────────

export function computeGovernanceScore(members: FamilyMember[]): number {
  const total = members.length;
  const verified = members.filter((m) => m.verificationState === "verified").length;
  const hasExecutor = members.some((m) => m.systemRoles.includes("Executor"));
  const noWarnings = members.filter((m) => m.warnings.length === 0).length;
  const score =
    (verified / total) * 40 +
    (hasExecutor ? 20 : 0) +
    (noWarnings / total) * 40;
  return Math.round(score);
}

export function getRegistryAlerts(members: FamilyMember[]): string[] {
  const alerts: string[] = [];
  const minors = members.filter((m) => m.isMinor && m.systemRoles.length === 0);
  if (minors.length > 0)
    alerts.push(`${minors.length} minor(s) have no guardian assigned.`);
  const unverified = members.filter((m) => m.verificationState === "unverified");
  if (unverified.length > 0)
    alerts.push(`${unverified.length} member(s) are unverified in the registry.`);
  const noTrust = members
    .filter((m) => m.tier > 0 && m.governanceRole !== "Lawyer" && !m.trustAllocation)
    .map((m) => m.name);
  if (noTrust.length > 0)
    alerts.push(`${noTrust.join(", ")} ${noTrust.length === 1 ? "has" : "have"} no trust allocation.`);
  return alerts;
}
