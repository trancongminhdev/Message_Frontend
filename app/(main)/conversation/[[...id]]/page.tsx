import ConversationUserChat from "./View.user";

const ConversationPage = async ({ params }: { params: { id: string[] } }) => {
  const { id } = await params;

  return <ConversationUserChat ids={id} />;
};

export default ConversationPage;
