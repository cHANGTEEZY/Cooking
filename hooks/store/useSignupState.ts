import { create } from "zustand";

type SignupState = {
  step: number;
  incrementStep: (step: number) => void;
  decrementStep: (step: number) => void;
  resetStep: () => void;
  otpCode: string;
  setOtpCode: (otpCode: string) => void;
  clearStore: () => void;
};

export const useSignupState = create<SignupState>((set) => {
  return {
    step: 1,
    incrementStep: (step: number) => set({ step: step + 1 }),
    decrementStep: (step: number) => set({ step: step - 1 }),
    resetStep: () => set({ step: 1 }),
    otpCode: "",
    setOtpCode: (otpCode: string) => set({ otpCode: otpCode }),
    clearStore: () => set({ step: 1, otpCode: "" }),
  };
});
