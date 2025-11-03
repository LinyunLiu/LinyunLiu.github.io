## Publish
```bash
cd Documents/Portfolio/

./publish.sh -blog -all
./publish.sh -blog "filename.md"

git add .
git commit -m "commit message"
git push || git push -u origin main

git status
git config --list
git config user.name
git config user.email
git config --get remote.origin.url
git branch       # local branches
git branch -r    # remote branches
git branch -a    # all branches

git rm --cached .DS_Store

```