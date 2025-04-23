import React from 'react';
import useAppContext from "@/hooks/useAppContext";

function LanguagesHeader({ item }) {
    return (
        <h2 className="section-title mb-1 border-b-2 border-gray-300">
            {item.data.titles.languages}
        </h2>
    );
}

const LanguagesSection = ({ data, isListItemPreview, className }) => {
    const { resumeData } = useAppContext();
    const item = isListItemPreview ? data : resumeData;
    const filteredLanguages = item.data.languages?.filter(item => item.isShownInPreview) || [];
    
    if (!filteredLanguages.length) return null;

    return (
        <div className={className}>
            <LanguagesHeader item={item} />
            <div className="language-items">
                {filteredLanguages.map((item, index) => (
                    <span 
                        key={`${item.title}-${index}`}
                        className="inline-flex items-center"
                    >
                        <span>{item.title} ({item.level})</span>
                        {index < filteredLanguages.length - 1 && <span>,&nbsp;</span>}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default LanguagesSection;