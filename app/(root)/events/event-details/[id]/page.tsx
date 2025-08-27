import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  console.log("Event ID:", id);

  return <div>page {id}</div>;
};

export default page;
