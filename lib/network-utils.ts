// Network diagnostic utilities
export class NetworkDiagnostics {
  static async checkConnectivity(): Promise<boolean> {
    try {
      // Try to fetch a small resource to test connectivity
      const response = await fetch("/api/health", {
        method: "HEAD",
        cache: "no-cache",
      })
      return response.ok
    } catch {
      return false
    }
  }

  static async testAPIEndpoint(endpoint: string): Promise<{
    success: boolean
    status?: number
    error?: string
    responseTime?: number
  }> {
    const startTime = Date.now()

    try {
      const response = await fetch(endpoint, {
        method: "HEAD",
        cache: "no-cache",
      })

      const responseTime = Date.now() - startTime

      return {
        success: response.ok,
        status: response.status,
        responseTime,
      }
    } catch (error) {
      const responseTime = Date.now() - startTime

      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        responseTime,
      }
    }
  }

  static getConnectionInfo(): {
    online: boolean
    effectiveType?: string
    downlink?: number
    rtt?: number
  } {
    const info: any = {
      online: navigator.onLine,
    }

    // Check if NetworkInformation API is available
    if ("connection" in navigator) {
      const connection = (navigator as any).connection
      if (connection) {
        info.effectiveType = connection.effectiveType
        info.downlink = connection.downlink
        info.rtt = connection.rtt
      }
    }

    return info
  }

  static async diagnoseNetworkIssue(): Promise<{
    connectivity: boolean
    apiHealth: boolean
    connectionInfo: any
    recommendations: string[]
  }> {
    const connectivity = await this.checkConnectivity()
    const apiHealth = await this.testAPIEndpoint("/api/auth/login")
    const connectionInfo = this.getConnectionInfo()

    const recommendations: string[] = []

    if (!connectivity) {
      recommendations.push("Check your internet connection")
      recommendations.push("Try refreshing the page")
    }

    if (!apiHealth.success) {
      recommendations.push("Server may be temporarily unavailable")
      recommendations.push("Try again in a few moments")
    }

    if (connectionInfo.effectiveType === "slow-2g" || connectionInfo.effectiveType === "2g") {
      recommendations.push("Your connection appears slow - this may cause timeouts")
    }

    if (apiHealth.responseTime && apiHealth.responseTime > 5000) {
      recommendations.push("Server response is slow - please be patient")
    }

    return {
      connectivity,
      apiHealth: apiHealth.success,
      connectionInfo,
      recommendations,
    }
  }
}
