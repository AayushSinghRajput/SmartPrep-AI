## Description
<!-- Provide a brief description of the changes introduced by this pull request -->

## Target Branch Verification
<!-- All work must follow the branching policy: -->
- [ ] **Targeting `dev`**: This is a feature, bugfix, or chore branch being merged into `dev` for testing and integration.
- [ ] **Targeting `main`**: This is a release PR coming **ONLY** from the `dev` branch.

> ⚠️ **Important:** Direct PRs to `main` from any branch other than `dev` are automatically blocked by GitHub Actions.

---

## Type of Change
- [ ] 🚀 New feature (non-breaking change which adds functionality)
- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] 🧹 Refactoring / Code cleanup
- [ ] 📝 Documentation update
- [ ] ⚙️ CI/CD pipeline / Build configuration
- [ ] 🔒 Security update

---

## Verification & Testing
- [ ] Client builds cleanly (`cd client && npm run typecheck && npm run build`)
- [ ] Server lint & tests pass (`cd server && pytest tests/`)
- [ ] Verified locally in browser / API client
- [ ] Docker configuration verified
