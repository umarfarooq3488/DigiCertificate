import React from "react";

const features = [
  {
    title: "Easy Certificate Generation",
    desc: "Admins can upload templates and set name positions visually. No more manual errors!",
    icon: "🎨",
  },
  {
    title: "Instant Access",
    desc: "Participants enter their name and instantly view/download their certificate.",
    icon: "⚡",
  },
  {
    title: "Cloud Storage",
    desc: "Templates and certificates are securely stored in the cloud.",
    icon: "☁️",
  },
  {
    title: "Error-Free",
    desc: "Names are entered by participants, reducing spelling mistakes and admin workload.",
    icon: "✅",
  },
];

const Home = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-50">
    {/* Hero Section */}
    <section className="flex-1 flex flex-col justify-center items-center py-16 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200/40 to-transparent pointer-events-none" />
      <div className="relative z-10 w-full max-w-3xl text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-800 leading-tight drop-shadow">
          Welcome to <span className="text-blue-500">DigiCertificate</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-8">
          Effortlessly generate, share, and download event certificates. Organizers can upload templates, and participants can claim their certificates with zero hassle and zero errors.
        </p>
        <a
          href="/signin"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition mb-4"
        >
          Get Started
        </a>
      </div>
    </section>

    {/* Features Section */}
    <section className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-12 px-4">
      {features.map((feature, idx) => (
        <div
          key={idx}
          className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition"
        >
          <div className="text-5xl mb-4">{feature.icon}</div>
          <h3 className="font-bold text-xl mb-2 text-blue-700">{feature.title}</h3>
          <p className="text-gray-500 text-base">{feature.desc}</p>
        </div>
      ))}
    </section>
  </div>
);

export default Home;