// Copy-paste from https://github.com/bazelbuild/rules_nodejs/blob/stable/examples/jest/jest-reporter.js
class BazelReporter {
  onRunComplete(_, results) {
    if (results.numFailedTests && results.snapshot.failure) {
      console.log(`================================================================================
        
        Snapshot failed, you can update the snapshot by running
        bazel run ${process.env["TEST_TARGET"].replace(/_bin$/, "")}.update
        `);
    }
  }
}

module.exports = BazelReporter;
