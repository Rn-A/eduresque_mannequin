const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Backgrounds
content = content.replace(/bg-\[\#0B0F19\]/g, 'bg-slate-50');
content = content.replace(/bg-\[\#131B2F\]/g, 'bg-white');
content = content.replace(/bg-\[\#1A233A\]/g, 'bg-slate-50');

// Gradients
content = content.replace(/from-\[\#0B0F19\]/g, 'from-slate-50');
content = content.replace(/via-\[\#0B0F19\]/g, 'via-slate-50');
content = content.replace(/to-\[\#0B0F19\]/g, 'to-slate-50');
content = content.replace(/from-\[\#131B2F\]/g, 'from-white');

// Borders
content = content.replace(/border-slate-800/g, 'border-slate-200');
content = content.replace(/border-slate-700/g, 'border-slate-300');

// Text Colors
content = content.replace(/text-slate-300/g, 'text-slate-600');
content = content.replace(/text-slate-400/g, 'text-slate-500');

// We need to be careful with text-white. Replace it with text-slate-900 in specific contexts.
// Headings and spans that are not in buttons
content = content.replace(/text-white/g, 'text-slate-900');
// Revert text-slate-900 back to text-white for buttons, badges, and specific elements
content = content.replace(/bg-orange-600 text-slate-900/g, 'bg-orange-600 text-white');
content = content.replace(/bg-\[\#E1306C\] text-slate-900/g, 'bg-[#E1306C] text-white');
content = content.replace(/text-slate-900 px-4 py-1/g, 'text-white px-4 py-1'); // badge
content = content.replace(/text-slate-900 p-2/g, 'text-white p-2'); // icon button
content = content.replace(/hover:text-slate-900/g, 'hover:text-blue-600'); // hover links
content = content.replace(/text-slate-900 font-bold mb-2/g, 'text-slate-900 font-bold mb-2'); 
content = content.replace(/bg-slate-800 rounded-full flex items-center justify-center text-slate-900/g, 'bg-blue-100 rounded-full flex items-center justify-center text-blue-700'); // avatar
content = content.replace(/text-slate-900 font-medium text-right/g, 'text-slate-900 font-medium text-right');
content = content.replace(/text-slate-900 pr-4/g, 'text-slate-900 pr-4');
content = content.replace(/text-slate-900 block/g, 'text-slate-900 block');
content = content.replace(/text-slate-900 mb-6/g, 'text-slate-900 mb-6');
content = content.replace(/text-slate-900 mb-4/g, 'text-slate-900 mb-4');
content = content.replace(/text-slate-900 mb-3/g, 'text-slate-900 mb-3');
content = content.replace(/text-slate-900 mb-2/g, 'text-slate-900 mb-2');
content = content.replace(/text-slate-900 mt-4/g, 'text-slate-900 mt-4');
content = content.replace(/text-slate-900 text-center/g, 'text-slate-900 text-center');
content = content.replace(/text-slate-900 tracking-tight/g, 'text-slate-900 tracking-tight');
content = content.replace(/text-slate-900 shrink-0/g, 'text-white shrink-0'); // instagram button
content = content.replace(/text-slate-900"/g, 'text-slate-900"');
content = content.replace(/text-slate-900 flex/g, 'text-slate-900 flex');

// Fix specific buttons that got text-slate-900
content = content.replace(/bg-black\/50 hover:bg-black\/80 text-slate-900/g, 'bg-black/50 hover:bg-black/80 text-white');
content = content.replace(/bg-orange-600 hover:bg-orange-700 text-slate-900/g, 'bg-orange-600 hover:bg-orange-700 text-white');
content = content.replace(/bg-slate-800 hover:bg-slate-700 text-slate-900/g, 'bg-slate-100 hover:bg-slate-200 text-slate-900');

// Accents (Red to Orange/Blue)
content = content.replace(/text-red-600/g, 'text-orange-600');
content = content.replace(/text-red-500/g, 'text-orange-600');
content = content.replace(/bg-red-600/g, 'bg-orange-600');
content = content.replace(/hover:bg-red-700/g, 'hover:bg-orange-700');
content = content.replace(/bg-red-900\/30/g, 'bg-orange-100');
content = content.replace(/border-red-500\/30/g, 'border-orange-200');
content = content.replace(/border-red-500/g, 'border-orange-500');
content = content.replace(/bg-red-500/g, 'bg-orange-500');
content = content.replace(/selection:bg-red-500\/30/g, 'selection:bg-orange-500/30');

// Other adjustments for light theme
content = content.replace(/bg-white\/10/g, 'bg-white/80');
content = content.replace(/bg-white\/5/g, 'bg-white/60');
content = content.replace(/border-white\/20/g, 'border-slate-200');
content = content.replace(/bg-slate-800/g, 'bg-slate-100');
content = content.replace(/hover:bg-slate-800/g, 'hover:bg-slate-100');
content = content.replace(/hover:bg-slate-700/g, 'hover:bg-slate-200');
content = content.replace(/shadow-\[0_0_30px_rgba\(239,68,68,0\.15\)\]/g, 'shadow-[0_0_30px_rgba(249,115,22,0.15)]');

// Fix text-white in specific SVG icons
content = content.replace(/<svg className="w-5 h-5 text-slate-900"/g, '<svg className="w-5 h-5 text-slate-600"');
content = content.replace(/<CheckCircle2 className="w-4 h-4 text-slate-900"/g, '<CheckCircle2 className="w-4 h-4 text-orange-600"');

// Fix hero overlay
content = content.replace(/bg-blue-900\/40/g, 'bg-blue-900/10');

// Fix text-slate-900 in badges
content = content.replace(/bg-orange-600 text-slate-900/g, 'bg-orange-600 text-white');

fs.writeFileSync('src/App.tsx', content);
