import React from 'react';
import DateComponent from "@/components/general/date-component";

const EducationItem = ({ item }) => {
    return (
        <div className="education-item">
            <div className="flex flex-row justify-between space-y-1">
                <p className="content">
                    <span className="i-bold">{item.degree}</span>
                    <span className="pl-1">({item.school})</span>
                </p>
                <DateComponent
                    startYear={item.startYear}
                    endYear={item.endYear}
                    id={`education-start-end-date`}
                />
            </div>

            {item.notes && item.notes.length > 0 && (
                <p className="content i-bold pl-2 mt-0 mb-2">
                    <span className="content hyphens-auto">{item.notes}</span>
                </p>
            )}
        </div>
    );
};

export default EducationItem;