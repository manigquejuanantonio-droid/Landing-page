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

  document.querySelector(".hero-bg").style.transform =
    `translate(${currentX}px, ${currentY}px) scale(1.05)`;

  requestAnimationFrame(animateBg);
}

animateBg();

setInterval(() => {
  letters.forEach((letter) => letter.classList.remove("off"));
  letters[index].classList.add("off");

  index++;
  if (index >= letters.length) index = 0;
}, 700);

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    document.body.classList.add("paused");
  } else {
    document.body.classList.remove("paused");
  }
});

const openAuth = document.getElementById("openAuth");
const authOverlay = document.getElementById("authOverlay");
const toggleAuth = document.getElementById("toggleAuth");
const formTitle = document.getElementById("formTitle");
const confirmPassword = document.getElementById("confirmPassword");

let isLogin = true;

openAuth.addEventListener("click", () => {
  authOverlay.classList.add("active");
});

authOverlay.addEventListener("click", (e) => {
  if (e.target === authOverlay) {
    authOverlay.classList.remove("active");
  }
});

toggleAuth.addEventListener("click", () => {
  isLogin = !isLogin;
  formTitle.textContent = isLogin ? "Login" : "Sign Up";
  toggleAuth.textContent = isLogin ? "Sign up" : "Login";
  confirmPassword.hidden = isLogin;
});
