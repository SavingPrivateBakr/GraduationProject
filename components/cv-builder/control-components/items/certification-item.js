import React, {useRef} from "react";
import NormalDraggable from "@/components/cv-builder/utils/normal-draggable";
import ListComponent from "@/components/cv-builder/control-components/utils/list-component";
import {formatDateRange} from "@/lib/helpers";
import EyeComponent from "@/components/cv-builder/control-components/utils/eye-component";
import DeleteComponent from "@/components/cv-builder/control-components/utils/delete-component";

const CertificationItem = ({
                               draggableId,
                               index, certificationItem, type, keyData,
                               OnDisableItem = (index) => {},
                               OnRemoveItem = (index) => {},
                               OnEditItem = (e, index) => {}
                           }) =>
{

    return <NormalDraggable draggableId={draggableId} index={index} keyData={keyData} isScaled={false}>
        <div key={index}
             className={"border-inputBackground group grid w-full max-w-full cursor-pointer items-center border-b-[5px] border-solid px-4 py-3 md:px-6 md:py-4 grid-cols-[min-content_1fr_min-content]"}>
            <ListComponent/>

            <div
                onClick={(e) => OnEditItem(e, index)}
                className={"flex w-full min-w-0 items-center pr-2 hover:opacity-70"}>
                <div>
                    <div className="flex flex-col">
                        <div className="whitespace-pre-wrap">
                            <span className="text-brandDarkBlue text-base font-bold">{certificationItem.name}</span>
                        </div>
                    </div>

                    <p className="text-textMedium whitespace-pre-wrap text-[13px]">
                        {formatDateRange(certificationItem.startYear, certificationItem.endYear)} | {certificationItem.school}

                    </p>
                </div>
            </div>

            {/* Eye Icon */}
            <div className={"flex content-end items-center"}>
                <EyeComponent onClick={() => OnDisableItem(index)} isVisible={certificationItem.isShownInPreview}/>
                <DeleteComponent onClick={() => OnRemoveItem(index)}/>
            </div>
        </div>


    </NormalDraggable>
};

export default CertificationItem;