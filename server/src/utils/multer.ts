// import multer middleware
import multer from "multer";

// configure multer disk storage for dile uploads
const storage = multer.diskStorage({});

const upload = multer({
  storage,
}).single("file");

export default upload;
