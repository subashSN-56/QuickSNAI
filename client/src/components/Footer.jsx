import React from 'react'
import logo from '../assets/tom.jpg' // Replace with your actual logo path

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-10 w-full text-gray-500 bg-white border-t border-gray-200">
      <div className="flex flex-col md:flex-row justify-between gap-10 border-b border-gray-200 pb-6">
        
        {/* Logo & Description */}
        <div className="md:max-w-md">
          <img src={logo} alt="Company Logo" className="w-36 mb-4" />
          <p className="text-sm">
            Empowering your creativity with cutting-edge AI tools. 
            Join thousands of creators revolutionizing their workflow.
          </p>
        </div>

        {/* Links & Contact */}
        <div className="flex-1 flex flex-col sm:flex-row gap-10 sm:justify-end">
          <div>
            <h2 className="font-semibold mb-4 text-gray-800">AI Tool's</h2>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary">Home</a></li>
              <li><a href="#" className="hover:text-primary">About us</a></li>
              <li><a href="#" className="hover:text-primary">Contact</a></li>
              <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-4 text-gray-800">Contact</h2>
            <ul className="space-y-2 text-sm">
              <li>📞 +91 8524881862</li>
              <li>📧 subash852488@gmail.com</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <p className="pt-6 text-center text-xs md:text-sm text-gray-400">
        © {new Date().getFullYear()} S🩷N. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
