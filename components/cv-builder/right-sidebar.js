import CircularButton from "@/components/general/circle-btn";
import { FaSave, FaTrashAlt, FaChartBar } from "react-icons/fa";
import useAppContext from "@/hooks/useAppContext";
import { useRouter, usePathname } from "next/navigation";
import { deleteCv } from "@/actions/cvs";

export default function RightSidebar() {
    const { resumeData, saveResumeData } = useAppContext();
    const router = useRouter();
    const pathname = usePathname();

    const handleNavigateToAbout = () => {
        router.push(`${pathname}/about`);
    };

    const handleSave = async () => {
        await saveResumeData();
    };

    const handleDelete = async () => {
        if (!resumeData) {
            console.error("No resume data found!");
            return;
        }
        try {
            const success = await deleteCv(resumeData);
            if (success.success) {
                router.push('/dashboard');
            }
        } catch (error) {
            console.error("Error deleting resume:", error);
        }
    };

    return (
        <div className="fixed right-4 top-1/4 flex flex-col gap-4 z-10">
            <CircularButton
                tooltipText="Go to Analysis"
                onClick={handleNavigateToAbout}
                icon={FaChartBar}
                bgColor="bg-indigo-600 hover:bg-indigo-700"
            />
            <div className="h-1"></div>

            <CircularButton
                tooltipText="Save Resume"
                onClick={handleSave}
                icon={FaSave}
                bgColor="bg-teal-500 hover:bg-teal-600"
            />
            <div className="h-1"></div>

            <CircularButton
                tooltipText="Delete Resume"
                onClick={handleDelete}
                icon={FaTrashAlt}
                bgColor="bg-red-500 hover:bg-red-600"
            />
        </div>
    );
}
