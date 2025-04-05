export const isDevEnv = process.env.NODE_ENV === 'dev' || !process.env.NODE_ENV
export const isTestEnv = process.env.NODE_ENV === 'test'
export const isProdEnv = process.env.NODE_ENV === 'prod'
export const isLocalEnv = process.env.NODE_ENV === 'local'
