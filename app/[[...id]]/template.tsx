import LeftSidebar from "./component/LeftSidebar";

export default function LayoutMain({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen bg-background flex-col sm:flex-row">
            <LeftSidebar />
            <div className="flex-1">
                {children}
            </div>
        </div>
    )
}