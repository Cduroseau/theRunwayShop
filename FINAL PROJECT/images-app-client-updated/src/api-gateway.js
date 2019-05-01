import AWS from 'aws-sdk';
import config from './config';
import sigV4Client from './sigV4Client';
import { API } from 'aws-amplify';

export const invokeAPIGateway = async ({
  path,
  method = 'GET',
  headers = {},
  queryParams = {},
  body,
}) => {

  let data = JSON.parse(localStorage.getItem("awsCredentials"));
  const client = sigV4Client.newClient({
    accessKey: data.Credentials.AccessKeyId,
    secretKey:data.Credentials.SecretKey,
    sessionToken:data.Credentials.SessionToken,
    region: config.apiGateway.REGION,
    endpoint: config.apiGateway.URL,
  });

  const signedRequest = client.signRequest({
    method,
    path,
    headers,
    queryParams,
    body,
  });

  const signedBody = body ? JSON.stringify(body) : body;
  const signedHeaders = signedRequest.headers;

  switch(method) {
    case 'POST': {
      let results = await API.post('images', path, { response: true, body: JSON.parse(body) });
      return results.status == 200 ? results.data : results;
    }

    default: {
      let results = await API.get('images', path, { response: true, queryStringParameters: queryParams });
      return results.status == 200 ? results.data : results;
    }
  }
};
export const postimages = async (identityId,callback) => {
  const result = await invokeAPIGateway({
    path: `/images`,
    method: 'POST', 
    body:JSON.stringify(identityId),
  });
 callback(result)
};
