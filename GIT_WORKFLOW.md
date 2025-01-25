# Git Workflow Guidelines

## Branch Structure
- `main`: Production-ready code
- `develop`: Integration branch for features
- `feature/*`: New features
- `fix/*`: Bug fixes
- `hotfix/*`: Urgent production fixes

## Branch Naming
- Use descriptive names in kebab-case
- Prefix with type: `feature/`, `fix/`, `hotfix/`
- Examples:
  - `feature/contact-form`
  - `fix/image-loading`
  - `hotfix/security-patch`

## Commit Messages
Follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code restructuring
- `test:` Tests
- `chore:` Maintenance

Example: `feat: add contact form analytics`

## Workflow Steps
1. Create branch from `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature
   ```

2. Make changes and commit regularly:
   ```bash
   git add .
   git commit -m "feat: description"
   ```

3. Stay up to date with develop:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout feature/your-feature
   git merge develop
   ```

4. Push changes:
   ```bash
   git push origin feature/your-feature
   ```

5. Create Pull Request to `develop`

6. After merge, clean up:
   ```bash
   git checkout develop
   git pull origin develop
   git branch -d feature/your-feature
   ```

## Best Practices
1. Keep branches focused and small
2. Update frequently from develop
3. Write meaningful commit messages
4. Review your changes before committing
5. Delete branches after merging
6. Never force push to `main` or `develop`

## Common Commands

# Create new branch

git checkout -b feature/name


# Update from develop

git fetch origin develop

git merge origin/develop


# Discard local changes

git checkout -- .


# Stash changes

git stash

git stash pop


# View branch history

git log --oneline --graph


## Questions?
Contact [Your Name] for clarification on workflow procedures.