
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

$("#clearOut")?.addEventListener("click", clearOut);


function makeEditor(id, mode){

    const ed = ace.edit(id,{
        theme: "ace/theme/dracula",
        mode,
        tabSize: 4, 
        useSoftTabs: true,
        showPrintMargin: false,
        wrap: true
    }); 
    
    ed.commands.addCommand({
        name: "run",
        bindkey: {
            win: 'Ctrl-Enter',
            mac: 'Command-Enter'
        }, 
        exec(){runWeb(false);}
    });

    ed.commands.addCommand({
        name: "save",
        bindkey: {
            win: 'Ctrl-S',
            mac: 'Command-S'
        },
        exec(){saveProject();}
    })

    return ed
} 

const ed_html = makeEditor("ed_html", "ace/mode/html");
const ed_css = makeEditor("ed_css", "ace/mode/css");
const ed_js = makeEditor("ed_js", "ace/mode/javascript");

const TAB_ORDER  = ["html", "css", "js"];

const wraps = Object.fromEntries($$("#webEditors .editor-warp").map(w => [w.dataset.pane, w]));

const editors = {
    html: ed_html, 
    css: ed_css, 
    js: ed_js
}; 

function activePane(){
    const t = $("#webTabs .tab.active");
    return t ? t.dataset.pane : "html";

}

function showPane(name){
    TAB_ORDER.forEach(k => {
        if (wraps[k]){
            wraps[k].hidden = (k !== name);
        }
    })
    
    $$("#webTabs .tab").forEach(t =>{
        const on = t.dataset.pane === name;
        t.classList.toggle("active", on);
        t.setAttribute("aria-selected", on);
        t.tabIndex = on  ? 0 : -1;
    });

    requestAnimationFrame(() => {
        const ed = editors[name];
        if (ed && ed.resize) {
            ed.resize(true);
            ed.focus(); 
        
        }
    })
}

$("#webTabs")?.addEventListener("click", (e) => {
    const btn = e.target.closest(".tab");
    if (!btn){
        return;
    }
    showPane(btn.dataset.pane);
})

$("#webTabs")?.addEventListener("keydown", (e) =>{
    const idx = TAB_ORDER.indexOf(activePane());
    if (e.key === "ArrowLeft" || e.key === "ArrowRight"){
        const delta = e.key === "ArrowLeft" ? -1 : 1;
        showPane(TAB_ORDER[(idx+delta + TAB_ORDER.length) % TAB_ORDER.length]);
    }
})

showPane("html");

function buildwebSrcdoc(withTests=false) {
    const html = ed_html.getValue();
    const css = ed_css.getValue();
    const js = ed_js.getValue();

    const tests = ($("#testArea")?.value || "").trim();

    return `
        <!DOCTYPE html> 

        <html lang="en" dir="ltr">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">

                <style>
                    ${css}\n
                <style>
            </head>

            <body>
                
                ${html}

                <script>
                    try{
                        ${js}

                        ${withTests && tests ? `\n/* tests */\n${tests}` : ''}

                    } catch(e) {
                        console.error(e); 
                    }
                <\/script>

            </body>
    
        </html>
    `;   
}

function runWeb(withTests=false){
    preview.srcdoc = buildwebSrcdoc(withTests);
    log(withTests ? "Running tests..." : "Web preview updated.");
}

$("runweb")?.addEventListener("click", () => runWeb(false));

$("#runTests")?.addEventListener("click", () => runWeb(true));

$("#openPreview")?.addEventListener("click", () => {
    const src = buildwebSrcdoc(false); 

    const w = window.open("about:blank");

    w.document.open();
    w.document.write(src);
    w.document.close();
})

 