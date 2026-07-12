export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-white text-black selection:bg-black selection:text-white pt-24 pb-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight uppercase mb-4">
          Shipping & Returns
        </h1>
        <div className="w-12 h-[2px] bg-black mb-12"></div>

        <div className="space-y-20">
          <section>
            <h2 className="text-sm font-bold tracking-[0.15em] uppercase mb-6">
              Global Delivery
            </h2>
            <p className="text-gray-500 font-light leading-relaxed mb-8 text-sm">
              We ship worldwide using premium courier services (DHL Express,
              FedEx) to ensure your gear arrives safely and on time. All
              shipments are fully tracked and insured.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-gray-100 pt-8">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider mb-2">
                  Domestic (Europe)
                </h3>
                <ul className="text-sm text-gray-500 font-light space-y-2">
                  <li>Standard: 2-4 Business Days — €10</li>
                  <li>Express: 1-2 Business Days — €25</li>
                  <li className="text-black font-medium pt-2">
                    Free shipping on orders over €200
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider mb-2">
                  International
                </h3>
                <ul className="text-sm text-gray-500 font-light space-y-2">
                  <li>Express Air: 3-7 Business Days — €45</li>
                  <li className="text-black font-medium pt-2">
                    Duties & Taxes calculated at checkout
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-sm font-bold tracking-[0.15em] uppercase mb-6">
              Returns & Exchanges
            </h2>
            <p className="text-gray-500 font-light leading-relaxed mb-8 text-sm">
              We accept returns within 14 days of delivery. Items must be
              unworn, unwashed, and in their original packaging with all tags
              attached. Bicycles and snowboards must be unassembled and in
              original factory boxes.
            </p>

            <div className="bg-[#fafafa] p-8 rounded-2xl border border-gray-100">
              <h3 className="text-xs font-bold uppercase tracking-wider mb-4">
                How to Return
              </h3>
              <ol className="list-decimal list-inside text-sm text-gray-500 font-light space-y-3">
                <li>
                  Log in to your account and request a return authorization
                  (RMA).
                </li>
                <li>Pack the item securely in its original packaging.</li>
                <li>Attach the provided prepaid shipping label.</li>
                <li>Drop off the package at your nearest courier location.</li>
              </ol>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
