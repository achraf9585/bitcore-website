export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-muted-foreground mb-12">Last updated: 29/12/2025</p>

      <div className="space-y-8 text-lg leading-relaxed text-gray-300">
        <p>
          Bitcore Solution ("we", "our", or "us") respects your privacy and is committed to protecting the personal information of users who visit and use our website and services.
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Information We Collect</h2>
          <p className="mb-4">We may collect the following types of information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Personal Information:</strong> name, email address, phone number, company name, or any information you voluntarily provide via contact forms or service requests.</li>
            <li><strong>Technical Information:</strong> IP address, browser type, device information, operating system, and usage data.</li>
            <li><strong>Cookies and Tracking Technologies:</strong> used to improve website functionality and user experience.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">How We Use Your Information</h2>
          <p className="mb-4">We use the collected information to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide and manage our services</li>
            <li>Respond to inquiries and customer support requests</li>
            <li>Improve our website, services, and user experience</li>
            <li>Communicate updates, offers, or important service-related information</li>
            <li>Ensure security and prevent fraud</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Sharing of Information</h2>
          <p className="mb-4">We do not sell or rent your personal data. We may share information only in the following cases:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>With trusted partners or service providers who assist in operating our services</li>
            <li>When required by law or legal obligations</li>
            <li>To protect our rights, security, or property</li>
          </ul>
          <p className="mt-4">All partners are required to respect data confidentiality.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Data Security</h2>
          <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, loss, or misuse. However, no online system is 100% secure.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Cookies Policy</h2>
          <p className="mb-4">Our website uses cookies to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Analyze traffic and performance</li>
            <li>Remember user preferences</li>
            <li>Enhance navigation experience</li>
          </ul>
          <p className="mt-4">You can disable cookies through your browser settings at any time.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Your Rights</h2>
          <p className="mb-4">Depending on your location, you may have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access your personal data</li>
            <li>Request correction or deletion of your data</li>
            <li>Withdraw consent at any time</li>
            <li>Object to data processing</li>
          </ul>
          <p className="mt-4">To exercise these rights, please contact us.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Third-Party Links</h2>
          <p>Our website may contain links to third-party websites. We are not responsible for their privacy practices or content.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Changes to This Privacy Policy</h2>
          <p>We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page with an updated date.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
          <p>If you have any questions or concerns regarding this Privacy Policy, please contact us at:</p>
          <p className="mt-2 text-primary">Email: contact@bitcore-solution.com</p>
        </section>

        <hr className="border-white/10 my-12" />

        <p className="text-sm opacity-60">
          By using our website and services, you agree to this Privacy Policy.
        </p>
      </div>
    </div>
  )
}
