import ViewUserChat from "./View.user";

const UserChatPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  return <ViewUserChat idReceiver={id} />;
};

export default UserChatPage;
