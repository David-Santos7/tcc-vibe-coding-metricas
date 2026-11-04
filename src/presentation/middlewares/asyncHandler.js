"use strict";

function asyncHandler(handler) {
  return function handleAsyncRoute(request, response, next) {
    Promise.resolve(handler(request, response, next)).catch(next);
  };
}

module.exports = { asyncHandler };
