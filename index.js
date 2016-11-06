exports.requireAuthentication = function(store, routeObject, statePath = 'auth', redir = '') {
  return {
    ...routeObject,
    onEnter: (nextState, replace, callback) => {
      const state = store.getState()
      const auth = statePath.split('.').reduce((o, i) => o[i], state)
      if (!auth) {
        console.warn('Not authenticated. Redirecting')
        replace(`/${redir}`)
      }
      callback()
    }
  }
}
