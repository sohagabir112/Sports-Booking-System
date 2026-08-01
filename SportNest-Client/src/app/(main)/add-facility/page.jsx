"use client";
import { authClient } from '@/lib/auth-client';
import { Button, Form, Input, Label, TextField } from '@heroui/react';
import { redirect } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';

const AddFacilityPage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fieldData = Object.fromEntries(formData.entries());

    const facility = {
      ...fieldData,
      owner_email: user?.email,
    };
    facility.available_slots = facility.available_slots.split(",").map((slot) => slot.trim());

    const { data: tokenData } = await authClient.token();
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facility`, {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${tokenData?.token}`
      },
      body: JSON.stringify(facility)
    });
    const data = await res.json();
    toast.success("Facility added successfully");
    redirect('/all-facilities');
  };

  return (
    <div>
      <div className="min-h-screen py-16 px-6">
        <div className="max-w-3xl mx-auto bg-white dark:bg-[#151C2C] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-8 transition-colors duration-300">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-slate-800 dark:text-slate-100">
              Add New
              <span className="bg-linear-to-l from-[#24B1B1] to-[#007979] bg-clip-text text-transparent">
                {" "}Facility
              </span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-4">
              Add a sports facility and make it available for booking.
            </p>
          </div>

          <Form onSubmit={onSubmit} className="mt-10 flex flex-col gap-5">
            <TextField isRequired className="text-slate-800 dark:text-slate-100">
              <Label className="text-slate-700 dark:text-slate-300">Facility Name</Label>
              <Input
                className="w-full rounded-xl bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700"
                name="name"
                placeholder="Elite Football Turf"
              />
            </TextField>

            <TextField isRequired className="text-slate-800 dark:text-slate-100">
              <Label className="text-slate-700 dark:text-slate-300">Facility Type</Label>
              <Input
                className="w-full rounded-xl bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700"
                name="facility_type"
                placeholder="Football"
              />
            </TextField>

            <TextField isRequired className="text-slate-800 dark:text-slate-100">
              <Label className="text-slate-700 dark:text-slate-300">Image URL</Label>
              <Input
                className="w-full rounded-xl bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700"
                name="image"
                placeholder="https://example.com/image.jpg"
              />
            </TextField>

            <TextField isRequired className="text-slate-800 dark:text-slate-100">
              <Label className="text-slate-700 dark:text-slate-300">Location</Label>
              <Input
                className="w-full rounded-xl bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700"
                name="location"
                placeholder="Dhaka, Bangladesh"
              />
            </TextField>

            <div className="grid md:grid-cols-2 gap-5 w-full">
              <TextField isRequired className="text-slate-800 dark:text-slate-100">
                <Label className="text-slate-700 dark:text-slate-300">Price Per Hour</Label>
                <Input
                  className="w-full rounded-xl bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700"
                  name="price_per_hour"
                  type="number"
                  placeholder="1200"
                />
              </TextField>

              <TextField isRequired className="text-slate-800 dark:text-slate-100">
                <Label className="text-slate-700 dark:text-slate-300">Capacity</Label>
                <Input
                  className="w-full rounded-xl bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700"
                  name="capacity"
                  type="number"
                  placeholder="14"
                />
              </TextField>
            </div>

            <TextField isRequired className="text-slate-800 dark:text-slate-100">
              <Label className="text-slate-700 dark:text-slate-300">Available Slots</Label>
              <Input
                className="w-full rounded-xl bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700"
                name="available_slots"
                placeholder="8AM - 10AM, 4PM - 6PM"
              />
            </TextField>

            <TextField isRequired className="text-slate-800 dark:text-slate-100">
              <Label className="text-slate-700 dark:text-slate-300">Description</Label>
              <Input
                className="w-full rounded-xl bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700"
                name="description"
                placeholder="Premium artificial grass football turf with floodlights."
              />
            </TextField>

            <Button type="submit" className="w-full h-12 bg-linear-to-l from-[#24B1B1] to-[#007979] text-white text-base font-semibold transition duration-300 hover:scale-103 border-none">
              Add Facility
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddFacilityPage;