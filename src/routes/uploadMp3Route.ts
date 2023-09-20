import { multer, router } from "utils";

// Cấu hình Multer để lưu trữ tệp MP3
const storage = multer.diskStorage({
  destination: function (
    req: any,
    file: any,
    cb: (arg0: null, arg1: string) => void
  ) {
    cb(null, "uploads/");
  },
  filename: function (
    req: any,
    file: { originalname: any },
    cb: (arg0: null, arg1: string) => void
  ) {
    const timestamp = Date.now();
    cb(null, `${timestamp}_${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.post(
  "/upload",
  upload.fields([{ name: "mp3_link" }, { name: "id" }]),
  (req: any, res: any) => {
    const mp3Link = req.files.mp3_link;
    const id = req.body.id;

    let _res = {
      status: 0,
      data: {},
    };

    if (!mp3Link) {
      _res.data = { message: "Not found link mp3" };
    }
    if (!id) {
      _res.data = { message: "Not found Id" };
    }

    if (mp3Link && id) {
      _res.status = 1;
      _res.data = { message: "Uplaod success" };
    }

    res.json(_res);
  }
);

export default router;
