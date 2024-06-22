import AWS from 'aws-sdk'
import { awsConfig, s3BucketName } from '../envt'
import { encrypt } from './cryptographer'

const s3 = new AWS.S3(awsConfig)

export const buildFileKey = (
  fileKey: string,
  pathSuffix: string = '',
  fileSuffix: string = '',
) =>
  `${pathSuffix}${
    pathSuffix?.length || (fileSuffix?.length && !fileSuffix.startsWith('/'))
      ? '/'
      : ''
  }${fileSuffix}${fileKey}`

export const uploadFileToS3 = async (
  file: Express.Multer.File,
  pathSuffix: string,
  fileSuffix: string,
) => {
  const fileKey = encrypt(file.originalname)
  const Key = buildFileKey(fileKey, pathSuffix, fileSuffix)

  const params = {
    Bucket: s3BucketName,
    Key,
    Body: file.buffer,
    ContentType: file.mimetype,
  }
  return s3.upload(params).promise()
}

export const getSignedUrl = (fileKey: string, expiresIn: number) => {
  const params = {
    Bucket: s3BucketName,
    Key: fileKey,
    Expires: expiresIn,
  }

  return s3.getSignedUrl('getObject', params)
}
