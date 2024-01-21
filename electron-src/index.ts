// Native
import { join } from "path";
import { format } from "url";

// Packages
import {
  BrowserWindow,
  app,
  ipcMain,
  IpcMainEvent,
  globalShortcut,
} from "electron";
import isDev from "electron-is-dev";
import prepareNext from "electron-next";

// Prepare the renderer once the app is ready
app.on("ready", async () => {
  await prepareNext("./renderer");

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, "preload.js"),
    },
  });

  const url = isDev
    ? "http://localhost:8000/"
    : format({
        pathname: join(__dirname, "../renderer/out/index.html"),
        protocol: "file:",
        slashes: true,
      });

  mainWindow.loadURL(url);

  // ショートカットが押されたらウィンドウを表示
  globalShortcut.register("Shift+Control+W", () => {
    mainWindow.show();
  });

  // ウィンドウを閉じてもアプリを終了しない
  mainWindow.on("close", (event) => {
    event.preventDefault();
    mainWindow.hide();
  });

  globalShortcut.register("Shift+Control+M", () => {
    mainWindow.setSize(1920, 1080); // サイズを最大化
  });
});

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on("message", (event: IpcMainEvent, message: any) => {
  console.log(message);
  setTimeout(() => event.sender.send("message", "hi from electron"), 500);
});
