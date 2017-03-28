import React from 'react'
import { getData, env } from 'vc-cake'
import Element from './element'
import BlankPageManagerBack from './helpers/blankPageManagerBack/component'
import RowPlaceholderBackend from './helpers/rowPlaceholderBackend/component'
import BlankRowPlaceholder from '../../../../../resources/components/layoutHelpers/blankRowPlaceholder/component'

export default class Layout extends React.Component {
  static propTypes = {
    api: React.PropTypes.object.isRequired
  }

  layoutContainer = null

  constructor (props) {
    super(props)
    this.state = {
      data: [],
      layoutWidth: 0,
      hasResizeEvent: false
    }
    this.handleElementSize = this.handleElementSize.bind(this)
  }

  componentDidMount () {
    this.props.api.reply('data:changed', (data) => {
      this.setState({ data: data })
      if (this.layoutContainer && !this.state.hasResizeEvent) {
        this.addResizeListener(this.layoutContainer, this.handleElementSize)
        this.setState({ hasResizeEvent: true })
      }
    })
  }

  componentWillUnmount () {
    this.removeResizeListener(this.layoutContainer, this.handleElementSize)
  }

  addResizeListener (element, fn) {
    let isIE = !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/Edge/))
    if (window.getComputedStyle(element).position === 'static') {
      element.style.position = 'relative'
    }
    let obj = element.__resizeTrigger__ = document.createElement('iframe')
    obj.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; opacity: 0; pointer-events: none; z-index: -1;')
    obj.__resizeElement__ = element
    obj.onload = function (e) {
      this.contentDocument.defaultView.addEventListener('resize', fn)
    }
    obj.type = 'text/html'
    if (isIE) {
      element.appendChild(obj)
    }
    obj.data = 'about:blank'
    if (!isIE) {
      element.appendChild(obj)
    }
  }

  removeResizeListener (element, fn) {
    element.__resizeTrigger__.contentDocument.defaultView.removeEventListener('resize', fn)
    element.__resizeTrigger__ = !element.removeChild(element.__resizeTrigger__)
  }

  handleElementSize () {
    this.setState({ layoutWidth: this.layoutContainer.getBoundingClientRect().width })
  }

  getElements () {
    let { data, layoutWidth } = this.state
    let elementsList
    if (data) {
      elementsList = data.map((element) => {
        return (
          <Element
            element={element}
            key={'vcvLayoutGetElements' + element.id}
            api={this.props.api}
            layoutWidth={layoutWidth}
          />
        )
      })
    }

    const rowPlaceholder = env('FEATURE_BLANK_PAGE_PLACEHOLDER') ? <BlankRowPlaceholder api={this.props.api} /> : <RowPlaceholderBackend api={this.props.api} />

    // TODO: temporary solution for demo purposes only, remove afterwards
    let style = null
    if (env('FEATURE_APPEND_TO_CONTROL')) {
      style = <style>{
        `.vcv-wpbackend-layout-container .vce-row .vce-row-container:first-child .vce-row {
           margin: 45px 0 10px;
           padding: 0 0 10px;
        }`
      }
      </style>
    }

    return <div
      className='vcv-wpbackend-layout'
      data-vcv-module='content-layout'
      ref={(container) => { this.layoutContainer = container }}>
      {style}
      {elementsList}
      {rowPlaceholder}
    </div>
  }

  render () {
    if (!this.state.data.length && !getData('app:dataLoaded')) {
      return <div className='vcv-wpbackend-layout-loading'>
        <span className='vcv-ui-wp-spinner' />
      </div>
    }

    if (!this.state.data.length && getData('app:dataLoaded')) {
      return env('FEATURE_BLANK_PAGE_PLACEHOLDER') ? <BlankRowPlaceholder api={this.props.api} /> : <BlankPageManagerBack api={this.props.api} iframe={false} />
    }

    return this.getElements()
  }
}
