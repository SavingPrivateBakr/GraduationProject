import React from 'react';

function SkillItemBody({ item, filteredSkills }) {
    return (
        <p className="content pl-1">
            <span className="font-bold">{item.title}: </span>
            {filteredSkills.map((skillObject, index) => {
                const skill = skillObject.text;
                const isLast = index === filteredSkills.length - 1;
                return (
                    <span key={index} className="editable">
                        {skill}{isLast ? '' : ', '}
                    </span>
                );
            })}
        </p>
    );
}

const SkillItem = ({ item }) => {
    const filteredSkills = item.skills.filter(skill => skill.isShownInPreview);
    if (!item.skills || !filteredSkills.length) return null;

    return <SkillItemBody item={item} filteredSkills={filteredSkills} />;
};

export default SkillItem;