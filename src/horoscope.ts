import fs from 'fs';
const bucket = (phrases as any)[realMood][tier] as string[];
const chosen = bucket && bucket.length ? pick(bucket) : 'Dia comum. Faça backup.';


// Small wrappers per mood to add personality
const wrappers: Record<string, (u: string, t: string) => string> = {
friendly: (u, t) => `Oi ${u}! ${t} Boa sorte! 🚀`,
senior: (u, t) => `Olha ${u}, ${t} E olha, não que eu seja seu chefe, mas organiza esses PRs.`,
sarcastic: (u, t) => `${u}, ${t} Não me faça revisar código ruim hoje.`,
};


const wrap = wrappers[realMood] || wrappers['friendly'];
return wrap(status.username, chosen);
}


export function addCustomPhrase(mood: string, tier: 'light' | 'moderate' | 'heavy' | 'extreme', phrase: string) {
const phrases = loadPhrases();
if (!phrases[mood]) (phrases as any)[mood] = { light: [], moderate: [], heavy: [], extreme: [] };
(phrases as any)[mood][tier].push(phrase);
fs.writeFileSync(PHRASES_FILE, JSON.stringify(phrases, null, 2), 'utf-8');
}


// -----------------------------
import { UserStatus } from './githubMock';


export function generateHoroscope(status: UserStatus, mood: string): string {
const { openPRs, openIssues } = status;
const workload = openPRs + openIssues;
let base = '';


if (workload >= 12) base = 'A galáxia está em chamas — traga extintor e café.';
else if (workload >= 7) base = 'Hoje você pinta de guerreiro: foco e PRs.';
else if (workload >= 3) base = 'Dia balanceado: resolve umas coisas e toma um café.';
else base = 'Dia leve — possível produtividade zen ou procrastinação criativa.';


const moodTemplates: Record<string, (b: string) => string> = {
friendly: (b) => `Oi ${status.username}! ${b} Boa sorte! 🚀`,
senior: (b) => `Olha ${status.username}, ${b} E olha, não que eu seja seu chefe, mas organiza esses PRs.`,
sarcastic: (b) => `${status.username}, ${b} Não me faça revisar código ruim hoje.`,
};


const template = moodTemplates[mood] || moodTemplates['friendly'];
return template(base);
}