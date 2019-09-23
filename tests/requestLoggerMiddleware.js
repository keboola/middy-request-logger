import { describe } from 'mocha';
import sinon from 'sinon';
import expect from 'unexpected';
import requestLoggerMiddleware from '../src/requestLoggerMiddleware';

const handler = {
  event: {
    httpMethod: 'GET',
    body: '{"name": "Sam"}',
    path: '/users',
    resource: '/{proxy+}',
    queryStringParameters: {},
    pathParameters: {
      proxy: 'users',
    },
    headers: {
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate, sdch, br',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': 'application/json',
      Host: 'xxxxxxxxxx.execute-api.us-east-1.amazonaws.com',
    },
    requestContext: {
      accountId: '111111111111',
      resourceId: 'xxxxxx',
      stage: 'prod',
      requestId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      identity: {
        cognitoIdentityPoolId: '',
        accountId: '',
        cognitoIdentityId: '',
        caller: '',
        apiKey: '',
        sourceIp: '11.111.111.111',
        cognitoAuthenticationType: '',
        cognitoAuthenticationProvider: '',
        userArn: '',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36',
        user: '',
      },
      resourcePath: '/{proxy+}',
      httpMethod: 'GET',
      apiId: 'xxxxxxxxxx',
    },
  },
};

const expectedOutput = {
  resource: '/{proxy+}',
  httpMethod: 'GET',
  queryStringParameters: {},
  pathParameters: {
    proxy: 'users',
  },
  headers: {
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate, sdch, br',
    'Accept-Language': 'en-US,en;q=0.8',
    'Content-Type': 'application/json',
    Host: 'xxxxxxxxxx.execute-api.us-east-1.amazonaws.com',
  },
  body: '{"name": "Sam"}',
  sourceIp: '11.111.111.111',
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36',
  awsRequestId: null,
  stage: 'prod',
};

describe('requestLoggerMiddleware', () => {
  beforeEach(() => {
    sinon.stub(console, 'log');
  });

  it('before', async () => {
    const requestLogger = requestLoggerMiddleware();

    requestLogger.before(handler, () => {});

    expect(console.log.calledOnce, 'to be true');
    expect(console.log.calledWith(JSON.stringify(expectedOutput)), 'to be true');
  });
});
