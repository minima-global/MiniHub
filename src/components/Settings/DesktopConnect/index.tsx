import * as React from 'react';
import Button from '../../UI/Button';
import SlideScreen from '../../UI/SlideScreen';
import Block from '../../Block';

export function DesktopConnect({ display, dismiss }: any) {
  return (
    <SlideScreen display={display}>
      <div className="flex flex-col h-full mt-14 bg-black">
        <div className="pt-10 px-6 pb-6 flex flex-col h-full">
          <h1 onClick={dismiss} className="cursor-pointer text-2xl mb-4 flex items-center">
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
          </h1>
          <div className="mt-6 text-2xl mb-8">Desktop connect</div>
          <div className="flex flex-col gap-5">
            <div className="core-black-contrast p-6 rounded">
              <div>
                <div className="mb-3"> What is desktop connect?</div>
                <p className="text-core-grey">
                  Lorem ipsum dolor sit amet consectetur. Non massa mauris ut ornare dolor amet. Donec accumsan volutpat
                  scelerisque aliquet pretium nam egestas proin.
                </p>
              </div>
            </div>
            <div>
              <Block title="URL" value="https://192.168.0.10.9003" copy />
            </div>
            <div>
              <p className="text-core-grey-80 text-sm">Here is a short description as to what happens when I reset my URL and why I would want to do it.</p>
            </div>
          </div>
        </div>
      </div>
    </SlideScreen>
  );
}

export default DesktopConnect;
