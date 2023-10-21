import { useLocation,Navigate,Outlet } from "react-router-dom";
import useAuth from "./UseAuth";
const RequiredAuth= ()=>{
     const {auth}= useAuth();
     const location= useLocation();

     return(
          auth?.user
          ?<Outlet/>
          :<Navigate to='/' state={{from: location}} replace/>
     )
}

export default RequiredAuth;