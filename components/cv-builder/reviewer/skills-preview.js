import React from 'react';
import useAppContext from "@/hooks/useAppContext";
import SkillItem from "@/components/cv-builder/reviewer/items/skill-item";

const SkillsCv = ({ isListItemPreview, data, className }) => {
    const { resumeData } = useAppContext();
    const item = isListItemPreview ? data : resumeData;
    const filteredSkills = item.data.skills.filter(skill => skill.isShownInPreview);

    if (!item.data.skills || !filteredSkills.length) return null;

    return (
        <div className={className}>
            <h2
                className="section-title mb-1 border-b-2 border-gray-300 editable"
                
                
            >
                {item.data.titles.skills}
            </h2>
            {filteredSkills.map((skillItem, index) => (
                <SkillItem 
                    key={`${skillItem.title}-${index}`}
                    item={skillItem}
                />
            ))}
        </div>
    );
};

export default SkillsCv;