import { getUserById } from "@/actions/get/user";
import FormWrapper from "@/components/FormWrapper";
import UpdateUserForm from "@/components/user/update/UpdateUserForm";

type UpdateUserPageProps = {
  params: Promise<{ id: string }>;
};

export default async function UpdateUserPage({ params }: UpdateUserPageProps) {
  const { id } = await params;
  const { user } = await getUserById(id);

  return (
    <FormWrapper>
      <UpdateUserForm user={user} />
    </FormWrapper>
  );
}
