# 📦 nextjs-web-vitals

A Core Web Vitals (CWV) validator for Next.js projects, compatible with both App Router and Pages Router. Automatically scans all pages or single page and outputs a JSON report with detailed performance metrics.

---


## Features
✅ Automatically detects all pages in a Next.js project.

✅ Works with both Next.js App Router and Pages Router.

✅ Outputs a detailed JSON report of Core Web Vitals 
- Performance scorecore
- Accessibility score
- Best Practices score
- SEO score
- LCP
- FID
- CLS
- TBT
- FCP

✅ Integrates seamlessly with npm run build.

✅ Supports local development testing with configurable throttling.

✅ CLI-based tool: easy to run on any environment.

✅ Optional mobile and desktop emulation for accurate results.


## Installation:
```bash
npm install nextjs-web-vitals
```

## Usage
```bash
npx cwv-validator
```

------------------------------------------

## ✅ Advance Usage of Modes

Full site scan	
```
BASE_URL=https://www.example.com npx cwv-validator
```

Single page scan
```
PAGE_URL=https://www.example.com/about npx cwv-validator
```

Desktop mode scan
```
BASE_URL=https://www.example.com MODE=desktop npx cwv-validator
```

------------------------------------------

## Example output:

```bash
🔍 Found 4 pages: [ '/about', '/contact', '/index', '/login' ]
🚀 Analyzing http://localhost:3000/about...
✅ LCP: 1.8s, FID: 12ms, CLS: 0.02
...
📄 Report saved to cwv-report.json
```


## Report Output:
cwv-report.json

------------------------------------------

## Integrate with npm run build

```bash
{
  "scripts": {
    "build": "next build",
    "postbuild": "npx cwv-validator"
  }
}
```
This will automatically generate a CWV report after each build.

------------------------------------------

## JSON Output

```bash
[
  {
    "url": "https://www.example.com/about",
    "performance": 79,
    "accessibility": 92,
    "bestPractices": 83,
    "seo": 96,
    "lcp": "3.7 s",
    "cls": "0.021",
    "tbt": "390 ms",
    "fcp": "1.1 s",
    "speedIndex": "3.3 s"
  }
]
```

------------------------------------------

## Contribution
Contributions are welcome! Feel free to open issues or pull requests.

------------------------------------------

Made with ❤️ for Next.js developers.

------------------------------------------

## 👤 Author

**Neetesh Keshari [Engineering Manager]**

- GitHub: [https://github.com/neeteshkeshari](https://github.com/neeteshkeshari)
- Website: [https://linktr.ee/neeteshkeshari](https://linktr.ee/neeteshkeshari)
- LinkedIn: [https://www.linkedin.com/in/neeteshkeshari/](https://www.linkedin.com/in/neeteshkeshari/)