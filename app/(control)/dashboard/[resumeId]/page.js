import BuilderPage from "@/components/cv-builder/builder";
import { DndProvider } from "@/context/dnd-provider";

export default async function CVBuilderPage({ params }) {
    const { resumeId } = await params;

    return (
        <DndProvider>
            <div className="relative overflow-x-auto">
                {/* Container with minimum width to prevent shrinking */}
                <div className="min-w-[100px] "> {/* Adjust min-width as needed */}
                    <BuilderPage id={resumeId} />
                </div>
            </div>
        </DndProvider>
    );
}