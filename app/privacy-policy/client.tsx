import NewsletterSignup from "../widgets/signup";

export default function PrivacyPolicyPage() {
  return (
    <>
      <div className="bg-white text-gray-800 py-12 px-4 sm:px-6 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          <p className="mb-4 text-lg text-gray-700">
            This Privacy Policy outlines how <a href="https://www.exportimportnews.com/"><strong>ExportImportNews.com</strong></a> (“we”, “our”, or “us”) collects, uses, and protects your information when you visit and interact with our website.
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
            <p className="text-gray-700 mb-2">
              We may collect the following types of information:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Personal Information:</strong> Such as name and email address when you sign up for newsletters.</li>
              <li><strong>Usage Data:</strong> Information about how you use the website (pages visited, links clicked, etc.).</li>
              <li><strong>Cookies and Tracking:</strong> We use cookies to improve user experience and analyze site traffic.</li>
            </ul>
          </section>

          <section className="mb-8">
            <article className="text-xl font-semibold mb-2">2. How We Use Your Information</article>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>To send you newsletters and relevant content.</li>
              <li>To improve our website’s content and performance.</li>
              <li>To personalize your user experience.</li>
              <li>To respond to your inquiries or feedback.</li>
            </ul>
          </section>

          <section className="mb-8">
            <article className="text-xl font-semibold mb-2">3. Sharing Your Data</article>
            <p className="text-gray-700">
              We do not sell or rent your personal information. We may share information with:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
              <li>Third-party service providers who assist with website operations (e.g., newsletter providers, analytics).</li>
              <li>Legal authorities if required by law or to protect our legal rights.</li>
            </ul>
          </section>

          <section className="mb-8">
            <article className="text-xl font-semibold mb-2">4. Your Rights</article>
            <p className="text-gray-700 mb-2">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Access the data we hold about you.</li>
              <li>Request correction or deletion of your data.</li>
              <li>Unsubscribe from newsletters at any time via the link in the email.</li>
            </ul>
          </section>

          <section className="mb-8">
            <article className="text-xl font-semibold mb-2">5. Security</article>
            <p className="text-gray-700">
              We implement appropriate security measures to protect your personal data. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <article className="text-xl font-semibold mb-2">6. Third-Party Links</article>
            <p className="text-gray-700">
              Our website may contain links to third-party sites. We are not responsible for the privacy practices of such websites.
            </p>
          </section>

          <section className="mb-8">
            <article className="text-xl font-semibold mb-2">7. Changes to This Policy</article>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time. The updated version will be posted on this page with a revised “Last updated” date.
            </p>
          </section>

          {/* <section>
            <article className="text-xl font-semibold mb-2">8. Contact Us</article>
            <p className="text-gray-700">
              If you have any questions about this policy, please contact us at: <a href="mailto:support@exportimportnews.com" className="text-blue-600 hover:underline">support@exportimportnews.com</a>
            </p>
          </section> */}

          <p className="mt-6 text-sm text-gray-500">Last updated: July 7, 2025</p>
        </div>
      </div>

      <NewsletterSignup />
      <div className="h-[20px] bg-gray-50" />
    </>
  );
}
