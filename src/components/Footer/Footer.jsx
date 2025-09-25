import React from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '../index'

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-12 border-t-2 border-white/20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap -m-6">
          
          {/* Logo & copyright */}
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex flex-col h-full justify-between">
              <div className="mb-4 flex items-center space-x-3">
                <Logo width="100px" />
                <span className="font-bold text-lg">Vibeboard</span>
              </div>
              <p className="text-sm text-white/70">
                &copy; 2025 MyBlog. All Rights Reserved.
              </p>
            </div>
          </div>

          {/* Company links */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-wider text-white/70">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-white transition">Features</Link></li>
              <li><Link to="/" className="hover:text-white transition">Pricing</Link></li>
              <li><Link to="/" className="hover:text-white transition">Affiliate Program</Link></li>
              <li><Link to="/" className="hover:text-white transition">Press Kit</Link></li>
            </ul>
          </div>

          {/* Support links */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-wider text-white/70">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-white transition">Account</Link></li>
              <li><Link to="/" className="hover:text-white transition">Help</Link></li>
              <li><Link to="/" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link to="/" className="hover:text-white transition">Customer Support</Link></li>
            </ul>
          </div>

          {/* Legal links */}
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-wider text-white/70">Legals</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-white transition">Terms &amp; Conditions</Link></li>
              <li><Link to="/" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-white transition">Licensing</Link></li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer
