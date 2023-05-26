export function saveFile(fileName: string, hexData: any): Promise<any> {
  return new Promise((resolve, reject) => {
    (window as any).MDS.file.savebinary(
      fileName,
      hexData,
      function (response: any) {
        if (response.status) {
          return resolve(response.response);
        }

        return reject();
      }
    );
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

export function mds() {
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

export function dAppLink(dAppName: string) {
  return new Promise((resolve, reject) => {
    (window as any).MDS.dapplink(dAppName, function (response: any) {
      if (response.status) {
        return resolve(response);
      }

      return reject();
    });
  });
}
