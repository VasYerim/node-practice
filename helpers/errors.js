class ContactServiceError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ValidationError extends ContactServiceError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class WrongParameterError extends ContactServiceError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}
class NotAuthorizedError extends ContactServiceError {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

module.exports = {
  ValidationError,
  WrongParameterError,
  NotAuthorizedError,
  ContactServiceError,
};
