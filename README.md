# cli-git-push

A CLI with NODEJS to automatically push all changes to a branch.

After cloning the repo :

npm install

npm update

npm link (important, otherwise the command won't be recognized by the system)

**Windows Script Policy**

By default, on Windows systems, the execution of this kind of scripts is restricted. In order to be able to run this CLI, you need to allow it by opening a PowerShell console and typing the following :

`Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

---------------------------------------------------------

By default, the branch is main but it's possible to indicate another one after the script call.


Exemple : git-push branchname


Flags :

-d = leave the main branch by default, no need to confirm

-m "xxx" = message for the commit (if this flag is not called, the commit message will be a simple datetime)

-y = skip all prompts and leave every value to default


Alias : gitp

Exemple : gitp -d -m "this is a commit to the main branch"
