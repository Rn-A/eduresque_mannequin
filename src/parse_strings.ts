import fs from "fs";

function run() {
  const list = JSON.parse(fs.readFileSync("src/all_js_strings.json", "utf-8"));
  
  // Look for strings containing Indonesian characters (e.g., lowercase silent spaces, typical words)
  const indonesianWords = [
    "dan", "yang", "dengan", "untuk", "pada", "adalah", "bisa", "akan", "dalam", "kami", 
    "alat", "fitur", "produk", "desa", "tim", "bantuan", "hidup", "dasar", "henti", "jantung", 
    "rjp", "cpr", "suara", "sensor", "manekin", "mannequin", "manikin", "edurescue", "ump",
    "universitas", "muhammadiyah", "purwokerto", "pelatihan", "instruktur", "materi"
  ];
  
  const results = list.filter((s: string) => {
    const lower = s.toLowerCase();
    
    // Check if it has lots of Javascript symbols
    if (s.includes("&&") || s.includes("||") || s.includes("===") || s.includes("=>") || s.includes("!=") || s.includes("dispatch") || s.includes("useState")) {
      return false;
    }
    
    return indonesianWords.some(w => lower.includes(w));
  });
  
  console.log(`Found ${results.length} potentials out of 905.`);
  fs.writeFileSync("src/indo_strings.json", JSON.stringify(results, null, 2));
  
  results.forEach((str: string, index: number) => {
    console.log(`[${index + 1}] ${str.substring(0, 120)}...`);
  });
}

run();
