const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");

async function fetchSecret() {
  const secret_name = "GoogleMapsApiKey";

  const client = new SecretsManagerClient({
    region: "us-east-2",
  });

  let response;

  try {
    response = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: "AWSCURRENT",
      })
    );
  } catch (error) {
    // Handle the error
    console.error("Error fetching secret:", error);
    return null; // Return null or handle the error case
  }

  const secret = response.SecretString;
  return secret;
}

module.exports = { fetchSecret };
