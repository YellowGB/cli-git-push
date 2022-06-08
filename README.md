# cli-git-push

A CLI with NODEJS to automatically push all changes to a branch.

By default, the branch is main but it's possible to indicate another one after the script call.

Exemple : git-push branchname

Flags :
-d = leave the main branch by default, no need to confirm
-m "xxx" = message for the commit (if this flag is not called, the commit message will be a simple datetime)