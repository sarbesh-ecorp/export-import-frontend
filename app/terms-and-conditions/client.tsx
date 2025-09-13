import NewsletterSignup from "../widgets/signup";

export default function TermsAndConditionsPage() {
  return (
    <>
      <div className="bg-white text-gray-800 py-12 px-4 sm:px-6 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>

          <p className="mb-4 text-lg text-gray-700">
            Welcome to <a href="https://www.exportimportnews.com/"><strong>ExportImportNews.com</strong></a>. By accessing or using our website, you agree to be bound by the following terms and conditions. Please read them carefully before using our services.
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">1. Use of Website</h2>
            <p className="text-gray-700">
              You agree to use this website only for lawful purposes and in a manner that does not infringe the rights or restrict the use and enjoyment of others. Unauthorized use of this website may result in a claim for damages or be a criminal offense.
            </p>
          </section>

          <section className="mb-8">
            <article className="text-xl font-semibold mb-2">2. Content Accuracy</article>
            <p className="text-gray-700">
              We strive to ensure the accuracy and reliability of the information provided. However, <strong>ExportImportNews.com</strong> makes no warranties or representations regarding the completeness, accuracy, or timeliness of the content. The information on this site is provided "as is" and should not be relied upon for legal, financial, or business decisions.
            </p>
          </section>

          <section className="mb-8">
            <article className="text-xl font-semibold mb-2">3. External Content Disclaimer</article>
            <p className="text-gray-700">
              In some cases, we publish news, updates, or excerpts from third-party websites or publicly available sources. While we credit the original sources wherever possible, we <strong>cannot guarantee the authenticity or accuracy</strong> of such externally sourced content. Readers are encouraged to verify such information independently.
            </p>
          </section>

          <section className="mb-8">
            <article className="text-xl font-semibold mb-2">4. Intellectual Property</article>
            <p className="text-gray-700">
              All content on this website, including articles, graphics, logos, and design, is the property of <strong>ExportImportNews.com</strong> or its content providers and is protected by applicable copyright and trademark laws. Unauthorized reproduction is prohibited.
            </p>
          </section>

          <section className="mb-8">
            <article className="text-xl font-semibold mb-2">5. Links to Other Websites</article>
            <p className="text-gray-700">
              This website may include links to other websites for additional resources. We do not endorse, and are not responsible for, the content or practices of these third-party sites. Visiting those sites is done at your own risk.
            </p>
          </section>

          <section className="mb-8">
            <article className="text-xl font-semibold mb-2">6. Limitation of Liability</article>
            <p className="text-gray-700">
              Under no circumstances shall <strong>ExportImportNews.com</strong> be liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use this website or its content.
            </p>
          </section>

          <section className="mb-8">
            <article className="text-xl font-semibold mb-2">7. Changes to Terms</article>
            <p className="text-gray-700">
              We reserve the right to modify these terms at any time. Any changes will be posted on this page with an updated “Last updated” date. Continued use of the website after changes constitutes acceptance of the new terms.
            </p>
          </section>

          {/* <section>
            <article className="text-xl font-semibold mb-2">8. Contact Us</article>
            <p className="text-gray-700">
              If you have any questions about these Terms and Conditions, please contact us at:{" "}
              <a href="mailto:support@exportimportnews.com" className="text-blue-600 hover:underline">
                support@exportimportnews.com
              </a>
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
