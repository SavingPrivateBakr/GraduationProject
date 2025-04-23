import useAppContext from "@/hooks/useAppContext";
import CourseItem from "@/components/cv-builder/reviewer/items/course-preview-item";

const CoursesCv = ({ data, isListItemPreview, className }) => {
    const { resumeData } = useAppContext();
    const item = isListItemPreview ? data : resumeData;
    const filteredCertifications = item.data.courses.filter((course) => course.isShownInPreview);

    if (!item.data.courses || !filteredCertifications.length) return null;

    return (
        <div className={className}>
            <h2
                className="section-title mb-1 border-b-2 border-gray-300 editable"
                
                
            >
                {item.data.titles.certification}
            </h2>
            {filteredCertifications.map((courseItem, index) => (
                <CourseItem 
                    key={`${courseItem.name}-${index}`}
                    item={courseItem}
                />
            ))}
        </div>
    );
};

export default CoursesCv;