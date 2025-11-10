// Smooth scrolling for navigation links
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Smooth scroll to section
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", initSmoothScroll);

//Typing effect for About me
const titles = ["Web Developer. ", "Tech Learner. "];
const typingElement = document.querySelector(".type-effect");
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const current = titles[titleIndex];

  if (isDeleting) {
    typingElement.textContent = current.substring(0, charIndex--);
  } else {
    typingElement.textContent = current.substring(0, charIndex++);
  }

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    setTimeout(type, 1500); // pause at full text
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    titleIndex = (titleIndex + 1) % titles.length;
    setTimeout(type, 500);
  } else {
    setTimeout(type, isDeleting ? 100 : 150);
  }
}

window.onload = type;

// Handle the hover animation
function initSkillBarHover() {
  const skills = document.querySelectorAll(".skill");

  skills.forEach((skill) => {
    const skillLevel = skill.querySelector(".skill-level");
    const targetWidth =
      skillLevel.style.width ||
      getComputedStyle(skillLevel).getPropertyValue("--target-width");

    skill.addEventListener("mouseenter", function () {
      // Reset and restart animation
      skillLevel.style.animation = "none";
      skillLevel.style.width = "0";

      // Trigger reflow
      void skillLevel.offsetWidth;

      // Restart animation
      skillLevel.style.animation = `fillBar 1.5s ease-in-out forwards`;

      // Add hover effects
      skillLevel.style.transform = "translateY(-1px) scaleY(1.15)";
      skillLevel.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)";
      skillLevel.style.filter = "brightness(1.1) saturate(1.2)";
    });

    skill.addEventListener("mouseleave", function () {
      // Remove hover effects but keep the filled state
      skillLevel.style.transform = "";
      skillLevel.style.boxShadow = "";
      skillLevel.style.filter = "";
    });
  });
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", initSkillBarHover);

// Education roadmap scroll animation
function initRoadmapAnimation() {
  const roadmapSteps = document.querySelectorAll(".roadmap-step");
  const roadmap = document.querySelector(".roadmap");

  let animationTimeout;
  let isAnimating = false;

  // Set up transitions once
  roadmapSteps.forEach((step) => {
    step.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isAnimating) {
          isAnimating = true;

          // Clear any existing timeout to prevent multiple triggers
          clearTimeout(animationTimeout);

          // First, smoothly hide all steps
          roadmapSteps.forEach((step) => {
            step.style.opacity = "0";
            step.style.transform = "translateY(30px)";
          });

          // Wait for hide animation to complete before showing
          animationTimeout = setTimeout(() => {
            // Get all steps in reverse order (bottom to top)
            const steps = Array.from(roadmapSteps).reverse();

            // Animate each step with a delay
            steps.forEach((step, index) => {
              setTimeout(() => {
                step.style.opacity = "1";
                step.style.transform = "translateY(0)";

                // Reset animation flag when last step completes
                if (index === steps.length - 1) {
                  setTimeout(() => {
                    isAnimating = false;
                  }, 600);
                }
              }, index * 500); // 500ms delay between each step
            });
          }, 400); // Wait for hide animation to complete
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  observer.observe(roadmap);
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", initRoadmapAnimation);

// Certifications timeline scroll animation - Top to bottom sequence
function initCertificationsAnimation() {
  const timelineItems = document.querySelectorAll(".timeline-item");
  const timeline = document.querySelector(".timeline");

  let animationTimeout;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Clear any existing timeout to prevent multiple triggers
          clearTimeout(animationTimeout);

          // Hide all timeline items first
          timelineItems.forEach((item) => {
            item.style.opacity = "0";
            item.style.transform = "translateY(30px)";
          });

          // Small delay to ensure the hide transition is complete
          animationTimeout = setTimeout(() => {
            // Animate each step from top to bottom (normal order)
            timelineItems.forEach((item, index) => {
              setTimeout(() => {
                item.style.opacity = "1";
                item.style.transform = "translateY(0)";
              }, index * 500); // 400ms delay between each item
            });
          }, 50);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  observer.observe(timeline);
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", initCertificationsAnimation);

// Carousel functionality
document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".carousel-track");
  const cards = document.querySelectorAll(".project-card");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  let currentIndex = 0;
  const container = document.querySelector(".carousel-container");

  // Update carousel position
  function updateCarousel() {
    const cardWidth = container.offsetWidth;
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    updateButtonStates();
  }

  // Update button states (disable at ends)
  function updateButtonStates() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === cards.length - 1;

    // Optional: Add visual feedback for disabled state
    if (prevBtn.disabled) {
      prevBtn.style.opacity = "0.5";
      prevBtn.style.cursor = "not-allowed";
    } else {
      prevBtn.style.opacity = "1";
      prevBtn.style.cursor = "pointer";
    }

    if (nextBtn.disabled) {
      nextBtn.style.opacity = "0.5";
      nextBtn.style.cursor = "not-allowed";
    } else {
      nextBtn.style.opacity = "1";
      nextBtn.style.cursor = "pointer";
    }
  }

  // Next button click
  nextBtn.addEventListener("click", function () {
    if (currentIndex < cards.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  // Previous button click
  prevBtn.addEventListener("click", function () {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  // Update on window resize
  window.addEventListener("resize", updateCarousel);

  // Initialize
  updateCarousel();
});

// Poject Links
function handlePortflioWebsiteClick() {
  window.open("https://github.com/MphoInTech/portfolio-website", "_blank");
}
function handleFavoriteHobbyClick() {
  window.open(
    "https://github.com/MphoInTech/SheCodesProject2-My-favourite-hobby-",
    "_blank"
  );
}
function handleMovieFilterClick() {
  window.open("https://github.com/MphoInTech/movie-filter-js", "_blank");
}
function handleListItClick() {
  window.open("https://github.com/MphoInTech/MiniGroceryApp", "_blank");
}

//Contact buttons
function handleEmailClick() {
  const email = "dimakatsom0905@gmail.com";

  navigator.clipboard.writeText(email).then(() => {
    alert("Email copied to clipboard! 📧");
  });
}
function handleLinkedInClick() {
  window.open("https://www.linkedin.com/in/mpho-modise-b47b432a7/", "_blank");
}

function handleGitHubClick() {
  window.open("https://github.com/MphoInTech", "_blank");
}
