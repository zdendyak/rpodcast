const uuid = require('uuid/v1');
const AWS = require('aws-sdk');
const { throwErrorIfNotAuthenticated } = require('../../api/auth/auth');
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_ACCESS_SECRET;
const s3 = new AWS.S3({
  accessKeyId,
  secretAccessKey,
  region: 'eu-central-1',
  signatureVersion: 'v4'
});

const getUrlFromAWS = (file, user) => new Promise((resolve, reject) => {
  const type = file.type.split('/')[0];
  const key = `${type + '/' || ''}${user.id}/${uuid()}${file.name}`;

  s3.getSignedUrl('putObject', {
    Bucket: 'rpods-dev-062019',
    ContentType: file.type,
    Key: key
  }, (err, url) => {
    if (err) return reject(err);
    return resolve({ url, key });
  })
})

const getSignedUrl = async (root, { input }, { user }) => {
  throwErrorIfNotAuthenticated(user);
  const data = await getUrlFromAWS(input, user);
  return data;
}

const urlResolvers = {
  Query: {
    AwsUrl: getSignedUrl
  }
}

module.exports = urlResolvers;