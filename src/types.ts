export interface ThemeInterface {
    themeSelector: 'dark' | 'light'
    themeSelectorDispatch: React.Dispatch<ThemeAction>
}

export interface AuthInterface {
    contextAuth: User
    contextAuthDispatch: React.Dispatch<AuthAction>
}

export interface ThemeAction {
    type : string
}

export interface AuthAction {
    payload? : User
    type : string
}

export interface User {
    id: number
    password: string
    email: string
    name: string
    picture: string
    post: 'Manager' | 'Room Service' | 'Reception'
    phone: string
    postdescription : string
    startdate : string
    state: boolean
}

export interface Booking {
    guest: string
    picture: string
    id: number
    orderdate: string,
    checkin: string,
    checkout: string,
    note: string | null
    roomtype: 'Suite' | 'Single Bed' | 'Double Bed' | 'Double Superior'
    roomid: string,
    status: 'check in' | 'check out' | 'in progress'
}

export interface Comment {
    date: string
    id: number
    customer: string
    email: string
    phone: string
    comment: string
    archived: boolean
}

export interface Room {
    id: number
    name: string
    images: string[]
    type: 'Suite' | 'Single Bed' | 'Double Bed' | 'Double Superior'
    price: number
    offer: number
    amenities: string[]
    available: boolean
}