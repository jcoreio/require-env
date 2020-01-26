type Env = typeof process.env

interface RequireEnv {
  (name: string, env?: Env): string
  logError: typeof console.error
}

declare const requireEnv: RequireEnv

export = requireEnv