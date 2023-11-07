export const keywords = [
  'test',
  'proxyEnvName',
  'target',
  'replace',
  'log'
]

// Module options TypeScript interface definition
export interface ModuleOption {
  // Matching path
  test?: string | RegExp
  // System enviroment varable that can override target below
  proxyEnvName?: string
  // proxy address
  target?: string
  // Whether if override test with an empty string
  replace?: boolean
  // print log
  log?: ((
    req: {
      originUrl: string,
      method: string,
      headers: string,
    },
    res: {
      statusCode: string,
      statusMessage: string,
    },
    target: string
  ) => void) | string
}

export type ModuleOptions = Record<string, ModuleOption>