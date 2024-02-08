import * as fs from 'fs';
import * as path from 'path';
import * as AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: 'ASIAZEYJ6HQCEZRDA2KL',
  secretAccessKey: 'm2zN15NgA+Aa8c1Gk8yj4DRVHfVx+wccyvnZP6Lq',
  region: 'us-west-2',
  sessionToken:
    'FwoGZXIvYXdzED8aDIhnIEiheDC/34iSoiLKAcn3OLLAj3LqrRgcy8aaMCvQxkOrpbiZDf1HXKDgUQbLaA4Hjod6laO3U4hOk+q1q0lp6TZRCFqZ2tux2U0BeWGvF7zFuMYtESGTl8k34XmGL0I3COlGxmPhVp7wRtwJl/opGG+pbBFa48KJIuDQ9xYgd1Pu+eXJur9OX5o1wQTAJYK+IHNtPTm1RYMucPeTnaUyKIaH39i1EMa59COrNggGtI/k8nGyLFuPXL6m48dfg/kFOJdAjsbqw6TxONbV2kNlrTLEUXo9lBEokJqVrgYyLQLxIhTzISfMf2Sij/mcgbmIuVZQbf4i+KSYlwnb3Jj/RnXiNnkhFM/nEeddZA==',
});
const s3 = new AWS.S3();

export const uploadFile = async (localFilePath: string) => {
  // Read the file from the local path
  console.log('shree/vercel/' + path.basename(localFilePath));
  const fileContent = fs.readFileSync(localFilePath);

  // Set the parameters for S3 upload
  const params: AWS.S3.PutObjectRequest = {
    Bucket: 'common-adas-dev',
    Key: 'shree/vercel/' + path.basename(localFilePath), // Set the folder path and file name in S3
    Body: fileContent,
  };

  // Upload the file to S3
  //await s3.upload(params).promise();
  console.log(`File uploaded to S3: s3://${'common-adas-dev'}/${params.Key}`);
};
