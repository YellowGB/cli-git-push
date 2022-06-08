# cli-git-push

A CLI with NODEJS to automatically push all changes to a branch.

After cloning the repo :

npm install

npm update

npm link (important, otherwise the command won't be recognized by the system)

---------------------------------------------------------

By default, the branch is main but it's possible to indicate another one after the script call.


Exemple : git-push branchname


Flags :

-d = leave the main branch by default, no need to confirm

-m "xxx" = message for the commit (if this flag is not called, the commit message will be a simple datetime)

-y = skip all prompts and leave every value to default


Alias : gitp

Exemple : gitp -d -m "this is a commit to the main branch"
