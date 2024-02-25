import React from 'react'
import ReactDOM from 'react-dom/client'

import * as config from '@/common/config'

import { Rokii } from './Rokii'
import './globals.css'
import { setupWindowListeners } from './setupWindowListeners'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Rokii />
  </React.StrictMode>
)

setupWindowListeners()
