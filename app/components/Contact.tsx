"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { useCopy } from "@/app/hooks/useCopy";

interface FormState {
  name: string;
  email: string;
  message: string;
}

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState<string>("");
  const { contact } = useCopy();

  const handleChange = (
    field: keyof FormState,
    value: string,
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");

    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      setFeedback(contact.feedback.missingFields);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Erro ao enviar mensagem");
      }

      setStatus("success");
      setFeedback(contact.feedback.success);
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("error");
      setFeedback(contact.feedback.error);
    }
  };

  return (
    <section className="mx-auto mt-24 w-full max-w-5xl px-4 sm:px-10 lg:px-16">
      <motion.div
        className="grid gap-8 rounded-[32px] border border-[color:var(--color-border-soft)] bg-[color:rgb(var(--color-surface-rgb))/0.45] p-8 text-[var(--color-text)] shadow-2xl backdrop-blur-3xl md:grid-cols-[1fr_1.2fr]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.4em] text-[var(--color-muted)]">
            {contact.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold text-[var(--color-heading)]">
            {contact.title}
          </h2>
          <p>{contact.description}</p>
          <div className="text-xs uppercase tracking-[0.4em] text-[var(--accent-cyan)]">
            {contact.mantra}
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm text-[var(--color-muted)]" htmlFor="name">
              {contact.labels.name}
            </label>
            <Input
              id="name"
              value={form.name}
              onChange={(event) => handleChange("name", event.target.value)}
              placeholder={contact.placeholders.name}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-[var(--color-muted)]" htmlFor="email">
              {contact.labels.email}
            </label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(event) => handleChange("email", event.target.value)}
              placeholder={contact.placeholders.email}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-[var(--color-muted)]" htmlFor="message">
              {contact.labels.message}
            </label>
            <Textarea
              id="message"
              rows={5}
              value={form.message}
              onChange={(event) => handleChange("message", event.target.value)}
              placeholder={contact.placeholders.message}
              required
            />
          </div>

          <div className="flex flex-col gap-3">
            <Button type="submit" disabled={status === "loading"} variant="cta">
              {status === "loading" ? contact.loading : contact.button}
            </Button>
            {feedback && (
              <p
                className={`text-sm ${
                  status === "success"
                    ? "text-[var(--accent-cyan)]"
                    : "text-[var(--accent-danger)]"
                }`}
              >
                {feedback}
              </p>
            )}
          </div>
        </form>
      </motion.div>
    </section>
  );
}
