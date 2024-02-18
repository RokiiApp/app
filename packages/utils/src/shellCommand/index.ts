import { Command, SpawnOptions } from '@tauri-apps/api/shell'

interface ShellListeners {
  onClose?: (code: number) => void
  onError?: (error: unknown) => void
  onStdout?: (data: string) => void
  onStderr?: (data: string) => void
}

interface CommandOptions {
  listeners?: ShellListeners
  spawnOptions?: SpawnOptions
}

export const shellCommand = async (cmd: string, options?: CommandOptions) => {
  const command = new Command(cmd, [], options?.spawnOptions)

  if ((options?.listeners) != null) {
    const { onClose, onError, onStderr, onStdout } = options.listeners
    if (onClose != null) {
      command.on('close', onClose)
    }

    if (onError != null) {
      command.on('error', onError)
    }

    if (onStdout != null) {
      command.stdout.on('data', onStdout)
    }

    if (onStderr != null) {
      command.stderr.on('data', onStderr)
    }
  }

  return await command.spawn()
}
