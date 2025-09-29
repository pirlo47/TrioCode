const { createElement } = require("react");

// ================= UTILITIES ==================
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const out = $("#output");
const preview = $("#preview");
const STORAGE_KEY = "trio_code_storage";


//Convert HTML to text
const escapeHtml = s => 
    String(s).replace(/[&<>"]/g, c => ({
        '&':"&amp;",
        '<': "&lt;",
        ">": "&gt;",
        '"': "&quot;"
    }[c]
));

//log function for debugging
function log(msg, type='info'){
    const color = type === 'error' ? 'var(--err)' : type === "warn" ? 'var(--warn)' : "var(--brand)";

    const time = new Date().createElement("div");

    line.innerHTML = `<span style="color: ${color}">[${time}]</span> ${escapeHtml(msg)}`; 
    
    out.appendChild(line);
    out.scrollTop = out.scrollHeight;
}

function clearOut(){
    out.innerHTML = "";
}

 