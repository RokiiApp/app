import { memo } from 'react'
import { Autocomplete } from './Autocomplete'
import { SearchBar } from './SearchBar'
import { useHashLocation } from 'wouter/use-hash-location'
import { BackButton } from '../BackButton'

const InputBox = () => {
  const [location] = useHashLocation()

  const isRoot = location === '/'

  return (
    <div className='flex items-center gap-2 h-full'>
      {!isRoot && <BackButton backLocation='/' />}

      <div className="z-[2] relative w-full h-full text-xl">
        <Autocomplete />
        <SearchBar />
      </div>

    </div>
  )
}

const memoizedInputBox = memo(InputBox)

export { memoizedInputBox as InputBox }
