import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_APP_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      phone,
      email,
      serviceName,
      message,
    } = body;

    if (!name || !phone) {
      return NextResponse.json(
        {
          success: false,
          message: "Ad və telefon nömrəsi tələb olunur.",
        },
        { status: 400 }
      );
    }

    // Əgər .env-də ORDER_EMAIL təyin olunmayıbsa, birbaşa SMTP_EMAIL-ə göndərsin
    const recipientEmail = process.env.ORDER_EMAIL || process.env.SMTP_EMAIL;

    await transporter.sendMail({
      from: `"Baki Karton" <${process.env.SMTP_EMAIL}>`,
      to: recipientEmail,
      replyTo: email || undefined,
      subject: `Yeni Xidmət Sifarişi: ${serviceName || "Ümumi"}`,
      html: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 650px;
          margin: 0 auto;
          padding: 20px;
          color: #333;
        ">

          <h2 style="color: #004a99;">
            Yeni Müraciət / Sifariş Gəldi
          </h2>

          <hr />

          <p>
            <strong>Xidmət:</strong><br>
            ${serviceName || "Ümumi"}
          </p>

          <p>
            <strong>Ad Soyad:</strong><br>
            ${name}
          </p>

          <p>
            <strong>Əlaqə Nömrəsi:</strong><br>
            ${phone}
          </p>

          <p>
            <strong>E-poçt:</strong><br>
            ${email || "Qeyd edilməyib"}
          </p>

          <p>
            <strong>Əlavə Qeyd:</strong><br>
            ${message || "Yoxdur"}
          </p>

          <hr />

          <p style="font-size: 12px; color: #777;">
            Bu müraciət Baki Karton saytındakı sifariş formasından göndərilib.
          </p>

        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Müraciət uğurla göndərildi.",
    });

  } catch (error: any) {
    console.error("Email göndərmə xətası:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Email göndərilə bilmədi.",
        error: error.message || "Naməlum xəta",
      },
      { status: 500 }
    );
  }
}