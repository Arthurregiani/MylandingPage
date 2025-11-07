import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Nome muito curto."),
  email: z.string().email("Email inválido."),
  message: z.string().min(10, "Conteúdo muito curto."),
});

export async function POST(request: Request) {
  try {
    const raw = await request.json();
    const payload = contactSchema.parse(raw);

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL_TO } =
      process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
      return NextResponse.json(
        { success: false, message: "Configuração de email ausente." },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: `Landing Page <${SMTP_USER}>`,
      to: CONTACT_EMAIL_TO ?? SMTP_USER,
      replyTo: payload.email,
      subject: `Novo contato: ${payload.name}`,
      text: `Nome: ${payload.name}\nEmail: ${payload.email}\nMensagem:\n${payload.message}`,
      html: `
        <p><strong>Nome:</strong> ${payload.name}</p>
        <p><strong>Email:</strong> ${payload.email}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${payload.message.replace(/\n/g, "<br />")}</p>
      `,
    });

    return NextResponse.json({ success: true, message: "Mensagem enviada." });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: error.issues[0]?.message ?? "Dados inválidos." },
        { status: 400 },
      );
    }

    console.error("Erro ao enviar contato", error);
    return NextResponse.json(
      { success: false, message: "Erro interno ao enviar sua mensagem." },
      { status: 500 },
    );
  }
}
