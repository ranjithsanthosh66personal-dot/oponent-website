// Array of blog post objects used to populate the blog details page dynamically
const blogPosts = [
  {
    id: 1,
    title: "Understanding New HUID Regulations",
    category: "Regulation",
    date: "Oct 12, 2024",
    image: "assets/images/blog_tamil.jpg",
    content: `
      <p class="mb-4">The Bureau of Indian Standards (BIS) has made HUID (Hallmark Unique Identification) mandatory for all gold jewelry. This 6-digit alphanumeric code ensures traceability and purity.</p>
      <h3 class="text-2xl font-bold text-slate-900 mt-8 mb-4">What Retailers Need to Know</h3>
      <p class="mb-4">As a jeweler, you can no longer sell pieces with just the old 4-symbol hallmark. You must declare your old stock and get it hallmarked with the new HUID code.</p>
      <ul class="list-disc ml-6 mb-6 space-y-2">
        <li>Old stock must be declared immediately.</li>
        <li>HUID allows customers to verify purity via the BIS Care App.</li>
        <li>Software like FinGold can auto-generate HUID reports for audits.</li>
      </ul>
      <p>Failure to comply can result in heavy penalties and seizure of stock.</p>
    `,
  },
  {
    id: 2,
    title: "Why Digital Invoicing is Mandatory?",
    category: "Technology",
    date: "Nov 05, 2024",
    image: "assets/images/blog_tamil.jpg",
    content: `
      <p class="mb-4">With GST compliance becoming stricter every year, manual billing is no longer just inefficient—it’s risky. Digital invoicing ensures you stay compliant and avoid penalties.</p>
      <h3 class="text-2xl font-bold text-slate-900 mt-8 mb-4">The Risk of Manual Bills</h3>
      <p class="mb-4">Handwritten bills are prone to errors, calculation mistakes, and can be easily lost or damaged. In the event of a tax audit, digital records are your best defense.</p>
      <h3 class="text-2xl font-bold text-slate-900 mt-8 mb-4">Benefits of Cloud ERP</h3>
      <p class="mb-4"> switching to a cloud-based system like FinGold not only helps with GST filing but also provides real-time insights into your business performance.</p>
      <ul class="list-disc ml-6 mb-6 space-y-2">
        <li>Automatic GST calculation.</li>
        <li>Secure cloud storage of all records.</li>
        <li>Instant generation of e-way bills.</li>
      </ul>
    `,
  },
  {
    id: 3,
    title: "Gold Market Trends for 2025",
    category: "Market",
    date: "Dec 01, 2024",
    image: "assets/images/blog_tamil.jpg",
    content: `
      <p class="mb-4">As we approach 2025, the gold market is showing signs of significant volatility. Factors ranging from geopolitical tensions to interest rate changes are influencing prices.</p>
      <h3 class="text-2xl font-bold text-slate-900 mt-8 mb-4">Price Predictions</h3>
      <p class="mb-4">Analysts suggest that gold prices may see a steady increase in the first quarter of 2025, driven by central bank buying and retail demand.</p>
      <h3 class="text-2xl font-bold text-slate-900 mt-8 mb-4">Impact on Lending</h3>
      <p class="mb-4">For NBFCs and pawnbrokers, rising gold prices mean higher loan-to-value (LTV) ratios on existing pledges, which reduces risk. However, volatility requires more frequent re-valuation of assets.</p>
      <p>Stay ahead of the curve by using automated tools to track daily gold rates and adjust your lending rates accordingly.</p>
    `,
  },
];
