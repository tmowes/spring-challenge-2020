declare function readline(): string

declare namespace NodeJS {
  interface Global {
    readline(): string
  }
}
