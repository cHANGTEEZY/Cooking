"use client";

import React from "react";
import EventFormHeader from "./components/EventFormHeader";
import CustomInput from "@/components/CustomInput";
import { CustomDatePicker } from "@/components/CustomDatePicker";
import { Controller, useFormContext } from "react-hook-form";
import { EventSchemaType } from "@/schema/event-schema";
import CustomSelect from "@/components/CustomSelect";

const selectOptions = [
  { value: "Music", label: "Music" },
  { value: "Festival", label: "Festival" },
  { value: "Theater", label: "Theater" },
  { value: "Comedy", label: "Comedy" },
  { value: "Exhibition", label: "Exhibition" },
  { value: "Conference", label: "Conference" },
  { value: "Workshop", label: "Workshop" },
];

const EventFormStep1 = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<EventSchemaType>();

  return (
    <section>
      <EventFormHeader
        eventTitle="Event Details"
        eventdescription="Give basic event details like title, description, and category."
      />

      <div className="mt-8 space-y-6">
        <CustomInput
          {...register("eventTitle")}
          inputType="text"
          label="Event Title"
          error={errors.eventTitle?.message}
          placeholder="Enter your event title name"
        />

        <CustomInput
          {...register("eventDescription")}
          inputType="text"
          label="Event Description"
          error={errors.eventDescription?.message}
          placeholder="Enter your event description"
        />

        <Controller
          name="eventCategory"
          control={control}
          render={({ field }) => (
            <CustomSelect
              {...field}
              label="Event Category"
              selectContents={selectOptions}
              error={errors.eventCategory?.message}
            />
          )}
        />

        <div className="flex w-full gap-5">
          <CustomInput
            {...register("eventVenue")}
            inputType="text"
            label="Event venue"
            error={errors.eventVenue?.message}
            placeholder="Enter Venue name"
            containerStyle="flex-1/2 "
          />

          <CustomInput
            {...register("eventLocation")}
            inputType="text"
            label="Event Location"
            error={errors.eventLocation?.message}
            placeholder="Enter event location ex:(City, Country)"
            containerStyle="flex-1/2 "
          />
        </div>

        <div className="flex w-full gap-5">
          <Controller
            name="eventStartDate"
            control={control}
            render={({ field }) => (
              <CustomDatePicker
                {...field}
                label="Event Start Date"
                error={errors.eventStartDate?.message}
                containerStyles="flex-1/2"
              />
            )}
          />

          <Controller
            name="eventEndDate"
            control={control}
            render={({ field }) => (
              <CustomDatePicker
                {...field}
                label="Event End Date"
                error={errors.eventEndDate?.message}
                containerStyles="flex-1/2"
              />
            )}
          />
        </div>
      </div>
    </section>
  );
};

export default EventFormStep1;
