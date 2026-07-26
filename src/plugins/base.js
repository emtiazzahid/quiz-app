// Globally register every component in src/components/base as `Base<Name>`
// (Vue 3 + Vite replacement for webpack's require.context)

function upperFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function camelCase(str) {
  return str
    .replace(/[-_/](\w)/g, (_, c) => c.toUpperCase())
    .replace(/\.\w+$/, '')
}

const modules = import.meta.glob('@/components/base/**/*.vue', { eager: true })

export default {
  install(app) {
    Object.entries(modules).forEach(([path, module]) => {
      const fileName = path.split('/components/base/')[1]
      const componentName = 'Base' + upperFirst(camelCase(fileName.replace(/\.vue$/, '')))
      app.component(componentName, module.default || module)
    })
  },
}
