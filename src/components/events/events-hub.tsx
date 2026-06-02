import { StreamingPlatforms } from "@/components/layout/streaming-platforms";

type Props = {
  streamingPlatforms?: { platform?: string | null; url: string }[] | null;
};

const recurring = [
  {
    title: "Wisdom Snippets",
    schedule: "Every Monday",
    type: "wisdom-snippets",
    description: "Weekly practical wisdom for everyday living.",
  },
  {
    title: "School of Wisdom",
    schedule: "Third Friday of each month",
    type: "school-of-wisdom",
    description: "Deeper teaching for growth and influence.",
  },
];

export function EventsHub({ streamingPlatforms }: Props) {
  return (
    <div>
      <StreamingPlatforms
        links={streamingPlatforms}
        className="mb-14"
        variant="light"
      />

      <div className="mb-16 grid gap-6 md:grid-cols-2">
        {recurring.map((r) => (
          <div
            key={r.type}
            className="rounded-2xl border border-pln-gold-on-light/30 bg-white p-8 shadow-[0_8px_28px_rgba(11,20,38,0.06)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-pln-gold-on-light">
              {r.schedule}
            </p>
            <h3 className="mt-3 font-display text-2xl font-semibold text-pln-section-light-heading">
              {r.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-pln-section-light-muted">
              {r.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
