import * as R from 'ramda';

export default (config) => {
  const defaults = {
    logger: console.log,
    filter: {
      resource: ['resource'],
      httpMethod: ['httpMethod'],
      queryStringParameters: ['queryStringParameters'],
      pathParameters: ['pathParameters'],
      headers: ['headers'],
      body: ['body'],
      sourceIp: ['requestContext', 'identity', 'sourceIp'],
      userAgent: ['requestContext', 'identity', 'userAgent'],
      awsRequestId: ['awsRequestId'],
      stage: ['requestContext', 'stage'],
    },
    modifier: result => result,
  };

  const options = Object.assign({}, defaults, config);

  return ({
    before: (handler, next) => {
      const { event } = handler;
      const pathFromEvent = path => R.pathOr(null, path, event);
      const filtered = R.map(pathFromEvent, options.filter);
      options.logger(JSON.stringify(options.modifier(filtered)));

      next();
    },
  });
};
