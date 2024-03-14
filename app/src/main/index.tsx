import React from 'react'
import ReactDOM from 'react-dom/client'
import { AutoUpdater } from '@/services/AutoUpdater'

AutoUpdater.tryUpdate()

import { Rokii } from './Rokii'
import './globals.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Rokii />
  </React.StrictMode>
)
