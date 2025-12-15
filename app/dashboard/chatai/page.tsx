import ChataiForm from "@/components/chatai/ChataiForm";
import { getChatais } from "@/actions/get/chatai";
import TabLink from "@/components/TabLink";
import DashboardSectionWrapper from "@/components/DashboardSectionWrapper";
import ChataiQuestionHistory from "@/components/chatai/ChataiQuestionHistory";
import ChataiResponseHistory from "@/components/chatai/ChataiResponseHistory";

const ChatAiPage = async () => {
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
          } mx-auto text-graphite`}
        >
          <div className={`flex flex-col md:flex-row gap-3 h-[calc(100%)]`}>
            <ChataiQuestionHistory messages={data?.chatais ?? []} />

            <div className="flex-3 flex flex-col gap-3 overflow-hidden">
              <ChataiResponseHistory messages={data?.chatais ?? []} />
              <ChataiForm messages={data?.chatais ?? []} />
            </div>
          </div>
        </div>
      </DashboardSectionWrapper>
    </>
  );
};

export default ChatAiPage;
