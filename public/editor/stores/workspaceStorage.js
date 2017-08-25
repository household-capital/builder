import {addStorage, getService, getStorage} from 'vc-cake'

const createKey = getService('utils').createKey

addStorage('workspace', (storage) => {
  const elementsStorage = getStorage('elements')
  const localStorage = getStorage('localStorage')
  const documentManager = getService('document')
  const cook = getService('cook')
  const isElementOneRelation = (parent) => {
    let children = cook.getChildren(parent.tag)
    if (children.length === 1) {
      return children[ 0 ].tag
    }
    return false
  }
  storage.on('add', (id, tag, options) => {
    let element = false
    if (id) {
      element = documentManager.get(id)
    }
    if (element) {
      let oneTag = isElementOneRelation(element)
      if (oneTag) {
        let data = cook.get({ tag: oneTag, parent: id })
        elementsStorage.trigger('add', data.toJS(), true, options)
        return
      }
    }
    storage.state('settings').set({
      action: 'add',
      element: element,
      tag: tag,
      options: options
    })
  })
  storage.on('edit', (id, tag, options) => {
    if (!id) {
      return
    }
    const element = documentManager.get(id)
    if (!element) {
      return
    }
    storage.state('settings').set({
      action: 'edit',
      element: element,
      tag: tag,
      options: options
    })
  })
  storage.on('remove', (id) => {
    const settings = storage.state('settings').get()
    if (settings && (settings.action === 'edit' || settings.action === 'add')) {
      storage.state('settings').set({})
    }
    elementsStorage.trigger('remove', id)
  })
  storage.on('clone', (id) => {
    elementsStorage.trigger('clone', id)
  })
  storage.on('copy', (id, tag, options) => {
    let element = documentManager.copy(id)
    storage.state('copyData').set({
      element: element,
      options: options
    })
  })
  const pasteElementAndChildren = (data, parentId, options) => {
    let elementId = createKey()
    let element = cook.get({
      ...data.element,
      id: elementId,
      parent: parentId
    })
    let elementData = element.toJS()
    elementData.skipInitialTabs = true
    elementsStorage.trigger('add', elementData, true, options)
    data.children.forEach(child => {
      pasteElementAndChildren(child, elementId)
    })
  }
  storage.on('paste', (id) => {
    let copyData = storage.state('copyData').get()
    if (!copyData || !copyData.element) {
      return
    }
    pasteElementAndChildren(copyData.element, id, copyData.options)
    // let element = cook.get(copyData.element)
    // element.set('id', createKey())
    // element.set('parent', id)
    // let elementData = element.toJS()

    // elementsStorage.trigger('add', elementData, true, copyData.options)
  })
  storage.on('move', (id, settings) => {
    elementsStorage.trigger('move', id, settings)
  })
  storage.on('drop', (id, settings) => {
    const relatedElement = settings.related ? cook.get(documentManager.get(settings.related)) : false
    const data = cook.get({ tag: settings.element.tag, parent: relatedElement.get('parent') })
    elementsStorage.trigger('add', data.toJS())
    let movingID = data.get('id')
    if (settings.action !== 'append' && relatedElement.relatedTo([ 'RootElements' ]) && !data.relatedTo([ 'RootElements' ])) {
      movingID = documentManager.getTopParent(movingID)
    }
    elementsStorage.trigger('move', movingID, settings)
    storage.trigger('edit', data.toJS().id, '')
  })
  storage.on('start', () => {
    localStorage.trigger('start')
    storage.state('app').set('started')
  })
  storage.on('addTemplate', () => {
    storage.state('settings').set({
      action: 'addTemplate',
      element: false,
      tag: false,
      options: {}
    })
  })
  storage.state('navbarBoundingRect').set({
    resizeTop: 0,
    resizeLeft: 0
  })
})
