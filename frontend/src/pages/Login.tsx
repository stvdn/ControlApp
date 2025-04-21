import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { loginAPI } from '../api/authAPI';

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      try{
        await login(email, password);
        navigate("/");
      } catch (error) {
        setError("Login Failed");
      }
    };

    return (
      <div className="flex items-center justify-center min-h-screen text-text-base">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-border-color bg-gradient-to-r from-pink-200 to-purple-200">
          <h2 className="text-2xl font-semibold mb-6 text-center text-secondary">Sign In</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="bg-pink-50 shadow-md border rounded-lg w-full py-3 px-4 focus:outline-none focus:ring-2 transition-all duration-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-text-base text-sm font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="bg-pink-50 shadow-md border rounded-lg w-full py-3 px-4 focus:outline-none focus:ring-2 transition-all duration-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-pink-50 hover:bg-purple-500 hover:text-white font-bold py-3 px-6 rounded-lg w-full"
            >
              Sign In
            </button>

            {/* Error Display */}
            {error && (
              <div className="bg-error-bg border border-error text-error px-4 py-3 rounded-lg relative" role="alert">
                <strong className="font-bold">Error:</strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
          </form>
        </div>
      </div>

    );
}