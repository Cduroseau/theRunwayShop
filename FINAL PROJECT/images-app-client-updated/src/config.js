export default {
 apiUrl : "https://6ykck904q9.execute-api.us-east-2.amazonaws.com/prod",
 imageBaseURL : "https://images-app-uploads.s3.us-east-2.amazonaws.com/public/",

    MAX_ATTACHMENT_SIZE: 8000000,
    s3: {
      REGION: "us-east-2",
      BUCKET: "images-app-uploads"
    },
    apiGateway: {
      REGION: "us-east-2",
      URL: "https://6ykck904q9.execute-api.us-east-2.amazonaws.com/prod"
    },
    cognito:{
      REGION: "us-east-2",
      USER_POOL_ID: "us-east-2_9ACMAVoGN",
      APP_CLIENT_ID: "76seo2s9vm44vcabcal64ck4hb",
      IDENTITY_POOL_ID: "us-east-2:59931c3d-eb85-4bcb-87d0-8b7ec5b25f22"
    }
    
  };