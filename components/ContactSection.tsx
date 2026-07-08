"use client";
import { useState } from "react";
import { postMessage } from "@/lib/strapi";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      FullName: e.target.name.value,
      Email: e.target.email.value,
      Phone: e.target.tel.value,
      Subject: e.target.subject.value,
      Message: e.target.msg.value,
    };

    try {
      await postMessage(formData);
      alert("Mesajınız uğurla göndərildi!");
      e.target.reset();
    } catch (error) {
      alert("Xəta baş verdi, yenidən cəhd edin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <input 
        name="name" 
        type="text" 
        required 
        placeholder="Adınız və Soyadınız" 
        className="w-full bg-transparent border-b-2 border-gray-200 py-3 outline-none focus:border-[#1a3352]" 
      />
      <input 
        name="email" 
        type="email" 
        required 
        placeholder="E-mail ünvanınız" 
        className="w-full bg-transparent border-b-2 border-gray-200 py-3 outline-none focus:border-[#1a3352]" 
      />
      <input 
        name="tel" 
        type="tel" 
        required 
        placeholder="Əlaqə nömrəsi" 
        className="w-full bg-transparent border-b-2 border-gray-200 py-3 outline-none focus:border-[#1a3352]" 
      />
      <select 
        name="subject" 
        className="w-full bg-transparent border-b-2 border-gray-200 py-3 outline-none focus:border-[#1a3352] cursor-pointer"
      >
        <option value="Karton list sifarişi">Karton list sifarişi</option>
        <option value="Karton sifarişi">Karton sifarişi</option>
        <option value="Məlumat tələbi">Məlumat tələbi</option>
      </select>
      <textarea 
        name="msg" 
        rows={3} 
        required 
        placeholder="Mesajınız" 
        className="md:col-span-2 w-full bg-transparent border-b-2 border-gray-200 py-3 outline-none focus:border-[#1a3352]"
      ></textarea>
      <button 
        disabled={loading} 
        className="md:col-span-2 w-full bg-[#1a3352] text-white py-4 rounded-2xl font-bold hover:bg-[#25466e] transition-all"
      >
        {loading ? "GÖNDƏRİLİR..." : "GÖNDƏR"}
      </button>
    </form>
  );
}