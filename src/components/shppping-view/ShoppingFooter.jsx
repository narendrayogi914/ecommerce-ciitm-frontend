import React from "react";

function ShoppingFooter() {
  return (
    <footer className="bg-white-900 text-black py-10 px-5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-10">
        {/* About Us */}
        <div className="md:w-1/3">
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-sm text-black-300">
            Your favorite place to shop the latest fashion trends at unbeatable
            prices.
          </p>
        </div>

        {/* Customer Service */}
        <div className="md:w-1/3">
          <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
          <ul className="space-y-2 text-sm text-black-300">
            <li>
              <a href="#" className="hover:text-blue transition">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue transition">
                Returns
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue transition">
                Shipping
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue transition">
                FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="md:w-1/3">
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="text-gray-300 hover:text-white transition">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="text-center mt-8 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} E Commerce. All rights reserved.
      </div>
    </footer>
  );
}

export default ShoppingFooter;
