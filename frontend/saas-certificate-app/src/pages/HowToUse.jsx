import React from "react";

const HowToUse = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 py-10 px-4 flex flex-col items-center">
    <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-6">
      <h1 className="text-3xl font-extrabold text-blue-700 mb-2 text-center">How to Use DigiCertificate</h1>
      <p className="text-gray-700 text-lg mb-4 text-center">
        Welcome to DigiCertificate! This guide will walk you through the process of managing an event and issuing digital certificates to your participants.
      </p>
      <ol className="list-decimal list-inside space-y-6 text-gray-800">
        <li>
          <span className="font-bold text-blue-600">Sign In as Admin:</span>
          <ul className="list-disc list-inside ml-6 mt-1 text-gray-600">
            <li>Click on the <span className="font-semibold">Sign In</span> button in the navigation bar.</li>
            <li>Authenticate using your organization credentials or preferred method.</li>
            <li>If you are organizer, and you don't have an account, you can request an account by clicking on the <span className="font-semibold">Request Account</span> link below the sign in button.</li>
          </ul>
        </li>
        <li>
          <span className="font-bold text-blue-600">Create a New Event:</span>
          <ul className="list-disc list-inside ml-6 mt-1 text-gray-600">
            <li>Go to the <span className="font-semibold">Admin Panel</span> after signing in.</li>
            <li>Click <span className="font-semibold">Create New Event</span> and fill in the event details (name, description, date, etc.).</li>
            <li>Submit the form to create your event.</li>
          </ul>
        </li>
        <li>
          <span className="font-bold text-blue-600">Upload Certificate Template:</span>
          <ul className="list-disc list-inside ml-6 mt-1 text-gray-600">
            <li>For each event, upload a certificate template image (PNG/JPG) using the <span className="font-semibold">Upload Template</span> button.</li>
            <li>Set the placeholder position for participant names on the template.</li>
          </ul>
        </li>
        <li>
          <span className="font-bold text-blue-600">Upload Participants List:</span>
          <ul className="list-disc list-inside ml-6 mt-1 text-gray-600">
            <li>Prepare an Excel sheet with participant details (e.g., Name, Email, Registration Number).</li>
            <li>Use the <span className="font-semibold">Upload Participant Excel Sheet</span> button to upload the file for the relevant event.</li>
            <li>Review the preview and save the participants to the database.</li>
          </ul>
        </li>
        <li>
          <span className="font-bold text-blue-600">Share Certificate Link:</span>
          <ul className="list-disc list-inside ml-6 mt-1 text-gray-600">
            <li>Copy the <span className="font-semibold">Shareable Link</span> for your event from the Admin Panel.</li>
            <li>Distribute this link to your registered participants.</li>
          </ul>
        </li>
        <li>
          <span className="font-bold text-blue-600">Participants Generate Certificates:</span>
          <ul className="list-disc list-inside ml-6 mt-1 text-gray-600">
            <li>Participants open the link, enter their email or registration number, and (optionally) their name.</li>
            <li>If they are registered, they can view and download their certificate as an image or PDF.</li>
            <li>Each registration number can only be used once to prevent duplicate certificates.</li>
          </ul>
        </li>
        <li>
          <span className="font-bold text-blue-600">Manage and Edit Events:</span>
          <ul className="list-disc list-inside ml-6 mt-1 text-gray-600">
            <li>Edit event details, update templates, or manage participants anytime from the Admin Panel.</li>
          </ul>
        </li>
      </ol>
      <div className="mt-8 text-center text-gray-500 text-sm">
        Need more help? Contact support or refer to the documentation.<br/>
        <span className="italic">Happy certifying!</span>
      </div>
    </div>
  </div>
);

export default HowToUse; 