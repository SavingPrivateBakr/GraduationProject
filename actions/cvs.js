'use server'
import * as ThirdParty from "@/lib/auth";
import {getAccessToken} from "@/lib/server-utils";
import {redirect} from "next/navigation";





export async function cvListAction(formData) {
   
    try{
        const cookies = await getAccessToken();
        if (!cookies){
            redirect('/');
            return {message: "An Error Occurred, Please try again",
                success: false
            };
        }
       
        const cvList = await ThirdParty.GetCvList(cookies.value,formData.page);
     
        return {
            success: true,
            cvList
        }

    }catch (error){
   
        console.error(error);
    }
    return {message: "An Error Occurred, Please try again",
        success: false
    };
}




export async function cvCreateUpdate(cvData){
   
    try{
     
        const cookies = await getAccessToken();
        if (!cookies){
            redirect('/');
            return {message: "An Error Occurred, Please try again",
                success: false
            };
        }
       
        const response = await ThirdParty.CreateUpdateCv(cookies.value,cvData);
      
        return {
            success: true,
            response
        }

    }catch (error){
   
        console.error(error);
    }
    
}



export async function cvGetAction(cvId){

    try{
        const cookies = await getAccessToken();
        if (!cookies){
            redirect('/');
            return {message: "An Error Occurred, Please try again",
                success: false
            };
        }
        const cv = await ThirdParty.GetCv(cookies.value,cvId);
        return {
            success: true,
            cv
        }

    }catch (error){
        console.error(error);
    }
    return {message: "An Error Occurred, Please try again",
        success: false
    };
}

export async function uploadCv(uploadedcv){

    try{
        
        const cookies = await getAccessToken();
        if (!cookies){
            redirect('/');
            return {message: "An Error Occurred, Please try again",
                success: false
            };
        }
        const cv = await ThirdParty.uploadCv(cookies.value,uploadedcv);
        return {
            success: true
        }

    }catch (error){
        console.error(error);
    }
    return {message: "An Error Occurred, Please try again",
        success: false
    };
}


export async function deleteCv(cvData){
   
    try{
       
        const cookies = await getAccessToken();
        if (!cookies){
            redirect('/');
            return {message: "An Error Occurred, Please try again",
                success: false
            };
        }
       
        const response = await ThirdParty.deleteCv(cookies.value,cvData);
      
        return {
            success: true,
            response
        }

    }catch (error){
   
        console.error(error);
    }
    return {message: "An Error Occurred, Please try again",
        success: false
    };
}


export async function analysisCv(cvId){
    try{
        const cookies = await getAccessToken();
        if (!cookies){
            redirect('/');
            return {message: "An Error Occurred, Please try again",
                success: false
            };
        }
        
        const careers = await ThirdParty.analysisCv(cookies.value,cvId);
 
        return {
            success: true,
            careers
        }
      
    }catch (error){
        console.error(error);
    }
    
    return {message: "An Error Occurred, Please try again",
        success: false
    };
}


export async function careerpath(cvId, track){

    try{
      
        const cookies = await getAccessToken();
        if (!cookies){
            redirect('/');
            return {message: "An Error Occurred, Please try again",
                success: false
            };
        }
        
        const roadmap = await ThirdParty.careerpath(cookies.value,cvId,track);

        return {
            success: true,
            roadmap
        }
      
    }catch (error){
        console.error(error);
    }
    
    return {message: "An Error Occurred, Please try again",
        success: false
    };
}

export async function joblist(track, location){
    try{
        const cookies = await getAccessToken();
        if (!cookies){
            redirect('/');
            return {message: "An Error Occurred, Please try again",
                success: false
            };
        }
       
        const jobs = await ThirdParty.joblist(cookies.value,track,location);
     
        return {
            success: true,
            jobs
        }
      
    }catch (error){
        console.error(error);
    }
    
    return {message: "An Error Occurred, Please try again",
        success: false
    };

}



export async function atsanalysis(cvId, jobDescription){
    try{
        const cookies = await getAccessToken();
        if (!cookies){
            redirect('/');
            return {message: "An Error Occurred, Please try again",
                success: false
            };
        }
      
        const atsresult = await ThirdParty.atsanalysis(cookies.value,cvId,jobDescription);
     
        return {
            success: true,
            atsresult
        }
      
    }catch (error){
        console.error(error);
    }
    
    return {message: "An Error Occurred, Please try again",
        success: false
    };

}


export async function botreply(prompt,cvdata) {

    try {
        console.log("Bot reply function called with prompt:", prompt);
        console.log("CV data:", cvdata);
        const cookies = await getAccessToken();
       
        if (!cookies) {
            redirect('/');
            return { message: "An Error Occurred, Please try again", success: false };
        }
          
        const response = await ThirdParty.botreply(cookies.value, prompt,cvdata);
        
        return {
            success: true,
            response
        };

    } catch (error) {
        console.error(error);
    }
    return { message: "An Error Occurred, Please try again", success: false };
}



