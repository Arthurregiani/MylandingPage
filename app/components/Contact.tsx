"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";

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
      setFeedback("Preencha todos os campos antes de enviar.");
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
      setFeedback("Mensagem enviada! Retornarei em breve.");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("error");
      setFeedback(
        "Não foi possível enviar agora. Tente novamente em instantes.",
      );
    }
  };

  return (
    <section className="mx-auto mt-24 w-full max-w-5xl px-4 sm:px-10 lg:px-16">
      <motion.div
        className="grid gap-8 rounded-[32px] border border-white/5 bg-[#073642]/45 p-8 text-[#839496] shadow-2xl backdrop-blur-3xl md:grid-cols-[1fr_1.2fr]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.4em] text-[#93a1a1]">
            Contato
          </p>
          <h2 className="text-3xl font-semibold text-[#eee8d5]">
            Vamos conversar sobre desenvolvimento, backend ou cafés especiais.
          </h2>
          <p>
            O formulário dispara um e-mail direto para minha caixa principal. Pode mandar dúvidas, oportunidades ou só um oi.
          </p>
          <div className="text-xs uppercase tracking-[0.4em] text-[#2aa198]">
            Café Fresco → Ideia Bruta → Produto Vivo
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm text-[#93a1a1]" htmlFor="name">
              Nome
            </label>
            <Input
              id="name"
              value={form.name}
              onChange={(event) => handleChange("name", event.target.value)}
              placeholder="Como posso te chamar?"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-[#93a1a1]" htmlFor="email">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(event) => handleChange("email", event.target.value)}
              placeholder="nome@empresa.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-[#93a1a1]" htmlFor="message">
              Mensagem
            </label>
            <Textarea
              id="message"
              rows={5}
              value={form.message}
              onChange={(event) => handleChange("message", event.target.value)}
              placeholder="Conte a ideia, contexto e onde posso ajudar."
              required
            />
          </div>

          <div className="flex flex-col gap-3">
            <Button type="submit" disabled={status === "loading"} variant="vivid">
              {status === "loading" ? "Enviando..." : "Enviar mensagem"}
            </Button>
            {feedback && (
              <p
                className={`text-sm ${
                  status === "success" ? "text-[#2aa198]" : "text-[#dc322f]"
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
