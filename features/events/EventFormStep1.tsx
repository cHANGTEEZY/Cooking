import React from "react";
import EventFormHeader from "./components/EventFormHeader";
import CustomInput from "@/components/CustomInput";
import { CustomDatePicker } from "@/components/CustomDatePicker";
import { useFormContext } from "react-hook-form";
import { EventSchemaType } from "@/schema/event-schema";

const EventFormStep1 = () => {
  const {
    register,
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

        <CustomInput
          {...register("eventCategory")}
          inputType="text"
          label="Event Category"
          error={errors.eventCategory?.message}
          placeholder="Enter your event category"
        />

        <div className="flex w-full gap-5">
          <CustomInput
            {...register("eventLocation")}
            inputType="text"
            label="Organizer Name"
            error={errors.eventLocation?.message}
            placeholder="Enter organizer name"
            containerStyle="flex-1/2 "
          />

          <CustomInput
            {...register("organizerContactInfo")}
            inputType="text"
            label="Organizer Contact Info"
            error={errors.organizerContactInfo?.message}
            placeholder="Enter organizer contact info"
            containerStyle="flex-1/2 "
          />
        </div>

        <div className="flex w-full gap-5">
          <CustomDatePicker
            {...register("eventStartDate")}
            label="Event Start Date"
            error={errors.eventStartDate?.message}
            containerStyles="flex-1/2"
          />

          <CustomDatePicker
            {...register("eventEndDate")}
            label="Event End Date"
            error={errors.eventEndDate?.message}
            containerStyles="flex-1/2"
          />
        </div>
      </div>
    </section>
  );
};

export default EventFormStep1;
