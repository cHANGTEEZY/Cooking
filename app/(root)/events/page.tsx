"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import EventFormStep1 from "@/features/events/EventFormStep1";
import EventFormStep2 from "@/features/events/EventFormStep2";
import EventFormStep3 from "@/features/events/EventFormStep3";
import EventFormStep4 from "@/features/events/EventFormStep4";
import { useEventFormState } from "@/hooks/store/useEventFormState";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import eventSchema, { EventSchemaType } from "@/schema/event-schema";
import { toast } from "sonner";

const page = () => {
  const [popoverContent, setPopoverContent] = React.useState("");
  const { step, incrementStep, decrementStep } = useEventFormState();
  const methods = useForm<EventSchemaType>({
    defaultValues: {
      eventTitle: "",
      eventNames: "",
      eventCategory: "Music",
      organizerName: "",
      organizerContactInfo: "",
      eventStartDate: undefined,
      eventEndDate: undefined,
      eventDescription: "",
      eventLocation: "",
      eventPrice: "",
      eventImage: "",
      eventImageAlt: "",
      eventDate: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(eventSchema),
  });

  console.log("Current Step:", step);

  const renderStep = (step: number) => {
    switch (step) {
      case 1:
        return <EventFormStep1 />;
      case 2:
        return <EventFormStep2 />;
      case 3:
        return <EventFormStep3 />;
      case 4:
        return <EventFormStep4 />;
      default:
        return <EventFormStep1 />;
    }
  };

  const handleIncrement = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    try {
      let fieldsToValidate = [] as (keyof EventSchemaType)[];

      if (step === 1) {
        fieldsToValidate = [
          "eventTitle",
          "eventNames",
          "eventDescription",
          "eventLocation",
          "eventCategory",
          "organizerName",
          "organizerContactInfo",
          "eventStartDate",
          "eventEndDate",
        ];
      }

      if (fieldsToValidate.length > 0) {
        const isValid = await methods.trigger(fieldsToValidate);

        if (!isValid) {
          toast.error("Please fill in all required fields");

          console.log("Validation failed for fields:", fieldsToValidate);
          return;
        }
      }

      console.log("Handle increment clicked, current step:", step);
      incrementStep();
    } catch (error) {
      console.error("Error in handleIncrement:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleDecrement = () => {
    console.log("Handle decrement clicked, current step:", step);
    decrementStep();
  };

  const handleSubmitEvent: SubmitHandler<EventSchemaType> = (data) => {
    console.log("Form submitted with data:", data);
  };

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Create Event
            </h1>
            <p className="text-muted-foreground">Step {step} of 4</p>

            <div className="w-full bg-muted rounded-full h-2 mt-4">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-lg">
            <form onSubmit={methods.handleSubmit(handleSubmitEvent)}>
              {renderStep(step)}

              <div className="flex justify-between gap-4 mt-8 pt-6 border-t border-border/50">
                <Button
                  variant="outline"
                  onClick={step > 1 ? handleDecrement : undefined}
                  disabled={step === 1}
                  className="flex-1"
                  type="button"
                >
                  {step > 1 ? "Previous" : "Cancel"}
                </Button>
                <Button
                  onClick={handleIncrement}
                  className="flex-1"
                  type={step === 4 ? "submit" : "button"}
                >
                  {step < 4 ? "Next" : "Submit"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default page;
