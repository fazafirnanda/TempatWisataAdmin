import CardTableUsers from "components/Cards/CardTableUsers.js";
import React from "react";

// components

export default function TableUsers() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTableUsers />
        </div>
      </div>
    </>
  );
}
