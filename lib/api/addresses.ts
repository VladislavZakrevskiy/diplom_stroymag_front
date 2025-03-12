import { $fetch } from '../fetch'

export interface Address {
    id: string
    title: string
    city: string
    street: string
    house: string
    apartment?: string
    zipCode: string
    isDefault: boolean
}

export async function getUserAddresses(accessToken: string): Promise<Address[]> {
    try {
        const response = await $fetch(`/addresses`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })

        if (!response.ok) {
            throw new Error('Ошибка при получении адресов')
        }

        return await response.json()
    } catch (error) {
        console.error('Get user addresses error:', error)
        return []
    }
}

export async function getAddressById(accessToken: string, addressId: string): Promise<Address | null> {
    try {
        const response = await $fetch(`/addresses/${addressId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })

        if (!response.ok) {
            if (response.status === 404) {
                return null
            }
            throw new Error('Ошибка при получении адреса')
        }

        return await response.json()
    } catch (error) {
        console.error(`Get address ${addressId} error:`, error)
        return null
    }
}

export async function createAddress(
    accessToken: string,
    addressData: Omit<Address, 'id' | 'isDefault'> & { isDefault?: boolean }
): Promise<Address> {
    try {
        const response = await $fetch(`/addresses`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(addressData),
        })

        if (!response.ok) {
            throw new Error('Ошибка при создании адреса')
        }

        return await response.json()
    } catch (error) {
        console.error('Create address error:', error)
        throw error
    }
}

export async function updateAddress(
    accessToken: string,
    addressId: string,
    addressData: Partial<Omit<Address, 'id'>>
): Promise<Address> {
    try {
        const response = await $fetch(`/addresses/${addressId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(addressData),
        })

        if (!response.ok) {
            throw new Error('Ошибка при обновлении адреса')
        }

        return await response.json()
    } catch (error) {
        console.error(`Update address ${addressId} error:`, error)
        throw error
    }
}

export async function deleteAddress(accessToken: string, addressId: string): Promise<{ success: boolean }> {
    try {
        const response = await $fetch(`/addresses/${addressId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })

        if (!response.ok) {
            throw new Error('Ошибка при удалении адреса')
        }

        return { success: true }
    } catch (error) {
        console.error(`Delete address ${addressId} error:`, error)
        throw error
    }
}

export async function setDefaultAddress(accessToken: string, addressId: string): Promise<Address> {
    try {
        const response = await $fetch(`/addresses/${addressId}/default`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })

        if (!response.ok) {
            throw new Error('Ошибка при установке адреса по умолчанию')
        }

        return await response.json()
    } catch (error) {
        console.error(`Set default address ${addressId} error:`, error)
        throw error
    }
}
