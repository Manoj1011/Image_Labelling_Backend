const fs = require("fs");
const path = require("path");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const mime = require("mime-types");
const { randomUUID } = require("crypto");

const s3 = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_ACCESS_SECRET,
  },
});

exports.singleS3 = async ({ file, type }) => {
  await new Promise((res, rej) => {
    return file.mv(path.join(__dirname, `/uploads/${file.name}`), (err) => {
      if (err) return rej(err);
      else return res();
    });
  });
  const entryMimeType = mime.lookup(file.name);
  const fileName = `${randomUUID()}-${file.name}`;
  const uploadParams = {
    Bucket: process.env.S3_BUCKET,
    Key: `${type}/${fileName}`,
    Body: fs.createReadStream(path.join(__dirname, `/uploads/${file.name}`)),
    ContentType: entryMimeType,
  };

  await s3.send(new PutObjectCommand(uploadParams));

  fs.unlinkSync(path.join(__dirname, `/uploads/${file.name}`));

  return `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${type}/${fileName}`;
};
