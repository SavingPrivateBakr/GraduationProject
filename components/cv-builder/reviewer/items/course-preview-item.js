import React from 'react';
import DateComponent from "@/components/general/date-component";

const NotesItem = ({ item }) => (
    <div dangerouslySetInnerHTML={{ __html: item.text }} />
);

function CourseItemNotesList({ item }) {
    return (
        <ul className="list-disc ul-padding content">
            {item.notes?.map((note, index) => (
                <li key={index}>
                    <NotesItem item={note} />
                </li>
            ))}
        </ul>
    );
}

const CourseItem = ({ item }) => {
    return (
        <div className="course-item">
            <div className="flex flex-row justify-between space-y-1">
                <p className="content i-bold">
                    {item.link ? (
                        <a
                            href={item.link}
                            aria-label={item.name}
                            title={item.name}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 content justify-center i-bold underline text-blue-500 hover:text-blue-700"
                            style={{
                                wordWrap: 'break-word',
                                display: 'inline-flex',
                                fontSize: '.9rem',
                            }}
                        >
                            <span>{item.name}</span>
                        </a>
                    ) : (
                        <span>{item.name}</span>
                    )}
                </p>
                <DateComponent
                    startYear={item.startYear}
                    endYear={item.endYear}
                    id={`course-${item.name}-dates`}
                />
            </div>
            {item.school && <p className="content i-bold pl-1">{item.school}</p>}
            {item.notes?.length > 0 && <CourseItemNotesList item={item} />}
        </div>
    );
};

export default CourseItem;