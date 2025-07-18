import React from 'react';

export default function Contact() {
  return (
    <section className="min-h-screen px-6 py-16 bg-blue-50">
      
      <h1 className="text-4xl md:text-5xl font-bold text-center text-blue-700 mb-6">Contact Us</h1>
      
      <form className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md space-y-5">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input 
            type="text" 
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            required 
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input 
            type="email" 
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            required 
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Message</label>
          <textarea 
            rows="4" 
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            required 
          ></textarea>
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Send Message
        </button>
      </form>
    </section>

     
     
      
  



  );
}
