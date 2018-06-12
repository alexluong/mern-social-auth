const uploadController = {};

uploadController.uploadFile = (request, response) => {
  response.status(200).send({ fileURL: 'hello' });
};

module.exports = uploadController;
