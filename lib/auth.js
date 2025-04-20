import axios from "axios";

const BACKEND_BASE_URL = "http://localhost:3001/api/v1";

export async function Login(formData) {
    try {
        const response = await axios.post(`${BACKEND_BASE_URL}/auth/login/`, formData);
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

export async function CreateUpdateCv(accessToken, cvData) {
    try {
      
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        };
        
       const isUpdate = (cvData._id || cvData.id) === "new";
    
     
 
        const method =  isUpdate == true ?"POST": "PUT";
       
        let url = `${BACKEND_BASE_URL}/cvs/${method=="POST"?"createCv":cvData.data._id }`;
          cvData.data.title = cvData.title;
       
 
        const sendData = {
            ...cvData,
            data: JSON.stringify(cvData.data)
        }
      console.log(sendData.data);
      
        const response = await axios({
            method,
            url,
            headers,
            data: sendData.data
        });
        console.log(response.data);
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
    
     
       console.log(isUpdate);
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
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      };
  
      const url = `${BACKEND_BASE_URL}/cvs/careerPath/${cvId}`;
  
   
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