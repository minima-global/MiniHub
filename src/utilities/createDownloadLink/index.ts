export const createDownloadLink = (originalPath: string) => {

  const mdsfile = originalPath.split('/').pop();

  console.log('name of minidapp', mdsfile);
  console.log('original file path', originalPath);

  const newFilePath = `/my_downloads/${mdsfile}_minima_download_as_file_`;

  MDS.file.download(originalPath, (resp) => {
    console.log(resp);
  });

  return;

  return new Promise((resolve, reject) => {
    (window as any).MDS.file.copytoweb("/minidapp/"+mdsfile, newFilePath, function (resp) {
      console.log(resp);
      resolve(true);
      if (!resp.status) reject("Unable to locate file path");

      const url = `my_downloads/${mdsfile}` + '_minima_download_as_file_';
      // create an a
      const temporaryLink = document.createElement('a');
      temporaryLink.style.display = 'none';
      temporaryLink.target = '_blank';
      temporaryLink.href = url;
      temporaryLink.click();
      (window as any).MDS.file.deletefromweb(url, function () {
        temporaryLink.remove();
      });
    });

  });

};

export default createDownloadLink;