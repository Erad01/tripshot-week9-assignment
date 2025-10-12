import Link from "next/link";
import {
    UserButton, 
    SignedIn, 
    SignedOut, 
    SignInButton, 
    SignUpButton} from "@clerk/nextjs"


export default function HeaderPage(){
    return(
        <>
        <nav>
            <Link href={"/"}>Home</Link>
            <Link href={"/post"}>Posts</Link>
            <Link href={"/profile"}>Profile</Link>

        </nav>
    <SignedIn>
        <UserButton />       
    </SignedIn>
    <SignedOut>
        <SignInButton>
            <button>Sign in here</button>
        </SignInButton>
        <SignUpButton>
        <button>Sign up here</button>
        </SignUpButton>
    </SignedOut>
    </>
    )
}