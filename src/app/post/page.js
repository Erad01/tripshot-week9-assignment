import {auth, currentUser} from "@clerk/nextjs/server"
import {db} from "@/util/db.Connection"
import postStyles from "./post.module.css"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";


export default async function PostPage(){
const { userId } = await auth()

  if (!userId) {
    return <div>Sign in to view this page</div>
  }
  const user = await currentUser()



    db.query(`INSERT INTO users (id, first_name, last_name, email) SELECT $1, $2, $3, $4 WHERE NOT EXISTS (
                SELECT 1
                FROM users
                WHERE id = $1)`,
            [userId, user.firstName, user.lastName, user.emailAddresses[0].emailAddress])

        const query = await db.query(
        `SELECT id, message, time, user_id FROM posts2`)

        const post = query.rows;

        const query2 = await db.query(
            `SELECT * FROM users WHERE id ='${userId}'`
        )
        
        const presentUser = query2.rows[0]

    async function HandleSubmit(formData){
        "use server"

            const formValues = {
                idea : formData.get("idea"),
                image: formData.get("image")
            }

        db.query(
            `INSERT INTO posts2 (message, user_id) VALUES($1, $2)`,
             [formValues.idea, userId ]
            );


            //refresh the cache
            revalidatePath(`/post`);

            //redirect the user to the mySportBlogID page
            redirect(`/post`);


    }
    return(
        <>
        <div className={postStyles.container}>
            <div className={postStyles.flex1}>flex1</div>
            <div className={postStyles.flex2}>flex2

                <form action={HandleSubmit} className={postStyles.form}>
                    <label htmlFor="idea">Your Story:</label>
                    <input type="text" name="idea" placeholder="what is on your mind"></input>
                    <br/>
                    <label htmlFor="image">upload shot</label>
                    <input type="file" name= "image"></input>
                    <br/>
                    <button type="submit">post</button>
                </form>

                <div>
                    {post.map((post)=>{
                        return(
                            <div key={post.id} className={postStyles.post_messages}>
                                {post.message}
                                {new Date(post.time).toLocaleString()}
                            </div>

                        )
                    })}
                </div>
            </div>
            <div className={postStyles.flex3}>flex3
                <div>
                    {presentUser.first_name} {presentUser.last_name}
                </div>
                <Link href={"/profile"}>My Profile</Link>
            </div>

        </div>







        </>
    )
}








