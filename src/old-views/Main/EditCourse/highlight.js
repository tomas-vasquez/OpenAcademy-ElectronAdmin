import highlight from "highlight.js/lib/core.js";
import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/monokai-sublime.css";

window.hljs = highlight;
window.hljs.registerLanguage("javascript", javascript);
