You are operating inside a Ralph Loop autonomous agent iteration.

## Rules of Execution:
1. **Read Task Spec**: Inspect `PRD.md` to identify the highest priority incomplete task.
2. **Review Progress**: Check `progress.txt` to understand what was completed in prior iterations.
3. **Execute Incrementally**: Complete ONE discrete task per iteration. Do not attempt everything at once.
4. **Verify**: Ensure the codebase builds and tests pass before declaring a task complete:
   - For frontend: check TypeScript and build in `./client`
   - For backend: check syntax and tests in `./server`
5. **Log Progress**: Append a concise entry to `progress.txt` describing what was implemented.
6. **Commit**: Create a git commit describing the incremental milestone.
