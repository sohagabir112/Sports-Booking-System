'use client';
import React from 'react';
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';
import { handleGoogleLogin } from '../login/page';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const router = useRouter();
  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.image,
    });
    if (data) {
      toast.success('Registration Successful');
      router.push('/login');
    }
    if (error) {
      toast.error(`${error.message}`);
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md bg-white dark:bg-[#151C2C] rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-8 transition-colors duration-300">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mt-6">
              Create Account
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3">
              Join SportNest and start booking sports facilities easily.
            </p>
          </div>

          <Form className="mt-10 space-y-5" onSubmit={handleRegister}>
            <TextField isRequired name="name" className="text-slate-800 dark:text-slate-100">
              <Label className="text-slate-700 dark:text-slate-300">Full Name</Label>
              <Input className="w-full rounded-xl bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700" placeholder="Enter your full name" />
              <FieldError />
            </TextField>

            <TextField
              isRequired
              name="email"
              type="email"
              className="text-slate-800 dark:text-slate-100"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }
                return null;
              }}
            >
              <Label className="text-slate-700 dark:text-slate-300">Email Address</Label>
              <Input className="w-full rounded-xl bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700" placeholder="Enter your email address" />
              <FieldError />
            </TextField>

            <TextField isRequired name="image" className="text-slate-800 dark:text-slate-100">
              <Label className="text-slate-700 dark:text-slate-300">Photo URL</Label>
              <Input className="w-full rounded-xl bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700" placeholder="Enter your photo URL" />
              <FieldError />
            </TextField>

            <TextField
              isRequired
              minLength={6}
              name="password"
              type="password"
              className="text-slate-800 dark:text-slate-100"
              validate={(value) => {
                if (value.length < 6) {
                  return "Password must be at least 6 characters";
                }

                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }

                if (!/[a-z]/.test(value)) {
                  return "Password must contain at least one lowercase letter";
                }

                return null;
              }}
            >
              <Label className="text-slate-700 dark:text-slate-300">Password</Label>
              <Input className="w-full rounded-xl bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700" placeholder="Enter your password" />
              <Description className="text-slate-400 dark:text-slate-500 text-xs mt-1">
                Must contain at least 6 characters, one uppercase and one
                lowercase letter.
              </Description>
              <FieldError />
            </TextField>

            <Button
              type="submit"
              className="w-full h-12 rounded-xl bg-linear-to-l from-[#24B1B1] to-[#007979] hover:opacity-90 text-white font-semibold text-base btn border-none"
            >
              Register
            </Button>
          </Form>

          <div className="divider text-slate-400 dark:text-slate-500 my-8">OR</div>

          <button
            onClick={handleGoogleLogin}
            className="w-full btn rounded-xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700 hover:border-[#24B1B1] dark:hover:border-[#24B1B1] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium transition duration-300 flex items-center justify-center gap-3 cursor-pointer"
          >
            <FcGoogle className="text-2xl" />
            Continue with Google
          </button>

          <p className="text-center text-slate-500 dark:text-slate-400 mt-8">
            Already have an account?
            <Link href={"/login"} className="text-[#24B1B1] hover:text-[#007979] font-semibold ml-1">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;