import { getRdvById } from "@/actions/get/rdv";
import FormWrapper from "@/components/FormWrapper";
import UpdateRdvForm from "@/components/rdv/update/UpdateRdvForm";

type UpdateRdvPageProps = {
  params: Promise<{ id: string }>;
};

export default async function UpdateRdvPage({ params }: UpdateRdvPageProps) {
  const { id } = await params;
  const { rdv } = await getRdvById(id);

  return (
    <FormWrapper>
      <UpdateRdvForm rdv={rdv} />
    </FormWrapper>
  );
}
