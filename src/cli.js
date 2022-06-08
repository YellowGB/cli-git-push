import arg from 'arg';
import inquirer from 'inquirer';
import { pushToRepo } from './main'

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg(
        {
            '--yes': Boolean,
            '--message': String,
            '--default': Boolean,
            '-y': '--yes',
            '-d': '--default',
            '-m': '--message',
        },
        {
            argv: rawArgs.slice(2), // On ne prend les arguments qu'à partir du 3ème car les 2 premiers sont node.exe et le bin de ce cli
        }
    );
    return {
        skipPrompts: args['--yes'] || false,
        default: args['--default'] || false,
        branch: args._[0],
        commitMessage: args['--message'] || false,
    }
}

async function promptForMissingOptions(options) {
    const defaultBranch  = 'main';
    const defaultMessage = new Date();

    if (options.skipPrompts) {
        return {
            ...options,
            branch: options.branch || defaultBranch,
            commitMessage: options.commitMessage || defaultMessage,
        };
    }

    const questions = [];
    if (options.default) options.branch = defaultBranch;
    else if (!options.branch) {
        questions.push({
            type: 'input',
            name: 'branch',
            message: 'Please type the name of the branch to push to',
            default: defaultBranch,
        });
    }

    if (!options.commitMessage) {
        questions.push({
            type: 'input',
            name: 'commitMessage',
            message: 'Please enter the message for the commit',
            default: defaultMessage,
        });
    }

    const answers = await inquirer.prompt(questions);
    return {
        ...options,
        branch: options.branch || answers.branch,
        commitMessage: options.commitMessage || answers.commitMessage,
    }
}

export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    options = await promptForMissingOptions(options);
    await pushToRepo(options);
}