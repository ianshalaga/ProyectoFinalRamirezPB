import multer from "multer";
import { rootPath } from "./paths";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "profiles") {
      cb(null, rootPath + "/public/uploads/profiles");
    } else if (file.fieldname === "products") {
      cb(null, rootPath + "/public/uploads/products");
    } else if (file.fieldname === "documents") {
      cb(null, rootPath + "/public/uploads/documents");
    } else {
      cb(null, rootPath + "/public/uploads/others");
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileUploader = multer({ storage });

export default fileUploader;
