// components/ContactSection.jsx
import React from 'react';

const ContactSection = () => {
  return (
    <section className="bg-gray-100 py-10 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
            <p className="mb-4">Have questions about our packages or need help with your booking? Reach out to us!</p>
            <div className="space-y-3">
              <p>📞 +977 9801234567</p>
              <p>📧 info@traveltornepal.com</p>
              <p>📍 Thamel, Kathmandu, Nepal</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Send Us a Message</h3>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full p-3 border border-gray-300 rounded" />
              <input type="email" placeholder="Your Email" className="w-full p-3 border border-gray-300 rounded" />
              <textarea placeholder="Your Message" rows="4" className="w-full p-3 border border-gray-300 rounded"></textarea>
              <button type="submit" className="bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700 transition">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
