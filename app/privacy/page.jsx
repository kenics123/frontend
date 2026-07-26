import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";

export const metadata = {
  title: "Privacy Policy | Kenics Pageant",
  description:
    "How Kenics Pageant collects, uses, and protects personal data for registration, voting, and website use.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-pink-50 to-white flex flex-col">
      <SiteHeader />

      <div className="bg-pink-600 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Privacy Policy
          </h1>
          <p className="text-pink-100 text-lg max-w-2xl mx-auto">
            How we collect, use, store, and protect your personal information.
          </p>
          <p className="text-pink-200 text-sm mt-4">
            Last updated: 26 July 2026
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 flex-1">
        <article className="max-w-3xl mx-auto bg-white rounded-2xl border border-pink-100 shadow-sm p-6 md:p-10">
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              1. Who we are
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Kenics Pageant (&quot;Kenics&quot;, &quot;we&quot;, &quot;us&quot;,
              or &quot;our&quot;) operates the website{" "}
              <a
                href="https://www.kenicspageant.online"
                className="text-pink-600 hover:underline"
              >
                www.kenicspageant.online
              </a>{" "}
              and related contest services. This Privacy Policy explains how we
              handle personal data when you visit the Site, register as a
              contestant, vote, or contact us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              2. Information we collect
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Depending on how you use the Site, we may collect:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                <span className="font-medium text-gray-800">
                  Contestant registration data:
                </span>{" "}
                name, email, phone number, date of birth, height, weight,
                category, biography, experience, achievements, emergency contact
                details, optional social media handles, and uploaded photos.
              </li>
              <li>
                <span className="font-medium text-gray-800">Voter data:</span>{" "}
                email address and optional name/phone provided when purchasing
                votes, plus payment reference and amount processed through our
                payment provider.
              </li>
              <li>
                <span className="font-medium text-gray-800">Contact form:</span>{" "}
                name, email, subject, and message.
              </li>
              <li>
                <span className="font-medium text-gray-800">
                  Technical / usage data:
                </span>{" "}
                IP address, browser type, device information, and basic logs
                needed for security and site operation (via hosting and related
                tools).
              </li>
              <li>
                <span className="font-medium text-gray-800">
                  Payment-related data:
                </span>{" "}
                transaction references and payment status from Flutterwave. We
                do not store full card numbers on Kenics servers.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              3. How we use your information
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>To process contestant applications and registration fees</li>
              <li>
                To display contestant profiles, photos, and public vote counts on
                the Site (leaderboard, model pages, winners)
              </li>
              <li>To process and verify vote payments</li>
              <li>
                To communicate about registration, payment status, contest
                updates, or support requests
              </li>
              <li>
                To administer contests, prevent fraud, and maintain security
              </li>
              <li>
                To promote Kenics Pageant using contestant names/likeness as
                described in our{" "}
                <Link href="/terms" className="text-pink-600 hover:underline">
                  Terms and Conditions
                </Link>
              </li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              4. Legal bases (where applicable)
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We process personal data because it is necessary to perform a
              contract with you (registration and voting services), because you
              have consented (for example by accepting Terms/Privacy during
              registration), for our legitimate interests in running a fair and
              secure pageant platform, and where required by law. For minors,
              guardian consent may be required for registration and publication
              of profiles.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              5. Sharing your information
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              We may share data with:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                <span className="font-medium text-gray-800">
                  Payment processors
                </span>{" "}
                (e.g. Flutterwave) to complete transactions
              </li>
              <li>
                <span className="font-medium text-gray-800">
                  Hosting and cloud providers
                </span>{" "}
                that store our application data and media (including image
                hosting such as Cloudinary)
              </li>
              <li>
                <span className="font-medium text-gray-800">
                  Service providers
                </span>{" "}
                who help us operate email, analytics, or support tools under
                appropriate safeguards
              </li>
              <li>
                <span className="font-medium text-gray-800">
                  Authorities
                </span>{" "}
                when required by law or to protect rights and safety
              </li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">
              Contestant profiles that are published (name, photos, bio, vote
              counts, category) are visible to the public on the Site. Emergency
              contact details are collected for safety/admin use and are not
              intended for public display on marketing pages.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              6. International transfers
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Some providers we use may process data outside Nigeria. Where that
              happens, we take reasonable steps to ensure appropriate protection
              consistent with this Policy and applicable law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              7. Retention
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We keep registration, voting, and payment records for as long as
              needed to run the contest, display historical winners/leaderboards,
              handle disputes or chargebacks, meet accounting/legal requirements,
              and improve our services. Contact messages may be retained for
              support history. When data is no longer needed, we delete or
              anonymise it where practicable.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              8. Security
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We use reasonable technical and organisational measures to protect
              personal data, including access controls for admin accounts and
              secure transmission where supported. No method of transmission or
              storage is completely secure; please use strong unique passwords
              for any admin access and contact us if you suspect misuse.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              9. Your rights
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Subject to Nigerian data protection law (including the Nigeria Data
              Protection Act, where applicable), you may have rights to:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Request access to personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>
                Request deletion or restriction in certain circumstances
              </li>
              <li>Object to certain processing</li>
              <li>Withdraw consent where processing is consent-based</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">
              To exercise these rights, contact{" "}
              <span className="font-medium">info@kenicspageant.com</span> or use
              our{" "}
              <Link href="/contact" className="text-pink-600 hover:underline">
                contact form
              </Link>
              . We may need to verify your identity before responding. Note that
              some data (for example completed payment records or published
              contest history) may need to be retained for legal or operational
              reasons.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              10. Cookies and similar technologies
            </h2>
            <p className="text-gray-600 leading-relaxed">
              The Site may use cookies or local storage for essential functions
              (such as keeping an admin session) and basic performance. You can
              control cookies through your browser settings; disabling some
              cookies may affect Site features.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              11. Children
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Some pageant categories may include minors. Registration for minors
              should be completed with parent/guardian involvement and consent.
              We do not knowingly collect children&apos;s data for marketing
              unrelated to the contest. Contact us if you believe a child&apos;s
              data was submitted without proper authority.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              12. Changes to this Policy
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We may update this Privacy Policy periodically. The &quot;Last
              updated&quot; date will reflect the latest version. Significant
              changes may be highlighted on the Site. Continued use after an
              update means you acknowledge the revised Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              13. Contact us
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              For privacy questions or requests:
            </p>
            <ul className="list-none space-y-1 text-gray-600">
              <li>Email: info@kenicspageant.com</li>
              <li>
                Phone:{" "}
                <a
                  href="tel:+2348026190053"
                  className="text-pink-600 hover:underline"
                >
                  +2348026190053
                </a>
              </li>
              <li>
                Contact form:{" "}
                <Link
                  href="/contact"
                  className="text-pink-600 hover:underline"
                >
                  /contact
                </Link>
              </li>
            </ul>
          </section>
        </article>

        <div className="max-w-3xl mx-auto mt-8 flex flex-wrap gap-4 justify-center">
          <Link
            href="/terms"
            className="px-6 py-3 bg-white text-pink-700 border border-pink-200 rounded-full hover:bg-pink-50 font-medium"
          >
            Terms and Conditions
          </Link>
          <Link
            href="/register"
            className="px-6 py-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 font-medium"
          >
            Back to Registration
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
