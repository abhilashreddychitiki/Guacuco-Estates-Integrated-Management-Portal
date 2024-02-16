import React from "react";

// components

import ChatMessenger from "components/Cards/ChatMessenger";

export default function Chat() {
  return (
    <>
      <div className="flex flex-wrap w-full">
        <ChatMessenger />
      </div>
    </>
  );
}