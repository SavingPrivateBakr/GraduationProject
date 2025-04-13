import { BugIcon, ExitIcon } from "@/components/svgs/svgs";
import { deleteCv } from "@/actions/cvs";
import useAppContext from "@/hooks/useAppContext";
import { useRouter } from "next/navigation";
import Decision from "@/app/(about)/about/page";
import { useParams,usePathname } from "next/navigation";
import Link from 'next/link';
export default function BuilderSideBar() {
    const { resumeData } = useAppContext();
    const router = useRouter();
 
    const handleDelete = async () => {
        console.log("Delete clicked!");
        if (!resumeData) {
            console.error("No resume data found!");
            return;
        }
        try {
            const success = await deleteCv(resumeData);
            console.log(success.success);
            if (success.success) {
                router.push('/dashboard');
            }
        } catch (error) {
            console.error("Error deleting resume:", error);
        }
    };
 


    return (
        <div id="SideBar" className="z-7 sidebar:flex sidebar:h-screen sidebar:w-30 sidebar:pt-8 sidebar:flex-col sticky top-0 hidden w-full xl:w-[130px]">
            <div className="sidebar:top-8 sticky top-0 w-full">
                <nav className="sidebar:rounded-large sidebar:shadow-themeShadow sidebar:pb-4 flex w-full flex-col items-center bg-white shadow-[rgb(100_100_100)_0px_0px_5px_0px]">
                    <div className="sidebar:grid-cols-1 sidebar:grid-rows-[min-content_min-content_min-content] grid w-full max-w-full grid-cols-[min-content_1fr_0px] md:grid-cols-[60px_1fr_60px]">
                        
                        {/* Dashboard Link */}
                        <Link className="sidebar:justify-center sidebar:pb-4 sidebar:pl-0 sidebar:pt-6 group relative flex w-full items-center pl-4 hover:cursor-pointer md:pl-6"
                            href={`${usePathname()}/about`}
                            aria-label="Go to Dashboard">
                            <div className="relative flex h-[90px] w-[90px] items-center justify-center rounded-full group-hover:bg-gray-50">
                                <BugIcon />
                               
                            </div>
                            <div className="bg-primaryBlack sidebar:group-hover:flex absolute top-[118px] hidden min-w-fit flex-col items-center rounded-full border-solid p-1 px-2 text-xs font-bold text-white">
                                Go to Dashboard
                                <div className="after:border-b-primaryBlack h-0 w-0 after:absolute after:-top-[15px] after:left-1/2 after:h-0 after:w-0 after:-translate-x-1/2 after:border-b-[8px] after:border-l-[8px] after:border-r-[8px] after:border-t-[8px] after:border-l-transparent after:border-r-transparent after:border-t-transparent"></div>
                            </div>
                        </Link>

                        {/* Delete Button (Styled like the Dashboard Button) */}
                        <div className="sidebar:grid-cols-1 sidebar:grid-rows-[min-content_min-content] grid grid-cols-[min-content_min-content_min-content] items-stretch justify-center"
                            onClick={handleDelete}>
                            <a className="sidebar:justify-center sidebar:pb-4 sidebar:pl-0 sidebar:pt-6 group relative flex w-full items-center pl-4 hover:cursor-pointer md:pl-6"
                                aria-label="Delete Resume">
                                <div className="relative flex h-[90px] w-[90px] items-center justify-center rounded-full group-hover:bg-gray-50">
                                    <ExitIcon />
                                </div>
                                <div className="bg-primaryBlack sidebar:group-hover:flex absolute top-[118px] hidden min-w-fit flex-col items-center rounded-full border-solid p-1 px-2 text-xs font-bold text-white">
                                    Delete Resume
                                    <div className="after:border-b-primaryBlack h-0 w-0 after:absolute after:-top-[15px] after:left-1/2 after:h-0 after:w-0 after:-translate-x-1/2 after:border-b-[8px] after:border-l-[8px] after:border-r-[8px] after:border-t-[8px] after:border-l-transparent after:border-r-transparent after:border-t-transparent"></div>
                                </div>
                            </a>
                        </div>

                    </div>
                </nav>
            </div>
        </div>
    );
}
