import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa6";
import { apiService } from "../api/axios";

function NewLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Send login request with credentials
      await apiService.postData(`/api/v1/users/login`, {
        username: username,
        password: password,
      });

      window.location.href = '/dashboard';
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="h-screen grid grid-cols-2 bg-[#C39774] rounded-2xl border border-white">
      {/* Left Side: Image */}
      <div
        className="bg-cover bg-no-repeat bg-center rounded-2xl border border-white"
        style={{
          backgroundImage: `url('/login-left-image.jpg')`,
          backgroundPosition: "top",
        }}
      ></div>

      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Title */}
          <h1 className="text-center text-7xl font-normal  mb-6">Kirish</h1>
          <h3 className="text-center text-base font-thin mb-6 ">
            Ma'lumotlaringizni to'ldiring
          </h3>

          {/* Username Field */}
          <div className="mb-4">
            <input
              type="text"
              id="fullname"
              className="mt-4 block w-full px-8 py-8 border border-gray-600 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="USERNAME"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div className="my-8">
            <input
              type="password"
              id="password"
              className="mt-4 block w-full px-8 py-8 border border-gray-600 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="PAROL"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}

          {/* Next Button */}
          <div className="flex justify-center">
            <button
              type="button"
              className="
              w-2/3 bg-[#B48E5D] text-black text-3xl 
              py-4 px-6 rounded-3xl border ring-white 
              hover:bg-[#8d6838] focus:outline-none focus:ring-2 focus:ring-blue-500
              flex items-center justify-center gap-2"
              onClick={handleLogin}
            >
              KEYINGISI
              <FaPlay className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewLogin;
