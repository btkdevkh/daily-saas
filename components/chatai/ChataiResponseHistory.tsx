"use client";

import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { toString } from "hast-util-to-string";
import { Chatai } from "@prisma/client";
import { MdOutlineContentCopy } from "react-icons/md";
import { toast } from "react-toastify";
import "highlight.js/styles/atom-one-dark.css";

type ChataiResponseHistoryProps = {
  messages: Chatai[];
};

const ChataiResponseHistory = ({ messages }: ChataiResponseHistoryProps) => {
  const msgContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    msgContainer?.current?.scrollTo({
      top: msgContainer.current?.scrollHeight,
      behavior: "smooth",
    });
  }, []);

  return (
    <div
      className={`${
        messages.length > 0 ? "bg-white p-3 h-full" : ""
      } overflow-auto rounded`}
      ref={msgContainer}
    >
      {messages.map((msg, i) => (
        <div key={i} className="flex flex-col gap-3 relative">
          <div>
            <p className="bg-dust-grey p-2 w-fit rounded shadow">
              {msg.question}
            </p>
          </div>

          <ReactMarkdown
            rehypePlugins={[rehypeHighlight]}
            components={{
              code({ node, className, children, ...props }) {
                if (!node) return;
                const codeText = toString(node);

                return (
                  <code
                    className={`${className} w-full rounded relative`}
                    {...props}
                  >
                    {node.children.some((c) => c.type !== "text") &&
                      node.tagName === "code" && (
                        <button
                          title="copier"
                          className="text-white absolute top-2 right-2 rounded cursor-pointer hover:text-dust-grey"
                          onClick={() => {
                            window.navigator.clipboard
                              .writeText(codeText)
                              .then(() => {
                                toast.success("Copié", {
                                  toastId: codeText,
                                  pauseOnHover: false,
                                  autoClose: 500,
                                  className: "toast-compact",
                                  position: "bottom-center",
                                });
                              });
                          }}
                        >
                          <MdOutlineContentCopy />
                        </button>
                      )}

                    {children}
                  </code>
                );
              },
            }}
          >
            {msg.answer}
          </ReactMarkdown>
        </div>
      ))}
    </div>
  );
};

export default ChataiResponseHistory;
