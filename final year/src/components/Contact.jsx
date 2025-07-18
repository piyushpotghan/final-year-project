import React from 'react';

export default function Contact() {
  return (
  <section class="py-16 bg-gray-100">
  <div class="max-w-4xl mx-auto px-4 space-y-12">
   
    <div class="text-center space-y-2">
      <h2 class="text-3xl font-bold text-gray-900">Get In Touch</h2>
      <p class="text-gray-600">Feel free to contact us? submit your queries here and we will get back to you as soon as possible.</p>
    </div>


    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
 
      <div class="bg-white rounded-xl p-6 flex flex-col items-center space-y-3 shadow">
        <svg class="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" stroke-width="2"
          viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round"
          d="M12 11c1.66 0 3-1.34 3-3S13.66 5 12 5 9 6.34 9 8s1.34 3 3 3z"/>
          <path stroke-linecap="round" stroke-linejoin="round"
          d="M12 11c-3.33 0-6 2.42-6 5.41V19h12v-2.59C18 13.42 15.33 11 12 11z"/></svg>
        <p class="text-center text-gray-700"> Pune, Maharashtra, India </p>
      </div>

      <div class="bg-indigo-600 rounded-xl p-6 flex flex-col items-center space-y-3 text-white shadow-lg">
        <svg class="h-8 w-8 opacity-90" fill="none" stroke="currentColor" stroke-width="2"
          viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round"
          d="M3 5h2l3.6 7.59a1 1 0 0 0 .92.41h7.7a1 1 0 0 0 .94-.68l1.4-4.2a1 1 0 0 0-.24-.97L17 4H7"/>
          <path stroke-linecap="round" stroke-linejoin="round"
          d="M16 10a4 4 0 1 1-8 0"/></svg>
        <p>+91 9876543210</p>
      </div>

    
      <div class="bg-white rounded-xl p-6 flex flex-col items-center space-y-3 shadow">
        <svg class="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" stroke-width="2"
          viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round"
          d="M16 12v.01M8 12v.01M12 12v.01M21 12c0 4.97-4.03 9-9 9S3 16.97 3 12 7.03 3 12 3s9 4.03 9 9z"/>
          <path stroke-linecap="round" stroke-linejoin="round"
          d="M21 12H3"/></svg>
        <p> support@medicare.com</p>
      </div>
    </div>

    
    <div class="bg-white rounded-xl p-8 shadow-lg">
      <h3 class="text-xl font-semibold text-center text-gray-900 mb-6">Send Us Message</h3>
      <form class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input type="text" placeholder="Name" required
          class="px-4 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-indigo-500"/>
        <input type="email" placeholder="Email" required
          class="px-4 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-indigo-500"/>
        <input type="tel" placeholder="Phone"
          class="px-4 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-indigo-500"/>
        <select placeholder="Subject"
          class="px-4 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-indigo-500">
          <option>Subject</option>
          <option>Support</option>
          
          <option>General Inquiry</option>
        </select>
        <textarea rows="4" placeholder="Write Message..." required
          class="md:col-span-2 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"></textarea>
        <button type="submit"
          class="md:col-span-2 bg-gray-900 text-white py-3 rounded-full hover:bg-gray-800 transition">
          Submit
        </button>
      </form>
    </div>
  </div>
</section>




  );
}
