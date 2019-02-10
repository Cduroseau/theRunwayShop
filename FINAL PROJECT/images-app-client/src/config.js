export default {
    MAX_ATTACHMENT_SIZE: 5000000,

    s3: {
      REGION: "us-east-2",
      BUCKET: "YOUR_S3_UPLOADS_BUCKET_NAME"
    },
    apiGateway: {
      REGION: "us-east-2",
      URL: "YOUR_API_GATEWAY_URL"
    },
    cognito: {
      REGION: "us-east-2",
      USER_POOL_ID: "us-east-2_Tz4i44AcI",
      APP_CLIENT_ID: "180tih9jfs8knp6pmjt1g6g0oq",
      IDENTITY_POOL_ID: "us-east-2:9ff5dd3a-c602-4d38-a39a-52254a767e38"
    }
  };