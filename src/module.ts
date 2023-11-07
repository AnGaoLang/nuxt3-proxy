// @ts-check
import { defineNuxtModule, addServerHandler, createResolver } from '@nuxt/kit'
import { keywords, ModuleOption, ModuleOptions} from './type'

export default defineNuxtModule<ModuleOption | ModuleOptions>({
  meta: {
    name: 'nuxt3-proxy',
    configKey: 'proxy'
  },
  setup (options, nuxt) {
    const keys = Object.keys(options)
    if (keywords.includes(keys[0])) {
      const option = options as ModuleOption
      nuxt.options.runtimeConfig.proxy = Object.assign(
        {
          test: option.test,
          target: option.target,
          replace: option.replace
        },
        nuxt.options.runtimeConfig.proxy,
      );
      if (option.log) {
        // @ts-ignore
        nuxt.options.runtimeConfig.proxy.log = JSON.stringify(option.log, converter)
      }
    } else {
      // @ts-ignore
      nuxt.options.runtimeConfig.proxy = keys.reduce((total, item) => {
        const runtimeproxy = nuxt.options.runtimeConfig.proxy || {}
        let option = (options as ModuleOptions)[item]
        option = {
          ...option,
          // @ts-ignore
          ...(runtimeproxy[item] || {}) 
        }
        if (option.log) {
          option.log = JSON.stringify(option.log, converter)
        }
        return Object.assign(
          total,
          {
            [item]: option,
          }
        )
      }, {} as ModuleOptions)
    }
    
    const resolver = createResolver(import.meta.url)

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addServerHandler({
      handler: resolver.resolve('./runtime/server-middleware'),
    })
  }
})

function converter(key: any, val: any) {
  if (typeof val === "function" || val && val.constructor === RegExp) {
    return String(val);
  }
  return val;
}