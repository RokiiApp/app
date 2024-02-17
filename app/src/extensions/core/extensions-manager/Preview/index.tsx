import type { PluginInfo } from '../types'

import { useState } from 'react'
import { KeyboardNav, KeyboardNavItem } from '@rokii/ui'
import { ActionButton } from './ActionButton'
import { Description } from './Description'
import { Settings } from './Settings'

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

  const githubRepo = repo && repo.match(/^.+github.com\/([^/]+\/[^/]+).*?/)
  return (
    <div className={styles.preview} key={name}>
      <h2>{`${format.name(name)} (${version})`}</h2>

      <p>{description}</p>
      <KeyboardNav>
        <div className={styles.header}>
          {settings && (
            <KeyboardNavItem onSelect={() => setShowSettings((prev) => !prev)}>
              <>Settings</>
            </KeyboardNavItem>
          )}

          {showSettings && <Settings name={name} settings={settings} />}

          {!isInstalled && !isDebugging && (
            <ActionButton
              onSelect={getNpmActions(name, 'installPackage')}
              text={runningAction === 'installPackage' ? 'Installing...' : 'Install'}
            />
          )}

          {isInstalled && (
            <ActionButton
              onSelect={getNpmActions(name, 'uninstallPackage')}
              text={runningAction === 'uninstallPackage' ? 'Uninstalling...' : 'Uninstall'}
            />
          )}

          {isUpdateAvailable && (
            <ActionButton
              onSelect={getNpmActions(name, 'updatePackage')}
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
