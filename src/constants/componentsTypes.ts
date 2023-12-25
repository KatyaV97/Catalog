export interface Device {
    id: string,
    model: string,
    brand: string,
    releaseYear: string,
    displaySize: number,
    manufactureCountry: string,
    memory: number,
    displayRefreshRate: number,
    hasNFC: boolean,
    hasESIM: boolean,
    hasWirelessCharge: boolean,
    price: number,
    imgPath: string,
}

export interface RowTitle {
    title: string,
    parameter: string,
    unit: string | null
}