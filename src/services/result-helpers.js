class SuccessResult {
  constructor(value) {
    this.success = true;
    this.data = value;
  }
}

class FailureResult {
  constructor(error) {
    this.success = false;
    this.title = title;
    this.error = error;
  }
}

export { SuccessResult, FailureResult };
