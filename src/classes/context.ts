export default class Context {
  private data = {}
  set(name: string, value: any) {
    this.data[name] = value
  }
  get(name: string) {
    return this.data[name]
  }
}