import React from "react";

export default function VerifyEmail() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
            <svg
              className="h-8 w-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 8h18V8H3v8z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Verify your email
        </h1>

        <p className="text-gray-600 mb-6">
          We’ve sent a verification link to your email address. Please click the
          link to activate your account.
        </p>

        <button
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          onClick={() => alert("Resend verification email")}
        >
          Resend Email
        </button>

        <p className="text-sm text-gray-500 mt-6">
          Didn’t receive the email? Check your spam folder.
        </p>
      </div>
    </div>
  );
}
