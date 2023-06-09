import { useContext, useState } from 'react';
import Preview from './Preview';
import { appContext } from '../../../../AppContext';
import SlideScreen from '../../../../components/UI/SlideScreen';

const bgOptions = ['thumbnail-minima', 'thumbnail-feather', 'thumbnail-liquid'];
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

export function Wallpaper({ display, dismiss }: WallpaperProps) {
  const { activeWallpaper } = useContext(appContext);
  const [preview, setPreview] = useState<string | false>(false);

  return (
    <SlideScreen display={display}>
      <div className="flex flex-col h-fit bg-black">
        <div className="pt-20 px-4 lg:px-0 w-full pb-4 flex flex-col">
          <div className="max-w-xl mx-auto w-full">
            <div onClick={dismiss} className="sticky top-0 cursor-pointer flex items-center">
              <svg
                className="mt-0.5 mr-4"
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.90017 13.1693L0.730957 7.00009L6.90017 0.830872L7.79631 1.72701L2.52324 7.00009L7.79631 12.2732L6.90017 13.1693Z"
                  fill="#F9F9FA"
                />
              </svg>
              Settings
            </div>
            <div className="mt-6 text-2xl mb-8">Wallpaper</div>
            <div className="flex flex-col gap-5">
              <p className="text-core-grey-20">Set the background for your Minima home screen.</p>
              <div className="core-black-contrast-2 p-4 rounded">
                <div className="mb-4">Images</div>
                <div className="grid grid-cols-12 gap-3">
                  {bgOptions.map((option) => (
                    <div key={option} className="col-span-4">
                      <div
                        onClick={() => setPreview(option)}
                        className={`${
                          option === activeWallpaper ? 'border-2 border-white' : ''
                        } cursor-pointer rounded bg-${option} bg-cover bg-center w-full h-[168px]`}
                      />
                    </div>
                  ))}
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
                          option === activeWallpaper ? 'border-2 border-white' : ''
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
                          option === activeWallpaper ? 'border-2 border-white' : ''
                        } cursor-pointer rounded bg-${option} bg-cover bg-center w-full h-[168px]`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Preview display={!!preview} data={preview} dismiss={() => setPreview(false)} />
    </SlideScreen>
  );
}

export default Wallpaper;
