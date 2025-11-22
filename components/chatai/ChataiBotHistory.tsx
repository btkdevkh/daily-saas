import { Chatai } from "@prisma/client";

type ChataiBotHistoryProps = {
  messages: Chatai[];
};

const ChataiBotHistory = ({ messages }: ChataiBotHistoryProps) => {
  return (
    <>
      {messages.length > 0 && (
        <div className="bg-white p-5 max-h-[87vh] h-full flex-1 mb-5 overflow-y-auto rounded shadow">
          <h2 className="text-2xl mb-5">Historique des questions</h2>
          <div className="flex flex-col gap-2">
            {messages.map((msg, i) => (
              <span key={i} className="bg-dust-grey p-2 rounded text-sm w-fit">
                {msg.question}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ChataiBotHistory;
