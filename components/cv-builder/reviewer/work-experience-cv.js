import useAppContext from "@/hooks/useAppContext";
import WorkExperienceItem from "@/components/cv-builder/reviewer/items/work-experience-item";

const WorkList = ({ item, className }) => {
    return (
        <div className={`grid grid-cols-3 gap-6 ${className}`}>
            <div className="col-span-3 space-y-2">
                <h2 className="section-title mb-1 border-b-2 border-gray-300 editable">
                    {item.data.titles["experience"]}
                </h2>

                {item.data.workExperience.map((workItem, index) => (
                    workItem.isShownInPreview && (
                        <WorkExperienceItem 
                            key={`${workItem.company}-${index}`}
                            item={workItem}
                        />
                    )
                ))}
            </div>
        </div>
    );
};

const WorkExperienceCv = ({ data, isListItemPreview, className }) => {
    const { resumeData } = useAppContext();
    const item = isListItemPreview ? data : resumeData;
   
    const countIsShownInPreview = item.data.workExperience.filter(item => item.isShownInPreview).length;
    if (countIsShownInPreview === 0) {
        return null;
    }

    return <WorkList item={item} className={className} />;
};

export default WorkExperienceCv;