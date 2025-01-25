# Git Workflow Guidelines

<<<<<<< HEAD
This document outlines the Git workflow and best practices for the Backstage Interactive project.

## Branch Structure

- `main` - Production-ready code
- `develop` - Main development branch
- Feature branches - Branch off and merge back to `develop`

## Branch Naming Convention

Use the following format for branch names: 


<type>/<ticket-number>-<brief-description>


Types:
- `feature/` - New features
- `fix/` - Bug fixes
- `hotfix/` - Urgent production fixes
- `refactor/` - Code refactoring
- `docs/` - Documentation updates
- `style/` - Styling changes
- `test/` - Test-related changes

Example: `feature/BI-123-add-contact-form`

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

<type>(<scope>): <description>

[optional body]

[optional footer]

Example: `fix(contact): add formspree integration`

Types:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Formatting, missing semicolons, etc.
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Example:

GIT_WORKFLOW.md

feat(contact): add form validation

- Add email format validation

- Add required field checks

- Implement error messaging

Closes #123

## Workflow Steps

### Starting New Work

1. Update your local `develop`:

```bash
git checkout develop
git pull origin develop
```

2. Create a new branch:
```bash
git checkout -b feature/BI-123-add-contact-form
```

### During Development

1. Commit changes frequently with meaningful messages:
```bash
git add .
git commit -m "feat(contact): add form validation"
```

2. Keep your branch up to date:
```bash
git fetch origin
git rebase origin/develop
```

### Preparing for Pull Request

1. Ensure all tests pass:
```bash
npm run test
```

2. Run linting:
```bash
npm run lint
```

3. Squash commits if needed:
```bash
git rebase -i origin/develop
```

### Creating a Pull Request

1. Push your branch:
```bash
git push origin feature/BI-123-add-contact-form
```

2. Create PR through GitHub interface
3. Fill out PR template
4. Request reviews from team members

## Pull Request Guidelines

- Include ticket number in PR title
- Link related issues
- Add meaningful description
- Include screenshots for UI changes
- List testing steps
- Ensure CI checks pass

## Release Process

1. Merge `develop` into `main`:
```bash
git checkout main
git merge develop
git push origin main
```

2. Tag the release:
```bash
git tag -a v1.2.3 -m "Release v1.2.3"
git push origin v1.2.3
```

## Hotfix Process

1. Branch from `main`:
```bash
git checkout -b hotfix/BI-999-critical-fix main
```

2. Fix the issue and commit
3. Create PR to merge into both `main` and `develop`

## Git Commands Reference

### Basic Commands
```bash
# Check status
git status

# View commit history
git log --oneline --graph

# Discard changes
git checkout -- <file>

# Create and switch to new branch
git checkout -b <branch-name>

# Switch branches
git checkout <branch-name>
```

### Advanced Commands
```bash
# Stash changes
git stash
git stash pop

# Interactive rebase
git rebase -i HEAD~3

# Cherry-pick commits
git cherry-pick <commit-hash>

# Amend last commit
git commit --amend
```

## Tools & Extensions

Recommended VS Code extensions:
- GitLens
- Git History
- Git Graph

## Questions?

If you have questions about this workflow, please reach out to the team lead or create an issue with the `workflow` label.
=======
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
>>>>>>> origin/main
