import { Profile } from "../components/Profile";
import {Sidebar} from "../components/Sidebar";

import '../../../App.css'

function LeftSidebar({UserDetails,setIsOpen}){
    return(
        <div className="left">
            <Profile UserDetails={UserDetails}/>
            <Sidebar setIsOpen={setIsOpen}/>
        </div>
    )
}

export {LeftSidebar}