// scripts/utils/progress.ts
import cliProgress from 'cli-progress';
import chalk from 'chalk';

export function createProgressBar(total: number) {
  const progressBar = new cliProgress.SingleBar({
    format: `${chalk.cyan('Optimizing')} |${chalk.cyan('{bar}')}| {percentage}% || {value}/{total} images`,
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true,
  });

  progressBar.start(total, 0);
  return progressBar;
}