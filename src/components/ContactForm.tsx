"use client";

import Link from "next/link";
import { useState } from "react";

const CONTACT_EMAIL = "learntechcontact@gmail.com";

/**
 * ContactForm — functional contact submission.
 *
 * The site is a static/edge deployment with no mail backend, so submissions
 * are delivered by opening the visitor's mail client with a pre-filled
 * message (mailto). This replaces the previous non-functional
 * `<form action="#" method="POST">` that silently did nothing.
 */
export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Systems Architecture Review");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subjectLine = encodeURIComponent(`[Contact] ${subject}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subjectLine}&body=${body}`;
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-semibold tracking-tight">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground transition-all focus:ring-2 focus:ring-primary focus:outline-none"
            placeholder="e.g. John Doe"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold tracking-tight">
            Business Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground transition-all focus:ring-2 focus:ring-primary focus:outline-none"
            placeholder="john@enterprise.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-semibold tracking-tight">
          Subject
        </label>
        <select
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="block w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
        >
          <option>Systems Architecture Review</option>
          <option>Android Kernel Optimization</option>
          <option>Windows Hardening Inquiry</option>
          <option>Other / General Inquiry</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-semibold tracking-tight">
          Project Requirements
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="block w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground transition-all focus:ring-2 focus:ring-primary focus:outline-none"
          placeholder="Describe your technical challenges or project scope..."
        />
      </div>

      {/* Mandatory Disclaimer for Google Ads/Privacy Compliance */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="privacy"
          required
          className="mt-1 h-4 w-4 rounded border-border"
        />
        <label htmlFor="privacy" className="text-xs text-muted-foreground leading-tight">
          I agree to the processing of my contact details for the purpose of this inquiry. Read
          our{" "}
          <Link href="/privacy-policy" className="text-primary hover:underline">
            Privacy Policy
          </Link>{" "}
          for details.
        </label>
      </div>

      <button
        type="submit"
        className="w-full sm:w-max flex justify-center rounded-lg bg-primary px-10 py-4 text-sm font-bold text-primary-foreground shadow-lg hover:bg-primary/90 transition-all active:scale-95"
      >
        Dispatch Message
      </button>
    </form>
  );
}
