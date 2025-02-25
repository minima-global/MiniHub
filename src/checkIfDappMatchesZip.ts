import JSZip from 'jszip';

export async function checkIfDappMatchesZip(file: File, dappName: string) {
    const zip = new JSZip();
    const content = await zip.loadAsync(file);

    const dappJson = await content.file('dapp.conf')?.async('string');

    if (!dappJson) {
        return true;
    }

    const dappJsonObject = JSON.parse(dappJson);
    return dappJsonObject.name === dappName;
}

export default checkIfDappMatchesZip;
