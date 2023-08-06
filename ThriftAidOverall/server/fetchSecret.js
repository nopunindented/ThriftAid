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
    console.error("Error fetching secret:", error);
    return null;
  }

  const secret = response.SecretString;
  return secret;
}

module.exports = { fetchSecret };