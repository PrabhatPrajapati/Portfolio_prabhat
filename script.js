// ===== Typewriter Effect =====
const typewriterText = "Hi, I'm Prabhat Kumar, I build things for the web";
const typewriterElement = document.getElementById("typewriter");
let charIndex = 0;

function typeWriter() {
  if (charIndex < typewriterText.length) {
    typewriterElement.textContent += typewriterText.charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, 100);
  }
}

// Start typewriter on page load
window.addEventListener("load", () => {
  setTimeout(typeWriter, 500);
});

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById("navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

// ===== Mobile Menu Toggle =====
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const navLinks = document.querySelector(".nav-links");

mobileMenuToggle.addEventListener("click", () => {
  mobileMenuToggle.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenuToggle.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// ===== Marquee Duplication for Infinite Scroll =====
const marqueeContent = document.getElementById("marqueeContent");
const marqueeItems = marqueeContent.innerHTML;

// Duplicate content multiple times for seamless loop
marqueeContent.innerHTML = marqueeItems + marqueeItems + marqueeItems;

// ===== Smooth Scroll for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// ===== Project Cards Scroll Animation =====
const projectCards = document.querySelectorAll(".project-card");

function updateProjectCards() {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;

  projectCards.forEach((card, index) => {
    const cardTop = card.offsetTop;
    const cardHeight = card.offsetHeight;
    const scrollProgress =
      (scrollY - cardTop + windowHeight) / (windowHeight + cardHeight);

    // Scale effect based on scroll
    if (scrollProgress > 0 && scrollProgress < 1) {
      const scale = 0.95 + scrollProgress * 0.05;
      const opacity = 0.5 + scrollProgress * 0.5;
      card.style.transform = `scale(${Math.min(scale, 1)})`;
      card.style.opacity = Math.min(opacity, 1);
    }
  });
}

window.addEventListener("scroll", updateProjectCards);
window.addEventListener("load", updateProjectCards);

// ===== Magnetic Hover Effect for Footer Icons =====
const magneticIcons = document.querySelectorAll(".magnetic-icon");

magneticIcons.forEach((icon) => {
  icon.addEventListener("mousemove", (e) => {
    const rect = icon.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Limit movement to 15px
    const moveX = Math.max(-15, Math.min(15, x * 0.3));
    const moveY = Math.max(-15, Math.min(15, y * 0.3));

    icon.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });

  icon.addEventListener("mouseleave", () => {
    icon.style.transform = "translate(0, 0)";
  });
});

// ===== Intersection Observer for Fade-in Animations =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll(".tech-item, .project-card").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(el);
});

// ===== Parallax Effect for Hero Background =====
const gridBackground = document.querySelector(".grid-background");

window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  if (gridBackground) {
    gridBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// ===== Dynamic Cursor Effect (Optional Enhancement) =====
const cursor = document.createElement("div");
cursor.className = "custom-cursor";
document.body.appendChild(cursor);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  const speed = 0.15;
  cursorX += (mouseX - cursorX) * speed;
  cursorY += (mouseY - cursorY) * speed;

  cursor.style.left = cursorX + "px";
  cursor.style.top = cursorY + "px";

  requestAnimationFrame(animateCursor);
}

animateCursor();

// Add cursor styles dynamically
const cursorStyle = document.createElement("style");
cursorStyle.textContent = `
    .custom-cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid var(--accent-blue);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease, opacity 0.2s ease;
        opacity: 0.5;
    }
    
    @media (max-width: 968px) {
        .custom-cursor {
            display: none;
        }
    }
`;
document.head.appendChild(cursorStyle);

// Cursor interaction with clickable elements
document.querySelectorAll("a, button, .btn").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.style.transform = "scale(1.5)";
    cursor.style.opacity = "1";
  });

  el.addEventListener("mouseleave", () => {
    cursor.style.transform = "scale(1)";
    cursor.style.opacity = "0.5";
  });
});

// ===== Performance Optimization: Debounce Scroll Events =====
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll-heavy functions
const debouncedUpdateCards = debounce(updateProjectCards, 10);
window.addEventListener("scroll", debouncedUpdateCards);

// ===== Add Active State to Navigation Links =====
const sections = document.querySelectorAll("section[id]");

function highlightNavigation() {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");
    const navLink = document.querySelector(
      `.nav-links a[href="#${sectionId}"]`
    );

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLink?.classList.add("active");
    } else {
      navLink?.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", highlightNavigation);

// Add active class styles
const navActiveStyle = document.createElement("style");
navActiveStyle.textContent = `
    .nav-links a.active {
        color: var(--accent-blue);
    }
    
    .nav-links a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(navActiveStyle);

// ===== Console Easter Egg =====
console.log(
  "%c👋 Hey there, developer!",
  "font-size: 20px; font-weight: bold; color: #00d4ff;"
);
console.log(
  "%cLike what you see? Let's build something amazing together!",
  "font-size: 14px; color: #00ff88;"
);
console.log(
  "%c📧 Contact: hello@example.com",
  "font-size: 12px; color: #a0a0a0;"
);

// ===== Preload Performance =====
window.addEventListener("load", () => {
  // Remove any loading states
  document.body.classList.add("loaded");

  // Initialize all animations
  updateProjectCards();
  highlightNavigation();
});

// Add loaded class styles
const loadedStyle = document.createElement("style");
loadedStyle.textContent = `
    body:not(.loaded) {
        opacity: 0;
    }
    
    body.loaded {
        opacity: 1;
        transition: opacity 0.5s ease;
    }
`;
document.head.appendChild(loadedStyle);
