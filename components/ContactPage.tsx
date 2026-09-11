"use client";

import { useRef, useState } from "react";
import { MotionProvider, Marquee, Reveal, LineReveal, Arrow } from "@/components/Motion";
import { Preloader, Nav, Cursor, WhatsAppFab } from "@/components/Chrome";
import Footer from "@/components/Footer";
import { MARQUEE_WORDS, SITE } from "@/lib/content";
import {
  CONTACT_HEAD,
  CONTACT_DIRECT,
  CONTACT_OFFICES,
  CONTACT_FORM,
  CONTACT_MAP,
  CONTACT_SOCIAL,
  WHO_OPTIONS,
  mapsHref,
  normalisePhone,
} from "@/lib/contact";

/* ------------------------------------------------------------------
   Icons for the three direct lines. Inline rather than a sprite: there
   are three, they are a few lines each, and a request for them would
   cost more than the bytes it saves.
   ------------------------------------------------------------------ */
const ICONS = {
  mail: (
    <>
      <rect x="2.5" y="4.5" width="15" height="11" rx="1.6" />
      <path d="M3 5.5l7 5 7-5" />
    </>
  ),
  phone: (
    <path d="M7.2 3.2 8.6 6 7.1 7.6a9.4 9.4 0 0 0 5.3 5.3L14 11.4l2.8 1.4v3.1a1 1 0 0 1-1.1 1A13.6 13.6 0 0 1 3.1 4.3a1 1 0 0 1 1-1.1h3.1Z" />
  ),
  chat: (
    <path d="M17 9.6c0 3.4-3.1 6.1-7 6.1a8 8 0 0 1-2.3-.3L4 16.8l1.1-2.8A5.8 5.8 0 0 1 3 9.6c0-3.4 3.1-6.1 7-6.1s7 2.7 7 6.1Z" />
  ),
};

type Field = "name" | "phone" | "email" | "who";
type Errors = Partial<Record<Field, string>>;

/** Mirrors the server's rules in app/api/contact/route.ts. */
function validate(v: Record<Field, string>): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (v.phone.length !== 10) e.phone = "Enter a 10-digit number.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()))
    e.email = "Enter a valid email address.";
  if (!v.who) e.who = "Pick the one that fits.";
  return e;
}

function EnquiryForm() {
  const [values, setValues] = useState<Record<Field, string>>({
    name: "",
    phone: "",
    email: "",
    /* No option is pre-selected. The vendor's own form defaults to
       "End User", which quietly mislabels every store and architect who
       skips the question — so this asks instead of assuming. */
    who: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  /* Bot bait — see the honeypot check in the route handler. */
  const honeypot = useRef("");
  const doneRef = useRef<HTMLDivElement>(null);

  const set = (k: Field) => (value: string) => {
    setValues((v) => ({ ...v, [k]: value }));
    /* Clear a field's error as soon as it is touched: leaving it up while the
       visitor is fixing it reads as the fix not having worked. */
    setErrors((e) => (e[k] ? { ...e, [k]: undefined } : e));
  };

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    const found = validate(values);
    if (Object.keys(found).length) {
      setErrors(found);
      /* Send focus to the first problem rather than leaving the visitor to
         hunt for it. */
      const first = Object.keys(found)[0];
      document.querySelector<HTMLElement>('[data-field="' + first + '"]')?.focus();
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...values, company: honeypot.current }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
      if (!res.ok || !data?.ok) throw new Error("rejected");
      setState("sent");
      requestAnimationFrame(() => doneRef.current?.focus());
    } catch {
      setState("failed");
    }
  }

  if (state === "sent") {
    return (
      <div className="ct__done" ref={doneRef} tabIndex={-1}>
        <span className="ct__doneMark" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M4 12.5l5 5L20 6.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p>{CONTACT_FORM.success}</p>
      </div>
    );
  }

  return (
    <form className="ct__form" onSubmit={submit} noValidate>
      <Text
        id="ct-name"
        field="name"
        label="Your name"
        type="text"
        autoComplete="name"
        value={values.name}
        error={errors.name}
        onChange={set("name")}
      />
      <Text
        id="ct-phone"
        field="phone"
        label="Phone number"
        type="tel"
        autoComplete="tel-national"
        inputMode="numeric"
        value={values.phone}
        error={errors.phone}
        /* No maxLength — it counts raw characters, so it would cut a pasted
           "+91 86579 44323" to "+91 86579 " before this ever ran. The
           normaliser caps the digits instead. */
        onChange={(v) => set("phone")(normalisePhone(v))}
      />
      <Text
        id="ct-email"
        field="email"
        label="Email address"
        type="email"
        autoComplete="email"
        value={values.email}
        error={errors.email}
        onChange={set("email")}
      />

      <fieldset className="ct__who" aria-describedby={errors.who ? "ct-who-err" : undefined}>
        <legend>Who are you?</legend>
        <div className="ct__whoOpts">
          {WHO_OPTIONS.map((o, i) => (
            <label
              className="ct__whoOpt"
              key={o.value}
              data-on={values.who === o.value || undefined}
            >
              <input
                type="radio"
                name="who"
                value={o.value}
                checked={values.who === o.value}
                /* Only the first carries the focus target: arrow keys move
                   within a radio group, which is how one is meant to work. */
                data-field={i === 0 ? "who" : undefined}
                onChange={() => set("who")(o.value)}
              />
              <b>{o.label}</b>
              <span>{o.hint}</span>
            </label>
          ))}
        </div>
        {errors.who && (
          <p className="ct__err" id="ct-who-err">
            {errors.who}
          </p>
        )}
      </fieldset>

      {/* Honeypot. Moved off-screen rather than display:none — some bots skip
          undisplayed inputs, and none of them read the label. */}
      <div className="ct__trap" aria-hidden="true">
        <label htmlFor="ct-company">Company</label>
        <input
          id="ct-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          onChange={(e) => (honeypot.current = e.target.value)}
        />
      </div>

      <div className="ct__submit">
        <button className="btn btn--solid" type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : CONTACT_FORM.submit}
          <Arrow />
        </button>
        <p className="ct__note">{CONTACT_FORM.note}</p>
      </div>

      {/* One live region for the outcome, so a screen reader is told the
          result without focus being yanked mid-typing. */}
      <div className="ct__status" role="status" aria-live="polite">
        {state === "failed" && (
          <p className="ct__fail">
            {CONTACT_FORM.failure}{" "}
            <a href={"mailto:" + SITE.email}>{SITE.email}</a>
            {" · "}
            <a href={"tel:" + SITE.phone.replace(/[^\d+]/g, "")}>{SITE.phone}</a>
          </p>
        )}
      </div>
    </form>
  );
}

function Text({
  id,
  field,
  label,
  error,
  value,
  onChange,
  ...rest
}: {
  id: string;
  field: Field;
  label: string;
  error?: string;
  value: string;
  onChange: (v: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">) {
  return (
    <p className="ct__field">
      <input
        id={id}
        data-field={field}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? id + "-err" : undefined}
        /* A single space, not the label text: it keeps :placeholder-shown
           true only while the field is empty, which is what lets the label
           float on its own with no JS tracking the value. */
        placeholder=" "
        {...rest}
      />
      {/* After the input so the label can style off :focus and
          :placeholder-shown with a sibling selector. */}
      <label htmlFor={id}>{label}</label>
      {error && (
        <span className="ct__err" id={id + "-err"}>
          {error}
        </span>
      )}
    </p>
  );
}

export default function ContactPage() {
  return (
    <MotionProvider>
      <Preloader />
      <Cursor />
      <WhatsAppFab />
      <Nav />

      <main id="main">
        {/* ---------------- 01 — head + the three direct lines ---------------- */}
        <section className="sect sect--dark ct__hero" data-nav-tone="dark">
          <div className="shell ct__heroGrid">
            <div className="ct__heroCopy">
              <Reveal as="p" dir="fade" className="shead__index">
                {CONTACT_HEAD.eyebrow}
              </Reveal>
              <LineReveal
                as="h1"
                className="ct__title tt"
                step={0.1}
                lines={[CONTACT_HEAD.lines[0], <em key="em">{CONTACT_HEAD.lines[1]}</em>]}
              />
              <Reveal as="p" dir="up" className="ct__lead" delay={0.12}>
                {CONTACT_HEAD.lead}
              </Reveal>
            </div>

            <Reveal className="ct__direct" dir="right" delay={0.1}>
              <ul>
                {CONTACT_DIRECT.map((d) => (
                  <li key={d.label}>
                    <a
                      href={d.href}
                      {...(d.kind === "chat"
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      <span className="ct__directIcon" aria-hidden="true">
                        <svg
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {ICONS[d.kind]}
                        </svg>
                      </span>
                      <span className="ct__directText">
                        <b>{d.value}</b>
                        <span>
                          {d.label} · {d.note}
                        </span>
                      </span>
                      <Arrow className="ct__directArrow" />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ---------------- 02 — the enquiry and the offices ---------------- */}
        <section className="sect sect--ivory ct__main" data-nav-tone="light">
          <div className="shell ct__mainGrid">
            <Reveal className="ct__formWrap" dir="up">
              <p className="shead__index">{CONTACT_FORM.eyebrow}</p>
              <h2 className="ct__h2">{CONTACT_FORM.title}</h2>
              <EnquiryForm />
            </Reveal>

            <Reveal className="ct__aside" dir="up" delay={0.1}>
              <p className="shead__index">Our offices</p>
              <ul className="ct__offices">
                {CONTACT_OFFICES.map((o) => (
                  <li key={o.label}>
                    <h3>{o.label}</h3>
                    <address>
                      {o.lines.map((l) => (
                        <span key={l}>{l}</span>
                      ))}
                    </address>
                    <dl>
                      <dt>Email</dt>
                      <dd>
                        <a href={"mailto:" + o.email}>{o.email}</a>
                      </dd>
                      <dt>Phone</dt>
                      <dd>
                        <a href={"tel:" + o.phone.replace(/[^\d+]/g, "")}>{o.phone}</a>
                      </dd>
                    </dl>
                    <a
                      className="tlink"
                      href={mapsHref(o.search)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get directions
                      <Arrow />
                    </a>
                  </li>
                ))}
              </ul>

              <div className="ct__social">
                <p className="shead__index">Follow us</p>
                <ul>
                  {CONTACT_SOCIAL.map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------------- 03 — the map ---------------- */}
        <section className="sect sect--linen ct__mapSect" data-nav-tone="light">
          <div className="shell">
            <Reveal className="ct__mapCard" dir="fade">
              <iframe
                className="ct__mapFrame"
                src={CONTACT_MAP}
                title={
                  "Map showing the " +
                  SITE.legalName +
                  " corporate office in Wagle Industrial Estate, Thane West"
                }
                /* Lazy: the embed pulls a few hundred KB from Google and sits
                   below two full sections, so it should not compete with this
                   page's own first paint. */
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="ct__mapCaption">
                <p className="shead__index">Corporate Office</p>
                <address>{CONTACT_OFFICES[0].lines.join(" ")}</address>
                <a
                  className="tlink"
                  href={mapsHref(CONTACT_OFFICES[0].search)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Google Maps
                  <Arrow />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <div data-nav-tone="light">
          <Marquee items={MARQUEE_WORDS} duration={52} />
        </div>
      </main>

      <Footer />
    </MotionProvider>
  );
}
