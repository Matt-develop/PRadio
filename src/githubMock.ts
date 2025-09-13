export type UserStatus = {
username: string;
openPRs: number;
openIssues: number;
recentCommits: number;
};


// Mock: in the MVP, we return randomized or fixed data
export async function getUserStatus(username: string): Promise<UserStatus> {
// For now return a deterministic mock based on username length
const seed = username.length;
const openPRs = (seed * 3) % 12; // 0..11
const openIssues = (seed * 2 + 1) % 8; // 0..7
const recentCommits = (seed * 5 + 2) % 20; // 0..19
return {
username,
openPRs,
openIssues,
recentCommits,
};
}