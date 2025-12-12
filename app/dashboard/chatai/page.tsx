import ChataiForm from "@/components/chatai/ChataiForm";
import { getChatais } from "@/actions/get/chatai";
import TabLink from "@/components/TabLink";

const ChatAiPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const width = (await searchParams).w;
  const data = await getChatais();

  return (
    <div
      className={`px-3 pt-3 max-h-[calc(100vh-7vh)] min-w-[320px] w-[calc(100vw-${
        width ? width : "50"
      }px)] overflow-y-auto`}
    >
      <div className="flex justify-between items-center mb-3">
        <TabLink url="/dashboard/chatai" title="Chat I.A" />
      </div>

      <div
        className={`${
          data.chatais && data.chatais.length === 0 ? "max-w-[600px]" : ""
        } mx-auto text-graphite`}
      >
        <ChataiForm messages={data?.chatais ?? []} />
      </div>
    </div>
  );
};

export default ChatAiPage;
