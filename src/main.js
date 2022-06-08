import chalk from "chalk";
import execa from 'execa';
import Listr from "listr";

async function gitAdd(options) {
    const result = await execa('git', ['add', '.']);
    if (result.failed) {
        return Promise.reject(new Error('Failed to add all changes'));
    }
    return;
}
async function gitCommit(options) {
    const result = await execa('git', ['commit', '-m', options.commitMessage]);
    if (result.failed) {
        return Promise.reject(new Error('Failed to commit changes'));
    }
    return;
}
async function gitPush(options) {
    const result = await execa('git', ['push', '-u', 'origin', options.branch]);
    if (result.failed) {
        return Promise.reject(new Error('Failed to push to branch'));
    }
    return;
}

export async function pushToRepo(options) {
    const tasks = new Listr([
        {
            title: 'Add all changes',
            task: () => gitAdd(options),
        },
        {
            title: 'Commit',
            task: () => gitCommit(options),
        },
        {
            title: 'Push',
            task: () => gitPush(options),
        },
    ]);

    await tasks.run();

    console.log('%s Changes pushed to the %s branch', chalk.green.bold('DONE'), options.branch);
    return true;
}