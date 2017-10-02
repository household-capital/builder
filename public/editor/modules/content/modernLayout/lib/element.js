import vcCake from 'vc-cake'
import React from 'react'
import ContentControls from '../../../../../resources/components/layoutHelpers/contentControls/component'
import ContentEditableComponent from '../../../../../resources/components/layoutHelpers/contentEditable/contentEditableComponent'
import ColumnResizer from '../../../../../resources/columnResizer/columnResizer'
import MobileDetect from 'mobile-detect'

const elementsStorage = vcCake.getStorage('elements')
const assetsStorage = vcCake.getStorage('assets')
const cook = vcCake.getService('cook')
const DocumentData = vcCake.getService('document')

export default class Element extends React.Component {
  static propTypes = {
    element: React.PropTypes.object.isRequired,
    api: React.PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.dataUpdate = this.dataUpdate.bind(this)
    this.elementComponentTransformation = this.elementComponentTransformation.bind(this)
    this.state = {
      element: props.element
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({element: nextProps.element})
  }

  componentDidMount () {
    this.props.api.notify('element:mount', this.state.element.id)
    elementsStorage.state('element:' + this.state.element.id).onChange(this.dataUpdate)
    assetsStorage.trigger('addElement', this.state.element.id)
    elementsStorage.state('elementComponentTransformation').onChange(this.elementComponentTransformation)
    // vcCake.onDataChange(`element:instantMutation:${this.state.element.id}`, this.instantDataUpdate)
  }

  componentWillUnmount () {
    this.props.api.notify('element:unmount', this.state.element.id)
    elementsStorage.state('element:' + this.state.element.id).ignoreChange(this.dataUpdate)
    assetsStorage.trigger('removeElement', this.state.element.id)
    elementsStorage.state('elementComponentTransformation').ignoreChange(this.elementComponentTransformation)
  }

  componentDidUpdate () {
    this.props.api.notify('element:didUpdate', this.props.element.id)
  }

  dataUpdate (data) {
    this.setState({element: data || this.props.element})
    assetsStorage.trigger('updateElement', this.state.element.id)
  }

  elementComponentTransformation (data) {
    if (data && data.transformed) {
      this.props.api.notify('element:didUpdate', this.props.element.id)
    }
  }

  getContent (content) {
    let returnData = null
    const currentElement = cook.get(this.state.element) // optimize
    let elementsList = DocumentData.children(currentElement.get('id')).map((childElement) => {
      let elements = [<Element element={childElement} key={childElement.id} api={this.props.api} />]
      if (childElement.tag === 'column') {
        elements.push(
          <ColumnResizer key={`columnResizer-${childElement.id}`} linkedElement={childElement.id}
            api={this.props.api} />
        )
      }
      return elements
    })
    let visibleElementsList = DocumentData.children(currentElement.get('id')).filter(childElement => childElement.hidden !== true)
    if (visibleElementsList.length) {
      returnData = elementsList
    } else {
      returnData = currentElement.containerFor().length > 0
        ? <ContentControls api={this.props.api} id={currentElement.get('id')} /> : content
    }
    return returnData
  }

  visualizeAttributes (element) {
    let layoutAtts = {}
    let atts = element.getAll()
    let allowInline = true
    if (vcCake.env('MOBILE_DETECT')) {
      const mobileDetect = new MobileDetect(window.navigator.userAgent)
      if (mobileDetect.mobile() && (mobileDetect.tablet() || mobileDetect.phone())) {
        allowInline = false
      }
    }
    Object.keys(atts).forEach((key) => {
      let attrSettings = element.settings(key)
      if (attrSettings.settings.options && attrSettings.settings.options.inline === true) {
        if (allowInline) {
          layoutAtts[ key ] =
            <ContentEditableComponent id={atts.id} field={key} fieldType={attrSettings.type.name} api={this.props.api}
              options={attrSettings.settings.options}>
              {atts[ key ] || ''}
            </ContentEditableComponent>
        } else {
          layoutAtts[ key ] = (
            <vcvhelper dangerouslySetInnerHTML={{ __html: atts[ key ] || '' }} />
          )
        }
      } else {
        layoutAtts[key] = atts[key]
      }
    })
    return layoutAtts
  }

  render () {
    let {api, element, ...other} = this.props
    element = this.state.element
    let el = cook.get(element)
    if (!el) {
      return null
    }
    if (element && element.hidden) {
      return null
    }
    let id = el.get('id')
    let ContentComponent = el.getContentComponent()
    if (!ContentComponent) {
      return null
    }
    let editor = {
      'data-vcv-element': id
    }
    if (el.get('metaDisableInteractionInEditor')) {
      editor['data-vcv-element-disable-interaction'] = true
    }
    return <ContentComponent id={id} key={'vcvLayoutContentComponent' + id} atts={this.visualizeAttributes(el)}
      api={api}
      editor={editor}
      {...other}>
      {this.getContent()}
    </ContentComponent>
  }
}
