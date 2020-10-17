export interface TabInterface {
    route?: string
    name: string
    icon: string
    isActive: boolean
    slot: SlotEnum
    available: boolean
}

export enum SlotEnum {
    top = 'top',
    bottom = 'bottom',
    both = 'both'
}