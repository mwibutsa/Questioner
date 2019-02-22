import Database from '../db/db-connection';
import path from 'path';
import uuid from 'uuid';
 const addImage = async (req, res) => {
    if (Object.keys(req.files).length == 0) {
      return res.status(400).json({ status: 400, error: 'No file was Uploaded' });
    } else {
      const meetupImage = req.files.meetupImage;
      const uploadedImagesPath = 'UI/images/uploaded/';
      meetupImage.mv(uploadedImagesPath,(error) => {
        if (error) {
          return res.status(500).json({ status: 500, error: `Failled to upload image ${error}`});
        } else {
          const sql = `INSERT INTO meetup_images_table (id, meetup, url) VALUES (1$, $2, 3$) RETURNING *`;
          const newImage = [uuid.v4(),req.params.id, `images/uploaded/${meetupImage.name}`];
          Database.executeQuery(sql, newImage).then((result) => {
            if (result.rows) {
              return res.status(201).json({ status: 201, data: result.rows });
            }
          }).catch(error => res.status(500).json({ status: 500, error: `Server Error ${error}`}));
          return res.status(201).json({ status: 201, data: [meetupImage.name] });
        }
      });
    }
 };
 export default addImage;