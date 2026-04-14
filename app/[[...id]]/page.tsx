import ChatInterface from '@/components/chat-interface';
import ViewIdEmpty from './component/ViewIdEmpty';

export const metadata = {
  title: 'Messages - Chat App',
  description: 'Modern messaging application UI',
};

export default async function Home({ params }: { params: { id: string[] } }) {
  const { id } = await params

  if (!id) {
    return <ViewIdEmpty />;
  }
  return <ChatInterface />;
}
