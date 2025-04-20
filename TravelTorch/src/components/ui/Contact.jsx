import React, { useState } from 'react';
import msg_icon from '../../assets/msg-icon.png';
import mail_icon from '../../assets/mail-icon.png';
import phone_icon from '../../assets/phone-icon.png';
import location_icon from '../../assets/location-icon.png';

const Contact = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "69f97cf5-2589-40c7-9feb-66ab6dd7dae3");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (

    <div className="max-w-[90%] mx-auto my-20 flex flex-col md:flex-row justify-between items-center gap-8">
         <h2 className="text-3xl font-bold text-center mb-6">Connect With Us</h2>
      <div className="w-full md:w-[48%] text-[#676767]">
        <h3 className="text-[#000F38] font-medium text-2xl flex items-center mb-5">
          Write to Us <img src={msg_icon} alt="" className="w-9 ml-3" />
        </h3>
        <p className="max-w-[450px] leading-relaxed">
          We would love to hear from you! Whether you have a question about 
          our services, need assistance, or want to provide feedback, feel 
          free to reach out. Our team is here to help and ensure you have 
          the best experience possible. Contact us today via phone, email, 
          or the contact form below, and we'll get back to you promptly.
        </p>
        <ul className="mt-6">
          <li className="flex items-center my-5">
            <img src={mail_icon} alt="" className="w-6 mr-3" />
            Info@TravelTorch.com
          </li>
          <li className="flex items-center my-5">
            <img src={phone_icon} alt="" className="w-6 mr-3" />
            +9779818236152
          </li>
          <li className="flex items-center my-5">
            <img src={location_icon} alt="" className="w-6 mr-3" />
            Itahari-4, Sunsari, Nepal
          </li>
        </ul>
      </div>
      <div className="w-full md:w-[48%]">
        <form onSubmit={onSubmit} className="flex flex-col">
          <label className="mb-1">Your Name</label>
          <input 
            type="text" 
            name="name" 
            placeholder="Enter your name" 
            required 
            className="w-full bg-[#EBECFE] p-4 border-0 outline-0 mb-4 mt-1"
          />
          <label className="mb-1">Phone Number</label>
          <input 
            type="tel" 
            name="phone" 
            placeholder="Enter your phone number" 
            required 
            className="w-full bg-[#EBECFE] p-4 border-0 outline-0 mb-4 mt-1"
          />
          <label className="mb-1">Write your message here</label>
          <textarea 
            name="message" 
            rows={6} 
            placeholder="Enter your message" 
            required 
            className="w-full bg-[#EBECFE] p-4 border-0 outline-0 mb-4 mt-1 resize-none"
          ></textarea>
          <button 
            type="submit" 
            className="bg-[#212EA0] text-white py-3 px-6 rounded cursor-pointer text-base font-medium hover:bg-[#000F38] transition duration-300"
          >
            Submit Now
          </button>
        </form>
        <span className="block my-5">{result}</span>
      </div>
    </div>
  );
}

export default Contact;