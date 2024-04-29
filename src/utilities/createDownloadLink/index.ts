export const createDownloadLink = (mdsfile: string) => {
  const newFilePath = `/my_downloads/${mdsfile}_minima_download_as_file_`;

  (window as any).MDS.file.copytoweb(mdsfile, newFilePath, function () {
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
};

export default createDownloadLink;
