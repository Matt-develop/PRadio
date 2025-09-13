import { UserStatus } from './githubMock';


export type PlaylistResult = {
url: string;
description: string;
};


export async function createPlaylistForUser(status: UserStatus, actuallyCreate = false): Promise<PlaylistResult> {
// In the mock we craft a friendly URL and description. Later substitute with real Spotify API calls.
const mood = status.openPRs > 5 ? 'Intenso Focus' : status.openPRs > 0 ? 'Produtivo' : 'Relax';
const name = `DevAstro - ${status.username} - ${mood}`;
const fakeId = Buffer.from(name).toString('base64').slice(0, 8);
const url = actuallyCreate ? `https://open.spotify.com/playlist/REAL_${fakeId}` : `https://open.spotify.com/playlist/FAKE_${fakeId}`;
const description = `Playlist gerada automaticamente para ${status.username}: ${status.openPRs} PRs, ${status.openIssues} issues.`;
// Optionally simulate network delay
await new Promise((r) => setTimeout(r, 900));
return { url, description };
}