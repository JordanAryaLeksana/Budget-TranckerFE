export default function getTokenHeader(){
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    console.log("getTokenHeader", token)    
    return token ? { Authorization: `Bearer ${token}`} : {};
}