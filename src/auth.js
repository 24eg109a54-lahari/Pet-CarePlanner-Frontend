// Clean up any legacy passwords from localStorage to prevent exposure in DevTools / Inspect
try {
  localStorage.removeItem("userPassword");
} catch (e) {
  // ignore
}

export function getCurrentUser() {
  const loggedIn = localStorage.getItem("loggedIn") === "true";
  if (!loggedIn) return null;
  return {
    id: localStorage.getItem("userId") || "",
    name: localStorage.getItem("userName") || "",
    email: localStorage.getItem("userEmail") || "",
  };
}

export function logout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userPassword");
  window.location.href = "/index.html";
}

// Register a new user via backend API
export async function registerUser({ name, email, password }) {
  // Wipe any legacy password key from local storage
  localStorage.removeItem("userPassword");

  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }
  return data;
}

// Log in an existing user via backend API
export async function loginUser({ email, password }) {
  // Wipe any legacy password key from local storage
  localStorage.removeItem("userPassword");

  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Invalid email or password");
  }

  // Store only non-sensitive session flags (NO PASSWORD)
  localStorage.setItem("loggedIn", "true");
  if (data.user) {
    localStorage.setItem("userId", data.user.id || "");
    localStorage.setItem("userName", data.user.name || "");
    localStorage.setItem("userEmail", data.user.email || "");
  }
  return data;
}