import React from 'react'
import ReactDOM from 'react-dom/client'
import { Rokii } from './Rokii'
import './globals.css'

const $root = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot($root).render(
  <React.StrictMode>
    <Rokii />
  </React.StrictMode>
)
