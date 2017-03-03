import vcCake from 'vc-cake'
import TreeView from './lib/treeViewLayout'
import TreeViewNavbarControl from './lib/navbarControl'

if (vcCake.env('FEATURE_BACKEND_TREEVIEW')) {
  vcCake.add('ui-tree-view-backend', (api) => {
    api.module('ui-layout-bar').do('setStartContent', TreeView, {
      api: api
    })

    api.module('ui-navbar').do('addElement', 'Tree layout', TreeViewNavbarControl, { pin: 'visible', api: api })
  })
}
