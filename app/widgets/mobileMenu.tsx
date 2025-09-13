import Link from "next/link";
import { useEffect, useState } from "react";
import AuthDrawer from "./login";
import { faInstagram, faFacebook, faYoutube, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface menuDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: menuDrawerProps) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [showAuth, setShowAuth] = useState(false);

    useEffect(() => {
        if (open) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
    }, [open]);

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
                email,
                createdAt: new Date().toISOString(),
                pageURL: window.location.href,
            }),
            });
            if (res.ok) {
            alert("Thanks for subscribing!");
            setEmail("");
            } else {
            alert("Something went wrong!");
            }
        } catch (err) {
            console.error("Signup error", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <div className={`fixed inset-0 bg-black transition-opacity duration-300 z-[100] ${ open ? 'opacity-60 visible' : 'opacity-0 invisible' }`} onClick={onClose} />
        <div className={`fixed top-0 left-0 h-screen w-full sm:w-[450px] bg-white z-[101] p-8 shadow-2xl transform transition-transform duration-300 ease-in-out ${ open ? 'translate-x-0' : '-translate-x-full' }`} aria-hidden={!open} >
            <button 
                onClick={onClose} 
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl transition-colors"
                aria-label="Close drawer"
            >
                ✕
            </button>
            <div className="p-8">
                <Link href="/" className="text-primary text-3xl font-['Pacifico'] tracking-wider">
                ExportImportNews
                </Link>
            </div>
            <div className="p-8 text-black flex flex-col h-[90%]">
                <ul className="space-y-6 text-sm uppercase">
                    <li><Link href={'/'}>Home</Link></li>
                    <li><Link href={'/about-us'}>About Us</Link></li>
                    <li><Link href={'#'}>Contact Us</Link></li>
                </ul>
                <hr className="border-t border-gray-300 my-8" />            
                <div className="mt-auto">
                    <hr className="border-t border-gray-300 my-8" />
                    <p className="text-gray-600 text-sm text-center mb-4">
                        Join our newsletter and get the latest news and articles sent straight to your inbox weekly.
                    </p>
                    <div className="flex w-full">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 text-black rounded-l-md border border-gray-300 focus:outline-none"
                        />
                        <button 
                            disabled={loading}
                            onClick={handleSignup} 
                            className="px-4 py-2 bg-black text-white rounded-r-md hover:bg-gray-800 transition">
                                {loading ? "Submitting..." : "Subscribe"}
                        </button>
                    </div>
                    <button
                        onClick={() => {
                        setShowAuth(true);
                        onClose
                        }}
                        className="lg:hidden sm:px-4 mt-4 py-2 bg-black text-white w-full rounded-md hover:bg-gray-800 transition"
                    >
                        Login
                    </button>
                    <ul className="flex space-x-4 text-lg p-6 justify-center items-center">
                        <li><Link href="#"><FontAwesomeIcon icon={faFacebook} /></Link></li>
                        <li><Link href="#"><FontAwesomeIcon icon={faInstagram} /></Link></li>
                        <li><Link href="#"><FontAwesomeIcon icon={faXTwitter} /></Link></li>
                        <li><Link href="#"><FontAwesomeIcon icon={faYoutube} /></Link></li>
                    </ul>
                </div>
            </div>
        </div>
        <AuthDrawer open={showAuth} onClose={() => setShowAuth(false)} />
        </>
    )
}