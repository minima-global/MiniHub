import { useContext } from 'react';
import { appContext } from '../../AppContext';

const MaximaProfile = () => {
  const { maximaIcon, maximaName } = useContext(appContext);

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
        <div className="relative">
          <img className={`avatar rounded-full`} src={decodeURIComponent(maximaIcon)} alt="user-avatar" />
        </div>
      );
    }

    const regexp = /[\p{Extended_Pictographic}\u{1F3FB}-\u{1F3FF}\u{1F9B0}-\u{1F9B3}]/gu;
    const nameEmojiMatches = maximaName.match(regexp);

    if (nameEmojiMatches && nameEmojiMatches.length > 0) {
      return nameEmojiMatches[0];
    }
    return maximaName.charAt(0);
  };


  return (
    <div
      onClick={(e) => {
        e.stopPropagation(); // Prevent event bubbling
        // Invoke the custom function to open the link
        (window as any).MDS.dapplink('MaxContacts', function (msg: any) {
          // Open the link in a new tab
          window.open(`${(window as any).MDS.filehost}${msg.uid}/index.html?uid=${msg.sessionid}#/profile`, '_blank');
        });
      }}
      className="grid grid-cols-[36px_1fr] w-max cursor-pointer"
    >
      <div className=" bg-white h-[36px] rounded-full !text-black text-xs flex items-center justify-center uppercase">
        {renderIcon()}
      </div>
     <input readOnly className="cursor-pointer font-bold text-white focus:outline-none bg-transparent truncate ml-2" value={maximaName} />
    </div>
  );
};

export default MaximaProfile;
