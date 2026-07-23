import { NextResponse } from "next/server";
import { Resend } from "resend";

// Resend API açarını bura daxil et
const resend = new Resend("re_9SoKcSP2_BdxjZqB887JfLhPg42sideaS");

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    const file = formData.get("cv-file") as File | null;

    let attachments: any = [];

    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      attachments.push({
        filename: file.name,
        content: buffer,
      });
    }

    const data = await resend.emails.send({
      from: "Bakı Karton <info@bakikarton.az>", 
      to: ["emin.a@bakikarton.az"],
      subject: `Yeni Karyera Müraciəti: ${name}`,
      html: `
        <h2>Karyera Bölməsindən Yeni Müraciət</h2>
        <p><strong>Ad Soyad:</strong> ${name}</p>
        <p><strong>E-poçt:</strong> ${email}</p>
        <p><strong>Məlumat:</strong> ${message}</p>
      `,
      attachments: attachments,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("CV göndərmə xətası:", error);
    return NextResponse.json(
      { success: false, error: "Xəta baş verdi" },
      { status: 500 }
    );
  }
}