export function getRandomPeers(allPeers: string[], n: number) {
    const shuffled = allPeers.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}

export default getRandomPeers;