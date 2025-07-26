// import sql from "../configs/db.js";

import sql from "../configs/db.js";

export const getUserCreations = async (req, res)=>{
    try {
        const {userId} = req.auth()

        const creations = await sql`SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_at DESC`;

        res.json({ success: true, creations });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}


export const toggleLikeCreations = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ success: false, message: 'Invalid creation ID' });
    }

    const result = await sql`SELECT * FROM creations WHERE id = ${Number(id)}`;

    // ✅ Prevent accessing undefined[0]
    if (!result || !result.rows || result.rows.length === 0) {
      return res.json({ success: false, message: 'Creation not found' });
    }

    const creation = result.rows[0];
    const currentLikes = creation.likes || [];
    const userIdStr = userId.toString();

    let updatedLikes;
    let message;

    if (currentLikes.includes(userIdStr)) {
      updatedLikes = currentLikes.filter(uid => uid !== userIdStr);
      message = 'Creation Unliked';
    } else {
      updatedLikes = [...currentLikes, userIdStr];
      message = 'Creation Liked';
    }

    await sql`
      UPDATE creations 
      SET likes = ${sql.array(updatedLikes)}, 
          updated_at = NOW()
      WHERE id = ${Number(id)}
    `;

    return res.json({ success: true, message });
  } catch (error) {
    console.error('Toggle like error:', error);
    return res.json({ success: false, message: error.message });
  }
};

// export const toggleLikeCreations= async (req, res)=>{
//     try {
//         const {userId} = req.auth()
//         const {id} = req.body

//         const {creation} = await sql`SELECT * FROM creations WHERE id = ${id}`

//         if(!creation){
//             return res.json({ success: false, message: "Creation not found" })
//         } 
//         const currentLikes = creation.likes;
//         const userIdStr = userId.toString();
//         let updatedLikes;
//         let message;

//         if(currentLikes.includes(userIdStr)){
//             updatedLikes = currentLikes.filter((user)=>user !== userIdStr);
//             message = 'Creation Unliked'
//         }else{
//             updatedLikes = [...currentLikes, userIdStr]
//             message = 'Creation Liked'
//         }

//         const formattedArray = `{${updatedLikes.join(',')}}`

//         await sql`UPDATE creations SET likes = ${formattedArray}::text[] WHERE id = ${id}`;

//         res.json({ success: true, message });
//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// }



// ✅ Get all creations by the current user
// ===========================
export const getPublishedCreations = async (req, res) => {
  try {
    const creations = await sql`
      SELECT * FROM creations
      WHERE publish = TRUE
      ORDER BY created_at DESC
    `;
    res.json({ success: true, creations });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

