document.addEventListener("DOMContentLoaded", function () {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  // --- 1. Navbar Component ---
  const navbarHTML = `
    <nav class="fixed top-0 w-full z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          
          <div class="flex-shrink-0 flex items-center gap-2 cursor-pointer" onclick="window.location.href='index.html'">
            <div class="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-700 rounded-lg flex items-center justify-center text-slate-900 font-bold">F</div>
            <span class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-500">
              FinGold
            </span>
          </div>

          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-8">
              <a href="index.html" class="${isActive('index.html')} hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</a>
              <a href="about.html" class="${isActive('about.html')} hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">About</a>
              <a href="features.html" class="${isActive('features.html')} hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Features</a>
              <a href="pricing.html" class="${isActive('pricing.html')} hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Pricing</a>
              <a href="blog.html" class="${isActive('blog.html')} hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Blog</a>
            </div>
          </div>

          <div class="hidden md:block">
            <a href="pricing.html" class="bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-900 font-bold py-2 px-6 rounded-full hover:shadow-[0_0_15px_rgba(234,179,8,0.5)] transition-all transform hover:-translate-y-0.5">
              Get Demo
            </a>
          </div>

          <div class="-mr-2 flex md:hidden">
            <button onclick="toggleMenu()" type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none">
              <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div id="mobile-menu" class="hidden md:hidden bg-slate-900 border-t border-slate-800">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="index.html" class="text-gray-300 hover:text-yellow-400 block px-3 py-2 rounded-md text-base font-medium">Home</a>
          <a href="features.html" class="text-gray-300 hover:text-yellow-400 block px-3 py-2 rounded-md text-base font-medium">Features</a>
          <a href="pricing.html" class="text-gray-300 hover:text-yellow-400 block px-3 py-2 rounded-md text-base font-medium">Pricing</a>
          <a href="blog.html" class="text-gray-300 hover:text-yellow-400 block px-3 py-2 rounded-md text-base font-medium">Blog</a>
        </div>
      </div>
    </nav>
  `;

  // --- 2. Footer Component ---
  const footerHTML = `
    <footer class="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div class="col-span-1 md:col-span-1">
            <span class="text-2xl font-bold text-white mb-4 block">FinGold</span>
            <p class="text-sm text-slate-400">The ultimate ERP solution designed specifically for gold merchants, jewelers, and pawn brokers.</p>
          </div>
          <div>
            <h3 class="text-white font-semibold mb-4">Product</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="features.html" class="hover:text-yellow-500 transition">Features</a></li>
              <li><a href="pricing.html" class="hover:text-yellow-500 transition">Pricing</a></li>
              <li><a href="#" class="hover:text-yellow-500 transition">Integrations</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-white font-semibold mb-4">Company</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="about.html" class="hover:text-yellow-500 transition">About Us</a></li>
              <li><a href="blog.html" class="hover:text-yellow-500 transition">Blog</a></li>
              <li><a href="#" class="hover:text-yellow-500 transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-white font-semibold mb-4">Contact</h3>
            <p class="text-sm mb-2">support@fingold.in</p>
            <p class="text-sm">+91 98765 43210</p>
            
          </div>
        </div>
        <div class="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
          &copy; 2025 FinGold SaaS. All rights reserved.
        </div>
      </div>
    </footer>
  `;

  // Inject Components
  document.getElementById("app-header").innerHTML = navbarHTML;
  document.getElementById("app-footer").innerHTML = footerHTML;

  // Helper to highlight active link
  function isActive(page) {
    return currentPath.includes(page) ? "text-yellow-400" : "text-gray-300";
  }
});

// Mobile Menu Toggle
function toggleMenu() {
  const menu = document.getElementById("mobile-menu");
  menu.classList.toggle("hidden");
}