
document.addEventListener("DOMContentLoaded", () => {
  // GLOBAL INITIALIZATION
  // 1. Initialize Lenis (Smooth Scroll)
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
  });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // 2. Register GSAP Plugins
  gsap.registerPlugin(ScrollTrigger);

  // 3. Custom Cursor Logic (Unified) - Initializes the yellow dot follower
  initCustomCursor();

  // =========================================
  // PAGE SPECIFIC INITIALIZATIONS
  // =========================================
  if (document.getElementById("hero") && document.querySelector(".magnet-btn")) {
    // Home Page specific animations like Hero tilt and Stats counting
    initHomePage();
  }

  if (document.getElementById("story") || document.getElementById("timeline-wrapper")) {
    initAboutPage();
  }

  if (document.getElementById("feature-grid")) {
    initFeaturesPage();
  }

  if (document.querySelector(".reveal-hidden")) {
    initPricingPage();
  }

  // Blog Details
  if (document.getElementById("post-content")) {
    initBlogDetails();
  }
});

// =========================================
// CUSTOM CURSOR FUNCTION - Handles mouse movement and hover states for the custom cursor
// =========================================
function initCustomCursor() {
  const cursorDot = document.querySelector(".cursor-dot") || document.querySelector("[data-cursor-dot]");
  const cursorOutline = document.querySelector(".cursor-outline") || document.querySelector("[data-cursor-outline]");

  if (!cursorDot || !cursorOutline) return;

  const hoverElements = document.querySelectorAll("a, button, summary, .magnet-btn, [data-cursor='hover']");

  let mouseX = 0;
  let mouseY = 0;
  let outlineX = 0;
  let outlineY = 0;

  // Initial opacity
  cursorDot.style.opacity = 0;
  cursorOutline.style.opacity = 0;

  // Show cursor on first mouse move
  document.addEventListener("mousemove", (e) => {
    if (cursorDot.style.opacity === "0" || cursorDot.style.opacity === "") {
      cursorDot.style.opacity = 1;
      cursorOutline.style.opacity = 0.5;
    }
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Dot follows instantly
    cursorDot.style.top = `${mouseY}px`;
    cursorDot.style.left = `${mouseX}px`;
  });

  // Smooth follow for outline
  function animateCursor() {
    let distX = mouseX - outlineX;
    let distY = mouseY - outlineY;

    outlineX += distX * 0.15;
    outlineY += distY * 0.15;

    cursorOutline.style.top = `${outlineY}px`;
    cursorOutline.style.left = `${outlineX}px`;

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover Effects
  hoverElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursorOutline.classList.add("cursor-hover");
      // Optional: Add specific class if defined
      if (el.classList.contains("magnet-btn")) {
        // Magnet logic could verify here, but simple hover is often enough
      }
    });
    el.addEventListener("mouseleave", () => {
      cursorOutline.classList.remove("cursor-hover");
    });
  });

  // Hide on leave window
  document.addEventListener("mouseout", (e) => {
    if (!e.relatedTarget && !e.toElement) {
      cursorDot.style.opacity = 0;
      cursorOutline.style.opacity = 0;
    }
  });
  document.addEventListener("mouseover", (e) => {
    cursorDot.style.opacity = 1;
    if (!cursorOutline.classList.contains("cursor-hover")) {
      cursorOutline.style.opacity = 0.5;
    }
  });
}


// =========================================
// HOME PAGE LOGIC - GSAP animations for Hero, Stats, Devices, orbit, and Modules
// =========================================
function initHomePage() {
  // --- HERO ANIMATIONS ---
  const heroSection = document.getElementById("hero");
  if (heroSection) {
    heroSection.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      gsap.to(".parallax-bg", {
        x: x * 2,
        y: y * 2,
        duration: 1,
        ease: "power1.out",
      });
      gsap.to(".tilt-card", {
        rotationY: x,
        rotationX: -y,
        duration: 0.5,
        ease: "power1.out",
      });
    });
  }

  // Hero Text Reveal
  const heroLines = document.querySelectorAll(".hero-line");
  gsap.from(heroLines, {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power4.out",
    delay: 0.2
  });

  gsap.from(".hero-elem", {
    y: 20,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    delay: 0.8,
    ease: "power2.out"
  });

  // Dashboard Float
  gsap.to("#hero-dashboard", {
    y: 0,
    opacity: 1,
    duration: 1.5,
    delay: 0.5,
    ease: "power3.out"
  });
  gsap.to(".animate-float", {
    y: -20,
    duration: 3,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut"
  });

  // --- COUNT UP STATS ---
  const stats = document.querySelectorAll(".count-up");
  stats.forEach(stat => {
    let target = parseInt(stat.getAttribute("data-target"));
    let suffix = stat.getAttribute("data-suffix");
    gsap.to(stat, {
      innerHTML: target,
      duration: 2,
      scrollTrigger: { trigger: stat, start: "top 85%" },
      snap: { innerHTML: 1 },
      onUpdate: function () {
        this.targets()[0].innerHTML = Math.ceil(this.targets()[0].innerHTML) + suffix;
      }
    });
  });

  // --- PINNING ---
  let deviceTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".device-section",
      start: "top top",
      end: "+=1500",
      scrub: 1,
      pin: true,
    },
  });
  deviceTl
    .from("#device-laptop", { scale: 0.8, y: 50 }, 0)
    .to("#device-tablet", { left: "-40px", opacity: 1, rotation: -5 }, 0.2)
    .to("#device-mobile", { right: "-20px", opacity: 1, rotation: 5 }, 0.4);

  // --- ORBIT ---
  gsap.to(".orbit-item", {
    y: -15,
    duration: 2,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
    stagger: { each: 0.5, from: "random" },
  });

  // --- MODULES & AUDIENCE SPLIT ---
  gsap.from(".module-card", {
    scrollTrigger: {
      trigger: "#modules-grid",
      start: "top 85%",
      end: "top 40%",
      scrub: 1,
    },
    y: 200,
    scale: 0.5,
    opacity: 0,
    rotation: (i) => (i % 2 === 0 ? -15 : 15),
    x: (i) => {
      if (window.innerWidth > 1024) return i < 2 ? 300 : -300;
      return 0;
    },
    stagger: 0.1,
  });

  // Reveal Text Helper
  gsap.utils.toArray(".reveal-text").forEach(text => {
    gsap.from(text, {
      y: 30,
      opacity: 0,
      duration: 1,
      scrollTrigger: { trigger: text, start: "top 85%" }
    });
  });

  // --- DARK FEATURE (NOW LIGHT) ---
  gsap.from(".feature-card-1", {
    scrollTrigger: {
      trigger: "#dark-features",
      start: "top 60%",
      scrub: 1,
    },
    y: 100,
    rotation: -10,
  });
  gsap.from(".feature-card-2", {
    scrollTrigger: {
      trigger: "#dark-features",
      start: "top 60%",
      scrub: 1,
    },
    y: 200,
    rotation: 10,
  });
  gsap.to(".feature-item", {
    scrollTrigger: { trigger: "#feature-list", start: "top 70%" },
    x: 0,
    opacity: 1,
    stagger: 0.2,
    duration: 0.8,
  });

  // --- INTEGRATION ---
  let flowTl = gsap.timeline({
    scrollTrigger: { trigger: "#integration", start: "top 60%" },
  });
  flowTl
    .to(".flow-line", {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "power2.inOut",
    })
    .from(
      ".flow-node",
      { scale: 0, opacity: 0, stagger: 0.2, ease: "back.out(1.5)" },
      "-=1"
    )
    .from(
      ".flow-center",
      { scale: 0, opacity: 0, duration: 0.5, ease: "back.out(1.5)" },
      "-=0.5"
    )
    .to(".check-item", { x: 0, opacity: 1, stagger: 0.1 }, "-=0.5");

  // Orbit Hover Effect Y
  gsap.to(".animate-hover-y", {
    y: -15,
    duration: 3,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut"
  });
  // --- AUDIENCE SPLIT ANIMATION ---
  gsap.from(".audience-card", {
    scrollTrigger: {
      trigger: "#audience-grid",
      start: "top 85%",
      end: "top 40%",
      scrub: 1,
    },
    y: 200,
    scale: 0.5,
    opacity: 0,
    rotation: (i) => (i % 2 === 0 ? 10 : -10),
    x: (i) => {
      if (window.innerWidth > 768) {
        if (i === 0) return 300;
        if (i === 2) return -300;
      }
      return 0;
    },
  });

  // --- CTA ---
  gsap.to(".cta-btns", {
    scrollTrigger: { trigger: ".cta-btns", start: "top 90%" },
    y: 0,
    opacity: 1,
    duration: 0.8,
  });
}

// Global Video Toggle (Needs to be window accessible) - Controls the video modal overlay
window.toggleVideoModal = function (show) {
  const modal = document.getElementById("video-modal");
  const panel = document.getElementById("modal-panel");
  const video = document.getElementById("local-video");

  // Need to access lenis instance from global scope or re-select
  // Since lenis is defined in DOMContentLoaded, we can't access it here easily unless we attach it to window
  // For now, we'll try to just control overflow.

  if (show) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    video.currentTime = 0;
    video.play();
    gsap.to(panel, { scale: 1, opacity: 1, duration: 0.3 });
    document.body.style.overflow = "hidden";
  } else {
    gsap.to(panel, {
      scale: 0.9,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
        video.pause();
        document.body.style.overflow = "auto";
      },
    });
  }
};


// =========================================
// ABOUT PAGE LOGIC - Animations for Timeline, Stats, and Spotlight cards
// =========================================
function initAboutPage() {
  // --- HERO ANIMATIONS ---
  const heroSection = document.getElementById("hero");
  heroSection.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    gsap.to(".parallax-blob", {
      x: x * 2,
      y: y * 2,
      duration: 1,
      ease: "power1.out",
    });
    gsap.to(".gsap-image-reveal", {
      rotationY: x,
      rotationX: -y,
      duration: 0.5,
      ease: "power1.out",
    });
  });

  const chars = document.querySelectorAll(".char");
  gsap.to(chars, {
    y: 0,
    stagger: 0.05,
    delay: 0.2,
    duration: 0.8,
    ease: "back.out(1.7)",
  });
  gsap.from(".gsap-fade-up", {
    y: 30,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    delay: 0.6,
    ease: "power2.out",
  });
  gsap.from(".image-mask", {
    clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
    duration: 1.5,
    delay: 0.5,
    ease: "power4.inOut",
  });
  gsap.to(".image-mask", {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
    duration: 1.5,
    delay: 0.5,
    ease: "power4.inOut",
  });
  gsap.from(".image-scale", {
    scale: 1.5,
    duration: 1.5,
    delay: 0.5,
    ease: "power2.out",
  });

  // --- STATS COUNTING ---
  gsap.utils.toArray(".stat-box").forEach((box, i) => {
    gsap.from(box, {
      scrollTrigger: { trigger: box, start: "top 85%" },
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.1,
      ease: "back.out(1.2)",
    });
    const counter = box.querySelector(".counter");
    if (counter) {
      let target = parseInt(counter.getAttribute("data-val"));
      gsap.to(counter, {
        innerHTML: target,
        duration: 2,
        snap: { innerHTML: 1 },
        scrollTrigger: { trigger: box, start: "top 85%" },
      });
    }
  });

  // --- TIMELINE BEAM ANIMATION ---
  gsap.to(".beam-progress", {
    height: "100%",
    ease: "none",
    scrollTrigger: {
      trigger: "#timeline-wrapper",
      start: "top center",
      end: "bottom center",
      scrub: 0.5,
    },
  });

  const timelineItems = document.querySelectorAll(".timeline-item");
  timelineItems.forEach((item, index) => {
    const isLeft = index % 2 === 0;
    const content = item.querySelector(
      isLeft ? ".timeline-content-left" : ".timeline-content-right"
    );
    const text = item.querySelector(
      isLeft ? ".timeline-text-right" : ".timeline-text-left"
    );
    const dot = item.querySelector(".timeline-dot");

    gsap.fromTo(
      dot,
      { scale: 0, borderColor: "#e5e7eb" },
      {
        scale: 1,
        borderColor: "#EAB308",
        scrollTrigger: { trigger: item, start: "top 60%" },
        duration: 0.5,
        ease: "back.out(2)",
      }
    );
    gsap.from(content, {
      x: isLeft ? -50 : 50,
      opacity: 0,
      scrollTrigger: { trigger: item, start: "top 70%" },
      duration: 0.8,
      ease: "power2.out",
    });
    gsap.from(text, {
      x: isLeft ? 50 : -50,
      opacity: 0,
      scrollTrigger: { trigger: item, start: "top 70%" },
      duration: 0.8,
      ease: "power2.out",
      delay: 0.2,
    });
  });

  // --- SPOTLIGHT CARD + SPLIT ANIMATION ---
  const cardsContainer = document.getElementById("cards-container");
  const cards = document.querySelectorAll(".spotlight-card");

  // Spotlight Mouse Effect
  cardsContainer.addEventListener("mousemove", (e) => {
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    }
  });

  // DECK SPLIT ANIMATION
  gsap.from(cards, {
    scrollTrigger: {
      trigger: "#why-choose",
      start: "top 80%",
      end: "bottom 40%",
      scrub: 3,
    },
    y: 200,
    opacity: 0,
    scale: 0.5,
    rotation: (i) => (i % 2 === 0 ? -15 : 15),
    x: (i) => {
      if (window.innerWidth > 768) {
        if (i === 0) return 300;
        if (i === 1 || i === 2) return -300;
      }
      return 0;
    },
    stagger: 0.1,
    ease: "power2.out",
  });

  // --- CTA REVEAL ---
  gsap.from(".cta-reveal", {
    y: 30,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    scrollTrigger: { trigger: ".cta-reveal", start: "top 80%" },
    ease: "power2.out",
  });
}


// =========================================
// FEATURES PAGE LOGIC - GSAP tilt effects for cards and grid explosions
// =========================================
function initFeaturesPage() {
  // Hero
  const chars = document.querySelectorAll(".char");
  gsap.to(chars, {
    y: 0,
    stagger: 0.05,
    duration: 0.8,
    ease: "back.out(1.7)",
    delay: 0.2,
  });
  gsap.from(".gsap-fade-up", {
    y: 30,
    opacity: 0,
    stagger: 0.15,
    duration: 1,
    ease: "power2.out",
    delay: 0.6,
  });

  // 3D Tilt
  function setupTilt(containerId, cardClass) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const card = container.querySelector(cardClass);
    if (!card) return;

    container.addEventListener("mousemove", (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;
      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        duration: 0.5,
        ease: "power1.out",
      });
    });
    container.addEventListener("mouseleave", () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: "power1.out",
      });
    });
  }
  setupTilt("lending-card-container", ".holo-card");
  setupTilt("repledge-card-container", ".holo-card");

  // Scroll Triggers
  gsap.utils.toArray(".gsap-fade-right").forEach((el) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: "top 80%" },
      x: -30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  });
  gsap.utils.toArray(".gsap-fade-left").forEach((el) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: "top 80%" },
      x: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  });
  gsap.from(".gsap-fade-up-item", {
    scrollTrigger: { trigger: "#repledge", start: "top 70%" },
    y: 30,
    opacity: 0,
    stagger: 0.1,
    duration: 0.8,
    ease: "back.out(1.2)",
  });
  ScrollTrigger.create({
    trigger: ".chart-bar",
    start: "top 80%",
    onEnter: () => {
      document.querySelectorAll(".chart-bar").forEach((bar) => {
        const h = bar.getAttribute("data-height");
        gsap.to(bar, {
          height: h,
          duration: 1.5,
          ease: "power4.out",
          stagger: 0.1,
        });
      });
    },
  });

  // --- GRID EXPLOSION ANIMATION (SMOOTH & SLOW) ---
  gsap.set(".feature-grid-item", {
    opacity: 0,
    scale: 0.5,
    y: 100,
    x: (i) => (i % 2 === 0 ? -100 : 100) + Math.random() * 40,
    rotation: (i) => Math.random() * 30 - 15,
  });

  gsap.to(".feature-grid-item", {
    scrollTrigger: {
      trigger: "#feature-grid",
      start: "top 85%",
      end: "bottom 50%",
      scrub: 3,
    },
    x: 0,
    y: 0,
    rotation: 0,
    scale: 1,
    opacity: 1,
    stagger: 0.05,
    ease: "back.out(1.7)",
  });
}


// =========================================
// PRICING PAGE LOGIC - Intersection Observer for reveal on scroll animations
// =========================================
function initPricingPage() {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("reveal-hidden");
        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elements = document.querySelectorAll(".reveal-hidden");
  elements.forEach((el) => observer.observe(el));

  // FAQ Logic via details element is handled natively by browser, mostly. 
  // But animation for rotating arrow is CSS.
}


// =========================================
// BLOG DETAILS PAGE LOGIC - Fetches post data by ID from URL and populates the view
// =========================================
function initBlogDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = parseInt(urlParams.get("id"));
  // Ensure blogPosts is available (loaded from blog-data.js)
  const post = typeof blogPosts !== "undefined" ? blogPosts.find((p) => p.id === postId) : null;

  if (post) {
    document.title = `${post.title} - FinGold Blog`;
    document.getElementById("post-title").innerText = post.title;
    document.getElementById("post-category").innerText = post.category;
    document.getElementById("post-date").innerText = post.date;
    document.getElementById("post-image").src = post.image;
    document.getElementById("post-content").innerHTML = post.content;

    if (post.category.toLowerCase().includes("tamil")) {
      document.getElementById("post-title").classList.add("font-tamil");
      document.getElementById("post-content").classList.add("font-tamil");
    }
  } else {
    console.log("Blog data not loaded or ID invalid");
  }
}
