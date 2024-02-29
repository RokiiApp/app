import type { ExtensionModule } from '@rokii/api'
import icon from '../icon.png'
import { items } from './items'

const RokiiExtension: ExtensionModule = {
    name: 'Rokii',
    run: ({ display }) => display(items),
    icon
}

export default RokiiExtension
