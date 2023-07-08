import { PrismaClient } from '@prisma/client'
import { configureProxy } from './fetch.js'

export class ProxySource {
  constructor(private readonly prisma: PrismaClient, private readonly maxUsage = 30) {}

  usage = 0
  idx = 0

  async isEnought(calls: number) {
    return this.prisma.proxy.count({ skip: this.idx }).then(count => count > calls / this.maxUsage)
  }

  async take() {
    if (this.usage >= this.maxUsage) {
      this.next()
    }

    const proxy = await this.prisma.proxy.findFirst({
      skip: this.idx,
    })

    if (!proxy) {
      throw new Error('Proxies have run out')
    }

    configureProxy(proxy.host, proxy.port)
  }

  next() {
    this.idx++
    this.usage = 0
  }
}
