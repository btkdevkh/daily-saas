"use client";

import { useActionState } from "react";
import { Chatai } from "@prisma/client";
import { HashLoader } from "react-spinners";
import { RiRobot2Fill } from "react-icons/ri";
import { createChatAi } from "@/actions/post/chatai";

type ChataiFormProps = {
  messages: Chatai[];
};

const ChataiForm = ({ messages }: ChataiFormProps) => {
  const [state, formAction, isPending] = useActionState(createChatAi, {
    success: false,
    messages: [],
    error: "",
  });

  return (
    <>
      {messages.length === 0 && (
        <h2 className="text-2xl md:text-3xl text-center">
          Bonjour, comment puis-je vous aider ?
        </h2>
      )}

      <form action={formAction} className="relative">
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
      </form>
    </>
  );
};

export default ChataiForm;
