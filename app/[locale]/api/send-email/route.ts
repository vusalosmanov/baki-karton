import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
    try {
        const apiKey = process.env.RESEND_API_KEY;
        
        if (!apiKey) {
            return NextResponse.json({ success: false, error: "Resend API key tapılmadı! .env.local faylını yoxlayın." }, { status: 500 });
        }

        const resend = new Resend(apiKey);
        const formData = await req.formData();
        
        const type = formData.get("type") as string;
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const message = formData.get("message") as string;
        const file = formData.get("cv-file") as File | null;

        let toEmail = "vusal.osmanov66@gmail.com";
        if (type === "cv") {
            toEmail = "hr@bakikarton.az";
        } else if (type === "sifaris") {
            toEmail = "emin.a@bakikarton.az";
        }

        const attachments: any[] = [];

        if (file && file.size > 0) {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            attachments.push({
                filename: file.name,
                content: buffer,
            });
        }

        const { data, error } = await resend.emails.send({
            from: "Baku Karton <onboarding@resend.dev>",
            to: [toEmail],
            subject: type === "cv" ? `İş Müraciəti - ${name}` : "Yeni Sifariş",
            html: `
                <p><strong>Ad Soyad:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Mesaj:</strong> ${message}</p>
            `,
            attachments: attachments,
        });

        if (error) {
            return NextResponse.json({ success: false, error: error.message }, { status: 400 });
        }

        return NextResponse.json({ success: true, data });
    } catch (err: any) {
        console.error("API DETAYLI XƏTA:", err);
        return NextResponse.json({ success: false, error: err.message || "Daxili server xətası" }, { status: 500 });
    }
}