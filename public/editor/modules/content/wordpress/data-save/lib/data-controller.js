/*eslint no-extra-bind: "off"*/

import vcCake from 'vc-cake'
import $ from 'jquery'
import {PropTypes} from 'react'

const assetManager = vcCake.getService('assets-manager')
const documentData = vcCake.getService('document')

class SaveController {
  constructor (props) {
    this.props = props
    this.props.api.reply('wordpress:save', ((options) => {
      options = $.extend({}, {
        elements: documentData.all()
      }, options)
      this.save(options)
    }).bind(this))

    this.props.api.reply('wordpress:load', ((data) => {
      this.load(data)
    }).bind(this))
  }

  ajax (data, successCallback, failureCallback) {
    data = $.extend({}, {
      'vcv-nonce': window.vcvNonce,
      'vcv-source-id': window.vcvSourceID
    }, data)

    let request = new window.XMLHttpRequest()
    request.open('POST', window.vcvAjaxUrl, true)
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    request.onload = (() => {
      if (request.status >= 200 && request.status < 400) {
        successCallback.call(this, request)
      } else {
        if (typeof failureCallback === 'function') {
          failureCallback.call(this, request)
        }
      }
    }).bind(this)

    request.send($.param(data))
  }

  save (data) {
    var content = document.getElementsByClassName('vcv-layouts-clean-html')[ 0 ].innerHTML.replace(
      /\s+data\-reactid="[^"]+"/,
      '')
    var scripts = assetManager.getAssets('scripts')
    var styles = assetManager.getAssets('styles')

    this.ajax(
      {
        'vcv-action': 'setData:adminNonce',
        'vcv-content': content,
        'vcv-data': encodeURIComponent(JSON.stringify(data)),
        'vcv-scripts': scripts,
        'vcv-styles': styles
      },
      this.saveSuccess.bind(this),
      this.saveFailed.bind(this)
    )
  }

  saveSuccess (request) {
    let data = JSON.parse(request.responseText || '{}')
    if (data.postData) {
      window.vcvPostData = data.postData
    }

    this.props.api.request('wordpress:data:saved', {
      status: 'success',
      request: request
    })
  }

  saveFailed (request) {
    this.props.api.request('wordpress:data:saved', {
      status: 'failed',
      request: request
    })
  }

  load (data) {
    this.ajax(
      {
        'vcv-action': 'getData:adminNonce',
        'vcv-data': encodeURIComponent(JSON.stringify(data))
      },
      this.loadSuccess.bind(this),
      this.loadFailed.bind(this)
    )
  }

  loadSuccess (request) {
    this.props.api.request('wordpress:data:loaded', {
      status: 'success',
      request: request
    })
  }

  loadFailed (request) {
    this.props.api.request('wordpress:data:loaded', {
      status: 'failed',
      request: request
    })
  }
}
SaveController.propTypes = {
  api: PropTypes.object.isRequired
}

module.exports = SaveController
