/* eslint-disable import/no-extraneous-dependencies */
import webpack from "webpack";
import "webpack-dev-server";
import { merge } from "webpack-merge";
import { config } from "./webpack.config.common";
import { ibazelListener } from "./webpack.config.ibazel";

export default merge(config, {
  mode: "development",
  devtool: "inline-source-map",
  output: {
    filename: "[name].bundle.[contenthash].js",
  },
  devServer: {
    // If run under ibazel, we suspend and resume the webpack watcher
    // during the dependencies rebuild, so that webpack doesn't trigger
    // webapp rebuild before the dependencies are ready
    onListening: (server: any) => {
      console.info(`
        !!!
        !!! The dev server started, but the compilation is in progress.
        !!! Wait for "DONE" before opening the application in the browser.
        !!!
      `);

      ibazelListener(({ state }) => {
        switch (state) {
          case "started":
            // Suspend watcher on dependencies build start
            server.middleware.context.watching.suspend();
            break;
          case "completed":
            // Resume watcher when all builds are finished
            server.middleware.context.watching.resume();
            break;
          case "failed":
            // do nothing
            break;
          default:
            throw new Error("impossible state");
        }
      });
    },
  },
} as webpack.Configuration);
