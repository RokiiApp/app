// import { Menu, Tray, app, MenuItemConstructorOptions } from 'electron';
// import { showWindowWithTerm } from './services/showWindowWithTerm';
// import { toggleWindow } from './services/toggleWindow';
// import { checkForUpdates } from './services/checkForUpdates';

// type TrayOptions = {
//   src: string | Electron.NativeImage;
//   isDev: boolean;
//   mainWindow: Electron.BrowserWindow;
//   backgroundWindow: Electron.BrowserWindow;
// };

// /**
//  * Class that controls state of icon in menu bar
//  */
// export class AppTray {
//   options: TrayOptions;
//   tray: Electron.Tray | null;

//   constructor (options: TrayOptions) {
//     this.tray = null;
//     this.options = options;
//   }

//   /**
//    * Show application icon in menu bar
//    */
//   show () {
//     const tray = new Tray(this.options.src);
//     tray.setToolTip('RoKii');
//     tray.setContextMenu(this.buildMenu());
//     this.tray = tray;
//   }

//   setIsDev (isDev: boolean) {
//     this.options.isDev = isDev;
//     if (this.tray) {
//       this.tray.setContextMenu(this.buildMenu());
//     }
//   }

//   buildMenu () {
//     const { mainWindow, backgroundWindow, isDev } = this.options;

//     const separator = { type: 'separator' } as const;

//     const template: MenuItemConstructorOptions[] = [
//       {
//         label: 'Toggle RoKii',
//         click: () => toggleWindow(mainWindow)
//       },
//       separator,
//       {
//         label: 'Plugins',
//         click: () => showWindowWithTerm(mainWindow, 'plugins ')
//       },
//       {
//         label: 'Preferences...',
//         click: () => showWindowWithTerm(mainWindow, 'RoKii Settings')
//       },
//       separator,
//       {
//         label: 'Check for updates',
//         click: checkForUpdates
//       },
//       separator
//     ];

//     if (isDev) {
//       template.push(separator);
//       template.push({
//         label: 'Development',
//         submenu: [
//           {
//             label: 'DevTools (main)',
//             accelerator: 'CmdOrCtrl+Shift+I',
//             click: () =>
//               mainWindow.webContents.openDevTools({ mode: 'detach' })
//           },
//           {
//             label: 'DevTools (background)',
//             accelerator: 'CmdOrCtrl+Shift+B',
//             click: () =>
//               backgroundWindow.webContents.openDevTools({ mode: 'detach' })
//           },
//           {
//             label: 'Reload',
//             click: () => {
//               app.relaunch();
//               app.exit();
//             }
//           }
//         ]
//       });
//     }

//     template.push(separator);
//     template.push({
//       label: 'Quit RoKii',
//       click: () => app.quit()
//     });

//     const menu = Menu.buildFromTemplate(template);
//     Menu.setApplicationMenu(menu);

//     return menu;
//   }

//   /**
//    * Hide icon in menu bar
//    */
//   hide () {
//     if (this.tray) {
//       this.tray.destroy();
//       this.tray = null;
//     }
//   }
// }
