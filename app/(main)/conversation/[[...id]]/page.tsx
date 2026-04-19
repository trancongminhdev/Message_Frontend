import ConversationUserChat from "./View.user";

const ConversationPage = async ({ params }: { params: { id: string[] } }) => {
  const { id } = await params;
  // const session = await getServerSession(authOptions);

  return <ConversationUserChat ids={id} />;
};

export default ConversationPage;
