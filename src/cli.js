import arg from 'arg';
import inquirer from 'inquirer';
import { pushToRepo } from './main'

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg(
        {
            '--yes': Boolean,
            '--message': String,
            '--default': '--yes',
            '-y': '--yes',
            '-d': '--yes',
            '-m': '--message',
        },
        {
            argv: rawArgs.slice(2), // On ne prend les arguments qu'à partir du 3ème car les 2 premiers sont node.exe et le bin de ce cli
        }
    );
    return {
        skipPrompts: args['--yes'] || false,
        branch: args._[0],
        commitMessage: args['--message'] || new Date(),
    }
}

async function promptForMissingOptions(options) {
    const defaultBranch = 'main';
    if (options.skipPrompts) {
        return {
            ...options,
            branch: options.branch || defaultBranch,
        };
    }

    const questions = [];
    if (!options.branch) {
        questions.push({
            type: 'input',
            name: 'branch',
            message: 'Please type the name of the branch to push to',
            default: defaultBranch,
        });
    }

    const answers = await inquirer.prompt(questions);
    return {
        ...options,
        branch: options.branch || answers.branch,
    }
}

export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    options = await promptForMissingOptions(options);
    await pushToRepo(options);
}