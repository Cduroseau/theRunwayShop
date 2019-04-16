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


let data=JSON.parse(sessionStorage.getItem("awsCredentials"));

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
    case 'PUT': {
      let results = await API.put('images', path, { response: true, body: JSON.parse(body) });
      return results.status == 200 ? results.data : results;
    }
    case 'DELETE': {
      let results = await API.del('images', path, { response: true, body: JSON.parse(body) });
      return results.status == 200 ? results.data : results;
    }
    default: {
      let results = await API.get('images', path, { response: true, queryStringParameters: queryParams });
      return results.status == 200 ? results.data : results;
    }
  }
  

};


export const getcategoriesname = async (identityId,callback) => {
    const result = await invokeAPIGateway({
      path: `/images/category`,
      method: 'POST', 
      body:JSON.stringify(identityId),
    });
    callback(result)
  };






export const getseasonsimages = async (identityId,callback) => {
  const result = await invokeAPIGateway({
    path: `/images/season`,
    method: 'POST', 
    body:JSON.stringify(identityId),
  });

  callback(result)

};


export const getdesignerimages = async (identityId,callback) => {
  const result = await invokeAPIGateway({
    path: `/images/designer`,
    method: 'POST', 
    body:JSON.stringify(identityId),
  });

  callback(result)
};



export const getcitiesimages = async (identityId,callback) => {
  const result = await invokeAPIGateway({
    path: `/images/city`,
    method: 'POST', 
    body:JSON.stringify(identityId),
  });

  callback(result)

};

export const getallimagesname= async (callback) => {
  const result = await invokeAPIGateway({
    path: `/images/allImages`,
    method: 'GET', 
  });

  callback(result)

};



