# nuxt3-proxy

## install
```
npm install nuxt3-proxy
yarn add nuxt3-proxy
...
```

## Config
```ts
{
   // Matching path
  test?: string | RegExp
  // System enviroment varable that can override target below
  // rather configurate in there than in runtimeConfig
  proxyEnvName?: string
  // proxy address
  target?: string
  // Whether if override test with an empty string
  replace?: boolean
  // print log
  log?: (req: any, res:any, target: string) => void
}
```
## of course yon can configurate that in runtimeConfig
```ts
{
  runtimeConfig: {
  proxy: {
    target: 'XX.XXX.COM'
    // process.env.GATEWAY
    proxyEnvName: 'GATEWAY'
    ...
  },
}
}
```

## multiple configuration
- you must has correspondence configuration in proxy and runtimeConfig both
```
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
    },
    cdn: {
      target: 'http://www.cdn.com/',
      proxyEnvName: 'CDN',
    }
  }
},
```

## License

[MIT](https://opensource.org/licenses/MIT)