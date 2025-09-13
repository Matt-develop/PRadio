import ora from 'ora';
import chalk from 'chalk';
import { UserStatus } from './githubMock';

export function showGeneratingAnimation() {
const spinner = ora('Analisando seu repositório e escolhendo faixas...').start();
const dots = ['.', '..', '...'];
let i = 0;
const it = setInterval(() => {
spinner.text = 'Montando vibe' + dots[i % dots.length];
i++;
}, 600);


return new Promise<void>((resolve) => setTimeout(() => {
clearInterval(it);
spinner.succeed('Playlist pronta!');
resolve();
}, 1400));
}


export function showAsciiStatus(status: UserStatus) {
const { openPRs, openIssues } = status;
const total = openPRs + openIssues;


if (total >= 12) {
console.log(chalk.red.bold('\n (\u2605) \u2605 \u2605 CAOS TOTAL \u2605 \u2605 \u2605'));
console.log(chalk.red(
` ( ) ( ) ( )
) ( ) ) ) ) (
( ) ) ( ( ) )`));
} else if (total >= 7) {
console.log(chalk.yellow.bold('\n \u26A1 Quase lá — prepare o café!'));
console.log(chalk.yellow(` [===>] ${openPRs} PRs | ${openIssues} issues`));
} else if (total >= 3) {
console.log(chalk.green.bold('\n \u2728 Produtividade moderada'));
console.log(chalk.green(` [--> ] ${openPRs} PRs | ${openIssues} issues`));
} else {
console.log(chalk.cyan.bold('\n \u2728 Dia tranquilo — harmonia cósmica'));
console.log(chalk.cyan(` [ ] ${openPRs} PRs | ${openIssues} issues`));
}
}