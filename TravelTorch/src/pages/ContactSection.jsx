import React from 'react';

const ContactSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-50 via-white to-blue-100 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Contact Info */}
          <div className="bg-white shadow-lg rounded-2xl p-8">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">Get in Touch</h3>
            <p className="text-gray-600 mb-6">
              Have questions about our packages or need help with your booking? We'd love to hear from you!
            </p>
            <div className="space-y-4 text-gray-700">
              <p><span className="font-semibold">📞 Phone:</span> +977 9818236152</p>
              <p><span className="font-semibold">📧 Email:</span> info@traveltornepal.com</p>
              <p><span className="font-semibold">📍 Location:</span> Itahari, Sunsari, Nepal</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white shadow-lg rounded-2xl p-8">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">Send Us a Message</h3>
            <form className="space-y-5">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition" 
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition" 
              />
              <textarea 
                placeholder="Your Message" 
                rows="4" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              ></textarea>
              <button 
                type="submit" 
                className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-white hover:text-gray-700 transition font-semibold"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
