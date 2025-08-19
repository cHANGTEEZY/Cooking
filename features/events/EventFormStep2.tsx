import React from "react";
import EventFormHeader from "./components/EventFormHeader";
import CustomInput from "@/components/CustomInput";
import { Controller, useFormContext } from "react-hook-form";
import { EventSchemaType } from "@/schema/event-schema";
import CustomDropDown from "@/components/CustomDropDown";
import CustomSelect from "@/components/CustomSelect";

const dropdownOptions = [
  { value: "Free", label: "Free" },
  { value: "Paid", label: "Paid" },
];

const EventFormStep2 = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<EventSchemaType>();

  return (
    <section>
      <EventFormHeader
        eventTitle="Pricing & Tickets"
        eventdescription="Set ticket types, prices, availability, and discount options for attendees."
      />
      <div className="mt-8 space-y-6">
        <CustomSelect label="Ticket Type" selectContents={dropdownOptions} />

        <CustomInput
          {...register("eventImage")}
          inputType="file"
          label="Upload Event Banner"
          placeholder="Enter Event Banner Image"
          error={errors.eventImage?.message}
        />

        <CustomInput
          {...register("ticketPrice")}
          inputType="text"
          label="Ticket Price"
          error={errors.ticketPrice?.message}
          placeholder="Enter ticket price"
          containerStyle="flex-1/2"
        />

        <CustomInput
          {...register("ticketQuantity")}
          inputType="text"
          label="Ticket Quantity"
          error={errors.ticketQuantity?.message}
          placeholder="Enter total ticket quantity"
          containerStyle="flex-1/2"
        />
      </div>
    </section>
  );
};

export default EventFormStep2;
