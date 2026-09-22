const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const ARTIFACT_DIR = "C:\\Users\\Acer\\.gemini\\antigravity\\brain\\f9a8d71e-4f8c-4b59-9b20-42c753c4ab64";
const DIRECTOR_DIR = "d:\\Director";

const CHAPTERS = [
  { id: "hero", name: "art_1_hero", title: "Chapter 1: Hero Prologue" },
  { id: "problem", name: "art_2_problem", title: "Chapter 2: Fragmented Problem" },
  { id: "connection", name: "art_3_connection", title: "Chapter 3: Synapse Connection" },
  { id: "understanding", name: "art_4_understanding", title: "Chapter 4: AI Cognition" },
  { id: "explore", name: "art_5_explore", title: "Chapter 5: Spatial Traversal" },
  { id: "grow", name: "art_6_grow", title: "Chapter 6: Synthesis & Growth" },
  { id: "finale", name: "art_7_finale", title: "Chapter 7: Epilogue Finale" }
];

async function capture() {
  console.log("Launching Edge with WebGL acceleration...");
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: "new",
    args: [
      "--enable-webgl",
      "--use-gl=angle",
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--window-size=1920,1080"
    ],
    defaultViewport: {
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1
    }
  });

  const page = await browser.newPage();
  console.log("Navigating to http://localhost:3000...");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 30000 });

  // Wait for 3D model and textures to load and compile
  console.log("Waiting for WebGL canvas and 3D avatar load...");
  await new Promise((r) => setTimeout(r, 4000));

  for (const chap of CHAPTERS) {
    console.log(`Scrolling to ${chap.id} (${chap.title})...`);
    await page.evaluate((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "instant", block: "center" });
      }
    }, chap.id);

    // Wait for camera lerp and spring animation to settle
    await new Promise((r) => setTimeout(r, 1800));

    const directorPath = path.join(DIRECTOR_DIR, `${chap.name}.png`);
    const artifactPath = path.join(ARTIFACT_DIR, `${chap.name}.png`);

    await page.screenshot({ path: directorPath, type: "png" });
    try {
      fs.copyFileSync(directorPath, artifactPath);
    } catch (e) {
      console.warn("Artifact copy warning:", e.message);
    }
    console.log(`Saved screenshot: ${chap.name}.png`);
  }

  await browser.close();
  console.log("All captures complete!");
}

capture().catch((err) => {
  console.error("Capture error:", err);
  process.exit(1);
});
