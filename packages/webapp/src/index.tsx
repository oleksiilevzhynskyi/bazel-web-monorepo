import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as Utils from "@bazel-denali-repo/utils"

export const App = () => {
  return <div>
    <div>Hello!</div> 
    <div>{Utils.partition([1, 2, 3, 4, 5], i => i > 2)}</div>
  </div>
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)
