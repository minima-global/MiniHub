export function saveFile(fileName: string, hexData: any): Promise<any> {
  return new Promise((resolve, reject) => {
    (window as any).MDS.file.savebinary(fileName, hexData, function (response: any) {
      if (response.status) {
        return resolve(response.response);
      }

      return reject();
    });
  });
}

export function getHost(): string {
  const extractedPort = (window as any).MDS.mainhost.match(/(?<port>[0-9]+)/);
  const portAsNumber = Number(extractedPort[0]) - 1;

  return `https://localhost:${portAsNumber}`;
}

export function getPath(fileName: string): Promise<string> {
  return new Promise((resolve, reject) => {
    (window as any).MDS.file.getpath(fileName, function (response: any) {
      if (response.status) {
        return resolve(response.response.getpath.path);
      }

      return reject();
    });
  });
}

export function install(filePath: string) {
  return new Promise((resolve, reject) => {
    (window as any).MDS.cmd(`mds action:install file:${filePath}`, function (response: any) {
      if (response.status) {
        return resolve(response.response.installed);
      }

      return reject();
    });
  });
}

export function update(appUid: string, filePath: string) {
  return new Promise((resolve, reject) => {
    (window as any).MDS.cmd(`mds action:update uid:${appUid} file:${filePath}`, function (response: any) {
      if (response.status) {
        return resolve(response.response.updated);
      }

      return reject();
    });
  });
}

export function mds(): any {
  return new Promise((resolve, reject) => {
    (window as any).MDS.cmd('mds', function (response: any) {
      if (response.status) {
        return resolve(response.response);
      }

      return reject();
    });
  });
}

export function deleteFile(fileName: string) {
  return new Promise((resolve, reject) => {
    (window as any).MDS.file.delete(fileName, function (response: any) {
      if (response.status) {
        return resolve(true);
      }

      return reject();
    });
  });
}

export function isWriteMode(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    (window as any).MDS.cmd(`checkmode`, function (response: any) {
      if (response.status) {
        return resolve(response.response.mode === 'WRITE');
      }

      return reject();
    });
  });
}

export function dAppLink(dAppName: string): any {
  return new Promise((resolve, reject) => {
    (window as any).MDS.dapplink(dAppName, function (response: any) {
      if (response.status) {
        return resolve(response);
      }

      return reject();
    });
  });
}

export function downloadFile(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    (window as any).MDS.file.download(url, function (resp: any) {
      if (resp.status) {
        resolve(resp.response);
      }

      return reject();
    });
  });
}

export function copyFileToWeb(filePath: string): Promise<any> {
  return new Promise((resolve, reject) => {
    return (window as any).MDS.file.copytoweb(filePath, `/mywebfiles/${filePath.split('/').pop()}`, function (resp) {
      if (resp.status) {
        return resolve(resp.response);
      }

      return reject();
    });
  });
}

export function getFullFilePath(filePath: string): Promise<any> {
  return new Promise((resolve, reject) => {
    return (window as any).MDS.file.getpath(filePath, function (resp) {
      if (resp.status) {
        return resolve(resp.response);
      }

      return reject();
    });
  });
}

export function installMdsFile(filePath: string, trust: 'write' | 'read' = 'read'): Promise<string> {
  return new Promise((resolve, reject) => {
    return (window as any).MDS.cmd(`mds action:install file:${filePath} trust:${trust}`, function (resp) {
      if (resp.status) {
        return resolve(resp.response);
      }

      return reject();
    });
  });
}

export function uninstallApp(appUid: string): Promise<string> {
  return new Promise((resolve, reject) => {
    return (window as any).MDS.cmd(`mds action:uninstall uid:${appUid}`, function (resp) {
      if (resp.status) {
        return resolve(resp.response);
      }

      return reject();
    });
  });
}

export function mdsActionPermission(appUid: string, trust: 'write' | 'read'): any {
  return new Promise((resolve, reject) => {
    (window as any).MDS.cmd(`mds action:permission uid:${appUid} trust:${trust}`, function (response: any) {
      if (response.status) {
        return resolve(response.response);
      }

      return reject();
    });
  });
}

export function promisfyMds(command: string): any {
  return new Promise((resolve, reject) => {
    (window as any).MDS.cmd(command, function (response: any) {
      if (response.status) {
        return resolve(response.response);
      }

      return reject();
    });
  });
}

export function quit() {
  return promisfyMds('quit compact:true');
}

export function networkRecalculate() {
  return promisfyMds('network action:recalculateip');
}

export function block() {
  return promisfyMds('block');
}

export function status() {
  return promisfyMds('status');
}
