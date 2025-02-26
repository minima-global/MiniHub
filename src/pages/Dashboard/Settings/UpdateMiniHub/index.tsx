import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import Button from '../../../../components/UI/Button';
import SlideScreen from '../../../../components/UI/SlideScreen';
import { getPath, mds, saveFile, update } from '../../../../lib';
import { blobToArrayBuffer, bufferToHex } from '../../../../utilities';
import getAppUID from '../../../../utilities/getAppUid';
import Modal from '../../../../components/UI/Modal';
import { appContext } from '../../../../AppContext';
import axios from 'axios';
import BackButton from '../_BackButton';

type UpdateMiniHubProps = {
  display: boolean;
  dismiss: () => void;
};

export function UpdateMiniHub({ display, dismiss }: UpdateMiniHubProps) {
  const { setHasUpdated } = useContext(appContext);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shutdown, setShutdown] = useState(false);
  const [version, setVersion] = useState<string | null>(null);

  useEffect(() => {
    axios.get('./info.json').then((res) => {
      setVersion(res.data.version);
    });
  }, []);

  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const files = evt.target.files;

    if (files && (files[0] as File)) {
      setName(files[0].name);
      setFile(files[0]);
    }
  };

  const handleOnSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    if (file) {
      try {
        setError(false);
        setIsLoading(true);

        // save the file to folder
        const fileName = file.name;
        const arrayBuffer = await blobToArrayBuffer(file);
        const hex = bufferToHex(arrayBuffer);
        const savedFile = await saveFile('/' + fileName, hex);

        // get the file path for install
        const filePath = await getPath(savedFile.canonical);

        // get app uid from url
        let appUid = getAppUID();

        // if local server, we need to retrieve the uid from mds command
        if (appUid === 'unknown-app-uid') {
          const response = await mds();
          const hub = response.minidapps.find(i => i.conf.name === "MiniHUB");

          // only set it if hub minidapp was found
          if (hub) {
            appUid = hub.uid;
          }
        }

        // install with full file path
        await update(appUid, filePath);

        // ensure MDS fail message does not appear
        setHasUpdated(true);

        /**
         * If user updates MiniHUB in internal browser, we want to close
         * the window.
         */
        if (window.navigator.userAgent.includes('Minima Browser')) {
          setShutdown(true);

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return Android.closeWindow();
        }

        setSuccess(true);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const goToLoginPage = () => {
    // go to login page
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.location.assign(MDS.filehost);
  }

  return (
    <SlideScreen display={display}>
      <div className="flex flex-col h-full bg-black">
        <Modal display={shutdown} frosted>
          <div>
            <div className="text-center">
              <h1 className="text-xl mb-6">Your MiniHUB has<br /> been successfully updated</h1>
              <p className="mb-2">Please restart the Minima app.</p>
            </div>
          </div>
        </Modal>
        <Modal display={success} frosted>
          <div>
            <div className="text-center">
              <h1 className="text-xl mb-8">Your MiniHUB has<br /> been successfully updated</h1>
              <Button onClick={goToLoginPage}>Go to login page</Button>
            </div>
          </div>
        </Modal>
        <BackButton dismiss={dismiss} />
        <div className="p-4 pt-16 flex flex-col h-full max-w-xl mx-auto w-full">
          <div className="pt-4 mt-8" />
          <h1 className="text-2xl mb-4">Update MiniHub</h1>
          <div className="text-sm mb-8">Current version: <strong>{version}</strong></div>
          <form onSubmit={handleOnSubmit} className="text-left">
            <p className="mb-10 line-height">Please select your latest MiniHub zip file.</p>
            <div className="relative mt-3 mb-10">
              <label className="file rounded core-grey-20 w-full">
                <input type="file" id="file" aria-label="Choose file" onChange={handleOnChange} />
                <span className="file-custom"></span>
                <span className="file-label truncate">{name || 'Choose file...'}</span>
              </label>
              {name && (
                <div className="cursor-pointer absolute flex h-full justify-end items-center top-0 right-0 px-4">
                  <svg
                    width="16"
                    height="18"
                    viewBox="0 0 16 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={(evt) => {
                      evt.stopPropagation();
                      setName(null);
                    }}
                  >
                    <path
                      d="M5.39997 13.1536L7.99997 10.5536L10.6 13.1536L11.6538 12.0998L9.0538 9.49981L11.6538 6.89981L10.6 5.84598L7.99997 8.44598L5.39997 5.84598L4.34615 6.89981L6.94615 9.49981L4.34615 12.0998L5.39997 13.1536ZM3.3077 17.4998C2.80257 17.4998 2.375 17.3248 2.025 16.9748C1.675 16.6248 1.5 16.1972 1.5 15.6921V2.99981H0.5V1.49983H4.99997V0.615234H11V1.49983H15.5V2.99981H14.5V15.6921C14.5 16.1972 14.325 16.6248 13.975 16.9748C13.625 17.3248 13.1974 17.4998 12.6922 17.4998H3.3077ZM13 2.99981H2.99997V15.6921C2.99997 15.769 3.03203 15.8395 3.09613 15.9037C3.16024 15.9678 3.23077 15.9998 3.3077 15.9998H12.6922C12.7692 15.9998 12.8397 15.9678 12.9038 15.9037C12.9679 15.8395 13 15.769 13 15.6921V2.99981Z"
                      fill="#91919D"
                    />
                  </svg>
                </div>
              )}
            </div>
            {error && <p className="-mt-5 mb-10 text-red-500">There was an issue updating this app, please try again later</p>}
            <Button type="submit" disabled={!name} variant="secondary" loading={isLoading}>
              Update
            </Button>
          </form>
        </div>
      </div>
    </SlideScreen>
  );
}

export default UpdateMiniHub;
