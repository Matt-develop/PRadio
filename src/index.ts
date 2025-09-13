import { Command } from 'commander';
import * as dotenv from 'dotenv';
import { generateHoroscope } from './horoscope';
import { createPlaylistForUser } from './spotifyMock';
import { getUserStatus } from './githubMock';
import { showGeneratingAnimation, showAsciiStatus } from './animations';


dotenv.config();


const program = new Command();
program.name('devastro').description('CLI divertido: playlist + horóscopo + animações').version('0.1.0');


program
.command('horoscope')
.description('Exibe o horóscopo dev do dia')
.option('--mood <mood>', 'Tom da mensagem (friendly | senior | sarcastic)', 'friendly')
.option('--username <username>', 'GitHub username (opcional)')
.action(async (opts) => {
const username = opts.username || 'you';
// fetch status (mock)
const status = await getUserStatus(username);
const text = generateHoroscope(status, opts.mood);
showAsciiStatus(status);
console.log('\n' + text + '\n');
});


program
.command('playlist')
.description('Gera uma playlist pair-programming baseada na sua carga de PRs/issues')
.option('--username <username>', 'GitHub username (opcional)')
.option('--create', 'De fato cria a playlist (mock) no Spotify', false)
.action(async (opts) => {
const username = opts.username || 'you';
const status = await getUserStatus(username);
showGeneratingAnimation();
const playlist = await createPlaylistForUser(status, opts.create);
console.log('\nPlaylist pronta: ' + playlist.url + '\n');
console.log('Descrição: ' + playlist.description + '\n');
showAsciiStatus(status);
});


program.parse(process.argv);