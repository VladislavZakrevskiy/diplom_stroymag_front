import type React from 'react'
export default function DeliveryLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css" />
            {children}
        </>
    )
}
