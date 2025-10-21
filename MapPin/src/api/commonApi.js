
import axios from 'axios';
const commonApi= async(method,url,data)=>{
    const result={
        method,
        url,
        data
    }

    try {
        const results= await  axios(result)
        return results.data
    } catch (error) {
        console.log(error);
        throw error; 
        
    }
}
export default commonApi