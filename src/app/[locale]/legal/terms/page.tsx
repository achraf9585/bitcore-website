export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
      <p className="text-muted-foreground mb-12">Last updated: 29/12/2025</p>

      <div className="space-y-8 text-lg leading-relaxed text-gray-300">
        <p>
          Welcome to Bitcore Solution. By accessing or using our website and services, you agree to be bound by these Terms of Service ("Terms"). If you do not agree with any part of these Terms, please do not use our services.
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Services</h2>
          <p className="mb-4">Bitcore Solution provides digital services including, but not limited to:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Web development</li>
            <li>FiveM development</li>
            <li>Graphic design</li>
            <li>Custom digital and technical solutions</li>
          </ul>
          <p>All services are provided based on the scope agreed upon with the client.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Eligibility</h2>
          <p>By using our services, you confirm that you are at least 18 years old or have legal authorization to enter into a binding agreement.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Client Responsibilities</h2>
          <p className="mb-4">Clients agree to:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Provide accurate and complete information required for project execution</li>
            <li>Respect agreed timelines for feedback and approvals</li>
            <li>Use delivered work only for lawful purposes</li>
          </ul>
          <p>Delays caused by missing information or feedback may impact delivery timelines.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Payments</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>All prices, payment methods, and deadlines are defined in the project agreement or invoice</li>
            <li>Payments must be made on time as agreed</li>
            <li>Late payments may result in service suspension</li>
            <li>Fees are non-refundable once work has started, unless otherwise stated in writing</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Intellectual Property</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>All work remains the property of Bitcore Solution until full payment is received</li>
            <li>Upon full payment, ownership rights are transferred to the client, unless otherwise agreed</li>
            <li>Bitcore Solution reserves the right to showcase completed projects in its portfolio</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Revisions and Modifications</h2>
          <p>Revisions are limited to what is defined in the project scope. Additional changes or requests may be subject to extra charges.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Confidentiality</h2>
          <p>Both parties agree to keep confidential any sensitive or proprietary information shared during the course of the project.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Limitation of Liability</h2>
          <p>Bitcore Solution shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Termination</h2>
          <p>We reserve the right to suspend or terminate services if these Terms are violated or in case of misuse of our services.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Third-Party Services</h2>
          <p>Some services may rely on third-party platforms or tools. Bitcore Solution is not responsible for issues caused by third-party services.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Changes to These Terms</h2>
          <p>We reserve the right to update or modify these Terms at any time. Updates will be posted on this page with a revised date.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Governing Law</h2>
          <p>These Terms shall be governed and interpreted in accordance with applicable laws.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Contact Information</h2>
          <p>If you have any questions regarding these Terms, please contact us at:</p>
          <p className="mt-2 text-primary">Email: contact@bitcore-solution.com</p>
        </section>

        <hr className="border-white/10 my-12" />

        <p className="text-sm opacity-60">
          By using our website and services, you acknowledge that you have read, understood, and agreed to these Terms of Service.
        </p>
      </div>
    </div>
  )
}
