// src/components/icons/index.ts
export { Search } from './Search'
export { User } from './User'
export { Heart } from './Heart'
export { ShoppingCart } from './ShoppingCart'
export { ChevronDown } from './ChevronDown'
export { Menu } from './Menu'
export { X} from './X'
export { Truck } from './Truck'
export { Shield} from './Shield'
export { Google} from './Google'

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  className?: string
}
