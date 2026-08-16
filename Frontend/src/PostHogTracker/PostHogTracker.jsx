import { useUser } from "@clerk/react";
import { useEffect } from "react";


export default function PostHogTracker() {
    const { isLoaded, isSingedIn, user } = useUser();

    useEffect(() => {
        if (isLoaded && isSingedIn && user) {
            PostHogTracker.identity(user.id, {
                email:user.primaryEmailAddress?.emailAddress,
                name:user.fullName,
            })
        }
        // here we use isLoaded , isSingedIn ,user is the dependencies in the dependencie array while using useEffect buz if this three terms are change the useEffect calls and recalculate the value
    },[isLoaded , isSingedIn ,user])
    return null
}