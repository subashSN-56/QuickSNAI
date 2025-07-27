import sql from "../configs/db.js";

export const getUserCreations = async (req, res) => {
  try {
    const { userId } = req.auth();

    const creations = await sql`
      SELECT * FROM creations 
      WHERE user_id = ${userId} 
      ORDER BY created_at DESC
    `;

    res.json({ success: true, creations });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const toggleLikeCreations = async (req, res) => {
  try {
    const { userId } = req.auth(); // Clerk authentication
    const { id } = req.body;       // Creation ID

    // 1. Fetch the creation by ID
    const [creation] = await sql`SELECT * FROM creations WHERE id = ${id}`;
    if (!creation) {
      return res.json({ success: false, message: "Creation not found" });
    }

    // 2. Prepare likes update
    const currentLikes = creation.likes || [];
    const userIdStr = userId.toString();

    let updatedLikes;
    let message;

    if (currentLikes.includes(userIdStr)) {
      // User already liked — remove the like
      updatedLikes = currentLikes.filter(u => u !== userIdStr);
      message = "Creation Unliked";
    } else {
      // User hasn't liked — add their ID
      updatedLikes = [...currentLikes, userIdStr];
      message = "Creation Liked";
    }

    // 3. Update the likes in the DB
    await sql`
      UPDATE creations 
      SET likes = ${updatedLikes} 
      WHERE id = ${id}
    `;

    // 4. Send response
    res.json({ success: true, message });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export const getPublishedCreations = async (req, res) => {
  try {
    const creations = await sql`
      SELECT * FROM creations 
      WHERE publish = true 
      ORDER BY created_at DESC
    `;

    res.json({ success: true, creations });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
