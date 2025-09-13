import { Command } from 'commander';
import { Octokit } from '@octokit/rest';
export function loadCommands(program: Command) {
const octokit = new Octokit({ auth: 'your-github-token' });
program
.command('github')
.description('Interact with the GitHub API')
.action(async () => {
const { data: user } = await octokit.users.getAuthenticated();
console.log(`Hello, ${user.login}!`);
const { data: repos } = await octokit.repos.listForAuthenticatedUser();
console.log(`You have ${repos.length} repositories.`);
});
}
