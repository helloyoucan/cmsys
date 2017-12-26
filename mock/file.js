export function uploadFile(req, res) {
  console.log(req.body.toString());
  res.send(
    {
      "ret": true,
      "msg": "上传成功",
      "data": {
        "filename": "act-art.zip",
        "url": "/upload/d4bdfa2e-a536-415e-b70a-9f65c05305e1.zip"
      }
    }
  );
}
export default {
  uploadFile
};
