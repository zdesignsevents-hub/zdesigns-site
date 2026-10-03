# Z Designs Events — Website

Your new website, built to replace Wix. **100% free to host.**

## 📁 What's In This Folder

```
zdesigns-site/
├── index.html      ← The main page (all content is here)
├── style.css       ← All styling (colors, fonts, layout)
├── script.js       ← Interactions (mobile menu, FAQ accordion, animations)
├── images/         ← Logo and social icons
│   ├── logo.png
│   ├── social1.png  (Instagram icon)
│   └── social2.png  (Facebook icon)
└── README.md       ← This file
```

## ✏️ How To Edit

### Change Text
Open `index.html` in any text editor (Notepad, VS Code, etc.). Find the text you want to change and edit it. Save. That's it.

### Change Colors
Open `style.css`. At the top you'll see:
```
:root {
    --gold: #C5A059;        ← Change gold accent color
    --charcoal: #2C2C2C;    ← Change dark color
    --ivory: #F8F4ED;       ← Change light background
}
```
Change the hex codes and the entire site updates.

### Add Portfolio Photos
1. Put your photos in the `images/` folder (e.g., `wedding1.jpg`)
2. In `index.html`, find the `<!-- PORTFOLIO -->` section
3. Replace any gradient placeholder div with:
```html
<div class="portfolio-item">
    <img src="images/wedding1.jpg" alt="Wedding Ceremony">
    <div class="portfolio-overlay"><span>Wedding Ceremony</span></div>
</div>
```

### Add About/Workshop Photos
Same process — put photo in `images/`, then replace `image-placeholder` divs with `<img>` tags.

### Add a New Page (if needed later)
Copy `index.html`, rename it (e.g., `gallery.html`), edit content, and link to it from the nav.

## 🚀 How To Deploy For FREE

### Option 1: Netlify (Easiest — drag & drop)
1. Go to **app.netlify.com** → sign up (free)
2. Click **"Add new site"** → **"Deploy manually"**
3. Drag the entire `zdesigns-site` folder onto the page
4. Your site is LIVE! You get a URL like `zdesigns.netlify.app`
5. You can add a custom domain (zdesignsevents.com) in settings

### Option 2: GitHub Pages
1. Create a free account at **github.com**
2. Create a new repository called `zdesigns-site`
3. Upload all files from this folder
4. Go to **Settings → Pages → Source → Deploy from branch → main**
5. Your site goes live at `username.github.io/zdesigns-site`

### Option 3: Cloudflare Pages
1. Go to **pages.cloudflare.com** → sign up
2. Connect your GitHub repo or upload files
3. Deploy — free, fast, with custom domain support

## 🌐 Connecting Your Domain (zdesignsevents.com)

1. Deploy using any option above
2. In your hosting dashboard, add a custom domain: `zdesignsevents.com`
3. Your host will give you DNS records (usually A records or CNAME)
4. Log into wherever you bought the domain (GoDaddy, Namecheap, etc.)
5. Update the DNS records to point to your new host
6. Wait 24-48 hours for DNS to propagate
7. Cancel Wix! 🎉

## 📝 Notes

- The contact form uses `mailto:` — it opens the user's email app. For a more advanced form, sign up for [Formspree](https://formspree.io) (free) and update the form action in index.html.
- The hero section uses a CSS gradient background. You can replace it with a photo by adding a background image to the `.hero` class in style.css.
- Google Fonts (Playfair Display, Oswald, Cormorant Garamond) are loaded free from Google's CDN.