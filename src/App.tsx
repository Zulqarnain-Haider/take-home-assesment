import * as tsx from 'vue-tsx-support'

export default tsx.component({ 
  name: 'App',
  render() {
    return (
      <div id="app">
        <div class>
        </div>
        <router-view />
      </div>
    )
  }
})