# Monorepo

A monorepo is where a backend and frontend code is in a single repository.

The [package.json](/backened/package.json) inside the backend folder contains script that builds the CRA frontend and copy that build folder to the backend. It then git add, commit and push it to the remote repo.
