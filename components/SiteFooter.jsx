import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-pink-500 mb-4">KENICS</h3>
            <p className="text-gray-400 text-sm">
              Celebrating beauty, grace, and empowerment.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/models" className="text-gray-400 hover:text-white">
                  Models
                </Link>
              </li>
              <li>
                <Link href="/voting" className="text-gray-400 hover:text-white">
                  Voting
                </Link>
              </li>
              <li>
                <Link href="/winners" className="text-gray-400 hover:text-white">
                  Winners
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Warri, Delta State, Nigeria</li>
              <li>info@kenicspageant.com</li>
              <li>+234 800 000 0000</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Get Involved</h4>
            <Link
              href="/register"
              className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded-full text-sm font-medium transition"
            >
              Apply Now
            </Link>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Kenics Pageant. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
