# Deployment Checklist for GitHub Pages

## ✅ Pre-Deployment Checklist

- [x] GitHub Actions workflow configured (`.github/workflows/deploy.yml`)
- [x] Vite base path set to `/DashboardHome/` in `vite.config.ts`
- [x] Build script `build:gh-pages` added to `package.json`
- [x] 404.html configured for SPA routing
- [x] Dependencies include `gh-pages` package

## 🚀 Deployment Steps

### 1. Enable GitHub Pages (First Time Only)
Go to: https://github.com/yappy-group/DashboardHome/settings/pages

Settings to configure:
- **Source**: GitHub Actions
- **Custom domain**: (leave empty unless you have one)

### 2. Commit and Push Changes
```bash
# Stage all changes
git add .

# Commit with descriptive message
git commit -m "Configure GitHub Pages deployment"

# Push to main branch
git push origin main
```

### 3. Monitor Deployment
1. Go to: https://github.com/yappy-group/DashboardHome/actions
2. Wait for the "Deploy to GitHub Pages" workflow to complete
3. Should take approximately 2-3 minutes

### 4. Verify Deployment
Visit: **https://yappy-group.github.io/DashboardHome/**

## 🔍 Verification Steps

After deployment completes:

- [ ] Visit the live URL
- [ ] Check that the homepage loads correctly
- [ ] Test navigation between pages
- [ ] Verify images and assets load
- [ ] Test on mobile/responsive view
- [ ] Check browser console for errors

## 📝 Common Issues

### Issue: GitHub Pages not enabled
**Solution**: Go to repository settings → Pages → Set source to "GitHub Actions"

### Issue: 404 Page Not Found
**Possible causes**:
- Base path doesn't match repository name
- GitHub Pages not enabled
- Deployment still in progress

### Issue: Assets not loading (404 errors)
**Solution**: Verify base path in `vite.config.ts` is `/DashboardHome/`

### Issue: Routing not working
**Solution**: Check that `404.html` exists in `client/public` folder

## 🎯 Quick Test Build Locally

Before pushing, test the GitHub Pages build:

```bash
cd YappyReportPrototype
GITHUB_PAGES=true npm run build:gh-pages
```

Then serve the build locally:
```bash
npx serve dist/public -p 8080
```

Visit: http://localhost:8080/DashboardHome/

## 📊 Current Configuration

| Setting | Value |
|---------|-------|
| Repository | `yappy-group/DashboardHome` |
| Branch | `main` |
| Build Path | `YappyReportPrototype/dist/public` |
| Live URL | `https://yappy-group.github.io/DashboardHome/` |
| Base Path | `/DashboardHome/` |
| Node Version | 20 |

## ✨ Ready to Deploy!

Run these commands now:

```bash
cd /Users/jamieegan/Downloads/Yappy-Client-Portal/DashboardHome
git add .
git commit -m "Configure GitHub Pages with correct base path"
git push origin main
```

Then monitor at: https://github.com/yappy-group/DashboardHome/actions
