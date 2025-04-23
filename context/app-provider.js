"use client";
import React, {useEffect, useRef, useState,memo,useLayoutEffect} from 'react';
import AppContext from './app-context';
import {getEmailAndName} from "@/lib/utils";
import {cvCreateUpdate, cvGetAction} from "@/actions/cvs";
import {redirect} from "next/navigation";


const AppProvider = ({children}) => {
    const [resumeData, setResumeData] = useState(null);
    const [resumeList, setResumeList] = useState([]);
    const globalRefs = useRef({});
    const [controlPanel, setControlPanel] = useState(0);
    const [lastControlPanel, setLastControlPanel] = useState(0);
    const [currentEditIndex, setCurrentEditIndex] = useState({});


    const [user, setUser] = useState(() => {
        return getEmailAndName();
      });
    const isAuthenticated = !!user;
 
    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    const setControlPanelIndex = (index) => {
        setLastControlPanel(controlPanel);
        setControlPanel(index);

    };


    const syncResumeData = async (data) => {
 
      
            setResumeData(
                data
            );
            console.log(resumeData);
            
    }

    const saveResumeData = async () => {
        console.log("fs",resumeData);
        const response = await cvCreateUpdate(resumeData);
        if (response.success) {
          await redirect('/dashboard');
        }
    }

  
    const defaultCv = {
        id: 'new',
        name: 'New CV',

        data: {
            name: '',
            position: '',
            contactInformation: '',
            email: '',
            address: '',
            socialMedia: [],
            summary: [],
            educations: [],
            courses: [],
            workExperience: [],
            projects: [],
            skills: [],
            languages: [],
            titles: {
                "profile": "PROFILE",
                "experience": "EXPERIENCE",
                "education": "EDUCATION",
                "certification": "CERTIFICATION",
                "skills": "SKILLS",
                "languages": "LANGUAGES"
            },

            order: [
                "contactInformation",
                "profile",
                "workExperience",
                "education",
                "courses",
                "skills",
                "languages"
            ],

        }
    }

    const getResumeWithId = async (id) => {
       
        if (id === 'cvnew') {
            console.log("zzzzz");
            setResumeData({...defaultCv});
            return;
        }


        
      
            const response = await cvGetAction(id);
     
            if (response.success) {
               
                await setResumeData(response.cv);
            }
         
    }


    const updateResumeData = (newData) => {
        setResumeData(newData);
    }

    const OnEditSectionTitle = (e, section) => {
        const value = e.target.innerText;
        const updatedTitles = {...resumeData.titles, [section]: value};
        setResumeData({...resumeData, titles: updatedTitles});
    }


    const checkAuthStatus = () => {
        const data = getEmailAndName();
        
        if (data.isAuthenticated) {
            if(!user)
                login(data);
        } else {
            logout();
        }
    };

   
    useEffect(() => {
        checkAuthStatus();
        const interval = setInterval(checkAuthStatus, 1000 * 30);
        return () => clearInterval(interval);
    }, []);
 


    return (
        <AppContext.Provider value={{
            resumeData,
            setResumeData,
            globalRefs,
            updateResumeData,
            OnEditSectionTitle,
            controlPanel,
            lastControlPanel,
            setControlPanelIndex,
            currentEditIndex,
            setCurrentEditIndex,


            user, isAuthenticated, login, logout,
            resumeList, setResumeList, syncResumeData,getResumeWithId,defaultCv,saveResumeData
        }}>
            {children}
        </AppContext.Provider>
    );
};

export default memo(AppProvider);