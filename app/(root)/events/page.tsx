"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import EventFormStep1 from "@/features/events/EventFormStep1";
import EventFormStep2 from "@/features/events/EventFormStep2";
import { useEventFormState } from "@/hooks/store/useEventFormState";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import eventSchema, { EventSchemaType } from "@/schema/event-schema";
import { toast } from "sonner";
import { BorderBeam } from "@/components/magicui/border-beam";
import { useCreateEvent } from "@/hooks/api/event/useCreateEvent";
import { useAuth } from "@clerk/nextjs";

const page = () => {
  const { step, incrementStep, decrementStep } = useEventFormState();
  const { getToken } = useAuth();

  const methods = useForm<EventSchemaType>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      ticketType: "Free",
    },
    resolver: zodResolver(eventSchema),
  });

  const renderStep = (step: number) => {
    switch (step) {
      case 1:
        return <EventFormStep1 />;
      case 2:
        return <EventFormStep2 />;
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
          "eventDescription",
          "eventCategory",
          "eventVenue",
          "eventLocation",
          "eventStartDate",
          "eventEndDate",
        ];
      }

      const ticketType = methods.getValues("ticketType");

      if (step === 2 && ticketType === "Paid") {
        fieldsToValidate = [
          "ticketType",
          "eventImage",
          "ticketPrice",
          "ticketQuantity",
        ];
      } else if (step === 2 && ticketType === "Free") {
        fieldsToValidate = ["ticketType", "eventImage", "ticketQuantity"];
      }

      if (fieldsToValidate.length > 0) {
        const isValid = await methods.trigger(fieldsToValidate);

        if (!isValid) {
          toast.error("Validation Error", {
            description: `Please fill in all required fields for ${fieldsToValidate} .`,
          });

          console.log("Validation failed for fields:", fieldsToValidate);
          return;
        }
      }

      console.log("Handle increment clicked, current step:", step);
      if (step === 2) return;
      incrementStep();
    } catch (error) {
      console.error("Error in handleIncrement:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleDecrement = () => {
    decrementStep();
  };

  const createEventMutation = useCreateEvent();

  const handleSubmitEvent: SubmitHandler<EventSchemaType> = async (data) => {
    try {
      const token = await getToken();
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key === "eventImage" && value) {
          formData.append(key, value as File);
        } else if (value instanceof Date) {
          formData.append(key, value.toISOString());
        } else {
          formData.append(key, value as string);
        }
      });

      createEventMutation.mutate({ data: formData, token: token! });
    } catch (error) {
      console.error("Error submitting event:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Create Event
            </h1>
            <p className="text-muted-foreground">Step {step} of 2</p>

            <div className="w-full bg-muted rounded-full h-2 mt-4">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 2) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-lg">
            <BorderBeam
              size={400}
              duration={7}
              borderWidth={2}
              className="from-transparent via-blue-500 to-transparent"
            />
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
                  onClick={
                    step === 2
                      ? methods.handleSubmit(handleSubmitEvent)
                      : handleIncrement
                  }
                  className="flex-1"
                  type={step === 2 ? "submit" : "button"}
                  disabled={
                    methods.formState.isSubmitting ||
                    createEventMutation.isPending
                  }
                >
                  {step < 2 ? "Next" : "Submit"}
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
