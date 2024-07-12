import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="bg-white py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">Contact Us</h2>
        <form className="max-w-lg mx-auto">
          <div className="mb-4">
            <input type="text" placeholder="Name" className="w-full p-3 border rounded" />
          </div>
          <div className="mb-4">
            <input type="email" placeholder="Email" className="w-full p-3 border rounded" />
          </div>
          <div className="mb-4">
            <textarea placeholder="Message" className="w-full p-3 border rounded h-32"></textarea>
          </div>
          <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-500 transition duration-300">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
