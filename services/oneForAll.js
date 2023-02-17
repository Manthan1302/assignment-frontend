import axios from "axios";
const host = "https://taskify-backend-server.onrender.com";

export const loginServices = async(data)=>
{
    console.log("data:",data);
    const url = "/login";
    const link = host+url;

    try {
        const result = await axios.post(link,data);
        console.log("result:", result.data);
        if(result.data.logedActor)
        {
            const response = result.data.logedActor;
            return {response};
        }
        else if(result.data.error)
        {
            console.log("result.data.error:",result.data.error);
            const error = result.data.error;
            return {error}
        }
    } catch (error) {
        console.log("error:",error);
        return {error};
    }
        
};