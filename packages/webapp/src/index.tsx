import * as React from "react";
import * as ReactDOM from "react-dom";
import { partitionBy2 } from "./utils";

export const App = () => {
  return (
    <div>
      <div>Hello!</div>
      <div>{partitionBy2([1, 2, 3, 4, 5])}</div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
