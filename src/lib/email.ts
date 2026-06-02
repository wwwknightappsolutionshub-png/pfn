import nodemailer from "nodemailer";

type ContactDoc = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  inquiryType?: string;
};

export async function sendContactNotification(doc: ContactDoc) {
  const notifyEmail = process.env.CONTACT_NOTIFY_EMAIL;
  if (!notifyEmail || !process.env.SMTP_HOST) {
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: notifyEmail,
    subject: `[PLN] New ${doc.inquiryType ?? "contact"} inquiry from ${doc.name}`,
    text: [
      `Name: ${doc.name}`,
      `Email: ${doc.email}`,
      `Phone: ${doc.phone || "—"}`,
      `Type: ${doc.inquiryType}`,
      "",
      doc.message,
    ].join("\n"),
  });
}
