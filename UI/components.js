// This is the standard js file for header and footer, which can be called in all Html pages
// Created by : Ranjith Kumar
// Date       : 27/12/2025

document.addEventListener("DOMContentLoaded", function () {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  // --- 1. Navbar Component (Light Theme) - Sticky header with logo, navigation links, and mobile menu toggle
  const navbarHTML = `
    <nav class="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-stone-200 transition-all duration-300 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          
          <div class="flex-shrink-0 flex items-center gap-2 cursor-pointer" onclick="window.location.href='index.html'">
            <div class="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center text-white font-bold shadow-sm">F</div>
            <span class="text-2xl font-bold text-slate-900 tracking-tight">
              FinGold<span class="text-yellow-500">.</span>
            </span>
          </div>

          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-8">
              <a href="index.html" class="${isActive(
    "index.html"
  )} px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</a>
              <a href="about.html" class="${isActive(
    "about.html"
  )} px-3 py-2 rounded-md text-sm font-medium transition-colors">About</a>
              <a href="features.html" class="${isActive(
    "features.html"
  )} px-3 py-2 rounded-md text-sm font-medium transition-colors">Features</a>
              <a href="pricing.html" class="${isActive(
    "pricing.html"
  )} px-3 py-2 rounded-md text-sm font-medium transition-colors">Pricing</a>
              <a href="blog.html" class="${isActive(
    "blog.html"
  )} px-3 py-2 rounded-md text-sm font-medium transition-colors">Blog</a>
            </div>
          </div>

          <div class="hidden md:block">
            <a href="pricing.html" class="bg-slate-900 text-white font-bold py-2.5 px-6 rounded-full hover:bg-yellow-500 hover:text-slate-900 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
              Get Demo
            </a>
          </div>

          <div class="-mr-2 flex md:hidden">
            <button onclick="toggleMenu()" type="button" class="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-stone-100 focus:outline-none transition-colors">
              <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div id="mobile-menu" class="hidden md:hidden bg-white border-t border-stone-200 shadow-lg">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="index.html" class="text-slate-600 hover:text-yellow-600 hover:bg-stone-50 block px-3 py-2 rounded-md text-base font-medium">Home</a>
          <a href="features.html" class="text-slate-600 hover:text-yellow-600 hover:bg-stone-50 block px-3 py-2 rounded-md text-base font-medium">Features</a>
          <a href="pricing.html" class="text-slate-600 hover:text-yellow-600 hover:bg-stone-50 block px-3 py-2 rounded-md text-base font-medium">Pricing</a>
          <a href="blog.html" class="text-slate-600 hover:text-yellow-600 hover:bg-stone-50 block px-3 py-2 rounded-md text-base font-medium">Blog</a>
        </div>
      </div>
    </nav>
  `;

  // --- 2. Footer Component (Light Theme) - 4-column layout with links and contact info
  const footerHTML = `
    <footer class="bg-stone-100 text-slate-600 pt-16 pb-8 border-t border-stone-200 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div class="col-span-1 md:col-span-1">
            <div class="flex items-center gap-2 mb-4">
               <div class="w-6 h-6 bg-yellow-500 rounded flex items-center justify-center text-white text-xs font-bold">F</div>
               <span class="text-2xl font-bold text-slate-900">FinGold</span>
            </div>
            <p class="text-sm text-slate-500 leading-relaxed">The ultimate ERP solution designed specifically for gold merchants, jewelers, and pawn brokers.</p>
          </div>

          <div>
            <h3 class="text-slate-900 font-bold mb-4 uppercase text-xs tracking-wider">Product</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="features.html" class="hover:text-yellow-600 transition-colors">Features</a></li>
              <li><a href="pricing.html" class="hover:text-yellow-600 transition-colors">Pricing</a></li>
              <li><a href="#" class="hover:text-yellow-600 transition-colors">Integrations</a></li>
            </ul>
          </div>

          <div>
            <h3 class="text-slate-900 font-bold mb-4 uppercase text-xs tracking-wider">Company</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="about.html" class="hover:text-yellow-600 transition-colors">About Us</a></li>
              <li><a href="blog.html" class="hover:text-yellow-600 transition-colors">Blog</a></li>
              <li><a href="#" class="hover:text-yellow-600 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 class="text-slate-900 font-bold mb-4 uppercase text-xs tracking-wider">Contact</h3>
            <p class="text-sm mb-2 flex items-center gap-2">
                <svg class="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                support@fingold.in
            </p>
            <p class="text-sm flex items-center gap-2">
                <svg class="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                +91 98765 43210
            </p>
          </div>
        </div>

        <div class="border-t border-stone-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>&copy; 2025 FinGold SaaS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `;

  // Inject Components
  const headerEl = document.getElementById("app-header");
  const footerEl = document.getElementById("app-footer");

  if (headerEl) headerEl.innerHTML = navbarHTML;
  if (footerEl) footerEl.innerHTML = footerHTML;

  // Helper to highlight active link (Updated colors for light theme)
  // Uses yellow-600 for active state on white background
  function isActive(page) {
    if (page === "blog.html" && currentPath.includes("blog-details.html")) {
      return "text-yellow-600 font-bold";
    }
    return currentPath.includes(page)
      ? "text-yellow-600 font-bold"
      : "text-slate-600 hover:text-yellow-600";
  }
});

// Mobile Menu Toggle Logic - Controls visibility of the hamburger menu on small screens
function toggleMenu() {
  const menu = document.getElementById("mobile-menu");
  if (menu) {
    menu.classList.toggle("hidden");
  }
}
