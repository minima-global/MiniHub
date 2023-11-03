export function pickTextColorBasedOnBgColorSimple(r,g,b) {
  return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ? '#000' : '#FFF';
}

export default pickTextColorBasedOnBgColorSimple;

