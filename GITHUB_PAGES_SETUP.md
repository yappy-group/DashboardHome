# GitHub Pages Deployment Guide

This repository is configured to automatically deploy the Yappy Report Prototype to GitHub Pages.

## 🌐 Live URL

Once deployed, your application will be available at:
**https://yappy-group.github.io/DashboardHome/**

## ⚙️ Configuration

The deployment is already configured with the following setup:

### 1. Vite Configuration (`YappyReportPrototype/vite.config.ts`)
- Base path is set to `/DashboardHome/` for GitHub Pages
- Build output goes to `dist/public`
- Environment variable `GITHUB_PAGES=true` triggers the correct base path

### 2. GitHub Actions Workflow (`.github/workflows/deploy.yml`)
- Automatically deploys on every push to `main` branch
- Can also be manually triggered from the Actions tab
- Builds the application with `npm run build:gh-pages`
- Deploys to GitHub Pages using official GitHub Actions

### 3. Package.json Scripts
- `npm run build:gh-pages` - Builds the app for GitHub Pages deployment
- `npm run deploy` - Local deployment using gh-pages package (alternative method)

## 🚀 Deployment Options

### Option 1: Automatic Deployment (Recommended)
1. Push your changes to the `main` branch:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```
2. GitHub Actions will automatically build and deploy
3. Monitor the deployment at: https://github.com/yappy-group/DashboardHome/actions

### Option 2: Manual Deployment from Actions Tab
1. Go to https://github.com/yappy-group/DashboardHome/actions
2. Click on "Deploy to GitHub Pages" workflow
3. Click "Run workflow" button
4. Select the `main` branch and click "Run workflow"

### Option 3: Local Deployment (Using gh-pages package)
```bash
cd YappyReportPrototype
npm run deploy
```

## 📋 Prerequisites for GitHub Pages

### Enable GitHub Pages in Repository Settings
1. Go to: https://github.com/yappy-group/DashboardHome/settings/pages
2. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
3. Save the settings

### Required Permissions
The GitHub Actions workflow needs these permissions (already configured):
- `contents: read` - To checkout the repository
- `pages: write` - To deploy to GitHub Pages
- `id-token: write` - For authentication

## 🔧 Local Development

To run the prototype locally:

```bash
cd YappyReportPrototype
npm install
npm run dev
```

The app will be available at `http://localhost:5000`

## 📦 Build Process

The GitHub Pages build process:
1. Checks out the repository
2. Sets up Node.js 20
3. Installs dependencies from `YappyReportPrototype/package.json`
4. Runs `npm run build:gh-pages` with `GITHUB_PAGES=true` environment variable
5. Uploads the built files from `YappyReportPrototype/dist/public`
6. Deploys to GitHub Pages

## 🐛 Troubleshooting

### Deployment fails in GitHub Actions
- Check the Actions tab for error messages
- Ensure all dependencies are listed in `package.json`
- Verify that the build succeeds locally with `npm run build:gh-pages`

### 404 errors for assets
- Ensure the base path in `vite.config.ts` matches your repository name
- Current setting: `/DashboardHome/`

### Changes not appearing on GitHub Pages
- Check if the deployment succeeded in Actions tab
- GitHub Pages can take a few minutes to update
- Try a hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Clear your browser cache

## 📝 Making Changes

When you make changes to the prototype:
1. Edit files in the `YappyReportPrototype` directory
2. Test locally with `npm run dev`
3. Commit and push to the `main` branch
4. GitHub Actions will automatically rebuild and deploy

## 🔗 Useful Links

- **Live Site**: https://yappy-group.github.io/DashboardHome/
- **Repository**: https://github.com/yappy-group/DashboardHome
- **Actions**: https://github.com/yappy-group/DashboardHome/actions
- **Settings**: https://github.com/yappy-group/DashboardHome/settings/pages

## 📄 Files Modified for GitHub Pages

- `YappyReportPrototype/vite.config.ts` - Base path configuration
- `YappyReportPrototype/package.json` - Added build:gh-pages script
- `.github/workflows/deploy.yml` - GitHub Actions workflow
- `YappyReportPrototype/client/public/404.html` - SPA fallback for routing

## ✅ Next Steps

1. **Enable GitHub Pages** in repository settings (if not already done)
2. **Push to main branch** to trigger the first deployment
3. **Wait for the workflow** to complete (usually 2-3 minutes)
4. **Visit the live URL** to see your deployed application

That's it! Your Yappy Report Prototype is now set up for automatic deployment to GitHub Pages! 🎉
