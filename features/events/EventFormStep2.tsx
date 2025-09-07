"use client";
import CustomInput from "@/components/CustomInput";
import { Controller, useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { EventSchemaType } from "@/schema/event-schema";
import CustomSelect from "@/components/CustomSelect";
import EventFormHeader from "./components/EventFormHeader";
import {
  compressImage,
  validateImageFile,
  formatFileSize,
} from "@/lib/image-compression";
import { useState } from "react";

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

  const [isCompressing, setIsCompressing] = useState(false);

  const handleImageCompression = async (file: File): Promise<File> => {
    try {
      setIsCompressing(true);

      const validation = validateImageFile(file);
      if (!validation.isValid) {
        console.error(validation.error);
        return file;
      }

      const compressedFile = await compressImage(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        initialQuality: 0.8,
      });

      return compressedFile;
    } catch (error) {
      console.error("Error processing image:", error);
      return file;
    } finally {
      setIsCompressing(false);
    }
  };

  return (
    <section>
      <EventFormHeader
        eventTitle="Pricing & Tickets"
        eventdescription="Set ticket types, prices, availability, and discount options for attendees."
      />
      <div className="mt-8 space-y-6">
        <Controller
          name="ticketType"
          control={control}
          render={({ field }) => (
            <CustomSelect
              {...field}
              label="Ticket Type"
              selectContents={dropdownOptions}
              error={errors.ticketType?.message}
            />
          )}
        />

        <Controller
          name="eventImage"
          control={control}
          render={({ field: { onChange, value, ...field } }) => {
            return (
              <div className="space-y-4">
                <Label className={errors.eventImage && "text-red-500"}>
                  Upload Event Banner
                  {isCompressing && (
                    <span className="ml-2 text-sm text-blue-500">
                      (Compressing...)
                    </span>
                  )}
                </Label>
                <div
                  className={cn(
                    "flex items-center rounded-lg border-2 border-border/60 bg-background/50 dark:bg-card/40 backdrop-blur-sm shadow-md transition-all duration-200",
                    errors.eventImage && "border-red-500",
                    isCompressing && "opacity-50 pointer-events-none"
                  )}
                >
                  <Input
                    type="file"
                    className="border-0 bg-transparent p-2 focus-visible:ring-0 shadow-none"
                    placeholder="Enter Event Banner Image"
                    accept="image/jpeg,image/png,image/jpg,image/webp"
                    disabled={isCompressing}
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const compressedFile = await handleImageCompression(
                          file
                        );
                        onChange(compressedFile);
                      }
                    }}
                    {...field}
                  />
                </div>
                {errors.eventImage && (
                  <p className="text-red-500">
                    {errors.eventImage.message as string}
                  </p>
                )}
                {value && (
                  <div className="text-sm text-gray-600">
                    Selected: {value.name} ({formatFileSize(value.size)})
                  </div>
                )}
              </div>
            );
          }}
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
