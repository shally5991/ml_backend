const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
        
        cb(null, path.join(__dirname,'../../uploads/register_users/'))
    },
    filename: function (req, file, cb) {

            cb(null,req.body.plate + path.extname(file.originalname));


    }
});
module.exports = multer({ 
    storage: storage ,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
      }
});