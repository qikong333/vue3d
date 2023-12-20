import './index.css'

export default (div: Element) => {
  const loaderWapper = document.createElement('div')
  const loaderElement = document.createElement('span')
  loaderWapper.className = 'loaderWapper'
  loaderElement.className = 'loader'
  loaderWapper.append(loaderElement)

  function create() {
    div.appendChild(loaderWapper)
  }

  function del() {
    if (loaderWapper) {
      div?.removeChild(loaderWapper)
    }
  }

  return {
    del,
    create
  }
}
