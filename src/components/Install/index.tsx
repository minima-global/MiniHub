import * as React from "react";
import { useTransition, animated } from "@react-spring/web";
import { modalAnimation } from "../../animations";
import { useState } from "react";
import { blobToArrayBuffer, bufferToHex } from "../../utilities/utilities";
import { deleteFile, getHost, getPath, install, saveFile } from "../../lib";

type Props = { display: boolean; dismiss: () => void };

export function Install({ display, dismiss }: Props) {
  // seems to be an issue somewhere with types
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [installed, setInstalled] = useState<any | null>(null);
  const transition: any = useTransition(display, modalAnimation as any);

  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const files = evt.target.files;

    if (files && files[0] as File) {
      setName(files[0].name);
      setFile(files[0]);
    }
  };

  const handleOnSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    if (file) {
      setIsLoading(true);

      // save the file to folder
      const fileName = file.name;
      const arrayBuffer = await blobToArrayBuffer(file);
      const hex = bufferToHex(arrayBuffer);
      const savedFile = await saveFile("/" + fileName, hex);

      // get the file path for install
      const filePath = await getPath(savedFile.canonical);

      // install with full file path
      const installedInfo = await install(filePath);

      // delete file after we are done
      await deleteFile(savedFile.canonical);

      setIsLoading(false);
      setInstalled(installedInfo);
    }
  };

  const onClose = () => {
    dismiss();
    setFile(null);
    setName(null);
    setInstalled(null);
  };

  return (
    <div>
      {transition((style, display) => (
        <div>
          {display && (
            <div className="mx-auto absolute w-full h-full z-10 flex items-center justify-center text-black">
              {display && (
                <div className="relative z-10 w-full max-w-md px-5">
                  <animated.div
                    style={style}
                    className="modal bg-white box-shadow-lg rounded-xl p-8 mx-auto relative overflow-hidden"
                  >
                    <div>
                      <div className={`absolute z-20 block top-0 left-0 w-full h-full bg-white ${isLoading ? 'flex items-center justify-center' : 'hidden'}`}>
                        <div className="spinner" />
                      </div>
                      <div>
                        {!installed && (
                          <form onSubmit={handleOnSubmit} className="text-center">
                            <h1 className="text-2xl font-bold mb-6">Install app</h1>
                            <label className="file mb-6 w-full">
                              <input
                                type="file"
                                id="file"
                                aria-label="Choose file"
                                onChange={handleOnChange}
                              />
                              <span className="file-custom"></span>
                              <span className="file-label">
                            {name || "Choose file..."}
                          </span>
                            </label>
                            <button
                              type="submit"
                              className="w-full px-4 py-3.5 rounded font-bold text-black bg-black text-white mb-4"
                            >
                              Install
                            </button>
                            <button
                              type="button"
                              onClick={onClose}
                              className="text-black border-b border-black mx-auto"
                            >
                              Cancel
                            </button>
                          </form>
                        )}
                        {installed && (
                          <div className="text-center">
                            <div
                              className="icon mb-7 mx-auto"
                              style={{ backgroundImage: `url(${getHost()}/${installed.uid}/${installed.conf.icon})` }}
                            />
                            <h1 className="text-2xl font-bold mb-8">You have installed {installed.conf.name}</h1>

                            <button
                              onClick={onClose}
                              type="submit"
                              className="w-full px-4 py-3.5 rounded font-bold text-black bg-black text-white mb-1"
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
              <div className="absolute bg-frosted top-0 left-0 w-full h-full"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Install;
