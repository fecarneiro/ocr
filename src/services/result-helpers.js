class SuccessResult {
  constructor(value) {
    this.success = true;
    this.data = value;
  }
}

class FailureResult {
  constructor(reason, error = null) {
    this.success = false;
    this.reason = reason;
    this.error = error;
  }
}

export { SuccessResult, FailureResult };
