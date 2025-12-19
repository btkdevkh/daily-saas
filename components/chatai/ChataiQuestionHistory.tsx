"use client";

import { Chatai } from "@prisma/client";
import ActionButton from "../ActionButton";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteChatais } from "@/actions/delete/chatai";
import { UI } from "@/lib/ui-config";

type ChataiQuestionHistoryProps = {
  messages: Chatai[];
};

const ChataiQuestionHistory = ({ messages }: ChataiQuestionHistoryProps) => {
  return (
    <>
      {messages.length > 0 && (
        <div
          className="bg-white max-h-full h-[25%] md:h-fit md:flex-1/4 lg:flex-1/12 rounded shadow overflow-auto"
          onScroll={UI.indicatorScroll}
        >
          <div className="p-3 relative">
            <h2 className="text-xl mb-5">Historiques</h2>

            <div className="flex flex-col gap-2">
              {messages.map((msg, i) => (
                <span
                  key={i}
                  className="bg-dust-grey p-2 rounded text-sm w-fit"
                >
                  {msg.question}
                </span>
              ))}
            </div>

            <div className="absolute top-2 right-2 flex flex-col gap-2">
              <ActionButton handler={deleteChatais}>
                <div className="bg-[rgb(0,0,0,0.1)] hover:bg-[rgb(0,0,0,0.3)] rounded-full p-2 transition">
                  <RiDeleteBin6Line size={15} color="crimson" />
                </div>
              </ActionButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChataiQuestionHistory;
