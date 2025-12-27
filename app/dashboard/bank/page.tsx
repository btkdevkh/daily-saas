import TabLink from "@/components/TabLink";
import CreateButton from "@/components/CreateButton";
import DashboardSectionWrapper from "@/components/DashboardSectionWrapper";
import { getBankAccounts } from "@/actions/get/bank";
import BankList from "@/components/bank/BankList";

const BankPage = async () => {
  const data = await getBankAccounts();

  const formatData = data.bankAccounts?.map((b) => {
    return {
      ...b,
      balance: Number(b.balance),
      incomes: b.incomes.map((inc) => ({ ...inc, income: Number(inc.income) })),
      expenses: b.expenses.map((exp) => ({
        ...exp,
        expense: Number(exp.expense),
      })),
    };
  });

  return (
    <>
      <div className="flex justify-between items-center gap-2 mb-3">
        {data.bankAccounts && data.bankAccounts.length === 0 ? (
          <span className="bg-green-100 text-green-700 py-2 px-4 rounded">
            Aucune donnée disponible
          </span>
        ) : (
          <div className="w-full flex items-center gap-1">
            <TabLink url="/dashboard/bank" title="Balances" />
          </div>
        )}

        <div className="flex items-center gap-1">
          <CreateButton page="bank" />
        </div>
      </div>

      <DashboardSectionWrapper>
        <div className="flex flex-col md:flex-row gap-3 h-full">
          <BankList bankAccounts={formatData ?? []} />

          {/* Graphique */}
          <div className="flex-1 hidden md:block">
            <></>
          </div>
        </div>
      </DashboardSectionWrapper>
    </>
  );
};

export default BankPage;
