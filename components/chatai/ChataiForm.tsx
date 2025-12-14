"use client";

import { useActionState, useEffect, useRef } from "react";
import { Chatai } from "@prisma/client";
import { HashLoader } from "react-spinners";
import { RiRobot2Fill } from "react-icons/ri";
import { createChatAi } from "@/actions/post/chatai";
import ChataiResponseHistory from "@/components/chatai/ChataiResponseHistory";

type ChataiFormProps = {
  messages: Chatai[];
};

const ChataiForm = ({ messages }: ChataiFormProps) => {
  const msgContainer = useRef<HTMLDivElement | null>(null);

  const [state, formAction, isPending] = useActionState(createChatAi, {
    success: false,
    messages: [],
    error: "",
  });

  useEffect(() => {
    if (state.success || !state.success) {
      msgContainer?.current?.scrollTo({
        top: msgContainer.current?.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [state]);

  return (
    <div
      className={`flex-3 flex flex-col gap-5 ${
        messages.length > 0 ? "bg-white p-3" : ""
      } min-w-[320px] overflow-auto rounded`}
      ref={msgContainer}
    >
      {messages.length === 0 && (
        <h2 className="text-3xl text-center">
          Bonjour, comment puis-je vous aider ?
        </h2>
      )}

      <ChataiResponseHistory messages={messages} />

      <form
        action={formAction}
        className={`flex flex-col justify-center items-center gap-0.5 ${
          messages.length > 0 ? "mt-auto" : ""
        }  `}
      >
        <div className="w-full relative">
          <input
            name="question"
            placeholder="Posez une question..."
            className="w-full p-2 bg-white focus:bg-none border-2 border-yale-blue focus:border-stormy-teal outline-none rounded-lg"
          />
          <button
            type="submit"
            disabled={isPending}
            className="p-1 hover:bg-white transition rounded-lg cursor-pointer absolute top-1.5 right-1.5"
          >
            {isPending ? (
              <HashLoader size={25} color="#36d7b7" />
            ) : (
              <RiRobot2Fill size={25} color="#36d7b7" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChataiForm;
