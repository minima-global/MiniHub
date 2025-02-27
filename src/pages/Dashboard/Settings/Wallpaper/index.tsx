import { useContext, useState } from 'react';
import Preview from './Preview';
import { appContext } from '../../../../AppContext';
import SlideScreen from '../../../../components/UI/SlideScreen';
import Button from '../../../../components/UI/Button';
import * as React from 'react';
import { copyToWeb, deleteFile, moveFile, set, upload } from '../../../../lib';
import BackButton from '../_BackButton';

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
  const { activeWallpaper, setActiveWallpaper, customWallpaper } = useContext(appContext);
  const [preview, setPreview] = useState<string | false>(false);
  const [name, setName] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const files = evt.target.files;

    if (files && (files[0] as File)) {
      setName(files[0].name);
      setFile(files[0]);
    }
  };

  const setCustomWallpaper = async () => {
    /**
     * Upload file, copy file to web, set BACKGROUND key to custom
     */
    if (file) {
      await upload(file);

      const ext = /(?:\.([^.]+))?$/g.exec(name)![1];
      const fileName = 'custom_wallpaper.' + ext;

      // reset wallpaper
      document.body.style.backgroundImage = '';

      await deleteFile(`/${fileName}`);

      // move file to root with new name
      await moveFile(`/fileupload/${file.name}`, `/${fileName}`);

      // copy to web so that we can use it as a web file
      await copyToWeb(`/${fileName}`, `/my_wallpapers/${fileName}`);

      // store wallpaper extension in background key / value item
      await set('BACKGROUND', 'custom-' + fileName);

      const now = new Date();
      document.body.style.backgroundImage = `url('./my_wallpapers/${fileName}?t=${now.getTime()}')`;

      const el = document.getElementById('wallpaper-preview');

      if (el) {
        el.style.backgroundImage = `url('./my_wallpapers/${fileName}?t=${now.getTime()}')`;
      }

      setFile(null);
      setName('');

      // set active wallpaper to trigger update
      setActiveWallpaper('custom-' + fileName);
    }
  };

  const showCustomWallpaperBlock = activeWallpaper && activeWallpaper.includes('custom-');

  return (
    <SlideScreen display={display}>
      <div className="flex flex-col h-fit bg-black">
        <div className="pt-16 px-4 lg:px-0 w-full pb-4 flex flex-col">
          <div className="max-w-xl mx-auto w-full">
            <BackButton dismiss={dismiss} />
            <div className="mt-6 text-2xl mb-8">Wallpaper</div>
            <div className="flex flex-col gap-5">
              <p className="text-core-grey-20">Set the background for your Minima home screen.</p>

              <div className="block mt-2 mb-4">
                <div className="bg-contrast1 p-4 rounded">
                  <div className="text-lg -mt-0.5 mb-4">Custom wallpaper</div>
                  <div className={`mb-4 ${showCustomWallpaperBlock ? 'block' : 'hidden'}`}>
                    <div className="mb-4">You have selected a custom wallpaper</div>
                    <div
                      id="wallpaper-preview"
                      className="border-2 border-white cursor-pointer rounded bg-cover bg-center max-w-[200px] h-[168px]"
                      style={{ backgroundImage: `url("./my_wallpapers/${customWallpaper}")` }}
                    />
                  </div>
                  <div className="mb-6 text-core-grey-80">Select a custom wallpaper</div>
                  <label className="file rounded core-grey-20 w-full mb-5">
                    <input
                      type="file"
                      id="file"
                      onChange={handleOnChange}
                      accept="image/png,image/svg+xml,image/jpeg"
                      aria-label="Choose an image (.png, .jpg, .svg)"
                    />
                    <span className="file-custom"></span>
                    <span className="file-label file-label--normal-pad truncate">{name || 'Choose an image (.png, .jpg, .svg)'}</span>
                  </label>
                  <Button onClick={setCustomWallpaper} disabled={file === null} variant="secondary">
                    Set wallpaper
                  </Button>
                </div>
              </div>
              <div className="bg-contrast1 p-4 rounded mb-5">
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
              <div className="bg-contrast1 p-4 rounded">
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
              <div className="bg-contrast1 p-4 rounded">
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
