"use client";
import { authClient } from "@/lib/auth-client";
import { Button, FieldError, Input, Label, Modal, Surface, TextArea, TextField } from "@heroui/react";
import { useRouter } from "next/navigation";
import { BiEdit } from "react-icons/bi";
import { toast } from "react-toastify";

const EditFacilityModal = ({ facility }) => {
  const router = useRouter();
  const { _id, name, facility_type, image, location, price_per_hour, capacity, available_slots, description } = facility;

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fieldData = Object.fromEntries(formData.entries());
    const updatedFacility = {
      ...fieldData,
      price_per_hour: Number(fieldData.price_per_hour),
      capacity: Number(fieldData.capacity),
    };
    updatedFacility.available_slots = updatedFacility.available_slots.split(",").map((slot) => slot.trim());
    const { data: tokenData } = await authClient.token();
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facility/${_id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${tokenData?.token}`
      },
      body: JSON.stringify(updatedFacility),
    });
    const data = await res.json();
    if (data.modifiedCount > 0) {
      toast.success("Facility Updated Successfully!");
      router.refresh();
    }
  };

  return (
    <Modal>
      <Button
        variant="solid"
        className="bg-linear-to-l from-[#24B1B1] to-[#007979] text-white font-semibold hover:scale-102 transition"
      >
        <BiEdit />
        Update
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-2xl bg-white dark:bg-[#151C2C] text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800">
            <Modal.CloseTrigger className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100" />

            <Modal.Header>
              <Modal.Heading className="text-slate-800 dark:text-slate-100 font-bold">
                Update Facility
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body className="p-6 max-h-[70vh] overflow-y-auto">
              <Surface variant="default" className="bg-transparent">
                <form onSubmit={onSubmit} className="p-4 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <TextField defaultValue={name} name="name" isRequired className="text-slate-800 dark:text-slate-100">
                      <Label className="text-slate-700 dark:text-slate-300">Facility Name</Label>
                      <Input className="w-full rounded-xl bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700" />
                      <FieldError />
                    </TextField>

                    <div>
                      <TextField isRequired className="text-slate-800 dark:text-slate-100">
                        <Label className="text-slate-700 dark:text-slate-300">Facility Type</Label>

                        <select
                          name="facility_type"
                          defaultValue={facility_type}
                          className="w-full h-11 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-100 outline-none focus:border-[#24B1B1]"
                        >
                          <option value="Football" className="bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-100">Football</option>
                          <option value="Badminton" className="bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-100">Badminton</option>
                          <option value="Basketball" className="bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-100">Basketball</option>
                          <option value="Swimming" className="bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-100">Swimming</option>
                          <option value="Cricket" className="bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-100">Cricket</option>
                          <option value="Tennis" className="bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-100">Tennis</option>
                          <option value="Bowling" className="bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-100">Bowling</option>
                          <option value="Volleyball" className="bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-100">Volleyball</option>
                          <option value="Gym" className="bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-100">Gym</option>
                          <option value="Athletics" className="bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-100">Athletics</option>
                        </select>

                        <FieldError />
                      </TextField>
                    </div>

                    <TextField defaultValue={location} name="location" isRequired className="text-slate-800 dark:text-slate-100">
                      <Label className="text-slate-700 dark:text-slate-300">Location</Label>
                      <Input className="w-full rounded-xl bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700" />
                      <FieldError />
                    </TextField>

                    <TextField defaultValue={price_per_hour} name="price_per_hour" type="number" isRequired className="text-slate-800 dark:text-slate-100">
                      <Label className="text-slate-700 dark:text-slate-300">Price Per Hour</Label>
                      <Input className="w-full rounded-xl bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700" />
                      <FieldError />
                    </TextField>

                    <TextField defaultValue={capacity} name="capacity" type="number" isRequired className="text-slate-800 dark:text-slate-100">
                      <Label className="text-slate-700 dark:text-slate-300">Capacity</Label>
                      <Input className="w-full rounded-xl bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700" />
                      <FieldError />
                    </TextField>

                    <div className="md:col-span-2">
                      <TextField defaultValue={image} name="image" isRequired className="text-slate-800 dark:text-slate-100">
                        <Label className="text-slate-700 dark:text-slate-300">Image URL</Label>
                        <Input className="w-full rounded-xl bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700" />
                        <FieldError />
                      </TextField>
                    </div>

                    <div className="md:col-span-2">
                      <TextField defaultValue={available_slots.join(", ")} name="available_slots" isRequired className="text-slate-800 dark:text-slate-100">
                        <Label className="text-slate-700 dark:text-slate-300">Available Slots</Label>
                        <Input className="w-full rounded-xl bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700" placeholder="8AM - 10AM, 4PM - 6PM" />
                        <FieldError />
                      </TextField>
                    </div>

                    <div className="md:col-span-2">
                      <TextField defaultValue={description} name="description" isRequired className="text-slate-800 dark:text-slate-100">
                        <Label className="text-slate-700 dark:text-slate-300">Description</Label>
                        <TextArea className="bg-white dark:bg-[#1E293B] text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700" placeholder="Describe your facility..." />
                        <FieldError />
                      </TextField>
                    </div>
                  </div>

                  <Modal.Footer className="border-t border-slate-100 dark:border-slate-800 pt-4">
                    <Button type="submit" className="bg-linear-to-l from-[#24B1B1] to-[#007979] text-white" slot="close">
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default EditFacilityModal;