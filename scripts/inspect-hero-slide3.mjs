import "dotenv/config";
import { getPayload } from "payload";
import config from "../payload.config.ts";
import { resolveHeroSlideImages } from "../src/lib/hero-images.ts";

const payload = await getPayload({ config });
const homepage = await payload.findGlobal({ slug: "homepage", depth: 2 });

console.log("heroRightImages raw:", JSON.stringify(homepage.heroRightImages, null, 2));

const heroImages = await resolveHeroSlideImages(homepage);
console.log("\nResolved gather (slide 3):", heroImages.gather);
console.log("Resolved mission:", heroImages.mission);
console.log("Resolved pillars:", heroImages.pillars);
