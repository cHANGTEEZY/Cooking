import { create } from "zustand";

type EventFormState = {
  step: number;
  incrementStep: () => void;
  decrementStep: () => void;
  resetStep: () => void;
  clearStore: () => void;
  eventData: {
    title?: string;
    description?: string;
    date?: string;
    location?: string;
    category?: string;
    price?: string;
  };
  setEventData: (data: Partial<EventFormState["eventData"]>) => void;
};

export const useEventFormState = create<EventFormState>((set, get) => {
  console.log("Creating EventFormState store");

  return {
    step: 1,
    incrementStep: () => {
      const currentStep = get().step;
      console.log("Increment called, current step:", currentStep);
      const newStep = Math.min(currentStep + 1, 4);
      console.log("Setting step to:", newStep);
      set({ step: newStep });

      // Verify the step was actually set
      setTimeout(() => {
        const verifyStep = get().step;
        console.log("Step after increment:", verifyStep);
      }, 0);
    },
    decrementStep: () => {
      const currentStep = get().step;
      console.log("Decrement called, current step:", currentStep);
      const newStep = Math.max(currentStep - 1, 1);
      console.log("Setting step to:", newStep);
      set({ step: newStep });
    },
    resetStep: () => {
      console.log("Reset step called");
      set({ step: 1 });
    },
    clearStore: () => {
      console.log("Clear store called");
      set({
        step: 1,
        eventData: {},
      });
    },
    eventData: {},
    setEventData: (data) =>
      set((state) => ({
        eventData: { ...state.eventData, ...data },
      })),
  };
});
