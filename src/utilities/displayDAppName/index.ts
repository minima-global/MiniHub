export function displayDAppName(name: string) {
  try {
    if (name.length > 11) {
      return name.slice(0, 11) + '..';
    } else {
      return name;
    }
  } catch {
    return name;
  }
}

export default displayDAppName;
