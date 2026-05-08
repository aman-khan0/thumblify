'use client'
// import { useState, ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import SectionTitle from "../components/SectionTitle";
import { ArrowRightIcon } from "lucide-react";
// import { motion } from "motion/react";

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function ContactSection() {

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, message } = formData;

    const phoneNumber = "919953272379";  

    const whatsappMessage = encodeURIComponent(
      `Hello, my name is ${name}\nEmail: ${email}\nMessage: ${message}`
    );

    const url = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

    window.open(url, "_blank");
  };

  return (
    <div className="px-4 md:px-16 lg:px-24 xl:px-32">
      <SectionTitle text1="Contact" text2="Grow your channel" text3="Have questions? Let's talk." />

      <form onSubmit={handleSubmit} className='grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto mt-16'>

        <div>
          <p>Your name</p>
          <input
            name="name"
            type="text"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 rounded"
            required
             
          />
        </div>

        <div>
          <p>Email</p>
          <input
            name="email"
            type="email"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 rounded"
            required
          />
        </div>

        <div className="sm:col-span-2">
          <p>Message</p>
          <textarea
            name="message"
            onChange={handleChange}
            className="w-full p-3  border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 rounded"
            rows={6}
            required
          />
        </div>

        <button type="submit" className="bg-pink-600 text-white px-6 py-3 rounded-2xl hover:bg-pink-700 transition-colors duration-300">
          Submit <ArrowRightIcon className="inline ml-2" />
        </button>

      </form>
    </div>
  );
}