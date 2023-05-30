import {
  copyFileToWeb,
  downloadFile,
  getFullFilePath,
  installMdsFile,
} from "../../lib";

async function downloadAndInstallMDSFile(url: string, trust: 'write' | 'read') {
  const downloadedFile = await downloadFile(url);
  const downloadPath = await copyFileToWeb(downloadedFile.download.location);
  const fullPath = await getFullFilePath(downloadPath.file);
  await installMdsFile(fullPath.getpath.path, trust);
}

export default downloadAndInstallMDSFile;
