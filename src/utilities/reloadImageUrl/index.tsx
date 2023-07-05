async function reloadImg(name, url) {
  await fetch(url, { cache: 'reload', mode: 'no-cors' });
  const els: NodeListOf<HTMLImageElement> = document.body.querySelectorAll(`#app_icon_${name.toLowerCase()}`);
  els.forEach((img) => {
    img.src = url;
  });
}

export default reloadImg;
