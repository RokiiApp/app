import type { PluginModule } from '@rokii/api'
import { useState, useEffect } from 'react'
import * as config from '@/common/config'
import { FormItem } from './FormItem'
import styles from './styles.module.css'

interface SettingsProps {
  settings: PluginModule['settings']
  name: string
}

export const Settings = ({ settings, name }: SettingsProps) => {
  const [values, setValues] = useState<Record<string, any>>(
    () => config.get('plugins')[name] || {}
  )

  useEffect(() => {
    config.set('plugins', {
      ...config.get('plugins'),
      [name]: values
    })
  }, [values])

  const changeSetting = async (label: string, value: any) => {
    setValues((prev) => ({ ...prev, [label]: value }))
  }

  const renderSetting = (key: string) => {
    const setting = settings?.[key]
    const { defaultValue, label, ...restProps } = setting
    const value = values[key] || defaultValue

    return (
      <FormItem
        key={key}
        label={label || key}
        value={value}
        onChange={async (newValue: any) => await changeSetting(key, newValue)}
        {...restProps}
      />
    )
  }

  return (
    <div className={styles.settingsWrapper}>
      {(settings != null) && Object.keys(settings).map(renderSetting)}
    </div>
  )
}
