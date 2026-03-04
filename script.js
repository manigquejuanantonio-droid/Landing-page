let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
});

function animateBg() {
  currentX += (mouseX - currentX) * 0.05;
  currentY += (mouseY - currentY) * 0.05;

  const heroBg = document.querySelector(".hero-bg");
  if (heroBg) {
    heroBg.style.transform =
      `translate(${currentX}px, ${currentY}px) scale(1.05)`;
  }

  requestAnimationFrame(animateBg);
}

animateBg();

/* =========================
   Neon Text Animation
========================= */
const letters = document.querySelectorAll(".neon-text span");
let index = 0;

if (letters.length > 0) {
  setInterval(() => {
    letters.forEach((letter) => letter.classList.remove("off"));
    letters[index].classList.add("off");

    index++;
    if (index >= letters.length) index = 0;
  }, 700);
}

/* =========================
   Pause Animation When Tab Hidden
========================= */
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    document.body.classList.add("paused");
  } else {
    document.body.classList.remove("paused");
  }
});

/* =========================
   Auth Modal Logic
========================= */
const openAuth = document.getElementById("openAuth");
const authOverlay = document.getElementById("authOverlay");
const toggleAuth = document.getElementById("toggleAuth");
const formTitle = document.getElementById("formTitle");
const confirmPassword = document.getElementById("confirmPassword");
const authForm = document.getElementById("authForm");

let isLogin = true;

if (openAuth && authOverlay) {
  openAuth.addEventListener("click", () => {
    authOverlay.classList.add("active");
  });

  authOverlay.addEventListener("click", (e) => {
    if (e.target === authOverlay) {
      authOverlay.classList.remove("active");
    }
  });
}

if (toggleAuth) {
  toggleAuth.addEventListener("click", () => {
    isLogin = !isLogin;
    formTitle.textContent = isLogin ? "Login" : "Sign Up";
    toggleAuth.textContent = isLogin ? "Sign up" : "Login";
    confirmPassword.hidden = isLogin;
  });
}

/* =========================
   Form Validation
========================= */
if (authForm) {
  authForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = authForm.querySelector('input[type="email"]');
    const password = authForm.querySelector(
      'input[type="password"]:not(#confirmPassword)'
    );
    const confirm = document.getElementById("confirmPassword");

    let isValid = true;

    // Clear previous errors
    document.querySelectorAll(".error-message").forEach((el) => el.remove());
    document.querySelectorAll("input").forEach((input) =>
      input.classList.remove("error")
    );

    function showError(input, message) {
      input.classList.add("error");

      const error = document.createElement("div");
      error.className = "error-message";
      error.textContent = message;

      input.parentNode.appendChild(error);
      isValid = false;
    }

    // Email validation
    if (!email.value.trim()) {
      showError(email, "Email is required.");
    } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
      showError(email, "Enter a valid email address.");
    }

    // Password validation
    if (!password.value.trim()) {
      showError(password, "Password is required.");
    } else if (password.value.length < 6) {
      showError(password, "Password must be at least 6 characters.");
    }

    // Confirm password (Sign Up only)
    if (!isLogin) {
      if (!confirm.value.trim()) {
        showError(confirm, "Please confirm your password.");
      } else if (confirm.value !== password.value) {
        showError(confirm, "Passwords do not match.");
      }
    }

    // If valid → redirect
    if (isValid) {
      window.location.href = "profile.html";
    }
  });
}

/* =========================
   Theme Toggle
========================= */
const themeToggle = document.getElementById("themeToggle");

// Apply saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  document.body.classList.add("light-mode");
  document.body.classList.remove("dark-mode");
  if (themeToggle) themeToggle.checked = true;
} else {
  document.body.classList.add("dark-mode");
}

if (themeToggle) {
  themeToggle.addEventListener("change", () => {
    if (themeToggle.checked) {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.remove("light-mode");
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    }
  });
}

/* =========================
   Settings Save Button
========================= */
const saveBtn = document.querySelector(".settings-card .cta");

if (saveBtn) {
  saveBtn.addEventListener("click", () => {
    alert("Preferences saved successfully.");
  });
}
