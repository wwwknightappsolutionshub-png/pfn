/**
 * Downloads local placeholder JPEGs into public/images.
 * Run: node scripts/fetch-placeholders.mjs
 */
import fs from "fs";
import path from "path";

const root = path.join(process.cwd(), "public", "images");

const files = [
  {
    out: "placeholders/portrait.jpg",
    url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1200&q=80",
  },
  {
    out: "placeholders/article.jpg",
    url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
  },
  {
    out: "placeholders/testimonial.jpg",
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
  },
  {
    out: "placeholders/event.jpg",
    url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
  },
  {
    out: "journey/learn.jpg",
    url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=80",
  },
  {
    out: "journey/apply.jpg",
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80",
  },
  {
    out: "journey/grow.jpg",
    url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&q=80",
  },
  {
    out: "journey/influence.jpg",
    url: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=900&q=80",
  },
  {
    out: "journey/impact.jpg",
    url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&q=80",
  },
];

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  console.log("✓", path.relative(root, dest));
}

for (const { out, url } of files) {
  await download(url, path.join(root, out));
}

console.log("Placeholder images ready in public/images/");
