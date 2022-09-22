import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './ui.css'

declare function require(path: string): any

class App extends React.Component {
  textbox: HTMLInputElement

  countRef = (element: HTMLInputElement) => {
    if (element) element.value = '5'
    this.textbox = element
  }

  onCreate = () => {
    const count = parseInt(this.textbox.value, 10)
    parent.postMessage({ pluginMessage: { type: 'create-rectangles', count } }, '*')
  }

  onCancel = () => {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
  }

  render() {
    return <div>
      <h2>创建矩形</h2>
      <p>数量： <input ref={this.countRef} /></p>
      <button id="create" onClick={this.onCreate}>创建</button>
      <button onClick={this.onCancel}>取消</button>
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById('react-page'))
