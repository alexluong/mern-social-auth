const uuid = require('uuid/v1');
const AWS = require('aws-sdk');
const s3config = require('../../config').S3;

const s3 = new AWS.S3({
  accessKeyId: s3config.accessKeyId,
  secretAccessKey: s3config.secretAccessKey,
});

const uploadController = {};

uploadController.uploadFile = (request, response) => {
  // key = 'userid/nameasdfjkadksflaf.jpg'
  const key = `${request.user.id}/${uuid()}.png`;

  s3.getSignedUrl(
    'putObject',
    {
      Bucket: s3config.bucketName,
      ContentType: 'image/png',
      Key: key,
    },
    (error, url) => response.send({ key, url }),
  );

  // response.status(200).send({ fileURL: 'hello' });
};

module.exports = uploadController;
