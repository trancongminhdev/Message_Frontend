import ConversationUserChat from "./View.user";

const ConversationPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  return <ConversationUserChat idConversation={id} />;
};

export default ConversationPage;
