import NewsletterSignup from "../widgets/signup";

export default function AboutPage() {
  return (
    <>
    <div className="bg-white text-gray-800 py-12 px-4 sm:px-6 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          About ExportImportNews.com
        </h1>
        <p className="text-lg mb-6 text-gray-700 leading-relaxed">
          <a href="https://www.exportimportnews.com/"><strong>ExportImportNews.com</strong></a> is your trusted source for the latest news, insights, and analysis in global trade, logistics, and international business. We are dedicated to delivering timely and accurate information that empowers businesses, trade professionals, and decision-makers to navigate the complex world of imports and exports with confidence.
        </p>
        <p className="text-lg mb-6 text-gray-700 leading-relaxed">
          Founded with the mission to bridge global markets through knowledge, ExportImportNews.com covers a wide range of topics, including:
        </p>
        <ul className="list-disc list-inside mb-6 text-gray-700 space-y-2">
          <li><strong>Global trade policy and agreements</strong></li>
          <li><strong>Import/export regulations and compliance</strong></li>
          <li><strong>Market trends and forecasts</strong></li>
          <li><strong>Shipping and logistics developments</strong></li>
          <li><strong>Industry interviews and expert commentary</strong></li>
        </ul>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Whether you're an established importer, a first-time exporter, a freight forwarder, or a policymaker, we provide the resources and updates you need to stay ahead in an ever-evolving trade environment.
        </p>
         <div className="border-l-4 border-blue-500 pl-4 mb-6">
          {/* <h2 className="italic text-gray-600">
            “At ExportImportNews.com, we believe that informed trade is empowered trade.”
          </h2> */}
          <h2 className="italic text-gray-600">
            “Informed Trade is Empowered Trade - Only at ExportImportNews.com”
          </h2>
        </div>        
      </div>      
    </div>
    <NewsletterSignup/>
    <div className="h-[20px] bg-gray-50"></div></>
  );
}