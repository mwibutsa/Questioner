import Database from '../db/db-connection';
import path from 'path';
import uuid from 'uuid';
 const addImage = async (req, res) => {
    if (!(req.files)) {
      return res.status(400).json({ status: 400, error: 'No file was Uploaded' });
    } else {
      const meetupImage = req.files.meetupImage;
      const uploadedImagesPath = path.resolve(__dirname, '../../');
      meetupImage.mv(`UI/images/uploaded/${(new Date()).getTime()}-${meetupImage.name}`,(error) => {
        if (error) {
          return res.status(500).json({ status: 500, error: `Failled to upload image ${error}`});
        } else {
          const sql = `INSERT INTO meetup_images_table (id, meetup, url) VALUES ($1, $2, $3) RETURNING *`;
          const newImage = [uuid.v4(),req.params.id, `images/uploaded/${(new Date()).getTime()}-${meetupImage.name}`];
          Database.executeQuery(sql, newImage).then((result) => {
            if (result.rows) {
              return res.status(201).json({ status: 201, data: result.rows });
            } else {
              console.log(sql);
              return res.status(500).json({ status: 500, error: `Server error OO`})
            }
          }).catch(error => res.status(500).json({ status: 500, error: `Server Error ${error}`}));
        }
      });
    }
 };
 export default addImage;