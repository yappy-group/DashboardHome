# GitHub Pages Deployment Guide

This guide will help you deploy the Yappy Client Portal to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your machine
- Node.js and npm installed

## Setup Steps

### 1. Push Your Code to GitHub

If you haven't already created a GitHub repository:

```bash
# Navigate to your project directory
cd /Users/jamieegan/Downloads/Yappy-Client-Portal

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit"

# Create a new repository on GitHub, then add it as remote
git remote add origin https://github.com/YOUR-USERNAME/Yappy-Client-Portal.git

# Push to GitHub
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to your GitHub repository
2. Click on **Settings** tab
3. In the left sidebar, click on **Pages**
4. Under "Build and deployment", set:
   - **Source**: GitHub Actions
5. Save your changes

### 3. Update Base Path (if needed)

The `vite.config.ts` has been configured with:
```typescript
base: process.env.GITHUB_PAGES === 'true' ? '/Yappy-Client-Portal/' : '/',
```

**Important**: Replace `'Yappy-Client-Portal'` with your actual repository name if different.

If deploying to a custom domain or `username.github.io`, change the base to `'/'`:
```typescript
base: process.env.GITHUB_PAGES === 'true' ? '/' : '/',
```

### 4. Deploy

#### Option A: Automatic Deployment (Recommended)

The GitHub Actions workflow will automatically deploy on every push to the `main` branch.

Simply push your code:
```bash
git add .
git commit -m "Configure GitHub Pages"
git push
```

The deployment will happen automatically. You can monitor it in the **Actions** tab of your repository.

#### Option B: Manual Deployment

You can also deploy manually from your local machine:

```bash
# Navigate to the project directory
cd YappyReportPrototype

# Install gh-pages package if not already installed
npm install

# Deploy to GitHub Pages
npm run deploy
```

This will:
1. Build the project with GitHub Pages configuration
2. Deploy the `dist/public` folder to the `gh-pages` branch

### 5. Access Your Site

After deployment (takes 1-3 minutes), your site will be available at:
```
https://YOUR-USERNAME.github.io/Yappy-Client-Portal/
```

Replace `YOUR-USERNAME` with your GitHub username and `Yappy-Client-Portal` with your repository name.

## Configuration Files

The following files have been configured for GitHub Pages:

1. **`.github/workflows/deploy.yml`** - GitHub Actions workflow for automatic deployment
2. **`vite.config.ts`** - Updated with base path configuration
3. **`package.json`** - Added deployment scripts and gh-pages dependency

## Troubleshooting

### Blank Page or 404 Errors

If you see a blank page or get 404 errors:

1. Check that the `base` path in `vite.config.ts` matches your repository name
2. Verify GitHub Pages is enabled in repository settings
3. Wait a few minutes for deployment to complete
4. Check the Actions tab for any build errors

### Build Fails

If the build fails in GitHub Actions:

1. Check the Actions tab for error logs
2. Ensure all dependencies are correctly listed in `package.json`
3. Try building locally first: `npm run build:gh-pages`
4. Check that Node.js version in workflow matches your local version

### Assets Not Loading

If images or other assets aren't loading:

1. Ensure asset paths are relative (e.g., `./image.png` not `/image.png`)
2. Check the browser console for 404 errors
3. Verify the base path is correct in `vite.config.ts`

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to `YappyReportPrototype/client/public/` with your domain
2. Configure your domain's DNS settings to point to GitHub Pages
3. Update the `base` path in `vite.config.ts` to `'/'`
4. In GitHub repository settings, add your custom domain under Pages settings

## Updating Your Site

To update your deployed site:

**With GitHub Actions:**
```bash
git add .
git commit -m "Update site"
git push
```

**Manual deployment:**
```bash
cd YappyReportPrototype
npm run deploy
```

## Notes

- The deployment uses the client-side only build (no server backend)
- Backend features (database, authentication) won't work on GitHub Pages
- GitHub Pages is best suited for static demo/prototype versions
- For full-stack deployment, consider Vercel, Netlify, or Heroku

## Support

For more information:
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [gh-pages Package](https://github.com/tschaub/gh-pages)
