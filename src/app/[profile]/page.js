import {auth} from "@clerk/nextjs/server"
import {db} from "@/util/db.Connection"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import profileStyles from "./profile.module.css";


export default async function ProfilePage(){

    const { userId } = await auth()

    const query2 = await db.query(
                `SELECT * FROM users WHERE id ='${userId}'`
            )
            
            const presentUser = query2.rows[0]

    const query3 = await db.query(
        `SELECT id, message, time FROM posts2 WHERE user_id = '${userId}'`,
        
    )

    console.log(query3)
    const userPosts = query3.rows

    async function handleSubmit(formData){
        "use server"

        const formValues = {
                bio : formData.get("bio"),
            }

             db.query(
            `UPDATE users SET biography = '${formValues.bio}' WHERE id = '${userId}'`,
            );

            //refresh the cache
            revalidatePath(`/profile`);

            //redirect the user to the mySportBlogID page
            redirect(`/profile`);
    }

    // async function changeDisable(e){
    //     "use server"

    //    await e.target.form.querySelectorAll('fieldset').forEach((element) => {
    //   element.disabled = false;
    // });
    // }
    
    return(

        
        <>
        <div className={profileStyles.profile_container}>
            <div>
                {presentUser.first_name} {presentUser.last_name}
            </div>
            <div>
                {presentUser.email}
            </div>
            <div>
                bio: {presentUser.biography}
            </div>
        </div>


        <div>
            {userPosts.map((userPost)=>{
                return(
                    <div key={userPost.id}>
                        {userPost.message} 
                        {new Date (userPost.time).toLocaleString()}
                    </div>
                )
            })}
        </div>

        <form action={handleSubmit}>
            <fieldset disabled= {false}>
                <label htmlFor="bio">Bio: </label>
                <input type="text" name="bio"></input><br></br>
                <button type="submit">save bio</button>
            </fieldset>
            {/* <button onClick={changeDisable}>edit bio</button> */}
        </form>

        </>
    )
}