import React from 'react';
import DateComponent from "@/components/general/date-component";

const AchievementItem = ({ item }) => (
    <div dangerouslySetInnerHTML={{ __html: item.text }} />
);

const WorkExperienceItemBody = ({ item }) => {
    return (
        <>
            <div className="flex flex-row justify-between space-y-1">
                <p className="content i-bold">
                    {item.position} {item.isPartTime ? "(Part-Time)" : ""}
                </p>
                <DateComponent
                    startYear={item.startYear}
                    endYear={item.endYear}
                    id={`work-experience-start-end-date`}
                />
            </div>
            
            <p className="content i-bold pl-1">
                {item.href ? (
                    <a
                        href={item.href}
                        aria-label={item.company}
                        title={item.company}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center content justify-center i-bold underline text-blue-500 hover:text-blue-700"
                        style={{
                            wordWrap: 'break-word',
                            display: 'inline-flex',
                            fontSize: '.9rem',
                            padding: '2px 0',
                            lineHeight: '1.2',
                        }}
                    >
                        {item.company && <span>{item.company}</span>}
                    </a>
                ) : (
                    item.company && <span>{item.company}</span>
                )}
                {item.company && item.workType && <span> - </span>}
                {item.workType && <span>{item.workType}</span>}
                {(item.company || item.workType) && item.location && <span>, </span>}
                {item.location && <span>{item.location}</span>}
            </p>

            {item.companyField && (
                <p className="content i-bold pl-2" dangerouslySetInnerHTML={{ __html: item.companyField }} />
            )}

            {item.technologies?.length > 0 && (
                <p className="content i-bold pl-1 mt-1">
                    <span>Technologies: </span>
                    <span className="content hyphens-auto">{item.technologies.join(', ')}</span>
                </p>
            )}
        </>
    );
};

const WorkExperienceItem = ({ item }) => {
    return (
        <div className="work-experience-item">
            <WorkExperienceItemBody item={item} />
            
            {item.achievements?.length > 0 && (
                <ul className="list-disc ul-padding content">
                    {item.achievements.map((achievement, idx) => (
                        <li key={idx}>
                            <AchievementItem item={achievement} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default WorkExperienceItem;