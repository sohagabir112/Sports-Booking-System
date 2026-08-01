'use client';
import { authClient } from '@/lib/auth-client';
import { Form, Input, Label, TextField, Button } from '@heroui/react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const BookingForm = ({ facility }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const { _id, name, facility_type, image, price_per_hour } = facility;
  const [hours, setHours] = useState(1);
  const totalPrice = hours * price_per_hour;

  const handleBooking = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const bookingData = {
      userId: user?.id,
      owner_email: user?.email,
      facilityId: _id,
      facilityName: name,
      facilityType: facility_type,
      facilityImage: image,
      bookingDate: formData.get("bookingDate"),
      timeSlot: formData.get("timeSlot"),
      hours: Number(formData.get("hours")),
      pricePerHour: price_per_hour,
      totalPrice,
      status: "Pending"
    };
    const { data: tokenData } = await authClient.token();
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`, {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${tokenData?.token}`
      },
      body: JSON.stringify(bookingData),
    });
    toast.success("Booking Successful !");
  };

  return (
    <div>
      <div className="mt-10 bg-white dark:bg-[#151C2C] rounded-3xl shadow-lg border border-slate-200 dark:border-slate-800 p-8 transition-colors duration-300">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-8">
          Book This Facility
        </h2>

        <Form onSubmit={handleBooking} className="grid md:grid-cols-2 gap-6">
          <TextField isReadOnly className="text-slate-800 dark:text-slate-200">
            <Label className="text-slate-700 dark:text-slate-300">Facility Name</Label>
            <Input value={facility.name} className="bg-slate-50 dark:bg-[#1E293B] text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700" />
          </TextField>

          <TextField
            isRequired
            type="date"
            name="bookingDate"
            className="text-slate-800 dark:text-slate-200"
          >
            <Label className="text-slate-700 dark:text-slate-300">Booking Date</Label>
            <Input className="bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700" />
          </TextField>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Time Slot
            </label>

            <select
              name="timeSlot"
              required
              className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-3 bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-100"
            >
              {facility.available_slots.map(slot => (
                <option key={slot} value={slot} className="bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-100">
                  {slot}
                </option>
              ))}
            </select>
          </div>

          <TextField
            isRequired
            name="hours"
            className="text-slate-800 dark:text-slate-200"
          >
            <Label className="text-slate-700 dark:text-slate-300">Hours</Label>
            <Input
              type="number"
              min={1}
              value={hours.toString()}
              onChange={(e) => setHours(Number(e.target.value))}
              className="bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700"
            />
          </TextField>

          <TextField isReadOnly className="text-slate-800 dark:text-slate-200">
            <Label className="text-slate-700 dark:text-slate-300">Price Per Hour</Label>
            <Input
              value={`${facility.price_per_hour} Tk`}
              className="bg-slate-50 dark:bg-[#1E293B] text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700"
            />
          </TextField>

          <TextField isReadOnly className="text-slate-800 dark:text-slate-200">
            <Label className="text-slate-700 dark:text-slate-300">Total Price</Label>
            <Input
              value={`${totalPrice} Tk`}
              className="bg-slate-50 dark:bg-[#1E293B] text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700"
            />
          </TextField>

          <div className="md:col-span-2 w-full text-right">
            <Button
              type="submit"
              className="w-full md:w-fit transition duration-300 py-6 text-base hover:scale-105 bg-linear-to-l from-[#24B1B1] to-[#007979] text-white"
            >
              Confirm Booking
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default BookingForm;