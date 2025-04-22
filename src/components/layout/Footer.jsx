import { Link } from 'react-router-dom'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 bg-white border-black border-t-3">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo and tagline */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-bold text-black">
              FUND<span className="text-primary-500">CHAIN</span>
            </Link>
            <p className="mt-2 text-neutral-600">
              Decentralized crowdfunding powered by blockchain technology
            </p>
          </div>

          {/* Links section 1 */}
          <div className="col-span-1">
            <h3 className="mb-3 text-lg font-bold">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/explore" className="text-neutral-600 hover:text-primary-500">
                  Browse Projects
                </Link>
              </li>
              <li>
                <Link to="/create" className="text-neutral-600 hover:text-primary-500">
                  Start a Project
                </Link>
              </li>
              <li>
                <Link to="/" className="text-neutral-600 hover:text-primary-500">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Links section 2 */}
          <div className="col-span-1">
            <h3 className="mb-3 text-lg font-bold">About</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-600 hover:text-primary-500">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/" className="text-neutral-600 hover:text-primary-500">
                  Team
                </Link>
              </li>
              <li>
                <Link to="/" className="text-neutral-600 hover:text-primary-500">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Links section 3 */}
          <div className="col-span-1">
            <h3 className="mb-3 text-lg font-bold">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-600 hover:text-primary-500">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/" className="text-neutral-600 hover:text-primary-500">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/" className="text-neutral-600 hover:text-primary-500">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 mt-8 border-t-2 border-neutral-200">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 md:mb-0">
              <p className="text-neutral-600">
                &copy; {currentYear} FundChain. All rights reserved.
              </p>
            </div>
            <div className="flex flex-col items-center text-sm md:flex-row md:space-x-6 text-neutral-600">
              <div className="flex mb-2 space-x-6 md:mb-0">
                <Link to="/" className="hover:text-primary-500">Terms</Link>
                <Link to="/" className="hover:text-primary-500">Privacy</Link>
                <Link to="/" className="hover:text-primary-500">Cookies</Link>
              </div>
              <div className="text-right">
                <p className="text-neutral-600">
                  Created by{' '}
                  <a
                    href="https://www.linkedin.com/in/arshadzama"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-500 hover:underline"
                  >
                    Arshad Zama
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer