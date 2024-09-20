export function saveFile(fileName: string, hexData: string): Promise<any> {
  return new Promise((resolve, reject) => {
    (window as any).MDS.file.savebinary(fileName, hexData, function (response: any) {
      if (response.status) {
        return resolve(response.response);
      }

      return reject();
    });
  });
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
        return resolve(response.response.writemode);
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

export function quit(compact) {
  return promisfyMds(`quit compact:${compact ? 'true' : 'false'}`);
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

export function peers() {
  return promisfyMds('peers max:5');
}

export function addPeers(peerList: string) {
  return promisfyMds(`peers action:addpeers peerslist:${peerList}`);
}

export function set(key: string, value: string) {
  return new Promise((resolve) => {
    (window as any).MDS.keypair.set(key, value, function (response: any) {
      if (response.status) {
        return resolve(response.response);
      }

      return resolve(false);
    });
  });
}

export function get(key: string) {
  return new Promise((resolve) => {
    (window as any).MDS.keypair.get(key, function (response: any) {
      if (response.status) {
        return resolve(response.value);
      }

      return resolve(false);
    });
  });
}

export function moveFile(originalFilePath: string, newFilePath: string) {
  return new Promise((resolve, reject) => {
    (window as any).MDS.file.move(originalFilePath, newFilePath, function (response: any) {
      if (response.status) {
        return resolve(true);
      }

      return reject();
    });
  });
}

export function upload(file: unknown) {
  return new Promise((resolve) => {
    (window as any).MDS.file.upload(file, function (response: any) {
      if (response.allchunks === response.chunk) {
        return resolve(true);
      }
    });
  });
}

export function copyToWeb(filePath: string, newFilePath: string): Promise<any> {
  return new Promise((resolve, reject) => {
    (window as any).MDS.file.copytoweb(filePath, newFilePath, function (response: any) {
      if (response.status) {
        return resolve(response);
      }

      return reject();
    });
  });
}

export function loadBinary(filePath: string): Promise<any> {
  return new Promise((resolve, reject) => {
    (window as any).MDS.file.loadbinary(filePath, function (response: any) {
      if (response.status) {
        return resolve(response.response.load);
      }

      return reject();
    });
  });
}

export function getRandomElements(arr, count) {
  // Create a shallow copy of the array to avoid modifying the original array
  const shuffled = arr.slice();

  // Shuffle the array using Fisher-Yates (Knuth) shuffle algorithm
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Return the first 'count' elements from the shuffled array
  return shuffled.slice(0, count);
}
