import { useContext, useEffect, useState } from 'react';
import { appContext } from '../../AppContext';
import CopyIcon from '../UI/Icons/CopyIcon';
import copyToClipboard from '../../utilities/copyToClipboard';
import CopySuccessIcon from '../UI/Icons/CopySuccessIcon';

const MaximaProfile = () => {
  const [copied, setCopied] = useState(false);
  const [address, setAddress] = useState<null | string>(null);
  const { maximaIcon, maximaName, loaded } = useContext(appContext);

  const copyAddress = () => {
    setCopied(true);
    copyToClipboard(address);

    setTimeout(() => setCopied(false), 2500);
  };

  useEffect(() => {
    if (loaded) {
      MDS.cmd('getaddress', (resp) => {
        setAddress(resp.response.miniaddress);
      });
    }
  }, [loaded]);
  /**
   * Method to extract emoji from name and display it as the name/nickname first letter
   * since emojis are composed of more than one character
   */
  const renderIcon = () => {
    const dataImageBase64Regex =
      /^data:image\/(?:png|jpeg|gif|bmp|webp|svg\+xml);base64,(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
    const isBase64 = maximaIcon ? dataImageBase64Regex.test(decodeURIComponent(maximaIcon)) : false;

    if (isBase64) {
      return (
        <div className="aspect-square w-8 h-8 rounded-full overflow-hidden">
          <img className="object-cover w-full h-full" src={decodeURIComponent(maximaIcon)} alt="user-avatar" />
        </div>
      );
    }

    const regexp = /[\p{Extended_Pictographic}\u{1F3FB}-\u{1F3FF}\u{1F9B0}-\u{1F9B3}]/gu;
    const nameEmojiMatches = maximaName.match(regexp);

    if (nameEmojiMatches && nameEmojiMatches.length > 0) {
      return nameEmojiMatches[0];
    }
    return (
      <div className="aspect-square relative w-8 h-8 bg-neutral-200 rounded-full text-black flex justify-center items-center font-bold uppercase">
        {maximaName.charAt(0)}
      </div>
    );
  };

  return (
    <div
      id="maxima-profile"
      onClick={(e) => {
        e.stopPropagation(); // Prevent event bubbling
        // Invoke the custom function to open the link
        (window as any).MDS.dapplink('MaxContacts', function (msg: any) {
          // Open the link in a new tab
          window.open(`${(window as any).MDS.filehost}${msg.uid}/index.html?uid=${msg.sessionid}#/profile`, '_blank');
        });
      }}
      className="flex grow gap-1 w-full cursor-pointer"
    >
      <div className="my-auto">{renderIcon()}</div>
      <div className="grow flex w-full">
        <div className="flex flex-col w-full">
          <div className="pl-2 text-sm truncate max-w-max">{maximaName}</div>
          {!address && <div className="pl-2 text-xs text-neutral-300">Mx</div>}
          <div>
            {address && (
              <div onClick={(e) => e.stopPropagation()} className="grow w-full flex gap-1 pr-5 lg:pr-10">
                {!copied && (
                  <input
                    readOnly
                    value={address}
                    className={`max-w-[64px] lg:max-w-[240px] grow text-xs text-neutral-300 cursor-pointer font-bold focus:outline-none bg-transparent truncate ml-2`}
                  />
                )}
                {copied && <p className={`text-xs text-teal-300 cursor-pointer font-bold truncate ml-2`}>Copied!</p>}

                <span className={`${copied && 'text-teal-300'}`} onClick={copyAddress}>
                  {!copied && <CopyIcon fill="currentColor" size={14} />}
                  {copied && <CopySuccessIcon fill="currentColor" size={14} />}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaximaProfile;
