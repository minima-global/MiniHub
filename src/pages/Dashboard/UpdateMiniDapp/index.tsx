import * as React from 'react';
import { useTransition, animated } from '@react-spring/web';
import { modalAnimation } from '../../../animations';
import { useContext, useEffect, useState } from 'react';
import { blobToArrayBuffer, bufferToHex } from '../../../utilities';
import { deleteFile, getPath, saveFile, update } from '../../../lib';
import { appContext } from '../../../AppContext';
import { useLocation, useNavigate } from 'react-router-dom';
import checkIfDappMatchesZip from '../../../checkIfDappMatchesZip';

export function Update() {
  const location = useLocation();
  const navigate = useNavigate();
  const { refreshAppList, showUpdateApp, setShowUpdateApp } = useContext(appContext);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [installed, setInstalled] = useState<any | null>(null);
  const transition: any = useTransition(!!showUpdateApp, modalAnimation as any);
  const [confirmWarning, setConfirmWarning] = useState<boolean>(false);

  useEffect(() => {
    if (location.pathname === '/') {
      setFile(null);
      setName(null);
      setError(false);
      setInstalled(null);
    }
  }, [location]);

  useEffect(() => {
    if (showUpdateApp) {
      setConfirmWarning(false);
    }
  }, [showUpdateApp]);

  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const files = evt.target.files;

    if (files && (files[0] as File)) {
      setName(files[0].name);
      setFile(files[0]);
      setConfirmWarning(false);
    }
  };

  const handleOnSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    if (!file) {
      setError(true);
      return;
    }

    if (!(await checkIfDappMatchesZip(file, showUpdateApp?.conf?.name))) {
      if (!confirmWarning) {
        setConfirmWarning(true);
        return;
      }
    }

    if (file) {
      try {
        setError(false);
        setIsLoading(true);

        // save the file to folder
        const fileName = file.name.split(' ').join('_');
        const arrayBuffer = await blobToArrayBuffer(file);
        const hex = bufferToHex(arrayBuffer);
        const savedFile = await saveFile('/' + fileName, hex);

        // get the file path for install
        const filePath = await getPath(savedFile.canonical);

        // install with full file path
        const installedInfo = await update(showUpdateApp.uid, filePath);

        // delete file after we are done
        await deleteFile(savedFile.canonical);

        // artificial delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        await refreshAppList();

        setIsLoading(false);
        setInstalled(installedInfo);
      } catch {
        setIsLoading(false);
        setError(true);
      }
    }
  };

  const onClose = () => {
    setShowUpdateApp(false);
    navigate(-1);

    setTimeout(() => {
      setFile(null);
      setName(null);
      setError(false);
      setInstalled(null);
    }, 250);
  };

  return (
    <div>
      {transition((style, display) => (
        <div>
          {display && (
            <div className="mx-auto absolute w-full h-full z-[100] flex items-center justify-center text-black">
              {display && (
                <div className="relative z-[100] w-[90%] md:w-full max-w-sm">
                  <animated.div
                    style={style}
                    className="modal text-white core-black-contrast-2 box-shadow-lg rounded p-6 md:p-8 mx-auto relative overflow-hidden"
                  >
                    <div>
                      <div
                        className={`absolute z-20 top-0 left-0 w-full h-full core-black-contrast-2 text-white ${isLoading ? 'flex items-center justify-center' : 'hidden'
                          }`}
                      >
                        <div className="spinner" />
                      </div>
                      <div>
                        {!installed && !error && (
                          <form onSubmit={handleOnSubmit} className="text-center">
                            {confirmWarning && (
                              <div>
                                <h1 className="text-2xl text-center mb-6">Warning</h1>
                                <div className="space-y-4 text-center line-height text-[15px] mt-3 mb-8 line-height">
                                  <p>
                                    The MiniDapp you are installing does not match the name of the existing one. Updating may result in data loss.
                                  </p>
                                  <p className="font-bold">
                                    Please confirm to continue, or cancel the update.
                                  </p>
                                </div>
                              </div>
                            )}
                            {!confirmWarning && (
                              <div>
                                <h1 className="text-2xl text-center mb-6">Update {showUpdateApp?.conf?.name}</h1>
                                <p className="text-center mb-10 line-height">Please select the new minidapp (.mds.zip) file.</p>
                                <div className="mt-3 mb-10">
                                  <div className="relative">
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
                                </div>
                              </div>
                            )}
                            <button
                              type="submit"
                              disabled={!name}
                              className="w-full px-4 py-3.5 rounded font-bold text-black core-grey-5 mb-4 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                              {confirmWarning ? 'Confirm' : 'Update'}
                            </button>
                            <button
                              type="button"
                              onClick={onClose}
                              className="w-full px-4 py-3.5 rounded font-bold text-white core-black-contrast-3 mb-1"
                            >
                              Cancel
                            </button>
                          </form>
                        )}
                        {error && !installed && (
                          <div className="text-center">
                            <h1 className="text-2xl font-bold mb-6">Something wrong occurred</h1>
                            <p className="mb-7">There was an issue updating this app, please try again later</p>
                            <button
                              type="button"
                              onClick={onClose}
                              className="w-full px-4 py-3.5 rounded core-grey-5 font-bold core-black-contrast-3 mb-1"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                        {installed && (
                          <div className="text-center">
                            <h1 className="mt-1 text-lg text-center mb-3">MiniDapp updated</h1>
                            <p className="text-2xl text-center mb-12 line-height capitalize">{installed.conf.name}</p>
                            <div
                              className="icon icon--big mb-12 mx-auto"
                              style={{
                                backgroundImage: `url(${(window as any).MDS.filehost}/${installed.uid}/${installed.conf.icon
                                  }?q=${Date.now()})`,
                              }}
                            />
                            <button
                              onClick={onClose}
                              type="submit"
                              className="w-full px-4 py-3.5 rounded core-grey-5 font-bold core-black-contrast-3 mb-1"
                            >
                              Close
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </animated.div>
                </div>
              )}
              <div className="absolute z-40 bg-frosted top-0 left-0 w-full h-full"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Update;
