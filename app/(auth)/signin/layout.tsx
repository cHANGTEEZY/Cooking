import React from "react";

const AuthOnboardingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex h-screen w-screen flex-col sm:flex-row">
      <aside className="w-80 h-screen bg-red-300">
        <h1>Hello world</h1>
      </aside>
      <main className="w-full flex-1s">{children}</main>
    </section>
  );
};

export default AuthOnboardingLayout;
