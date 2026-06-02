import { AboutPageEditorial } from "@/components/about/about-page-editorial";
import { getAboutPage, getSiteSettings } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { getMediaUrlOrPlaceholder } from "@/lib/media";

export const metadata = buildMetadata({
  title: "About | Profitable Living Network",
  description:
    "Meet Peter Olusanjo and discover the mission of Profitable Living Network — teaching a godly and profitable life.",
  path: "/about",
});

export const revalidate = 120;

export default async function AboutPage() {
  const about = await getAboutPage();
  const settings = await getSiteSettings();

  return (
    <AboutPageEditorial
      portraitUrl={getMediaUrlOrPlaceholder(about?.portrait, "portrait")}
      credentials={about?.credentials}
      universityProfileUrl={settings?.universityProfileUrl}
    />
  );
}
