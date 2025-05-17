# Build Troubleshooting Guide

## Common Next.js Build Issues

### "Cannot find module" errors

If you encounter errors like `Cannot find module './XXX.js'` during build:

1. **Clean your Next.js build cache**:

   ```powershell
   # On Windows
   if (Test-Path .next) { Remove-Item -Recurse -Force .next }

   # On macOS/Linux
   rm -rf .next
   ```

2. **Clean npm cache**:

   ```
   npm cache clean --force
   ```

3. **Reinstall dependencies**:

   ```
   npm install --no-fund
   ```

4. **Try building with linting disabled**:
   ```
   npm run build --no-lint
   ```

### Permission Errors (EPERM)

If you encounter `EPERM: operation not permitted` errors:

1. **Close any applications** that might be using the files (VS Code, etc.)
2. **Check for running processes** that might be locking the files
3. **Run as Administrator** if on Windows
4. **Restart your computer** to release any locked files

### Missing Core Next.js Pages

If you get errors about missing pages like `_document`:

1. Make sure you have the necessary Next.js core files in your project:
   - `src/pages/_document.tsx`
   - `src/pages/_app.tsx` (if using pages router)

## Final Solutions

If you've tried everything above and still have issues:

1. Create a fresh Next.js project with `npx create-next-app`
2. Copy your source files from the old project to the new one
3. Install the required dependencies in the new project
