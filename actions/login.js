'use server';
import * as ThirdParty from "@/lib/auth";
import {decodeAndSetCookies, removeAllUserCookies} from "@/lib/server-utils";

export async function login(formData) {
  
    try {
           
        const response = await ThirdParty.Login(formData);
      
        if (response.status=='success' ) {
          
            const {username, email} = await decodeAndSetCookies(response.token, response.token);
             
            return {
                success: true,
                message: "Login successful",
                tokens: {accessToken: response.access, refreshToken: response.refresh},
                statusCode: 200,
                username: username,
            };
        }
    } catch (error) {
       
        const errorCode = error.response.status;
        let message = "";
        if (errorCode === 401) {
            message = "Invalid email or password";
        } else {
            message = "Something went wrong. Please try again later";
        }
        // Return error response
        return {
            success: false,
            message: error.response.data.message,
            statusCode: errorCode
        };
    }
}


export async function logout() {
    try {
        await removeAllUserCookies();
        return {
            success: true,
            message: "Logout successful",
            statusCode: 200
        };
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong. Please try again later",
            statusCode: 500
        };
    }
}



export async function forgetpassword(email) {
    try {
        const response = await ThirdParty.ForgetPassword(email);
        
        if (response.status === 'success') {
            return {
                success: true,
                message: "Password reset link sent to your email",
                statusCode: 200
            };
        }
    } catch (error) {
        const errorCode = error.response.status;
        let message = "";
        if (errorCode === 400) {
            message = "Invalid email address";
        } else {
            message = "Something went wrong. Please try again later";
        }
        // Return error response
        return {
            success: false,
            message: message,
            statusCode: errorCode
        };
    }


}
