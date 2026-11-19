// 1. Study resources list (Members 4 & 5 can add/edit items here)
const resources = [
  {
    course: "MPC with CS",
    title: "NCERT Class 11 Maths & Physics Concepts",
    tip: "Great for building strong Class 11 Maths and Physics fundamentals step by step.",
    siteName: "Khan Academy Class 11 Math",
    siteUrl: "https://www.khanacademy.org/math/ncert-class-11",
    ytName: "Khan Academy India on YouTube",
    ytUrl: "https://www.youtube.com/@KhanAcademyIndia"
  },
  {
    course: "MPC with CS",
    title: "Programming & Computer Science Basics",
    tip: "Helpful for learning coding logic, programming basics, and computer fundamentals.",
    siteName: "freeCodeCamp",
    siteUrl: "https://www.freecodecamp.org/",
    ytName: "freeCodeCamp.org on YouTube",
    ytUrl: "https://www.youtube.com/@freecodecamp"
  },
  {
    course: "MPC with AIML",
    title: "Python & Machine Learning Foundations",
    tip: "Start with Python and basic machine learning concepts used in AI/ML vocational study.",
    siteName: "freeCodeCamp ML with Python",
    siteUrl: "https://www.freecodecamp.org/learn/machine-learning-with-python",
    ytName: "freeCodeCamp.org on YouTube",
    ytUrl: "https://www.youtube.com/@freecodecamp"
  },
  {
    course: "MPC with AIML",
    title: "Introductory AI & Computing Lectures",
    tip: "Useful for understanding core Artificial Intelligence and computer science topics.",
    siteName: "NPTEL Artificial Intelligence",
    siteUrl: "https://nptel.ac.in/courses/106105077",
    ytName: "IIT Kharagpur NPTEL HRD on YouTube",
    ytUrl: "https://www.youtube.com/@iitkharagpuronline"
  },
  {
    course: "MLT",
    title: "Medical Laboratory Technology Notes & Practice",
    tip: "Useful for reviewing lab technology topics, microbiology/pathology terms, and practice questions.",
    siteName: "MLTPrep Online",
    siteUrl: "https://www.mltprep.online/",
    ytName: "MLT Education Point on YouTube",
    ytUrl: "https://www.youtube.com/@MLTEducationPoint"
  },
  {
    course: "MLT",
    title: "Class 11 Biology & Science Foundations",
    tip: "Helpful for cell biology, anatomy basics, and core science concepts behind lab work.",
    siteName: "Khan Academy Class 11 Science",
    siteUrl: "https://www.khanacademy.org/science/ncert-science-11",
    ytName: "Khan Academy India on YouTube",
    ytUrl: "https://www.youtube.com/@KhanAcademyIndia"
  }
];

let selectedCourse = "ALL";
const STORAGE_KEY = "vocational_top2_platforms";

const resultsArea = document.getElementById("resultsArea");
const searchInput = document.getElementById("searchInput");
const clearBtn = document.getElementById("clearBtn");
const courseBtns = document.querySelectorAll(".course-btn");
const savedList = document.getElementById("savedList");
const themeBtn = document.getElementById("themeBtn");

// 2. Render matching study strips
function renderList() {
  const query = searchInput.value.trim().toLowerCase();

  const filtered = resources.filter((item) => {
    const matchesCourse = selectedCourse === "ALL" || item.course === selectedCourse;
    const text = `${item.course} ${item.title} ${item.tip} ${item.siteName} ${item.ytName}`.toLowerCase();
    const matchesSearch = query === "" || text.includes(query);
    return matchesCourse && matchesSearch;
  });

  if (filtered.length === 0) {
    resultsArea.innerHTML = `<div class="result-strip"><p class="result-desc">No matching study links found. Try another keyword or select All Courses.</p></div>`;
    return;
  }

  resultsArea.innerHTML = filtered
    .map(
      (item) => `
      <article class="result-strip">
        <div class="result-info">
          <div class="course-tag">${item.course}</div>
          <h2 class="result-title">${item.title}</h2>
          <p class="result-desc">${item.tip}</p>
        </div>
        <div class="result-actions">
          <a href="${item.siteUrl}" target="_blank" rel="noopener noreferrer">${item.siteName}</a>
          <a href="${item.ytUrl}" target="_blank" rel="noopener noreferrer">${item.ytName}</a>
          <button type="button" onclick="saveTopPlatform('${item.title.replace(/'/g, "\\'")}', '${item.siteUrl}')">Save Top 2</button>
        </div>
      </article>
    `
    )
    .join("");
}

// 3. Save up to 2 platforms in localStorage (Member 6)
function getSaved() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function renderSaved() {
  const saved = getSaved();
  if (saved.length === 0) {
    savedList.textContent = 'None saved yet. Click "Save Top 2" on any row.';
    return;
  }
  savedList.innerHTML = saved
    .map((s) => `<a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.title}</a>`)
    .join(" | ");
}

window.saveTopPlatform = function (title, url) {
  let saved = getSaved();
  saved = saved.filter((item) => item.title !== title);
  saved.unshift({ title, url });
  saved = saved.slice(0, 2);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  renderSaved();
};

// 4. Button & search listeners
courseBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    courseBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    selectedCourse = btn.dataset.course;
    renderList();
  });
});

searchInput.addEventListener("input", renderList);

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  renderList();
});

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeBtn.textContent = document.body.classList.contains("dark") ? "Light Mode" : "Dark Mode";
});

// Initial load
renderList();
renderSaved();