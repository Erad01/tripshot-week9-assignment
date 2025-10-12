import Link from "next/link";

export default function NotFound(){
    return(
        <>
        <h1>Ooooops!!!</h1>
        <h2>I think you in the wrong place!</h2>
        <Link href={"/"} className="text-emerald-500">RETURN HOME</Link>
        </>
    )
}