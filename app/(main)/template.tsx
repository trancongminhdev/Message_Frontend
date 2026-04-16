import LeftSidebar from "./component/LeftSidebar";

export default function TemplateMain({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background flex-col sm:flex-row">
      <LeftSidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
