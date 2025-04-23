import React from 'react';
import useAppContext from "@/hooks/useAppContext";
import EducationItem from "@/components/cv-builder/reviewer/items/education-preview-item";

const EducationSection = ({ data, isListItemPreview, className }) => {
    const { resumeData } = useAppContext();
    const cvData = isListItemPreview ? data : resumeData;
    const filteredEducations = cvData.data.educations.filter((ed) => ed.isShownInPreview);

    if (!cvData.data.educations || !filteredEducations.length) return null;

    return (
        <div className={className}>
            <h2 
                className="section-title mb-1 border-b-2 border-gray-300 editable"
                
                
            >
                {cvData.data.titles.education}
            </h2>
            {filteredEducations.map((eduItem, index) => (
                <EducationItem 
                    key={`${eduItem.school}-${eduItem.startYear}-${index}`}
                    item={eduItem} 
                    index={index}
                />
            ))}
        </div>
    );
};

export default EducationSection;