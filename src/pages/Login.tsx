import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState<string[]>(["", "", "", "", ""]); // Array to store each digit
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]); // Refs for each input
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Check if the form is valid
  const isFormValid =
    username.length >= 5 && pin.every((digit) => digit.length === 1);

  // Handle input change for username
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  // Handle input change for PIN
  const handlePinChange = (index: number, value: string) => {
    // Allow only digits
    if (!/^\d*$/.test(value)) return;

    // Update the pin array
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Auto-focus the next input
    if (value && index < 4 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      e.key === "Backspace" &&
      !pin[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const fullPin = pin.join(""); // Combine the PIN digits

      //   // Simulate a backend request
      //   const response = await fetch("https://your-backend-api.com/login", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ username, pin: fullPin }),
      //   });

      //   if (!response.ok) {
      //     const errorData = await response.json();
      //     throw new Error(
      //       errorData.message || "Login failed. Please check your credentials."
      //     );
      //   }

      //   const data = await response.json();
      //   console.log("Login successful:", data);

      console.log("pin: ", fullPin);
      // Handle successful login (e.g., redirect to dashboard)
      navigate("/");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side: Image Section */}
      <div
        className="hidden lg:block w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: `url('/oldmoney.jpg')` }}
      >
        {/* Overlay Text */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 p-4 rounded text-center">
          <p className="text-white text-lg font-light">
            "Style is a way to say who you are without speaking."
          </p>
        </div>
      </div>

      {/* Right Side: Login Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-lg bg-white p-10 rounded-lg shadow-lg">
          {/* Brand Logo */}
          <img src="/logo.png" alt="Brand Logo" className="w-24 mx-auto mb-6" />

          <form className="space-y-8" onSubmit={handleLogin}>
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-lg font-medium text-gray-600"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Enter your username"
                className="w-full mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                required
              />
            </div>
            {/* PIN Input Fields */}
            <div className="flex justify-center space-x-4">
              {pin.map((digit, index) => (
                <input
                  key={index}
                  type="password" // Use type="password" to hide the digits
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handlePinChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => (inputRefs.current[index] = el)} // Store ref for each input
                  className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              ))}
            </div>
            {/* Error Message */}
            {error && (
              <div className="text-red-500 text-center text-lg">{error}</div>
            )}
            {/* Sign-In Button */}
            <button
              type="submit"
              className={`w-full py-4 text-white font-bold rounded-lg transition duration-300 text-xl ${
                isFormValid
                  ? "bg-blue-700 hover:bg-blue-800"
                  : "bg-blue-400 cursor-not-allowed"
              }`}
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? "Logging in..." : "Sign In"}
            </button>
          </form>
          {/* Additional Links */}
          <div className="mt-8 text-center">
            <p className="text-lg text-gray-600">
              Don’t have an account?{" "}
              <a href="/signup" className="text-blue-500 hover:underline">
                Sign up
              </a>
            </p>
            <p className="text-lg text-gray-600 mt-4">
              <a href="/forgot-pin" className="text-blue-500 hover:underline">
                Forgot your PIN?
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
