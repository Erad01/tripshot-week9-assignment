import {auth} from "@clerk/nextjs/server"
import {db} from "@/util/db.Connection"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";



export default async function ProfilePage(){

    const { userId } = await auth()

      const query2 = await db.query(
                `SELECT * FROM users WHERE id ='${userId}'`
            )
            
            const presentUser = query2.rows[0]

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
        <h1>Profile Page</h1>
        <div>
            {presentUser.first_name} {presentUser.last_name}
        </div>
        <div>
            {presentUser.email}
        </div>
        <div>
            bio: {presentUser.biography}
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