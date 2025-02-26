import { useContext, useState } from 'react';
import { appContext } from '../../../../AppContext';
import SlideScreen from '../../../../components/UI/SlideScreen';
import Toggle from '../../../../components/UI/Toggle';
import Preview from './Preview';
import { set, get } from '../../../../lib';
import BackButton from '../_BackButton';

const gradientOptions = [
  'gradient-grey',
  'gradient-green',
  'gradient-blue',
  'gradient-purple',
  'gradient-red',
  'gradient-orange',
];
const solidOptions = ['solid-black', 'solid-green', 'solid-blue', 'solid-purple', 'solid-red', 'solid-orange'];

type WallpaperProps = {
  display: boolean;
  dismiss: () => void;
};

export function Folders({ display, dismiss }: WallpaperProps) {
  const { activeFolderTheme, folderStatus, toggleFolderStatus, setActiveFolderTheme, folderAnimation, toggleFolderAnimation } = useContext(appContext);
  const [preview, setPreview] = useState<string | false>(false);

  const setDefaultBackground = () => {
    set('FOLDER_BACKGROUND', 'bg-none');
    setActiveFolderTheme('');

    get('FOLDER_BACKGROUND').then(async (response) => {
      const activeWallpaper = response as string;

      if (activeWallpaper) {
        setActiveFolderTheme(activeWallpaper);
      }
    });
  };

  return (
    <SlideScreen display={display}>
      <BackButton dismiss={dismiss} />
      <div className={`flex flex-col ${folderStatus ? "h-fit" : 'h-full'} bg-black`}>
        <div className="pt-20 px-4 lg:px-0 w-full pb-4 flex flex-col">
          <div className="max-w-xl mx-auto w-full">
            <div className="mt-6 text-2xl mb-8">Folder Settings</div>

            <div className="mb-5">
              <div className="relative core-black-contrast-2 py-4 px-5 rounded cursor-pointer">
                Folder layout
                <div className="absolute right-0 top-0 h-full px-5 flex items-center">
                  <Toggle checkedStatus={folderStatus} onChange={toggleFolderStatus} />
                </div>
              </div>
            </div>
            
            <div className="mb-5">
              <div className="relative core-black-contrast-2 py-4 px-5 rounded cursor-pointer">
                Folder animation
                <div className="absolute right-0 top-0 h-full px-5 flex items-center">
                  <Toggle checkedStatus={folderAnimation} onChange={toggleFolderAnimation} />
                </div>
              </div>
            </div>

            {folderStatus && (
              <div className="flex flex-col gap-5">
                <p className="text-core-grey-20">Set the background for your folders.</p>

                <div className="core-black-contrast-2 p-4 rounded">
                  <div className="mb-4">Default</div>
                  <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-4">
                      <div
                        onClick={() => {
                          setDefaultBackground();
                        }}
                        className={`flex items-center justify-center text-xs opacity-50 ${
                          'bg-none' === activeFolderTheme ? 'border-2 border-white' : ''
                        } cursor-pointer rounded bg-white bg-opacity-10 bg-cover bg-center w-full h-[168px]`}
                      >
                        None
                      </div>
                    </div>
                  </div>
                </div>

                <div className="core-black-contrast-2 p-4 rounded">
                  <div className="mb-4">Gradient</div>
                  <div className="grid grid-cols-12 gap-3">
                    {gradientOptions.map((option) => (
                      <div key={option} className="col-span-4">
                        <div
                          onClick={() => setPreview(option)}
                          className={`${
                            option === activeFolderTheme ? 'border-2 border-white' : ''
                          } cursor-pointer rounded bg-${option} bg-cover bg-center w-full h-[168px]`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="core-black-contrast-2 p-4 rounded">
                  <div className="mb-4">Solids</div>
                  <div className="grid grid-cols-12 gap-3">
                    {solidOptions.map((option) => (
                      <div key={option} className="col-span-4">
                        <div
                          onClick={() => setPreview(option)}
                          className={`${
                            option === activeFolderTheme ? 'border-2 border-white' : ''
                          } cursor-pointer rounded bg-${option} bg-cover bg-center w-full h-[168px]`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Preview display={!!preview} data={preview} dismiss={() => setPreview(false)} />
    </SlideScreen>
  );
}

export default Folders;
