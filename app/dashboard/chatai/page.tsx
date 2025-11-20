"use client";

import { FormEvent, useState } from "react";
import axios from "axios";
import { HashLoader } from "react-spinners";
import BackButton from "@/components/BackButton";

const API_URL = process.env.NEXT_PUBLIC_CHAT_AI_API_URL!;

const ChatAiPage = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInput("");

    if (!input) {
      return alert("Veuillez entrer un message.");
    }

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    setLoading(true);
    const res = await axios.post(API_URL, {
      message: input,
      replyHistory: messages,
    });

    const botMessage = { sender: "bot", text: res.data.answer };

    setMessages((prev) => [...prev, botMessage]);
    setLoading(false);
  };

  return (
    <div className="p-3">
      <div className="flex justify-between items-center mb-3">
        <span className="text-graphite font-semibold uppercase border-b-2 border-stormy-teal">
          Chat AI
        </span>

        <BackButton />
      </div>

      <div
        className={`${
          messages.length === 0 ? "max-w-[515px]" : ""
        } mx-auto text-graphite`}
      >
        <div className="md:flex md:gap-5">
          {messages.length > 0 && (
            <div className="bg-white rounded px-4 py-5 max-h-[87vh] h-full flex-1 mb-5 overflow-y-auto">
              {/* Historique des questions */}
              <h2 className="text-2xl mb-5">Historique des questions</h2>
              <div className="flex flex-col gap-2">
                {messages
                  .filter((msg) => msg.sender === "user")
                  .map((msg, i) => (
                    <span key={i} className="bg-dust-grey p-2 rounded w-fit">
                      {msg.text}
                    </span>
                  ))}
              </div>
            </div>
          )}

          <div className="w-full mx-auto flex flex-col gap-3 flex-3">
            {messages.length === 0 && (
              <h2 className="text-3xl mb-5">
                Bonjour, comment puis-je vous aider ?
              </h2>
            )}

            <div className="flex flex-col gap-3">
              {messages.map((msg, i) => (
                <div key={i} id={msg.text.split(" ").join("-")}>
                  <p
                    className={`wrap-anywhere ${
                      msg.sender === "user"
                        ? "bg-white p-2 rounded w-fit"
                        : "p-1"
                    }`}
                  >
                    {msg.text}
                  </p>
                </div>
              ))}
            </div>

            <form
              className="flex justify-center items-center relative"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez une question..."
                className="w-full p-2 border-2 border-yale-blue focus:border-stormy-teal outline-none rounded-2xl"
              />
              <span
                className={`bg-yale-blue text-white text-sm p-2 rounded-xl font-semibold cursor-pointer hover:bg-stormy-teal transition uppercase absolute right-1`}
              >
                {loading ? <HashLoader size={20} color="#37d7b7" /> : "Chatter"}
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAiPage;
