import axios, { Axios } from "axios";

const BACKEND_BASE_URL = "http://localhost:3001/api/v1";

export async function Login(formData) {
    try {
        const response = await axios.post(`${BACKEND_BASE_URL}/auth/login/`, formData);
        return response.data
    } catch (error) {
        throw error;
    }
}

export async function ForgetPassword(email) {
    try {
       
        const response = await axios.post(`${BACKEND_BASE_URL}/auth/forgot-password/`, email);
        return response.data
    } catch (error) {
        throw error;
    }

}

export async function Register(formData) {
    try {
        
        const response = await axios.post(`${BACKEND_BASE_URL}/auth/signup`, formData);
        
        return response.data
    } catch (error) {
        throw error;
    }
}


export async function RefreshToken(refreshToken) {
   try {
       const response = await fetch(`${BACKEND_BASE_URL}/auth/refresh/`, {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({refresh: refreshToken.trim()}),
       })
         return response.json();
   }
    catch (error) {
         throw error;
    }
}



export async function GetCvList(accessToken, page = 1,limit = 10, offset = 0) {
  
    try {
        const headers = {
            
            'Authorization': `Bearer ${accessToken}`
        };
        const url = `${BACKEND_BASE_URL}/cvs/getAllMyCvs`;
        const response = await axios.get(url, { headers });
           
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function sendCvRequest(method, url, headers, data) {
    console.log("Sending CV request:", { method, url, headers, data });
    return await axios({ method, url, headers, data });
}

export async function CreateUpdateCv(accessToken, cvData) {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        };

        const cvId = cvData._id || cvData.id;
        const isCreate = cvId === "new";
        const method = isCreate ? "POST" : "PUT";

        let url;
        if (isCreate) {
            url = `${BACKEND_BASE_URL}/cvs/createCv`;
        } else {
            if (!cvData.data?._id) {
                throw new Error("CV ID is required for updates");
            }
            url = `${BACKEND_BASE_URL}/cvs/${cvData.data._id}`;
        }

        // Create a clean copy without circular references
        const cleanData = {
            ...(cvData.data || {}),
            title: cvData.data.title
        };
        
        console.log("Clean Data:", cleanData);
        if (cleanData.data) {
            delete cleanData.data;
        }

        const response = await axios({
            method,
            url,
            headers,
            data: cleanData
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function GetCv(accessToken, cvId) {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        };
        const url = `${BACKEND_BASE_URL}/cvs/${cvId}`;
        const response = await axios.get(url, { headers });
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

export async function uploadCv(accessToken, uploadedcv) {
    
    try {
        let url = `${BACKEND_BASE_URL}/cvs/uploadCv`;
     
        const response = await axios.post(url, uploadedcv, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${accessToken}`,
            },
        });
        
   return response;
      
    } catch (error) {
   
        throw error;
    }
}

export async function deleteCv(accessToken, cvData) {
    try {
      
        const headers = {
         
            'Authorization': `Bearer ${accessToken}`
        };
        
       const isUpdate = (cvData._id || cvData.id) === "new";
    
     
    
        const method =  "DELETE";

        let url = `${BACKEND_BASE_URL}/cvs/${cvData.data._id }`;
 
      
        const response = await axios({
            method,
            url,
            headers,
      
        });
   
        return response.data;

    } catch (error) {
       
        throw error;
    }
}



export async function analysisCv(accessToken, cvId) {
    try {
      const url = `${BACKEND_BASE_URL}/cvs/careerRecommendation/${cvId}`;
      console.log("CV analysis URL:", cvId);
      const response = await axios.post(
        url,
        {}, 
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    
    
      return response.data;
    } catch (error) {
      console.error("CV analysis error:", error?.response?.data || error.message);
      throw error;
    }
  }

  export async function careerpath(accessToken, cvId, track) {
    try {

      const headers = {
        
        'Authorization': `Bearer ${accessToken}`
      };
     
      const url = `${BACKEND_BASE_URL}/cvs/careerPath/${cvId}?track=${track}`;
  
       
      const response = await axios.post(url, track, { headers });
    
      return response.data;
    } catch (error) {
      console.error("CV analysis error:", error?.response?.data || error.message);
      throw error;
    }
  }
  

  export async function joblist(accessToken,track, location) {
    try {
      
        const url = `${BACKEND_BASE_URL}/cvs/getJobs`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          };
        const response = await axios.post(url,{track, location}, {headers});
       
        return response.data;
    } catch (error) {
        throw error;
    }
  }


  
  export async function atsanalysis(accessToken,cvId, jobDescription) {
    try {
   
        const url = `${BACKEND_BASE_URL}/cvs/atsAnalysis/${cvId}`;
        console.log("CV analysis URL:", jobDescription);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          };
        const response = await axios.post(url, {jobDescription}, {headers});
      
        return response.data;
    }
    catch (error) {
        throw error;
    }
  }


export async function botreply(accessToken,prompt, cvdata)
{
    try {
        console.log("Bot reply data:", { cvdata, prompt });
        const url = `${BACKEND_BASE_URL}/cvs/botReply`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        };
        const response = await axios.post(url, { cvdata, prompt }, { headers });
   
        return response.data;
    } catch (error) {
        console.error("Bot reply error:", error?.response?.data || error.message);
        throw error;
    }

}