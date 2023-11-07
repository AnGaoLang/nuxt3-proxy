import { defineEventHandler, proxyRequest } from 'h3'
import { useRuntimeConfig } from '#imports'
import { keywords, ModuleOption } from '../type'

import type { H3Event } from 'h3'

const { proxy } = useRuntimeConfig()

export default defineEventHandler(async (event: H3Event) => {
  const rawUrl = event.node.req.url || '';
  let agent: ModuleOption
  const keys = Object.keys(proxy)
  if (keywords.includes(keys[0])) {
    agent = proxy as ModuleOption
    if (isMatchUrl(rawUrl, agent.test)) {
      return agentReq(agent, event, rawUrl)
    }
  } else {
    for (let i = 0; i < keys.length; i++) {
      agent = (proxy as any)[keys[i]]
      if (isMatchUrl(rawUrl, agent.test)) {
        return agentReq(agent, event, rawUrl)
      }
    }
  }
})

function agentReq(agent: ModuleOption, event: H3Event, rawUrl: string) {
  const target = process.env[agent.proxyEnvName || ''] || agent.target || event.node.req.headers.host
  let url = rawUrl
  if (agent.replace) {
    url = url.replace(agent.test || '', '')
  }
  url = `${target}${url}`
  if (agent.log) {
    try {
      const log = new Function("return (" + JSON.parse(agent.log as string) + ")")()
      log(
        {
          originUrl: event.node.req.url,
          method: event.node.req.method,
          headers: event.node.req.headers,
        },
        {
          statusCode: event.node.res.statusCode,
          statusMessage: event.node.res.statusMessage,
        },
        url
      )
    } catch(e) {
      console.log(e)
    }
  }
  return proxyRequest(event, url)
}
 
function isMatchUrl(url: string, test?: string | RegExp) {
  if (!test) return
  if (test instanceof RegExp) {
    return test.test(url)
  } else {
    return url.startsWith(test)
  }
}
