import React from "react";

const AboutUs = () => (
  <div className="min-h-[80vh] bg-gradient-to-br from-blue-100 via-white to-blue-50 py-10 px-4 flex flex-col items-center">
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-6">
      <h1 className="text-3xl font-extrabold text-blue-700 mb-2 text-center">About Us</h1>
      <p className="text-gray-700 text-lg mb-4 text-center">
        <span className="font-bold">DigiCertificate</span> is a modern platform designed to help universities, organizations, and event managers easily create, manage, and distribute digital certificates. Our mission is to make certificate management secure, efficient, and accessible for everyone.
      </p>
      <p className="text-gray-600 text-base text-center">
        Whether you are hosting a small workshop or a large conference, DigiCertificate streamlines the process of issuing certificates, ensuring authenticity and preventing misuse.
      </p>
      <div className="mt-6 text-center text-gray-500 text-sm">
        Created and maintained by <span className="font-semibold">M Umer Farooq</span>.<br/>
        For feedback or support, please get in touch!
      </div>
    </div>
  </div>
);

export default AboutUs; 