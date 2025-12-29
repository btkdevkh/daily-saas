import { getBankAccountById } from "@/actions/get/bank";
import UpdateBankAccountForm from "@/components/bank/update/UpdateBankAccountForm";
import FormWrapper from "@/components/FormWrapper";

export default async function UpdateBankAccountPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { formatBankAccount } = await getBankAccountById(id);

  return (
    <FormWrapper>
      <UpdateBankAccountForm bankAccount={formatBankAccount} />
    </FormWrapper>
  );
}
