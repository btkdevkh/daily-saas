import ChataiForm from "@/components/chatai/ChataiForm";
import { getChatais } from "@/actions/get/chatai";
import TabLink from "@/components/TabLink";
import DashboardSectionWrapper from "@/components/DashboardSectionWrapper";
import ChataiQuestionHistory from "@/components/chatai/ChataiQuestionHistory";

const ChatAiPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const width = (await searchParams).w;
  const data = await getChatais();

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <TabLink url="/dashboard/chatai" title="Chat I.A" />
      </div>

      <DashboardSectionWrapper>
        <div
          className={`h-full ${
            data.chatais && data.chatais.length === 0 ? "max-w-[600px]" : ""
          } mx-auto text-graphite overflow-auto`}
        >
          <div className={`flex flex-col md:flex-row gap-3 h-full`}>
            <ChataiQuestionHistory messages={data?.chatais ?? []} />
            <ChataiForm messages={data?.chatais ?? []} />
          </div>
        </div>
      </DashboardSectionWrapper>
    </>
  );
};

export default ChatAiPage;
