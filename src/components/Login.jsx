import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { login as authLogin } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import authService from '../appwriter/Auth';
import { Logo, Input, Button } from './index';

function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      const userData = await authService.getCurrentUser();

      if (userData) {
        dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message || "Login failed. Check credentials or CORS.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <Logo width="100px" />
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl font-bold text-gray-800">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Don&apos;t have an account?{' '}
          <Link
            to="/signup"
            className="font-medium text-indigo-600 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {/* Error */}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit(login)} className="mt-6 space-y-5">
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            {...register("password", { required: "Password is required" })}
            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition duration-300 rounded-lg py-2"
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
