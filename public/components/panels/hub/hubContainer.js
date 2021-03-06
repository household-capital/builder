import React from 'react'
import classNames from 'classnames'
import HubItemController from './hubItemController'
import HubMenu from './hubMenu'
import HubDropdown from './hubDropdown'
import AddElementCategories from '../addElement/lib/categories'
import Scrollbar from '../../scrollbar/scrollbar.js'
import SearchElement from '../addElement/lib/searchElement'
import vcCake from 'vc-cake'
import lodash from 'lodash'
import categories from './categoriesSettings.json'
import StockImages from '../../stockImages/stockImages'
import Notifications from '../../notifications/notifications'

const sharedAssetsLibraryService = vcCake.getService('sharedAssetsLibrary')

export default class HubContainer extends AddElementCategories {
  static localizations = window.VCV_I18N && window.VCV_I18N()
  allCategories = null

  constructor (props) {
    super(props)
    if (props && props.options && props.options.filterType) {
      const { filterType, id, bundleType } = props.options
      this.state = {
        filterType: filterType,
        activeCategoryIndex: id,
        bundleType: bundleType
      }
    }
    this.setFilterType = this.setFilterType.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount () {
    if (this.props.hideScrollbar) {
      window.addEventListener('scroll', this.handleScroll)
    }
  }

  componentWillUnmount () {
    if (this.props.hideScrollbar) {
      window.removeEventListener('scroll', this.handleScroll)
    }
  }

  getAllCategories () {
    if (!this.allCategories) {
      const elementGroup = this.getElementGroup(categories.element)
      const templateGroup = this.getTemplateGroup(categories.template)
      const blockGroup = this.getBlockGroup(categories.block)
      const addonsGroup = this.getAddonsGroup(categories.addon)
      const headerGroup = this.getHFSGroup(categories.hubHeader)
      const footerGroup = this.getHFSGroup(categories.hubFooter)
      const sidebarGroup = this.getHFSGroup(categories.hubSidebar)
      const allGroup = this.getAllGroup(categories.all, [elementGroup, templateGroup, blockGroup, headerGroup, footerGroup, sidebarGroup])

      this.allCategories = [allGroup, elementGroup, templateGroup, blockGroup, addonsGroup, headerGroup, footerGroup, sidebarGroup]
    }
    return this.allCategories
  }

  getAllGroup (category, otherGroups) {
    const { title, index } = category
    const elements = []

    otherGroups.forEach((group) => {
      const groupAllElements = group.categories && group.categories[0] ? group.categories[0].elements : group.elements
      if (groupAllElements) {
        elements.push(...groupAllElements)
      }
    })
    return { elements: elements, id: `${title}${index}`, index: index, title: title }
  }

  getAddonsGroup (category) {
    const { title, index } = category
    const addonsCategories = window.VCV_HUB_GET_ADDON_TEASER()
    return { elements: addonsCategories, id: `${title}${index}`, index: index, title: title }
  }

  getElementGroup (category) {
    const { title, index } = category
    const elementCategories = window.VCV_HUB_GET_TEASER()
    elementCategories.forEach((item, index) => {
      let elements = lodash.sortBy(item.elements, ['name'])
      elements = elements.map((element) => {
        const tag = element.tag
        element.tag = tag.charAt(0).toLowerCase() + tag.substr(1, tag.length - 1)

        return element
      })
      elementCategories[index].elements = elements
    })
    return { categories: elementCategories, id: `${title}${index}`, index: index, title: title }
  }

  getTemplateGroup (category) {
    const { title, index } = category
    const elements = window.VCV_HUB_GET_TEMPLATES_TEASER().filter((element) => {
      return element.templateType === 'hub' || element.templateType === 'predefined'
    })
    return { elements: elements, id: `${title}${index}`, index: index, title: title }
  }

  getBlockGroup (category) {
    const { title, index, type } = category
    const blocks = window.VCV_HUB_GET_TEMPLATES_TEASER().filter((block) => {
      return block.templateType === type
    })
    return { elements: blocks, id: `${title}${index}`, index: index, title: title }
  }

  getHFSGroup (category) {
    const { type, title, index } = category
    if (index) {
      let elements = window.VCV_HUB_GET_TEMPLATES_TEASER()
      elements = elements.filter(element => {
        return element.templateType === type
      })
      return { elements, id: `${title}${index}`, index, title: title }
    }
    return {}
  }

  getElementControl (elementData) {
    let tag = elementData.tag ? elementData.tag : elementData.name
    tag = tag.charAt(0).toLowerCase() + tag.substr(1, tag.length - 1)
    const type = elementData.type ? elementData.type : 'element'

    if (type === 'template') {
      tag = elementData.bundle.replace('template/', '').replace('predefinedTemplate/', '')
    }

    return (
      <HubItemController
        key={'vcv-item-controller-' + tag}
        element={elementData}
        tag={tag}
        type={type}
        update={elementData.update ? elementData.update : false}
        name={elementData.name}
        addElement={this.addElement}
      />
    )
  }

  /**
   * This method is not unused it's used to
   * override AddElementCategories component's original method
   * @return {JSX}
   */
  getNoResultsElement () {
    const nothingFoundText = HubContainer.localizations ? HubContainer.localizations.nothingFound : 'Nothing found'

    const source = sharedAssetsLibraryService.getSourcePath('images/search-no-result.png')

    return (
      <div className='vcv-ui-editor-no-items-container'>
        <div className='vcv-ui-editor-no-items-content'>
          <img
            className='vcv-ui-editor-no-items-image'
            src={source}
            alt={nothingFoundText}
          />
        </div>
      </div>
    )
  }

  getElementsByCategory () {
    const { activeCategoryIndex } = this.state
    const allCategories = this.getAllCategories()
    let elements = []

    if (activeCategoryIndex.indexOf && activeCategoryIndex.indexOf('-') > -1) {
      const index = activeCategoryIndex.split('-')
      const group = allCategories[index[0]]
      const category = group && group.categories && group.categories[index[1]]

      elements = category ? category.elements : []
    } else {
      elements = allCategories && allCategories[activeCategoryIndex] && allCategories[activeCategoryIndex].elements
    }

    return elements ? elements.map((tag) => { return this.getElementControl(tag) }) : []
  }

  getSearchProps () {
    return {
      allCategories: this.getAllCategories(),
      index: this.state.activeCategoryIndex,
      changeActive: this.changeActiveCategory,
      changeTerm: this.changeSearchState,
      changeInput: this.changeInput,
      inputPlaceholder: 'elements and templates',
      activeFilter: this.state.filterId,
      disableSelect: true,
      selectEvent: (active) => {
        const activeId = active && active.constructor === String && active.split('-')[0]
        const result = this.state
        const foundCategory = Object.values(categories).find(category => parseInt(activeId) === category.index)
        result.filterType = foundCategory.type
        this.setState(result)
      }
    }
  }

  getSearchElement () {
    const searchProps = this.getSearchProps()
    return <SearchElement {...searchProps} />
  }

  setFilterType (value, id, bundleType) {
    this.setState({
      filterType: value,
      activeCategoryIndex: id,
      bundleType: bundleType
    })
  }

  filterResult () {
    const { filterType, bundleType } = this.state
    let result = this.isSearching() ? this.getFoundElements() : this.getElementsByCategory()
    result = result.filter((item) => {
      let isClean = false

      if (filterType === 'all') {
        isClean = true
      } else {
        if (categories[filterType].templateType) {
          isClean = item.props.type === 'template' && item.props.element.templateType === filterType
        } else {
          isClean = item.props.type === filterType
        }
      }

      // filter for bundle type
      const itemBundleType = item.props.element.bundleType

      // if bundleType is not set - do not show it on free/premium
      if (bundleType && (!item.props.element.bundleType || !item.props.element.bundleType.length)) {
        isClean = false
      }

      if (isClean && itemBundleType && itemBundleType.length && bundleType) {
        isClean = itemBundleType.indexOf(bundleType) > -1

        // remove item if item has also free bundle type, when premium is clicked
        if (bundleType === 'premium' && isClean) {
          isClean = itemBundleType.indexOf('free') < 0
        }
      }

      return isClean
    })
    return result
  }

  getTypeControlProps () {
    return {
      categories: categories,
      filterType: this.state.filterType,
      bundleType: this.state.bundleType,
      setFilterType: this.setFilterType
    }
  }

  getHubPanelControls () {
    return <HubMenu {...this.getTypeControlProps()} />
  }

  static handleClickGoPremium (e) {
    e && e.preventDefault && e.preventDefault()
    const target = e.currentTarget
    window.location.replace(target.dataset.href)
  }

  getHubBanner () {
    const titleText = HubContainer.localizations ? HubContainer.localizations.getMoreText : 'Get More Elements, Templates, and Extensions'
    const subtitleText = HubContainer.localizations ? HubContainer.localizations.downloadFromHubText : 'Download additional content from the Visual Composer Hub - right in your editor instantly.'
    const goPremiumText = HubContainer.localizations ? HubContainer.localizations.goPremium : 'Go Premium'
    const unlockHubText = HubContainer.localizations ? HubContainer.localizations.unlockHub : 'Unlock Visual Composer Hub'
    const buttonText = window.vcvIsFreeActivated ? goPremiumText : unlockHubText
    const buttonLink = window.vcvIsFreeActivated ? window.vcvGoPremiumUrl + '&vcv-ref=hub-banner' : window.vcvUpgradeUrl + '&screen=license-options'

    return (
      <div className='vcv-hub-banner'>
        <div className='vcv-hub-banner-content'>
          <p className='vcv-hub-banner-title'>{titleText}</p>
          <p className='vcv-hub-banner-subtitle'>{subtitleText}</p>
          <span className='vcv-hub-banner-button' data-href={buttonLink} onClick={HubContainer.handleClickGoPremium}>
            {buttonText}
          </span>
        </div>
      </div>
    )
  }

  handleScroll (e) {
    let el = e.currentTarget
    if (this.props.hideScrollbar) {
      el = e.currentTarget.document.documentElement
    }
    const clientRect = el.getBoundingClientRect()
    const windowHeight = window.innerHeight || document.documentElement.clientHeight
    const scrolledToBottom = (el.scrollTop + clientRect.height + (windowHeight / 2)) >= el.scrollHeight
    this.setState({
      scrollTop: el.scrollTop,
      scrolledToBottom: scrolledToBottom
    })
  }

  render () {
    const itemsOutput = this.filterResult()
    const innerSectionClasses = classNames({
      'vcv-ui-tree-content-section-inner': true,
      'vcv-ui-state--centered-content': !itemsOutput.length
    })
    const editorPlateClasses = classNames({
      'vcv-ui-editor-plate': true,
      'vcv-ui-state--active': true,
      'vcv-ui-editor-plate--addon': this.state.filterType === 'addon'
    })

    let panelContent = ''
    if (this.state.filterType && this.state.filterType === 'stockImages') {
      panelContent = <StockImages scrolledToBottom={this.state.scrolledToBottom} scrollTop={this.state.scrollTop} />
    } else {
      panelContent = (
        <div className={innerSectionClasses}>
          {(typeof window.vcvIsPremiumActivated !== 'undefined' && !window.vcvIsPremiumActivated) ? this.getHubBanner() : null}
          <div className='vcv-ui-editor-plates-container vcv-ui-editor-plate--teaser'>
            <div className='vcv-ui-editor-plates'>
              <div className={editorPlateClasses}>
                {this.getElementListContainer(itemsOutput)}
              </div>
            </div>
          </div>
        </div>
      )
    }

    let hubContent = null
    if (this.props.hideScrollbar) {
      hubContent = panelContent
    } else {
      hubContent = (
        <Scrollbar onScroll={lodash.throttle(this.handleScroll, 100)}>
          {panelContent}
        </Scrollbar>
      )
    }

    let notifications = null
    if (this.props.addNotifications) {
      notifications = <Notifications />
    }

    return (
      <div className='vcv-ui-tree-view-content vcv-ui-teaser-add-element-content'>
        <div className='vcv-ui-tree-content'>
          {this.getSearchElement()}
          {this.getHubPanelControls()}
          <div className='vcv-ui-hub-dropdown-container'>
            <HubDropdown {...this.getTypeControlProps()} />
          </div>
          <div className='vcv-ui-tree-content-section'>
            {notifications}
            {hubContent}
          </div>
        </div>
      </div>
    )
  }
}
