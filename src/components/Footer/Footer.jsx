

import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-[#F3F4F6] border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-wrap -mx-6">
          {/* Logo and copyright */}
          <div className="w-full md:w-1/2 lg:w-4/12 px-6 mb-10 md:mb-0">
            <div className="flex flex-col h-full justify-between">
              <p className="text-sm text-gray-600">
                &copy; {new Date().getFullYear()} All Rights Reserved by <span className="text-[#4F46E5] font-semibold">Syed Samad Ali`</span>.
              </p>
            </div>
          </div>

          {/* Company Links */}
          <div className="w-full md:w-1/2 lg:w-2/12 px-6 mb-8 lg:mb-0">
            <h3 className="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Company
            </h3>
            <ul className="space-y-3">
              {['Features', 'Pricing', 'Affiliate Program', 'Press Kit'].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-gray-700 hover:text-[#4F46E5] text-base">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="w-full md:w-1/2 lg:w-2/12 px-6 mb-8 lg:mb-0">
            <h3 className="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Support
            </h3>
            <ul className="space-y-3">
              {['Account', 'Help', 'Contact Us', 'Customer Support'].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-gray-700 hover:text-[#4F46E5] text-base">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="w-full md:w-1/2 lg:w-3/12 px-6">
            <h3 className="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Legals
            </h3>
            <ul className="space-y-3">
              {['Terms & Conditions', 'Privacy Policy', 'Licensing'].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-gray-700 hover:text-[#4F46E5] text-base">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
