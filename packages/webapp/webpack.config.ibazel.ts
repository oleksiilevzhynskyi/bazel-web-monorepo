interface State {
  readonly state: "started" | "completed" | "failed";
}

const log = (...text: string[]) => console.log(...text);
const errorLog = (...text: string[]) => console.error(...text);

/**
 * ibazelListener listens for `ibazel` events and calls @param cb whenever the state changes. 
 */
export const ibazelListener = (cb: (state: State) => void) => {
  let startedBuildsCount = 0;
  let resumeTimeout: NodeJS.Timeout;

  process.stdin.on("data", async (chunk) => {
    if (chunk.toString().indexOf("IBAZEL_BUILD_STARTED") !== -1) {
      log("IBAZEL just started a new build.");
      clearTimeout(resumeTimeout);
      startedBuildsCount++;
      cb({ state: "started" });
    } else if (
      chunk.toString().indexOf("IBAZEL_BUILD_COMPLETED SUCCESS") !== -1
    ) {
      startedBuildsCount--;
      clearTimeout(resumeTimeout);
      if (startedBuildsCount === 0) {
        log(
          "Seems like IBAZEL completed build. Waiting for a bit more to ensure there are no new changes right away..."
        );
        // Resume watcher when all builds are finished
        // but wait a bit, as IBAZEL could start new build righ away
        resumeTimeout = setTimeout(() => {
          log("IBAZEL completed build.");
          cb({ state: "completed" });
        }, 1000);
      } else {
        log(
          `IBAZEL still building and has ${startedBuildsCount} build(s) running`
        );
      }
    } else if (
      chunk.toString().indexOf("IBAZEL_BUILD_COMPLETED FAILURE") !== -1
    ) {
      startedBuildsCount--;
      clearTimeout(resumeTimeout);
      if (startedBuildsCount === 0) {
        errorLog("IBAZEL build failed!");
        cb({ state: "failed" });
      } else {
        log(
          `IBAZEL still building and has ${startedBuildsCount} build(s) running`
        );
      }
    }
  });
};
