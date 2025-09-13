'use client'
import { motion } from "framer-motion";
import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignup = async () => {
    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    if (!isValidEmail(email.trim())) {
      alert("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          createdAt: new Date().toISOString(),
          pageURL: window.location.href,
        }),
      });

      if (res.ok) {
        alert("Thanks for subscribing!");
        setEmail("");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Signup error", err);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="subscribe"
      className="max-w-7xl relative bg-[#cf412b] text-white mx-auto px-6 py-16 min-h-[400px] overflow-hidden"
    >
      <motion.div
        className="absolute bottom-0 left-0 min-w-[200%] text-[110px] font-bold text-black whitespace-nowrap opacity-10 z-0"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
      >
        * Subscribe * Subscribe * Subscribe * Subscribe * Subscribe * Subscribe *
      </motion.div>
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8 lg:px-30 py-20">
        <div className="md:w-1/2 space-y-4">
          <p className="text-3xl font-semibold">
            Stay informed with our latest news and updates.
          </p>
          <p className="text-white text-sm font-light">
            Get breaking news and curated stories delivered to your inbox every day.
            <br />
            Be the first to know what's happening around the world.
          </p>
        </div>
        <div className="md:w-2/5 space-y-4 w-full">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-md text-black bg-white border border-black focus:outline-none focus:ring-2 placeholder:text-gray-300"
          />
          <button
            disabled={loading}
            onClick={handleSignup}
            className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition uppercase"
          >
            {loading ? "Submitting..." : "Subscribe to Newsletter"}
          </button>
        </div>
      </div>
    </section>
  );
}
