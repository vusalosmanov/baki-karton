import { NextResponse } from "next/server";
import { Resend } from "resend";

// Resend-dən pulsuz qeydiyyat keçib API key ala bilərsən (resend.com)
// const resend = new Resend('re_9SoKcSP2_BdxjZqB887JfLhPg42sideaS');
const resend = new Resend("re_9SoKcSP2_BdxjZqB887JfLhPg42sideaS");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, serviceName, message } = body;

    const data = await resend.emails.send({
      from: "Bakı Karton <info@bakikarton.az>",
      to: ["emin.a@bakikarton.az"],
      subject: `Yeni Xidmət Sifarişi: ${serviceName || "Ümumi"}`,
      html: `
        <h2>Yeni Müraciət / Sifariş Gəldi</h2>
        <p><strong>Xidmət:</strong> ${serviceName}</p>
        <p><strong>Ad Soyad:</strong> ${name}</p>
        <p><strong>Əlaqə Nömrəsi:</strong> ${phone}</p>
        <p><strong>E-poçt:</strong> ${email || "Qeyd edilməyib"}</p>
        <p><strong>Əlavə Qeyd:</strong> ${message || "Yoxdur"}</p>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Email göndərmə xətası:", error);
    return NextResponse.json(
      { success: false, message: "Xəta baş verdi" },
      { status: 500 },
    );
  }
}
