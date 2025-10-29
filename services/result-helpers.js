class SuccessResult {
  constructor(value) {
    this.success = true;
    this.data = value;
  }
}

class FailureResult {
  constructor(error) {
    this.success = false;
    this.error = error;
  }
}
