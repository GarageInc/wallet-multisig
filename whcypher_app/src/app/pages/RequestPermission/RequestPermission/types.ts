export interface IWebPageRequest {
  host: string
  id: string

  context: {
    sessionId: string
    destinations: string
  }
}
