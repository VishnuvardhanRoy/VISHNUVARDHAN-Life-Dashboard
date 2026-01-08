// Data storage
const tracker = {
  dailyLogs: JSON.parse(localStorage.getItem('dailyLogs')) || {},
  startDate: new Date(2026, 0, 8), // Jan 8, 2026
  endDate: new Date(2026, 2, 10), // Mar 10, 2026
};

// Initialize date
document.getElementById('currentDate').textContent = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

// Set log date to today
document.getElementById('logDate').valueAsDate = new Date();

// Tab switching
document.querySelectorAll('.tab-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach((tab) => {
      tab.classList.remove('active');
    });

    // Remove active from all buttons
    document.querySelectorAll('.tab-btn').forEach((b) => {
      b.classList.remove('active');
    });

    // Show selected tab
    const tabName = btn.getAttribute('data-tab');
    document.getElementById(tabName).classList.add('active');
    btn.classList.add('active');

    // Load data for specific tabs
    if (tabName === 'progress') loadProgressTab();
    if (tabName === 'calendar') loadCalendarTab();
  });
});

// Form submission
document.getElementById('dailyForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const date = document.getElementById('logDate').value;
  const formData = {};

  document.querySelectorAll('.category-input').forEach((input) => {
    formData[input.getAttribute('data-category')] = parseInt(input.value) || 0;
  });

  formData.notes = document.getElementById('dailyNotes').value;
  formData.date = date;

  tracker.dailyLogs[date] = formData;
  localStorage.setItem('dailyLogs', JSON.stringify(tracker.dailyLogs));

  alert('Daily log saved successfully!');
  updateDashboard();
});

// Update dashboard with current data
function updateDashboard() {
  const logs = tracker.dailyLogs;
  const janStart = new Date(2026, 0, 8);
  const janEnd = new Date(2026, 0, 31);
  const febStart = new Date(2026, 1, 1);
  const febEnd = new Date(2026, 1, 28);
  const marStart = new Date(2026, 2, 1);
  const marEnd = new Date(2026, 2, 10);

  // Calculate month progress
  const janDays = Object.keys(logs)
    .filter((d) => {
      const date = new Date(d);
      return date >= janStart && date <= janEnd;
    }).length;
  const febDays = Object.keys(logs)
    .filter((d) => {
      const date = new Date(d);
      return date >= febStart && date <= febEnd;
    }).length;
  const marDays = Object.keys(logs)
    .filter((d) => {
      const date = new Date(d);
      return date >= marStart && date <= marEnd;
    }).length;

  const janTotal = 24;
  const febTotal = 28;
  const marTotal = 10;

  const janPercent = Math.round((janDays / janTotal) * 100);
  const febPercent = Math.round((febDays / febTotal) * 100);
  const marPercent = Math.round((marDays / marTotal) * 100);

  document.getElementById('jan-percent').textContent = `${janPercent}%`;
  document.getElementById('feb-percent').textContent = `${febPercent}%`;
  document.getElementById('mar-percent').textContent = `${marPercent}%`;

  // Update progress bars
  document.querySelectorAll('.month-card .progress-fill').forEach((bar, i) => {
    const percents = [janPercent, febPercent, marPercent];
    bar.style.width = percents[i] + '%';
  });

  // Calculate category averages
  const categories = ['aiml', 'design', 'communication', 'projects', 'youtube', 'fitness', 'book', 'reflection'];
  const categoryAvgs = {};

  categories.forEach((cat) => {
    const values = Object.values(logs)
      .filter((log) => log[cat] !== undefined)
      .map((log) => log[cat]);
    const avg = values.length > 0 ? Math.round(values.reduce((a, b) => a + b, 0) / values.length) : 0;
    categoryAvgs[cat] = avg;
  });

  // Update category cards on dashboard
  const categoryNames = ['aiml', 'design', 'communication', 'projects', 'youtube', 'fitness', 'book', 'reflection'];
  document.querySelectorAll('.category-card').forEach((card, i) => {
    const cat = categoryNames[i];
    const percent = categoryAvgs[cat] || 0;
    card.querySelector('.small-fill').style.width = percent + '%';
    card.querySelector('.cat-percent').textContent = `${percent}%`;
  });
}

function loadProgressTab() {
  const logs = tracker.dailyLogs;
  const daysLogged = Object.keys(logs).length;

  document.getElementById('daysLogged').textContent = daysLogged;

  // Calculate overall average
  const categories = ['aiml', 'design', 'communication', 'projects', 'youtube', 'fitness', 'book', 'reflection'];
  let totalAvg = 0;
  const categoryStats = [];

  categories.forEach((cat) => {
    const values = Object.values(logs)
      .filter((log) => log[cat] !== undefined)
      .map((log) => log[cat]);
    const avg = values.length > 0 ? Math.round(values.reduce((a, b) => a + b, 0) / values.length) : 0;
    totalAvg += avg;
    categoryStats.push({ cat, avg });
  });

  totalAvg = Math.round(totalAvg / categories.length);
  document.getElementById('overallAvg').textContent = `${totalAvg}%`;

  // Best category
  const best = categoryStats.reduce((max, stat) => (stat.avg > max.avg ? stat : max), { cat: '', avg: 0 });
  const categoryNames = { aiml: 'AI/ML', design: 'Design', communication: 'Communication', projects: 'Projects', youtube: 'YouTube/Edit', fitness: 'Fitness', book: 'Book Reading', reflection: 'Reflection' };
  document.getElementById('bestCategory').textContent = best.avg > 0 ? categoryNames[best.cat] : '--';

  // Detailed stats
  const statsHtml = categoryStats
    .map(
      (stat) =>`
      <div style="margin-bottom: 12px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
          <span>${categoryNames[stat.cat]}</span>
          <span style="font-weight: 600;">${stat.avg}%</span>
        </div>
        <div style="width: 100%; height: 8px; background: #E5E7EB; border-radius: 999px; overflow: hidden;">
          <div style="height: 100%; background: linear-gradient(90deg, #2563EB, #22C55E); width: ${stat.avg}%; border-radius: 999px;"></div>
        </div>
      </div>
    `
    )
    .join('');

  document.getElementById('categoryStats').innerHTML = statsHtml;
}

function loadCalendarTab() {
  const logs = tracker.dailyLogs;
  const calendarDiv = document.querySelector('.calendar-grid');
  calendarDiv.innerHTML = '';

  // Generate 63 days from Jan 8 - Mar 10
  const startDate = new Date(2026, 0, 8);
  for (let i = 0; i < 62; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];

    const dayDiv = document.createElement('div');
    dayDiv.className = 'calendar-day';
    dayDiv.textContent = date.getDate();

    if (logs[dateStr]) {
      const log = logs[dateStr];
      const avg = ['aiml', 'design', 'communication', 'projects', 'youtube', 'fitness', 'book', 'reflection']
        .map((cat) => log[cat] || 0)
        .reduce((a, b) => a + b, 0) / 8;

      if (avg >= 70) {
        dayDiv.classList.add('logged');
      } else if (avg >= 40) {
        dayDiv.classList.add('partial');
      }
    }

    calendarDiv.appendChild(dayDiv);
  }
}

// Enhanced Features - Topic & Time Tracking
function updateCategoryCards() {
  const today = new Date().toISOString().split('T')[0];
  const logData = JSON.parse(localStorage.getItem(`log_${today}`) || '{"categories":{}}'  );
  const categories = ['aiml', 'design', 'communication', 'projects', 'youtube', 'fitness', 'book', 'reflection'];
  
  categories.forEach(cat => {
    const data = logData.categories[cat] || {};
    const topicElement = document.querySelector(`.topic-value[data-category="${cat}"]`);
    const timeElement = document.querySelector(`.time-value[data-category="${cat}"]`);
    const percentElement = document.querySelector(`.cat-percent[data-category="${cat}"]`);
    
    if (topicElement) topicElement.textContent = data.topic || '--';
    if (timeElement) timeElement.textContent = (data.time || 0) + ' mins';
    if (percentElement && data.percentage) percentElement.textContent = data.percentage + '%';
  });
}

function saveCategoryData() {
  const today = new Date().toISOString().split('T')[0];
  const logData = { categories: {} };
  const categories = ['aiml', 'design', 'communication', 'projects', 'youtube', 'fitness', 'book', 'reflection'];
  
  categories.forEach(cat => {
    const topicInput = document.querySelector(`.topic-input[data-category="${cat}"]`);
    const timeInput = document.querySelector(`.time-input[data-category="${cat}"]`);
    const percentInput = document.querySelector(`.category-input[data-category="${cat}"]`);
    
    logData.categories[cat] = {
      topic: topicInput ? topicInput.value : '',
      time: timeInput ? parseInt(timeInput.value) || 0 : 0,
      percentage: percentInput ? parseInt(percentInput.value) || 0 : 0
    };
  });
  
  localStorage.setItem(`log_${today}`, JSON.stringify(logData));
  updateCategoryCards();
}

// Handle form submission
const dailyForm = document.getElementById('dailyForm');
if (dailyForm) {
  dailyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    saveCategoryData();
    alert('Progress saved successfully!');
  });
}

// Initialize cards on page load
window.addEventListener('DOMContentLoaded', updateCategoryCards);

// Auto-save on input change
document.addEventListener('change', (e) => {
  if (e.target.classList.contains('topic-input') || 
      e.target.classList.contains('time-input') || 
      e.target.classList.contains('category-input')) {
    saveCategoryData();
  }
});

// Calendar Generation (Jan 8 - Mar 10, 2026)
function generateCalendar() {
  const calendarContainer = document.getElementById('calendar-container');
  if (!calendarContainer) return;
  
  calendarContainer.innerHTML = '';
  const startDate = new Date(2026, 0, 8);
  const endDate = new Date(2026, 2, 10);
  
  let currentDate = new Date(startDate);
  let monthContainer = null;
  let currentMonth = -1;
  
  const monthNames = ['January', 'February', 'March'];
  
  while (currentDate <= endDate) {
    if (currentDate.getMonth() !== currentMonth) {
      currentMonth = currentDate.getMonth();
      monthContainer = document.createElement('div');
      monthContainer.className = 'month-calendar';
      monthContainer.innerHTML = `<h3>${monthNames[currentMonth]} ${currentDate.getFullYear()}</h3><div class="calendar-grid"></div>`;
      calendarContainer.appendChild(monthContainer);
    }
    
    const calendarGrid = monthContainer.querySelector('.calendar-grid');
    const dateStr = currentDate.toISOString().split('T')[0];
    const dayCell = document.createElement('div');
    dayCell.className = 'day-cell';
    
    const logData = JSON.parse(localStorage.getItem(`log_${dateStr}`) || '{"categories":{}}'  );
    const completedCount = Object.values(logData.categories).filter(c => c.percentage > 0).length;
    
    const color = completedCount >= 5 ? '#10b981' : completedCount >= 3 ? '#f59e0b' : completedCount > 0 ? '#93c5fd' : '#e5e7eb';
    
    dayCell.innerHTML = `
      <div class="day-number">${currentDate.getDate()}</div>
      <div class="day-indicator" style="background: ${color};"></div>
    `;
    
    dayCell.title = `${dateStr}: ${completedCount} categories completed`;
    dayCell.style.cursor = 'pointer';
    
    dayCell.addEventListener('click', () => {
      document.getElementById('logDate').value = dateStr;
      loadDayData(dateStr);
      document.querySelector('[data-tab="daily-log"]').click();
    });
    
    calendarGrid.appendChild(dayCell);
    currentDate.setDate(currentDate.getDate() + 1);
  }
}

function loadDayData(dateStr) {
  const logData = JSON.parse(localStorage.getItem(`log_${dateStr}`) || '{"categories":{}}'  );
  const categories = ['aiml', 'design', 'communication', 'projects', 'youtube', 'fitness', 'book', 'reflection'];
  
  categories.forEach(cat => {
    const data = logData.categories[cat] || {};
    const topicInput = document.querySelector(`.topic-input[data-category="${cat}"]`);
    const timeInput = document.querySelector(`.time-input[data-category="${cat}"]`);
    const percentInput = document.querySelector(`.category-input[data-category="${cat}"]`);
    
    if (topicInput) topicInput.value = data.topic || '';
    if (timeInput) timeInput.value = data.time || 0;
    if (percentInput) percentInput.value = data.percentage || 0;
  });
}

window.addEventListener('DOMContentLoaded', () => {
  generateCalendar();
  updateCategoryCards();
});

// Refresh calendar when data changes
window.addEventListener('storage', generateCalendar);

// Initialize dashboard
updateDashboard();
