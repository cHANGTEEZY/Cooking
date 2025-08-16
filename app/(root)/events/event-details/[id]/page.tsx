import React from "react";
import { string } from "zod";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  console.log("Event ID:", id);

  return <div>page</div>;
};

export default page;
