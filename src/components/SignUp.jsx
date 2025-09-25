import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import authService from '../appwriter/Auth';
import { Logo, Input, Button } from './index';
import { useForm } from 'react-hook-form';

function SignUp() {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const create = async (data) => {
        setError("");
        try {
            if (data) {
                const session = await authService.createAccount(data);
                if (session) {
                    const userData = await authService.getCurrentUser();
                    if (userData) {
                        dispatch(login(userData));
                        navigate("/");
                    }
                }
            }
        } catch (err) {
            setError(err.message || "Signup failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
            <div className="mx-auto w-full max-w-lg bg-white rounded-xl p-10 shadow-lg border border-gray-200">
                <div className="mb-4 flex justify-center">
                    <Logo width="100px" />
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">
                    Sign up to create account
                </h2>
                <p className="mt-2 text-center text-base text-gray-600">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-indigo-600 hover:underline transition duration-200"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-500 text-center mt-3">{error}</p>}
                <form onSubmit={handleSubmit(create)} className="mt-8">
                    <div className="space-y-5">
                        <Input
                            label="Name"
                            placeholder="Enter your name"
                            type="text"
                            {...register("name", { required: true })}
                        />
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Enter a valid email address",
                                },
                            })}
                        />
                        <Input
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            {...register("password", { required: true })}
                        />
                        <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
