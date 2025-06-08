// ===== GLOBAL VARIABLES =====
let currentIndex = 0
const slideInterval = 4000
let autoSlideTimer

// ===== DOM CONTENT LOADED =====
document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation()
  initializeScrollEffects()
  initializeTimelineSlider()
  initializeBackToTop()
  initializeThemeToggle()
  initializeAOS()
  initializeSmoothScrolling()
  initializeTypingEffect()
})

// ===== NAVIGATION =====
function initializeNavigation() {
  const navbar = document.querySelector(".navbar")
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const navLinks = document.querySelector(".nav-links")

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Mobile menu toggle
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenuBtn.classList.toggle("active")
      navLinks.classList.toggle("active")
    })

    // Close mobile menu when clicking on links
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenuBtn.classList.remove("active")
        navLinks.classList.remove("active")
      })
    })
  }
}

// ===== TIMELINE SLIDER =====
function initializeTimelineSlider() {
  const points = document.querySelectorAll(".timeline-point")
  const cards = document.querySelectorAll(".education-card")
  const prevBtn = document.getElementById("prev-btn")
  const nextBtn = document.getElementById("next-btn")

  console.log("Found points:", points.length)
  console.log("Found cards:", cards.length)

  if (points.length === 0 || cards.length === 0) {
    console.warn("Timeline elements not found")
    return
  }

  function showSlide(index) {
    // Remove active class from all points and cards
    points.forEach((p) => p.classList.remove("active"))
    cards.forEach((c) => c.classList.remove("active"))

    // Add active class to current point and card
    if (points[index] && cards[index]) {
      points[index].classList.add("active")
      cards[index].classList.add("active")
    }
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % points.length
    showSlide(currentIndex)
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + points.length) % points.length
    showSlide(currentIndex)
  }

  function startAutoSlide() {
    autoSlideTimer = setInterval(nextSlide, slideInterval)
  }

  function stopAutoSlide() {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer)
    }
  }

  // Initialize first slide
  showSlide(currentIndex)

  // Start auto-slide
  startAutoSlide()

  // Manual navigation
  points.forEach((point, idx) => {
    point.addEventListener("click", () => {
      currentIndex = idx
      showSlide(currentIndex)
      stopAutoSlide()
      setTimeout(startAutoSlide, 5000) // Restart auto-slide after 5 seconds
    })
  })

  // Button controls
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide()
      stopAutoSlide()
      setTimeout(startAutoSlide, 5000)
    })
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide()
      stopAutoSlide()
      setTimeout(startAutoSlide, 5000)
    })
  }

  // Pause auto-slide on hover
  const timelineSlider = document.querySelector(".timeline-slider")
  if (timelineSlider) {
    timelineSlider.addEventListener("mouseenter", stopAutoSlide)
    timelineSlider.addEventListener("mouseleave", startAutoSlide)
  }
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
  // Parallax effect for hero section
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const hero = document.getElementById("hero")
    if (hero) {
      hero.style.transform = `translateY(${scrolled * 0.5}px)`
    }
  })

  // Scroll indicator click
  const scrollIndicator = document.querySelector(".scroll-indicator")
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      document.getElementById("about").scrollIntoView({
        behavior: "smooth",
      })
    })
  }
}

// ===== BACK TO TOP BUTTON =====
function initializeBackToTop() {
  const backToTop = document.querySelector(".back-to-top")

  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTop.classList.add("visible")
      } else {
        backToTop.classList.remove("visible")
      }
    })

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }
}

// ===== THEME TOGGLE =====
function initializeThemeToggle() {
  const themeToggle = document.querySelector(".theme-toggle")
  const body = document.body

  if (themeToggle) {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      body.classList.add("dark-mode")
      themeToggle.innerHTML = '<i class="ri-sun-line"></i>'
    }

    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode")

      if (body.classList.contains("dark-mode")) {
        themeToggle.innerHTML = '<i class="ri-sun-line"></i>'
        localStorage.setItem("theme", "dark")
      } else {
        themeToggle.innerHTML = '<i class="ri-moon-line"></i>'
        localStorage.setItem("theme", "light")
      }
    })
  }
}

// ===== AOS INITIALIZATION =====
function initializeAOS() {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    })
  }
}

// ===== SMOOTH SCROLLING =====
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// ===== FORM HANDLING =====
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector(".contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form data
      const formData = new FormData(this)
      const name = formData.get("name")
      const email = formData.get("_replyto")
      const message = formData.get("message")

      // Basic validation
      if (!name || !email || !message) {
        alert("Please fill in all fields")
        return
      }

      // Show loading state
      const submitBtn = this.querySelector('button[type="submit"]')
      const originalText = submitBtn.innerHTML
      submitBtn.innerHTML = '<i class="ri-loader-4-line"></i> Sending...'
      submitBtn.disabled = true

      // Simulate form submission (replace with actual form handling)
      setTimeout(() => {
        alert("Thank you for your message! I'll get back to you soon.")
        this.reset()
        submitBtn.innerHTML = originalText
        submitBtn.disabled = false
      }, 2000)
    })
  }
})

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate")
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(".skill-item, .project-card, .experience-card")
  animateElements.forEach((el) => observer.observe(el))
})

// ===== TYPING EFFECT FOR HERO TEXT =====
function initializeTypingEffect() {
  const subtitle = document.querySelector(".subtitle")
  if (subtitle) {
    const text = subtitle.textContent
    subtitle.textContent = ""

    let i = 0
    const typeWriter = () => {
      if (i < text.length) {
        subtitle.textContent += text.charAt(i)
        i++
        setTimeout(typeWriter, 50)
      }
    }

    setTimeout(typeWriter, 1000)
  }
}

// ===== SKILL ITEM HOVER EFFECTS =====
document.addEventListener("DOMContentLoaded", () => {
  const skillItems = document.querySelectorAll(".skill-item")

  skillItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.style.transform = "translateY(-10px) scale(1.05)"
    })

    item.addEventListener("mouseleave", () => {
      item.style.transform = "translateY(0) scale(1)"
    })
  })
})

// ===== PROJECT CARD INTERACTIONS =====
document.addEventListener("DOMContentLoaded", () => {
  const projectCards = document.querySelectorAll(".project-card")

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px)"
      card.style.boxShadow = "0 20px 40px rgba(0, 180, 219, 0.4)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)"
      card.style.boxShadow = "0 5px 25px rgba(0, 0, 0, 0.2)"
    })
  })
})

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
  // Scroll handling code here
}, 10)

window.addEventListener("scroll", debouncedScrollHandler)
