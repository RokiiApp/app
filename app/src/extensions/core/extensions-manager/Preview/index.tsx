import type { PluginInfo } from '../types'

import { useState } from 'react'
import { KeyboardNav, KeyboardNavItem } from '@rokii/ui'
import { ActionButton } from './ActionButton'
import { Description } from './Description'

import { client } from '@/services/plugins/index'
import styles from './styles.module.css'
import * as format from '../utils/format'

type NpmActions = 'installPackage' | 'uninstallPackage' | 'updatePackage'

interface PreviewProps {
  onComplete: () => void
  plugin: PluginInfo
}

export const Preview = ({ onComplete, plugin }: PreviewProps) => {
  const [runningAction, setRunningAction] = useState<NpmActions | null>(null)
  const [showDescription, setShowDescription] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const getNpmActions =
    (pluginName: string, runningActionName: NpmActions) => async () => {
      setRunningAction(runningActionName)

      await client[runningActionName](pluginName)

      setRunningAction(null)

      onComplete()
    }

  const installAction = getNpmActions(plugin.name, 'installPackage')
  const uninstallAction = getNpmActions(plugin.name, 'uninstallPackage')
  const updateAction = getNpmActions(plugin.name, 'updatePackage')

  const {
    name,
    version,
    description,
    repo,
    isInstalled,
    isDebugging,
    installedVersion,
    isUpdateAvailable,
    settings
  } = plugin

  const githubRepo = repo?.match(/^.+github.com\/([^/]+\/[^/]+).*?/)
  return (
    <div className={styles.preview} key={name}>
      {/* eslint-disable-next-line @typescript-eslint/restrict-template-expressions */}
      <h2>{`${format.name(name)} (${version})`}</h2>

      <p>{description}</p>
      <KeyboardNav>
        <div className={styles.header}>
          {settings && (
            <KeyboardNavItem onSelect={() => setShowSettings((prev) => !prev)}>
              <>Settings</>
            </KeyboardNavItem>
          )}

          {!isInstalled && !isDebugging && (
            <ActionButton
              onSelect={installAction}
              text={runningAction === 'installPackage' ? 'Installing...' : 'Install'}
            />
          )}

          {isInstalled && (
            <ActionButton
              onSelect={uninstallAction}
              text={runningAction === 'uninstallPackage' ? 'Uninstalling...' : 'Uninstall'}
            />
          )}

          {isUpdateAvailable && (
            <ActionButton
              onSelect={updateAction}
              text={runningAction === 'updatePackage' ? 'Updating...' : `Update (${installedVersion} → ${version})`}
            />
          )}

          {githubRepo && (
            <KeyboardNavItem
              onSelect={() => setShowDescription((prev) => !prev)}
            >
              <>Details</>
            </KeyboardNavItem>
          )}
        </div>
      </KeyboardNav>

      {showDescription && githubRepo && (
        <Description repoName={githubRepo[1]} />
      )}
    </div>
  )
}
