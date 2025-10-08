# 🌳 TrioCode — Browser-Based Code Editor

**TrioCode** is a lightweight, browser-based HTML/CSS/JavaScript code editor that provides an instant playground for web developers and learners. Write, run, test, and save web projects directly in the browser — no installation required.

## 🚀 Features

- Three independent editors powered by Ace Editor:
  - HTML tab
  - CSS tab
  - JavaScript tab
- Syntax highlighting, indentation, and theme support
- Keyboard shortcuts:
  - `Ctrl + Enter` → Run the project
  - `Ctrl + S` → Save the project as a JSON file
- Live preview rendered inside a sandboxed `<iframe>`
- Save and load projects as JSON; automatic session caching via `localStorage`
- Assignment and test script areas for classroom/tutorial use
- Color-coded output log with clear button

## 🧱 Project Structure

```
trio-code/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/ (optional)
```

## ⚙️ Setup & Usage

1. Clone or download:
```bash
git clone https://github.com/<your-username>/trio-code.git
cd trio-code
```

2. Open locally:
- Open `index.html` in your browser (no server required), or run a simple server:
```bash
python3 -m http.server 5050
# then visit http://localhost:5050
```

3. Start coding:
- Edit HTML, CSS, and JS in their tabs.
- Click **Run** to render the preview.
- Use **Open Preview** to view your app in a new window.

## 🧩 Example Test Project

HTML
```html
<h1>Hello TrioCode 👋</h1>
<p>Testing live preview functionality.</p>
<button id="clickMe">Click me!</button>
<div id="message"></div>
```

CSS
```css
body {
  background: #111;
  color: white;
  font-family: sans-serif;
  text-align: center;
}
button {
  padding: 10px 20px;
  background: #0078ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
```

JavaScript
```javascript
const btn = document.getElementById('clickMe');
const msg = document.getElementById('message');

btn.addEventListener('click', () => {
  msg.textContent = 'Button clicked 🎉';
  console.log('JS is running fine!');
});
```

## 💾 Saving & Loading Projects

- Save: Click Save → generates a `.json` file that includes HTML, CSS, JS, assignment, and test text.
- Load: Click Load and choose a previously saved `.json` file to restore a project.
- Auto-Save: Latest code is cached in `localStorage` and auto-loads on next open.

## 🔐 Sandbox & Security

Preview runs inside an `<iframe>` using a sandbox (e.g. `sandbox="allow-scripts allow-same-origin allow-modals allow-forms"`). Note that allowing both `allow-scripts` and `allow-same-origin` reduces sandbox restrictions — OK for local development, but consider removing `allow-same-origin` or hosting the preview on a separate origin for production/security.

## 🧑‍💻 Tech Stack

| Layer       | Technology                  |
|-------------|----------------------------|
| Frontend    | HTML5, CSS3, JavaScript    |
| Editor      | Ace Editor                 |
| Storage     | Browser localStorage, JSON |
| Sandbox     | `<iframe srcdoc>`          |

## 🧑‍🎓 Ideal Use Cases

- Web development learners & bootcamp students
- Teachers creating coding assignments
- Developers testing quick HTML/CSS/JS prototypes

## 🧑‍💻 Author

Developed by: Phehello Ntoahae  
Year: 2025

## 🪪 License

MIT License © 2025 Phehello Ntoahae

## 🌟 Acknowledgements

Thanks to Ace Editor and MDN Web Docs. Inspired by CodePen, JSFiddle, and Replit.