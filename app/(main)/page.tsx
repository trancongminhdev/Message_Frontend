const HomePage = () => {
  return (
    <div className="h-screen not-[]:hidden sm:flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="text-5xl mb-4">💬</div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Select a conversation
        </h2>
        <p className="text-muted-foreground">
          Choose a chat to start messaging
        </p>
      </div>
    </div>
  );
};

export default HomePage;
