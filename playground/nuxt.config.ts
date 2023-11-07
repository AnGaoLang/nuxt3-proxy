export default defineNuxtConfig({
  modules: ['../src/module'],
  proxy: {
    gateway: {
      test: '/gateway/',
      target: '/',
      replace: true,
      log: (req: any, res: unknown, target: unknown) => {
        console.dir({
          type: '**[[Proxy Request]]**',
          request: req.originUrl,
          proxy: target,
          method: req.method,
          ...req.headers,
        })
      },
    },
    cdn: {
      test: '/cdn/',
      target: 'https://www.cdn.com/',
      replace: true,
      log: (req: any, res: unknown, target: unknown) => {
        console.dir({
          type: '**[[Proxy Request]]**',
          request: req.originUrl,
          proxy: target,
          method: req.method,
          ...req.headers,
        })
      },
    }
  },
  runtimeConfig: {
    proxy: {
      gateway: {
        target: 'http://www.baidu.com/',
        proxyEnvName: 'GATEWAY',
      }
    }
  },
})
