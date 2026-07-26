import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";

export const metadata = {
  title: "Terms and Conditions | Kenics Pageant",
  description:
    "Terms and conditions for participating in Kenics Pageant, registration, voting, and use of this website.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-pink-50 to-white flex flex-col">
      <SiteHeader />

      <div className="bg-pink-600 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Terms and Conditions
          </h1>
          <p className="text-pink-100 text-lg max-w-2xl mx-auto">
            Please read these terms carefully before registering, voting, or
            using the Kenics Pageant website.
          </p>
          <p className="text-pink-200 text-sm mt-4">
            Last updated: 26 July 2026
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 flex-1">
        <article className="max-w-3xl mx-auto bg-white rounded-2xl border border-pink-100 shadow-sm p-6 md:p-10 prose prose-pink prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600">
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              1. About these Terms
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              These Terms and Conditions (&quot;Terms&quot;) govern your access
              to and use of the Kenics Pageant website at{" "}
              <a
                href="https://www.kenicspageant.online"
                className="text-pink-600 hover:underline"
              >
                www.kenicspageant.online
              </a>{" "}
              (the &quot;Site&quot;), including contestant registration, public
              voting, payments, and related services operated by Kenics Pageant
              (&quot;Kenics&quot;, &quot;we&quot;, &quot;us&quot;, or
              &quot;our&quot;).
            </p>
            <p className="text-gray-600 leading-relaxed">
              By using the Site, submitting a registration, casting a paid vote,
              or clicking to accept these Terms, you agree to be bound by them.
              If you do not agree, do not use the Site or participate in our
              contests.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              2. Eligibility
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                Contestants must meet the age, category, and other requirements
                published for the active contest and selected category.
              </li>
              <li>
                You must provide accurate personal information. False or
                misleading information may result in disqualification without
                refund.
              </li>
              <li>
                Where a contestant is a minor, a parent or legal guardian must
                consent to registration and related use of photos and
                information.
              </li>
              <li>
                Anyone may purchase votes for a contestant, subject to these
                Terms and applicable payment rules. Voting is not a lottery or
                gambling product; it is a paid show of support for contestants.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              3. Contestant Registration
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                Registration is only available when there is an active contest
                with categories open for applications.
              </li>
              <li>
                The registration fee is set by category and is calculated on our
                servers. You agree to pay the displayed fee through our payment
                provider (Flutterwave) to complete registration.
              </li>
              <li>
                A registration is considered complete only after successful
                payment confirmation. Unpaid applications may remain pending and
                are not eligible for voting display until paid.
              </li>
              <li>
                You are responsible for uploading clear, appropriate photos and
                for ensuring you have the right to use those images.
              </li>
              <li>
                Kenics may reject, suspend, or remove a registration for breach
                of these Terms, inappropriate content, or failure to meet
                eligibility rules.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              4. Voting and Payments
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                Public voting is only open when an administrator has enabled
                voting for the active contest.
              </li>
              <li>
                The price per vote is set per category. Your total payment equals
                the number of votes you select multiplied by that category&apos;s
                voting price.
              </li>
              <li>
                Votes are credited to a contestant only after successful payment
                verification via our payment provider webhook/verification
                process.
              </li>
              <li>
                Vote purchases are generally non-refundable once payment is
                successful, except where required by law or where Kenics
                determines a clear payment or technical error occurred.
              </li>
              <li>
                Leaderboards and vote counts reflect successfully processed
                votes. Temporary delays may occur while payments are verified.
              </li>
              <li>
                Kenics reserves the right to investigate suspicious voting
                activity and to adjust or cancel votes obtained through fraud,
                chargebacks abuse, or system misuse.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              5. Photos, Media, and Publicity
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              By registering, you grant Kenics a non-exclusive, worldwide,
              royalty-free licence to use your name, likeness, biography, and
              submitted photos/videos for the contest, promotion of Kenics
              Pageant, the Site, social media, press, and related marketing,
              during and after the contest season, unless otherwise agreed in
              writing.
            </p>
            <p className="text-gray-600 leading-relaxed">
              You confirm that submitted materials do not infringe third-party
              rights and are not unlawful, defamatory, or obscene. Kenics may
              edit, crop, or refuse materials that do not meet our standards.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              6. Conduct and Disqualification
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Contestants and users must not:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Harass, defame, or threaten other contestants or users</li>
              <li>Attempt to hack, disrupt, or reverse-engineer the Site</li>
              <li>
                Manipulate votes, create fake accounts solely to abuse systems,
                or use stolen payment methods
              </li>
              <li>
                Misrepresent affiliation with Kenics or claim titles not awarded
              </li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">
              Breach may result in disqualification, removal of content,
              cancellation of votes, and/or reporting to authorities where
              appropriate.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              7. Winners and Results
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Public vote totals may form part of how leaders and winners are
              displayed. Kenics may also apply judging, show performance, or
              other published criteria for crowns and titles. Final results are
              as determined by Kenics. Where voting is stopped and a contest is
              deactivated, the Site may continue to display winners of the
              latest contest for historical/reference purposes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              8. Intellectual Property
            </h2>
            <p className="text-gray-600 leading-relaxed">
              The Site design, Kenics name, logos, branding, and original content
              are owned by Kenics or its licensors. You may not copy, scrape, or
              commercially exploit Site content without prior written
              permission, except for personal, non-commercial viewing.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              9. Disclaimer and Limitation of Liability
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              The Site is provided on an &quot;as is&quot; and &quot;as
              available&quot; basis. We do not warrant uninterrupted or
              error-free operation. To the fullest extent permitted by Nigerian
              law, Kenics is not liable for indirect, incidental, or
              consequential losses arising from use of the Site, registration,
              voting, or payment delays/failures by third-party processors.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Nothing in these Terms excludes liability that cannot be excluded
              by law (including for fraud or personal injury caused by
              negligence where applicable).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              10. Third-Party Services
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Payments are processed by Flutterwave and related payment
              partners. Your use of those services may also be subject to their
              terms. Cloud hosting and media storage providers may process data
              as described in our{" "}
              <Link href="/privacy" className="text-pink-600 hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              11. Changes to these Terms
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We may update these Terms from time to time. The &quot;Last
              updated&quot; date will change when we do. Continued use of the
              Site after changes constitutes acceptance of the revised Terms.
              Material changes affecting ongoing registrations may be
              communicated on the Site where practical.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              12. Governing Law
            </h2>
            <p className="text-gray-600 leading-relaxed">
              These Terms are governed by the laws of the Federal Republic of
              Nigeria. Disputes shall be subject to the courts of Nigeria,
              without prejudice to any mandatory consumer protections that
              apply.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              13. Contact
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              For questions about these Terms, contact us:
            </p>
            <ul className="list-none space-y-1 text-gray-600">
              <li>Email: info@kenicspageant.online</li>
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
            href="/privacy"
            className="px-6 py-3 bg-white text-pink-700 border border-pink-200 rounded-full hover:bg-pink-50 font-medium"
          >
            Privacy Policy
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
