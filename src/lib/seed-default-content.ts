/**
 * Default site copy previously hardcoded in components and global schema defaults.
 * Used by seed-data.ts to populate the CMS on first run.
 */

export const SEED_HOMEPAGE = {
  cinematicHeadline: "Belonging to God gives you an edge in life.",
  cinematicSubheadline: "Learn how to make it count.",
  heroMissionSlide: {
    kicker: "148Inspirations",
    panelTitle: "Godly wisdom. Profitable life.",
    panelBody:
      "A Christian mission teaching how to live with excellence in every sphere — rooted in Scripture and proven in experience.",
    highlights: [
      { label: "Weekly", value: "Wisdom Snippets" },
      { label: "Monthly", value: "School of Wisdom" },
      { label: "Mission", value: "1 Tim. 4:7–8" },
    ],
  },
  heroPillarsSlide: {
    kicker: "Wisdom for everyday living",
    title: "Six pillars. One integrated life in Christ.",
    description:
      "Practical teaching across relationships, business, finance, career, health, and spiritual growth — connected, intentional, and transformative.",
    panelTitle: "The constellation of wisdom",
    panelBody:
      "Each area of life informs the others. 148Inspirations helps you apply godly principles with clarity and confidence.",
    pillarLabels: [
      { label: "Relationships" },
      { label: "Business" },
      { label: "Finance" },
      { label: "Career" },
      { label: "Health" },
      { label: "Spiritual Growth" },
    ],
  },
  heroGatherSlide: {
    kicker: "Join the journey",
    title: "Learn. Apply. Grow. Influence. Impact.",
    description:
      "Every Monday — Wisdom Snippets. Third Friday monthly — School of Wisdom. Step into a community pursuing godliness with purpose.",
    panelTitle: "Led by Peter Olusanjo",
    panelBody:
      "Speaker, teacher, and scholar — equipping believers to flourish with academic rigour and pastoral depth.",
    quote:
      "Train yourself to be godly. For physical training is of some value, but godliness has value for all things.",
    quoteCitation: "1 Timothy 4:7–8",
  },
  heroRightImages: {
    missionAlt: "Teaching and wisdom",
    pillarsAlt: "Wisdom for everyday living",
    gatherAlt: "Peter Olusanjo",
  },
  wisdomSectionTitle: "Wisdom for Everyday Living",
  wisdomSectionSubtitle:
    "Practical wisdom woven across every dimension of life — connected, intentional, and transformative.",
  wisdomSectionCtaLabel: "Listen to Peter",
  constellationTopics: [
    { label: "Relationships" },
    { label: "Business" },
    { label: "Finance" },
    { label: "Career" },
    { label: "Health" },
    { label: "Spiritual Growth" },
  ],
  wisdomConstellationHoverImageAlt: "Peter Olusanjo",
  journeySectionTitle: "The Wisdom Journey",
  journeySteps: [
    {
      label: "Learn",
      description: "Receive timeless wisdom rooted in Scripture.",
    },
    {
      label: "Apply",
      description: "Put truth into practice in daily decisions.",
    },
    {
      label: "Grow",
      description: "Develop character, competence, and conviction.",
    },
    {
      label: "Influence",
      description: "Lead others through exemplary living.",
    },
    {
      label: "Impact",
      description: "Advance Kingdom purposes in your sphere.",
    },
  ],
  journeyStepImages: {
    learnAlt: "Learn",
    applyAlt: "Apply",
    growAlt: "Grow",
    influenceAlt: "Influence",
    impactAlt: "Impact",
  },
  featuredTeachingsTitle: "Featured Teachings",
  featuredTeachingsHeroImageAlt: "Featured teaching",
  eventsSectionTitle: "Upcoming Events",
  ctaTitle: "Join Wisdom Snippets",
  ctaDescription:
    "Every Monday, receive practical wisdom for relationships, business, finance, career, health, and spiritual growth.",
  ctaButtonLabel: "Subscribe to Wisdom Snippets",
  testimonialsSectionLabel: "Voices of Transformation",
  testimonialsSectionTitle: "What people are saying",
  videosSectionTitle: "From the Teaching Channel",
  videosSectionSubtitle:
    "Watch practical wisdom on relationships, business, finance, and spiritual growth.",
} as const;

export const SEED_SITE_SETTINGS = {
  siteName: "148Inspirations",
  tagline: "Godly wisdom for a profitable life",
  footerDescription:
    "A Christian mission dedicated to teaching how to live a godly and profitable life — wisdom for everyday living.",
  footerScripture: "1 Timothy 4:7–8",
  contactEmail: "hello@profitableliving.network",
  newsletterEnabled: true,
  seo: {
    defaultTitle: "148Inspirations",
    defaultDescription: "Teaching how to live a godly and profitable life.",
    keywords: "Christian wisdom, Peter Olusanjo, mentoring, 148Inspirations",
  },
} as const;

export const SEED_ABOUT_PAGE = {
  heroKicker: "148Inspirations",
  heroTitle: "Peter Olusanjo",
  scriptureReference: "1 Timothy 4:7–8",
  biographySectionLabel: "Biography",
  ministriesSectionLabel: "Ministries",
  speakingMinistryTitle: "Speaking Ministry",
  teachingMinistryTitle: "Teaching Ministry",
  academicProfileTitle: "Academic Profile",
  academicJourneyTitle: "Academic Journey",
  academicJourneySubtitle:
    "Four milestones of scholarship in service of faithful, practical teaching.",
  missionStatement: [
    "148Inspirations is a Christian mission dedicated to teaching how to live a godly and profitable life — disciplining ourselves for godliness, for it holds promise for the present life and also for the life to come.",
  ],
  biography: [
    "Peter Olusanjo leads 148Inspirations with a commitment to excellence, spiritual depth, and practical wisdom. His teaching integrates rigorous scholarship with lived faith — equipping individuals to flourish in relationships, business, finance, career, health, and spiritual growth.",
  ],
  speakingMinistry: [
    "Inspiring audiences with biblical wisdom and practical insight for transformation.",
  ],
  teachingMinistry: [
    "Equipping believers through Wisdom Snippets, School of Wisdom, and published resources.",
  ],
  academicProfile: [
    "A scholar whose credentials reflect intellectual rigour in service of Kingdom impact.",
  ],
  credentials: [
    {
      title: "First Class Honours",
      institution: "Obafemi Awolowo University",
      detail: "Undergraduate excellence",
    },
    {
      title: "MA with Distinction",
      institution: "SOAS University of London",
      detail: "Graduate studies",
    },
    {
      title: "PhD",
      institution: "University of Nottingham",
      detail: "Doctoral research",
    },
    {
      title: "Research & Teaching",
      institution: "International ministry",
      detail: "Scholarship in practice",
    },
  ],
} as const;

export const SEED_SERVICES_PAGE = {
  heroKicker: "Services",
  heroTitle: "Wisdom applied with excellence",
  heroDescription:
    "Partner with 148Inspirations for mentoring, consultancy, conferences, and speaking — each engagement designed for transformation and Kingdom impact.",
  heroImageAlt: "Services",
} as const;

export const SEED_CONTACT_PAGE = {
  leftKicker: "Contact",
  leftTitle: "Let's connect",
  leftDescription:
    "Speaking invitations, consultancy inquiries, life mentoring, and event registrations — we welcome your message.",
  inquiryTopics: [
    { topic: "Speaking Invitations" },
    { topic: "Consultancy Inquiries" },
    { topic: "Life Mentoring" },
    { topic: "General Contact" },
  ],
  rightKicker: "Inquiry",
  rightTitle: "Send a message",
  rightDescription:
    "Complete the form and our team will respond as soon as possible.",
} as const;

export const SEED_EVENTS_PAGE = {
  heroKicker: "Events",
  heroTitle: "Gather for wisdom",
  heroDescription:
    "Join Wisdom Snippets every Monday, School of Wisdom monthly, and special gatherings designed for growth, fellowship, and Kingdom impact.",
} as const;

export const SEED_RESOURCES_PAGE = {
  heroKicker: "Knowledge Hub",
  heroTitle: "Resources",
  heroDescription:
    "Explore teachings, archives, and downloads — filter and search to find wisdom for your journey.",
  youtubeSectionLabel: "YouTube Channel",
  youtubeSectionTitle: "Video teachings",
  youtubeSectionSubtitle:
    "Browse Wisdom Snippets and teachings from Peter Olusanjo on YouTube. Swipe on mobile or move your cursor on desktop to scroll through the library.",
  libraryKicker: "Library",
  libraryTitle: "Articles & downloads",
} as const;
