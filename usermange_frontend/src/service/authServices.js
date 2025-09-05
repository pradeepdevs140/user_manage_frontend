import axios from "axios";
const BASE_URL = "http://localhost:8080";
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
})

api.interceptors.request.use(
    (response)=> response , 
    (error)=>{
        if(error.response){
            switch(error.response.status){
                case 401:
                    authService.logout();
                    window.location.href = "/login";
                    break;
                case 403:
                    console.log("Forbidden");
                    break;
                case 404 :
                    console.error("Resouce Not Found");
                    break;
                case 500:
                    console.error("Internal Server Error");
                    break;
            }
           
        }
        else if(error.request){
            console.error("No response received from server");
        }
        else{
            console.error("Error in setting up request:", error.message);
        }
        return Promise.reject(error);
    }
)
const authService = {
    signupNormalUser : async(username , email , password)=>{
        try{
            const response = await api.post("/auth/register" ,
                 {username , email , password});
        return response.data;
        }
        catch(error){
            console.log("signup failed", error );
            throw error;
        }
    },
     login : async(username , password)=>{
        try{
            const response = await api.post("/auth/login" , 
                {username , password});
                const user = authService.getCurrentUser();
                return {
                    ...response.data,
                    user
                }
        }
        catch(error){
            console.log("login failed", error );
            throw error;
        }
    },
    fetchCurrentUser : async()=>{
        try{
            const response = await api.get("/auth/getcurrentuser");
            localStorage.setItem("user", JSON.stringify(response.data))
            return response.data;
        }
        catch(error){
            console.log("fetch current user failed", error );
           if(error.response && error.response.status === 401){
            authService.logout();
            window.location.href = "/login";
           }
           return null;
         
        }
    },
    getCurrentUser :()=>{
        const user = localStorage.getItem("user");
        try{
            return user ? JSON.parse(user) : null;
        }
        catch(error){
            console.error("Error parsing user data from localStorage", error);
            return null;
        }
    },
    logout :async()=>{
        try{
            await api.post("/auth/logout");
            localStorage.removeItem("user");
        }
        catch(error){
            console.log("logout failed", error );
            
        }

    },
    isAuthenticated :async()=>{
        try{
            const user = await authService.fetchCurrentUser();
            return !!user;
        }
        
        catch(error){
            console.log("isAuthenticated check failed", error );
            return false;
        }

    },
    updateprofile : async (userdata) =>{
        try{
            const response = await api.put(`/users/updateUser/${userdata.id}` , userdata);
            const curentuser = authService.getCurrentUser();
            const updateduser = {...curentuser , ...response.data};
            localStorage.setItem("user" , JSON.stringify(updateduser));
        }
        catch(error){
            console.log("Update profile failed", error);
            throw error;
        }
    } ,
    fetchAllUsers : async()=>{
        try{
            const response =await api.get("/users/getAlluser");
            return response.data;
        }
        catch(error){
            console.log("Fetch all users failed", error);
            throw error;
        }
    },
    deleteUser : async(userId) =>{
        try{
            await api.delete(`/users/deleteUser/${userId}`);
        }
        catch(error){
            console.log("Delete user failed", error);
            throw error;
        }
    },
    changePassword : async(currentPassword, newPassword, confirmNewPassword) =>{
        try{
            const currentUser = authService.getCurrentUser();
            if(!currentUser || !currentUser.id){
                throw new Error("No authenticated user found");
            }
            await api.post(`/users/changePassword/${currentUser.id}` , 
            {currentPassword, newPassword, confirmNewPassword});
            return response.data;
        }
        catch(error){
            console.log("Change password failed", error);
            throw error;
        }
    }



}
export {api , authService};