"use client";
import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {uploadCv} from "@/actions/cvs"
function cvupload() {
  const [cvfileuploaded,setcvfileuploaded]= useState(null);
  const router = useRouter();

  const handleFileChange = (e) => {

    const selectedFile = e.target.files[0]; 
   
    if (selectedFile && selectedFile.type === "application/pdf") {
      setcvfileuploaded(selectedFile);
    } else {
        alert("Please select a valid PDF file.");
    }
};

  const handleUpload = async () => {
    if (!cvfileuploaded) {
        alert("Please select a file first!");
        return;
    }

    const formData = new FormData();
    formData.append("resume", cvfileuploaded);
    const status=await uploadCv(formData);

    
    if(status.success==true)
    {
      router.back();
    }
};


  return (

      <div className="max-w-6xl mx-auto mt-40">
        <div className="text-center mb-16">
        
          <p className="text-gray-400 mt-4 text-lg">
            Unlock Your Professional Potential with AI-Powered Career Guidance
          </p>
        </div>

        
          <div className="max-w-xl mx-auto">
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-700">
              <div className="text-center">
                <i className="fas fa-cloud-upload-alt text-4xl text-blue-400 mb-4"></i>
                <h2 className="text-2xl font-bold mb-4 text-white">Upload Your CV</h2>
                <p className="text-gray-400 mb-6">
                  Let our AI analyze your experience and skills
                </p>
              </div>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
              <input  type="file" 
                accept="application/pdf" 
                id="cv-upload" 
                onChange={handleFileChange} 
                className="hidden" 
               
                />

{cvfileuploaded==null?  <label
                  htmlFor="cv-upload"
                  className="cursor-pointer text-blue-400 hover:text-blue-300 text-xl"
                >
                  Choose a file
                </label> : <label className=" text-blue-700 hover:text-blue-300 text-xl">{cvfileuploaded.name}</label>
}
              </div>
              <button
  onClick={handleUpload}
  disabled={!cvfileuploaded}
  className="w-full mt-6 bg-gradientPinkRed text-white rounded-lg py-3 font-semibold transition-all duration-300 hover:opacity-90 hover:font-bold disabled:opacity-50 disabled:cursor-not-allowed"
>
  Upload the file
</button>
            </div>
          </div>
        
     
    </div>
  );
}

export default cvupload;