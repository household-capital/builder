var vcCake = require('vc-cake')
var React = require('react')
// var ReactDOM = require('react-dom')
var cook = vcCake.getService('cook')
require('../css/element.less')

var Element = React.createClass({
  propTypes: {
    element: React.PropTypes.object.isRequired,
    api: React.PropTypes.object.isRequired
  },
  componentDidMount: function () {
    this.props.api.notify('element:mount', this.props.element.id)
  },
  componentWillUnmount: function () {
    this.props.api.notify('element:unmount', this.props.element.id)
  },
  getContent: function (content) {
    var documentData = vcCake.getService('document')
    var currentElement = cook.get(this.props.element) // optimize
    if (currentElement.get('type') === 'container') {
      let elementsList = documentData.children(currentElement.get('id')).map(function (childElement) {
        return <Element element={childElement} key={childElement.id} api={this.props.api} />
      }, this)
      return elementsList
    }
    return content
  },
  render: function () {
    let element = cook.get(this.props.element)
    return element.render(this.getContent())
  }
})
module.exports = Element
