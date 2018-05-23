const errorHandlers = {};


/**
 *  Catch Errors Handler
 *  HOC for controllers
 */
errorHandlers.catchErrors = fn => {
  return (request, response, next) => {
    return fn(request, response, next).catch(next);
  };
};

module.exports = errorHandlers;