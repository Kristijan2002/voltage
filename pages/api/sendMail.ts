import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { to, subject, text } = req.body;

  try {
    // конфигурација на SMTP транспортер за Neoserv
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: true, // за 465 треба true, за 587 false
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // испраќање на емаил
    await transporter.sendMail({
      from: `"My App" <${process.env.MAIL_USER}>`, // од кој е-маил праќаш
      to, // примач
      subject, // наслов
      text, // текст
      // можеш и html: "<p>Hello <b>World</b></p>"
    });

    return res.status(200).json({ message: "Mail sent successfully 🚀" });
  } catch (error) {
    console.error("Mail error:", error);
    return res.status(500).json({ message: "Error sending mail" });
  }
}
