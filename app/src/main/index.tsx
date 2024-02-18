import React from 'react'
import ReactDOM from 'react-dom/client'

import * as config from '@/common/config'
import { changeTheme } from './utils/changeTheme'

import { Rokii } from './components/Rokii'
import './globals.css'
import { setupWindowListeners } from './setupWindowListeners'

import { setupSettingsListener } from './settingsListener'

// We make react available so the plugins can use it without having to bundle it
window.React = React

// Set theme from config
changeTheme(config.get('theme'))

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Rokii />
  </React.StrictMode>
)

setupSettingsListener()

setupWindowListeners()
