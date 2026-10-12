import "./style.css";
import { getCurrentUser, logout } from "./auth.js";

const currentUser = getCurrentUser();

const navActionsHtml = currentUser
  ? `
    <span style="align-self:center; font-weight:600; color:#0d9488; font-size:0.95rem;">👋 Hi, ${currentUser.name || 'Pet Parent'}</span>
    <a href="/profile.html" class="nav-btn-link" style="text-decoration:none;"><button style="background:#0d9488;">Dashboard</button></a>
    <button id="logoutBtn" style="background:#ef4444;">Logout</button>
  `
  : `
    <button id="loginBtn">Login</button>
    <button id="registerBtn">Register</button>
  `;

document.querySelector("#app").innerHTML = `
  <!-- NAVBAR -->
  <nav class="navbar">
    <h2>🐾 Pet Care Planner</h2>
    <div id="navActions">
      ${navActionsHtml}
    </div>
  </nav>

  <!-- HERO SECTION -->
  <section class="hero">
    <div class="hero-text">
      <h1>Happy Pets • Healthy Lives</h1>
      <p class="tagline">Better Together</p>
      <p>
        Manage your pet’s daily care, health records, vaccinations, medicines and reminders — all in one beautiful place.
      </p>
      <button class="start" id="startBtn">${currentUser ? "Go to Dashboard →" : "Get Started →"}</button>
    </div>

    <div class="hero-image">
      <img src="/images/dog.jpg" alt="Happy Golden Retriever">
    </div>
  </section>

  <!-- FEATURES -->
  <section class="features">
    <h2>Everything your pet needs 🐾</h2>

    <div class="grid">
      <div class="card" onclick="window.location.href='/profile.html'" style="cursor:pointer;">
        <h3>🐶 My Pets</h3>
        <p>Add and manage your pet profiles easily.</p>
      </div>
      <div class="card" onclick="window.location.href='/add-task.html'" style="cursor:pointer;">
        <h3>🥣 Daily Tasks</h3>
        <p>Track feeding, walking and grooming.</p>
      </div>
      <div class="card" onclick="window.location.href='/add-vaccination.html'" style="cursor:pointer;">
        <h3>💉 Vaccinations</h3>
        <p>Keep vaccination records up to date.</p>
      </div>
      <div class="card" onclick="window.location.href='/add-reminder.html'" style="cursor:pointer;">
        <h3>🔔 Smart Reminders</h3>
        <p>Never miss important care activities.</p>
      </div>
      <div class="card" onclick="window.location.href='/health.html'" style="cursor:pointer;">
        <h3>🏥 Vet Information</h3>
        <p>Save clinic and doctor details.</p>
      </div>
      <div class="card" onclick="window.location.href='/health.html'" style="cursor:pointer;">
        <h3>📋 Medical History</h3>
        <p>Store medical records safely.</p>
      </div>
      <div class="card" onclick="window.location.href='/health.html'" style="cursor:pointer;">
        <h3>❤️ Health Log</h3>
        <p>Track weight and observations.</p>
      </div>
      <div class="card" onclick="window.location.href='/profile.html'" style="cursor:pointer;">
        <h3>📊 Health Dashboard</h3>
        <p>View your pet’s health summary.</p>
      </div>
      <div class="card" onclick="window.location.href='/add-lost-pet.html'" style="cursor:pointer;">
        <h3>📍 Lost Pet</h3>
        <p>Save last known location quickly.</p>
      </div>
      <div class="card" onclick="window.location.href='/breed-info.html'" style="cursor:pointer;">
        <h3>🐕 Breed Information</h3>
        <p>Learn about different pet breeds.</p>
      </div>
      <div class="card" onclick="window.location.href='/care.html'" style="cursor:pointer;">
        <h3>📚 Pet Care Guide</h3>
        <p>Feeding, grooming and safety tips.</p>
      </div>
      <div class="card" onclick="window.location.href='/medicine.html'" style="cursor:pointer;">
        <h3>💊 Medicines</h3>
        <p>Manage medicines and treatments.</p>
      </div>
      <div class="card" onclick="window.location.href='/ai-assistant.html'" style="cursor:pointer;">
        <h3>🤖 AI Assistant</h3>
        <p>Get smart pet-care suggestions.</p>
      </div>
    </div>
  </section>

  <!-- GALLERY -->
  <section class="pet-gallery">
    <h2>Meet Our Happy Pets</h2>
    <div class="gallery">
      <img src="/images/dog.jpg" alt="Dog">
      <img src="/images/petbanner.jpg" alt="Pets">
      <img src="/images/petcare.jpg" alt="Pet care">
    </div>
  </section>

  <!-- FOOTER -->
  <footer>
    <p>🐾 Pet Care Planner — Caring for pets made simple & joyful</p>
  </footer>
`;

// Event listeners
const loginBtn = document.querySelector("#loginBtn");
if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    window.location.href = "/login.html";
  });
}

const registerBtn = document.querySelector("#registerBtn");
if (registerBtn) {
  registerBtn.addEventListener("click", () => {
    window.location.href = "/login.html?mode=register";
  });
}

const logoutBtn = document.querySelector("#logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    logout();
  });
}

const startBtn = document.querySelector("#startBtn");
if (startBtn) {
  startBtn.addEventListener("click", () => {
    if (currentUser) {
      window.location.href = "/profile.html";
    } else {
      window.location.href = "/login.html?mode=register";
    }
  });
}