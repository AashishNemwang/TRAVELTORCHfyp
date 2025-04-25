import React, { useState } from 'react';

const PackageBooking = () => {
  const [bookingData, setBookingData] = useState({
    travelers: 1,
    specialRequests: '',
    contactPhone: '',
    paymentMethod: 'credit',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    agreeTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  
  const packageData = {
    name: "Amazon Jungle Adventure",
    destination: "Manaus, Brazil",
    type: "Adventure",
    price: 1299,
    startDate: "2023-12-15",
    endDate: "2023-12-22",
    duration: "7 days / 6 nights",
    description: "Explore the heart of the Amazon rainforest with expert guides.",
    photo: "amazon-adventure.jpg"
  };

  const calculateTotal = () => {
    return packageData.price * bookingData.travelers;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Book Your Adventure</h1>
          <p className="mt-2 text-lg text-gray-600">
            Complete your booking for: <span className="font-semibold">{packageData.name}</span>
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          <div className="md:w-1/3">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="bg-gray-200 h-48 flex items-center justify-center">
                <span className="text-gray-500">Package Image</span>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900">{packageData.name}</h2>
                <p className="text-gray-600 mt-1">{packageData.destination}</p>
                
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Package Type:</span>
                    <span className="font-medium">{packageData.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{packageData.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dates:</span>
                    <span className="font-medium">
                      {new Date(packageData.startDate).toLocaleDateString()} - {new Date(packageData.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price per person:</span>
                    <span className="font-medium">${packageData.price.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="md:w-2/3">
            <div className="bg-white shadow rounded-lg p-6">
              <form className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Traveler Information</h2>
                  <p className="mt-1 text-sm text-gray-500">Enter details for all travelers</p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="travelers" className="block text-sm font-medium text-gray-700">
                      Number of Travelers *
                    </label>
                    <select
                      name="travelers"
                      id="travelers"
                      value={bookingData.travelers}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      name="contactPhone"
                      id="contactPhone"
                      value={bookingData.contactPhone}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700">
                    Special Requests
                  </label>
                  <textarea
                    name="specialRequests"
                    id="specialRequests"
                    rows={3}
                    value={bookingData.specialRequests}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Dietary restrictions, accessibility needs, etc."
                  />
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Payment Information</h2>
                  <p className="mt-1 text-sm text-gray-500">All transactions are secure and encrypted</p>
                </div>

                <div>
                  <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
                    Payment Method *
                  </label>
                  <select
                    name="paymentMethod"
                    id="paymentMethod"
                    value={bookingData.paymentMethod}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="credit">Credit Card</option>
                    <option value="debit">Debit Card</option>
                    <option value="paypal">PayPal</option>
                  </select>
                </div>

                {['credit', 'debit'].includes(bookingData.paymentMethod) && (
                  <>
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        id="cardNumber"
                        value={bookingData.cardNumber}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700">
                          Expiration Date *
                        </label>
                        <input
                          type="text"
                          name="cardExpiry"
                          id="cardExpiry"
                          value={bookingData.cardExpiry}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="MM/YY"
                        />
                      </div>

                      <div>
                        <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700">
                          CVC *
                        </label>
                        <input
                          type="text"
                          name="cardCvc"
                          id="cardCvc"
                          value={bookingData.cardCvc}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="agreeTerms"
                      name="agreeTerms"
                      type="checkbox"
                      checked={bookingData.agreeTerms}
                      onChange={handleChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="agreeTerms" className="font-medium text-gray-700">
                      I agree to the Terms and Conditions and Privacy Policy *
                    </label>
                    <p className="text-gray-500">You'll receive a booking confirmation email with all details.</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Confirm Booking (${calculateTotal().toFixed(2)})
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageBooking;