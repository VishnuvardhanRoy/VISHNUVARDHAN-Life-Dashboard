# VISHNUVARDHAN Daily Growth Tracker 🚀

> A comprehensive 14-hour daily growth tracker for Jan 8 - Mar 10, 2026. Build your "full-stack career + fluent personality + creative edge" with AI/ML, Design, Communication, Projects, YouTube/Editing, Fitness, Book Reading, and Reflection.

## 🎯 Project Overview

This is a **high-performance lifestyle optimization system** designed to track progress across 8 critical life domains over a 3-month period (62 days). Built with modern web technologies and psychology-based color design.

**Time Period**: Jan 8, 2026 → Mar 10, 2026 (24 days + 28 days + 10 days)

### 🧠 The 14-Hour System

- **05:00–06:00** 🏋️ Gym/Fitness (1h)
- **06:00–07:00** 🌅 Breakfast + Mindset (1h)
- **07:00–09:00** 🤖 AI/ML Core Learning (2h)
- **09:00–10:00** 🧩 Mini Project/Code (1h)
- **10:00–10:30** 🍳 Meal/Rest (0.5h)
- **10:30–12:30** 🎨 UI/UX & Design (2h)
- **12:30–13:00** 🥗 Lunch Break (0.5h)
- **13:00–15:00** 💼 Job/Portfolio Work (2h)
- **15:00–15:30** ☕ Power Nap (0.5h)
- **15:30–17:30** 🎤 Communication/Fluency (2h)
- **17:30–19:00** ⚽ Extracurricular/Sports (1.5h)
- **19:00–20:00** 🍽️ Dinner + Family (1h)
- **20:00–21:30** 📹 YouTube/Editing (1.5h)
- **21:30–22:00** 📘 Book Reading (0.5h)
- **22:00–23:00** 🧘 Reflection/Journal (1h)
- **23:00–05:00** 😴 Sleep (6h)

## 📊 Core Features

### 🎨 Modern UI with Psychology-Based Design

- **Primary Blue (#2563EB)** - Trust, focus, depth for learning domains
- **Success Green (#22C55E)** - Growth and progress validation
- **Warning Amber (#FACC15)** - Alert but encouraging
- **Danger Red (#F97373)** - Only for critical thresholds
- **Light Background (#F7F5F2)** - Calm, low eye strain

### 💾 Tab Navigation

1. **Dashboard** - Real-time progress across all 8 categories
2. **Daily Log** - Input daily completion percentages (0-100%)
3. **3-Month Progress** - Overall averages, best categories, trends
4. **Calendar** - Visual heatmap of logged days (green=full, amber=partial)

### 📈 Tracking 8 Categories

| Category | Icon | Daily Target | Goal |
|----------|------|--------------|------|
| AI/ML | 🤖 | Implement 1 concept | Fluency in models |
| Design | 🎨 | 1 UI/UX screen | Prototyping skills |
| Communication | 🎤 | Record 2-min talk | English fluency |
| Projects | 💼 | 1 GitHub commit | Portfolio growth |
| YouTube/Edit | 📹 | Learn or upload 1 clip | Content creation |
| Fitness | 🏋️ | Gym + steps | Physical health |
| Book Reading | 📘 | Read 30 min + 1 insight | Wisdom accumulation |
| Reflection | 📝 | Journal 3 wins + 1 fix | Mindset mastery |

## 🚀 Quick Start

### Option 1: Live Web Version

1. Open the repository in GitHub Pages or deploy to Netlify/Vercel
2. Visit `index.html` in your browser
3. Start logging daily progress

### Option 2: Local Development

```bash
# Clone the repository
git clone https://github.com/VishnuvardhanRoy/VISHNUVARDHAN-Life-Dashboard.git

# Navigate to directory
cd VISHNUVARDHAN-Life-Dashboard

# Open in browser (no build required!)
open index.html  # macOS
start index.html # Windows
```

### Option 3: Deploy to GitHub Pages

1. Go to Settings → Pages
2. Set source to `main` branch
3. Your dashboard is live at: `https://VishnuvardhanRoy.github.io/VISHNUVARDHAN-Life-Dashboard/`

## 📁 Project Structure

```
.
├── index.html      # Main HTML structure
├── styles.css      # Psychology-based color + 3D effects
├── script.js       # Tracker logic + localStorage
└── README.md       # This file
```

## 🎮 How to Use

### Daily Logging

1. Click **"Daily Log"** tab
2. Select a date (defaults to today)
3. Enter completion % for each category (0-100)
4. Add notes: wins, improvements, mindset observations
5. Click **"Save Daily Log"**
6. Data is saved to browser's localStorage (persists locally)

### View Progress

- **Dashboard**: See all 8 categories + monthly progress
- **3-Month Progress**: Overall average, best category, total days logged
- **Calendar**: Green days = 70%+ completion, Amber = 40-70%

### Data Storage

- All data saved in **browser localStorage** (completely private)
- Data persists across sessions
- Export/backup: Open DevTools → Application → localStorage → dailyLogs

## 🎨 Design Philosophy

### Color Psychology

- **Blue gradient header** (#2563EB → #1D4ED8) invokes deep focus and trust
- **Green progress bars** trigger dopamine (achievement feeling)
- **Smooth animations** (0.3s ease) reduce cognitive load
- **Card shadows** create 3D depth for visual hierarchy
- **Rounded corners (16px)** feel modern and approachable

### Typography

- **Headers**: Poppins/Montserrat (modern, energetic)
- **Body**: Inter/Roboto (clean, readable)
- **Font scale**: 0.85rem → 2.5rem (clear hierarchy)

### 3D Effects

- Box shadows: `0 18px 40px rgba(37, 99, 235, 0.15)`
- Hover transforms: `translateY(-4px)`
- Glassmorphism: Optional backdrop-filter for future versions

## 📊 Data Structure

### Daily Log Object

```javascript
{
  "2026-01-08": {
    "aiml": 85,
    "design": 70,
    "communication": 90,
    "projects": 75,
    "youtube": 60,
    "fitness": 100,
    "book": 80,
    "reflection": 95,
    "notes": "Great focus today. Need to improve design skills.",
    "date": "2026-01-08"
  }
}
```

## 🔄 JavaScript Features

- **Tab switching** with smooth animations
- **Category averages** auto-calculated
- **Monthly progress** computed from date ranges
- **Calendar heatmap** generated dynamically
- **localStorage API** for persistent storage
- **ES6+** syntax (arrow functions, template literals, destructuring)

## 📱 Responsive Design

- **Desktop** (1400px): 3-column layouts
- **Tablet** (768px): 2-column layouts
- **Mobile**: Stacked (1 column)

Breakpoints in CSS:
```css
@media (max-width: 768px) {
  .form-grid { grid-template-columns: 1fr; }
  .calendar-grid { grid-template-columns: repeat(5, 1fr); }
}
```

## 🎓 Learning Resources Referenced

**Books** (from your 30-min daily reading block):
- Atomic Habits by James Clear
- Deep Work by Cal Newport
- Show Your Work by Austin Kleon
- Can't Hurt Me by David Goggins
- How to Win Friends & Influence People by Dale Carnegie

## 🚦 Future Enhancements

- [ ] Export data to CSV/Google Sheets
- [ ] Dark mode toggle
- [ ] Mobile app version
- [ ] Cloud sync (Firebase/Supabase)
- [ ] Notifications (daily reminder)
- [ ] AI insights (pattern analysis)
- [ ] Leaderboard (for teams)
- [ ] Habit streaks visualization

## 📄 License

MIT License - Feel free to fork, modify, and share!

## 👨‍💻 Author

**Vishnuvadhan** - Building a "grind + growth" lifestyle 💪

- GitHub: [@VishnuvardhanRoy](https://github.com/VishnuvardhanRoy)
- Focus: AI/ML, Design, Communication, Full-Stack Career

## 💡 Tips for Success

1. **Log daily** - Consistency > perfection
2. **Celebrate small wins** - Reflect on 3 daily wins
3. **Review weekly** - Use Progress tab on Sundays
4. **Adjust monthly** - Rebalance time blocks if needed
5. **Track streaks** - Aim for 62/62 days logged
6. **Community** - Share progress with accountability partners

---

**Start Date**: Jan 8, 2026 🔥  
**End Date**: Mar 10, 2026 ✅  
**Duration**: 62 Days of High-Performance Living  
**Goal**: Full-stack career + fluent personality + creative edge

**Let's goooo! 🚀**
