export class CookieManager {
    private readonly isSupported: boolean

    constructor() {
        this.isSupported = this.checkSupport()
        if (!this.isSupported) {
            console.warn('Cookies are not supported in this environment')
        }
    }

    private checkSupport(): boolean {
        if (typeof document === 'undefined') {
            return false
        }
        if (typeof navigator !== 'undefined' && navigator.cookieEnabled) {
            return true
        }

        try {
            document.cookie = 'testcookie=1; SameSite=Strict;'
            const cookieEnabled = document.cookie.includes('testcookie=')
            document.cookie = 'testcookie=1; expires=Thu, 01-Jan-1970 00:00:01 GMT;'
            return cookieEnabled
        } catch (e) {
            return false
        }
    }

    public set(
        name: string,
        value: string,
        options: {
            expires?: Date | number
            path?: string
            domain?: string
            secure?: boolean
            sameSite?: 'Strict' | 'Lax' | 'None'
        } = {}
    ): void {
        if (typeof document === 'undefined') {
            return
        }
        if (!this.isSupported) return

        const encodedName = encodeURIComponent(name)
        const encodedValue = encodeURIComponent(value)
        let cookie = `${encodedName}=${encodedValue}`

        if (options.expires) {
            if (typeof options.expires === 'number') {
                const date = new Date()
                date.setDate(date.getDate() + options.expires)
                cookie += `; expires=${date.toUTCString()}`
            } else {
                cookie += `; expires=${options.expires.toUTCString()}`
            }
        }

        if (options.path) cookie += `; path=${options.path}`
        if (options.domain) cookie += `; domain=${options.domain}`
        if (options.secure) cookie += `; secure`
        if (options.sameSite) {
            if (options.sameSite === 'None' && !options.secure) {
                console.warn('Cookie with SameSite=None must be Secure')
                cookie += '; secure'
            }
            cookie += `; SameSite=${options.sameSite}`
        }

        document.cookie = cookie
    }

    public get(name: string): string | undefined {
        if (typeof document === 'undefined') {
            return undefined
        }
        if (!this.isSupported) return undefined

        const cookies = document.cookie.split(';')
        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.trim().split('=')
            if (cookieName === encodeURIComponent(name)) {
                return decodeURIComponent(cookieValue)
            }
        }
        return undefined
    }

    public remove(name: string, path?: string, domain?: string): void {
        if (typeof document === 'undefined') {
            return
        }

        this.set(name, '', {
            expires: -1, // Установка в прошлое
            path,
            domain,
        })
    }

    public exists(name: string) {
        if (typeof document === 'undefined') {
            return false
        }
        return this.get(name) !== undefined
    }

    public getAll(): Record<string, string> {
        if (typeof document === 'undefined') {
            return {}
        }
        if (!this.isSupported) return {}

        return document.cookie.split(';').reduce((acc, cookie) => {
            const [name, value] = cookie.trim().split('=')
            acc[decodeURIComponent(name)] = decodeURIComponent(value)
            return acc
        }, {} as Record<string, string>)
    }
}
