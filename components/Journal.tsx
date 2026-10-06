"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Reveal, LineReveal, Arrow } from "@/components/Motion";
import { JOURNAL, JOURNAL_TOPICS } from "@/lib/content";

/**
 * Inspiration — styling ideas, fabric notes, trends and guides.
 *
 * Deliberately NOT the reference's flat three-up grid. The first result is
 * promoted to a wide FEATURE card and the rest fall into a quieter grid
 * beneath it, which gives the section a reading order instead of three equal
 * shouts — and it degrades on its own when a topic filter leaves only one or
 * two entries, because the feature is simply "whatever is first".
 */
export function Journal({ index }: { index?: string }) {
  const [topic, setTopic] = useState(JOURNAL_TOPICS[0]);

  const posts = useMemo(
    () =>
      topic === JOURNAL_TOPICS[0]
        ? JOURNAL.posts
        : JOURNAL.posts.filter((p) => p.topic === topic),
    [topic]
  );

  return (
    <section className="sect sect--ivory journal" data-nav-tone="light">
      <div className="shell">
        <div className="journal__head">
          <div>
            <Reveal as="p" dir="fade" className="shead__index">
              {index ?? JOURNAL.eyebrow}
            </Reveal>
            <LineReveal
              as="h2"
              className="journal__title tt"
              step={0.1}
              /* Two explicit lines, not one that wraps: left to itself the
                 heading broke after "live" and orphaned "in." on a line of
                 its own. */
              lines={[
                JOURNAL.titleLines[0],
                <em key="em">{JOURNAL.titleEm}</em>,
              ]}
            />
          </div>
          <Reveal as="p" dir="up" className="journal__lead" delay={0.1}>
            {JOURNAL.lead}
          </Reveal>
        </div>

        {/* Topic filter. A real <button> set rather than a tab list: these
            filter a grid in place, they do not switch panels, so tab
            semantics would promise keyboard behaviour that is not there. */}
        <Reveal className="journal__topics" dir="up" delay={0.14}>
          {JOURNAL_TOPICS.map((t) => (
            <button
              key={t}
              type="button"
              className="journal__topic"
              data-on={t === topic || undefined}
              aria-pressed={t === topic}
              onClick={() => setTopic(t)}
            >
              {t}
            </button>
          ))}
        </Reveal>

        {/* key on the topic so the cards re-run their reveal when the filter
            changes — without it the grid swaps content silently and the
            section reads as if nothing happened. */}
        {/* tabIndex + role: this is a scrollable region whose children are not
            focusable (the cards are not links yet), so without it a keyboard
            user cannot reach the cards past the third. */}
        <div
          className="journal__rail"
          key={topic}
          tabIndex={0}
          role="group"
          aria-label={`${JOURNAL.eyebrow} — ${posts.length} ${
            posts.length === 1 ? "article" : "articles"
          }, scroll for more`}
        >
          {posts.map((p, i) => (
            /* Stagger runs across the row, the way the rail is read. */
            <Card key={p.id} post={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({
  post,
  i,
}: {
  post: (typeof JOURNAL.posts)[number];
  i: number;
}) {
  /* A card is only a link once a real article URL exists. Until then it is an
     <article>, and the "Read article" affordance is withheld rather than
     pointed at a 404 — see the note on `href` in lib/content.ts. */
  const Tag = post.href ? "a" : "article";

  /* NOT <Reveal>. The reveal engine observes [data-reveal] nodes once, when it
     mounts; the filter creates new nodes afterwards, which are never observed
     and so sit at opacity 0 for ever. Measured: one click on any topic and
     every card went data-inview=null, opacity 0, permanently.
     A CSS animation keyed off mount has no such dependency — the same fix the
     store-locator pins needed, for the same reason. */
  return (
    <Tag
      className="journal__card"
      style={{ "--i": i } as React.CSSProperties}
      {...(post.href ? { href: post.href, "data-cursor": "Read" } : {})}
    >
      <span className="journal__shot">
        <Image
          src={post.image.src}
          alt={post.image.alt}
          width={907}
          height={1319}
          sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 31vw"
          loading="lazy"
          unoptimized
        />
      </span>

      <span className="journal__body">
        <span className="journal__meta">
          <b>{post.topic}</b>
          <i>{post.read}</i>
        </span>
        <h3 className="journal__cardTitle">{post.title}</h3>
        <p className="journal__excerpt">{post.excerpt}</p>
        {post.href && (
          <span className="journal__more">
            Read article
            <Arrow />
          </span>
        )}
      </span>
    </Tag>
  );
}
