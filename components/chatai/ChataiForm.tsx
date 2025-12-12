"use client";

import { useActionState, useEffect, useRef } from "react";
import { Chatai } from "@prisma/client";
import { HashLoader } from "react-spinners";
import { RiRobot2Fill } from "react-icons/ri";
import { createChatAi } from "@/actions/post/chatai";
import ChataiQuestionHistory from "@/components/chatai/ChataiQuestionHistory";
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
    <div className="md:flex md:gap-3">
      {/* Historique des questions */}
      <ChataiQuestionHistory messages={messages} />

      <div
        className={`flex flex-col gap-5 flex-3 overflow-y-auto ${
          messages.length > 0 ? "bg-white p-3" : ""
        } rounded`}
        ref={msgContainer}
      >
        {messages.length === 0 && (
          <h2 className="text-[2rem]">Bonjour, comment puis-je vous aider ?</h2>
        )}

        {/* Historique des réponses */}
        <ChataiResponseHistory messages={messages} />

        <form
          action={formAction}
          className="flex flex-col justify-center items-center gap-0.5"
        >
          <div className="w-full relative">
            <input
              name="question"
              placeholder="Posez une question..."
              className="w-full max-h-[150px] p-2 bg-white focus:bg-none border-2 border-yale-blue focus:border-stormy-teal outline-none rounded-lg"
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
    </div>
  );
};

export default ChataiForm;
