const AWS = require('aws-sdk');
const { fetchSecret } = require('./fetchSecret'); // Import the fetchSecret function from your fetchSecret.js file

async function main() {
  // Fetch the secret from AWS Secrets Manager
  const secret = await fetchSecret();

  if (!secret) {
    console.error("Failed to fetch secret. Exiting...");
    return;
  }

  // Parse the fetched secret (assuming it's a JSON object)
  const secretObject = JSON.parse(secret);

  // Configure AWS credentials using the fetched secret
  AWS.config.update({
    accessKeyId: secretObject.aws_access_key_id,
    secretAccessKey: secretObject.aws_secret_access_key,
    region: "us-east-2", // Set the appropriate region for S3
  });

  // Create an S3 instance
  const s3 = new AWS.S3();

  // Now you can use the s3 object to interact with AWS S3 services
  try {
    const buckets = await s3.listBuckets().promise();
    console.log("Buckets:", buckets);
  } catch (error) {
    console.error("Error listing buckets:", error);
  }
}

module.exports = {main}
