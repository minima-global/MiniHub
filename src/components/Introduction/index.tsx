import { useContext, useState } from 'react';
import { modalAnimation } from '../../animations';
import { appContext } from '../../AppContext';
import { useTransition, animated } from '@react-spring/web';

const Introduction = () => {
  const [step, setStep] = useState(0);
  const {
    setShowIntroduction,
    showIntroduction: display,
    setShowOnboard,
    getMaximaDetails,
    checkPeers,
  } = useContext(appContext);

  const { maximaName: name, setMaximaName: setName } = useContext(appContext);

  const randomNameGenerator = (): Promise<string> => {
    return new Promise((resolve) => {
      resolve(
        `${nameList[Math.floor(Math.random() * nameList.length)]} ${
          nameList[Math.floor(Math.random() * nameList.length)]
        } ${nameList[Math.floor(Math.random() * nameList.length)]}`
      );
    });
  };

  const handleName = (evt: any) => {
    setName(evt.target.value);
  };

  const handleMaxima = async () => {
    await randomNameGenerator().then((_randomName) => {
      if (!name.length) setName(_randomName);
      (window as any).MDS.cmd(`maxima action:setname name:"${!name.length ? _randomName : name}"`, () => {
        getMaximaDetails();
      });
    });
  };

  const transition: any = useTransition(display, modalAnimation as any);

  return (
    <div>
      {transition((style, display) => (
        <div>
          {display && (
            <div className="bg-heroBlack overflow-hidden absolute left-0 right-0 bottom-0 top-0 z-[1000]">
              <animated.div style={style}>
                {step === 0 && (
                  <div
                    onClick={() => setStep((prev) => prev + 1)}
                    className="grid grid-cols-1 grid-rows-[1fr_1fr] h-screen w-screen"
                  >
                    <div className="self-end justify-self-center">
                      <h1 className="text-2xl font-semibold text-center animate-fadeIn">
                        Hello, nice to <br /> meet you
                      </h1>
                    </div>
                    <div className="self-end justify-self-center mb-16">
                      <p className="text-sm text-center animate-pulse">Click anywhere to continue</p>
                    </div>
                  </div>
                )}
                {step === 1 && (
                  <div
                    onClick={() => {
                      setStep((prev) => prev + 1);

                      handleMaxima();
                    }}
                    className="grid grid-cols-1 grid-rows-[1fr_1fr] h-screen w-screen"
                  >
                    <div className="self-end justify-self-center">
                      <h1 className="text-2xl font-semibold text-center animate-fadeIn">
                        What shall we <br /> call you?
                      </h1>
                      <input
                        onClick={(e: any) => e.stopPropagation()}
                        className="focus:outline-offset-2 text-center outline-blue-600 px-4 py-4 mt-4 text-black text-sm md:text-xl rounded-lg"
                        placeholder="Name"
                        value={name}
                        onChange={handleName}
                        id="name"
                        name="name"
                      />
                    </div>
                    <div className="self-end justify-self-center mb-16">
                      <p className="text-sm text-center animate-pulse">Click anywhere to continue</p>
                    </div>
                  </div>
                )}
                {step === 2 && (
                  <div
                    onClick={() => setStep((prev) => prev + 1)}
                    className="grid grid-cols-1 grid-rows-[1fr_1fr] h-screen w-screen"
                  >
                    <div className="self-end justify-self-center">
                      <h1 className="text-2xl font-semibold text-center animate-fadeIn">
                        Welcome to Minima, <br /> <span className="text-blue-500">{name}</span>
                      </h1>
                    </div>
                    <div className="self-end justify-self-center mb-16">
                      <p className="text-sm text-center  animate-pulse">Click anywhere to continue</p>
                    </div>
                  </div>
                )}
                {step === 3 && (
                  <div className="grid grid-cols-1 grid-rows-[1fr] h-screen w-screen">
                    <div className="self-center justify-self-center">
                      <h1 className="text-2xl font-semibold text-center animate-fadeIn">
                        Before we begin,
                        <br /> would you like a quick tour?
                      </h1>
                      <div className="flex flex-col mt-8 gap-4 items-center">
                        <button
                          onClick={() => {
                            setShowOnboard(true);
                            setShowIntroduction(false);
                          }}
                          className="bg-white font-bold text-black rounded-lg p-4 w-full hover:bg-opacity-80"
                        >
                          Let's go
                        </button>
                        <button
                          onClick={() => {
                            setShowIntroduction(false);
                            checkPeers();
                          }}
                          className="border-b pb-1 text-sm text-white max-w-max border-stone-200"
                        >
                          Skip
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </animated.div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Introduction;

const nameList = [
  'Time',
  'Past',
  'Future',
  'Dev',
  'Fly',
  'Flying',
  'Soar',
  'Soaring',
  'Power',
  'Falling',
  'Fall',
  'Jump',
  'Cliff',
  'Mountain',
  'Rend',
  'Red',
  'Blue',
  'Green',
  'Yellow',
  'Gold',
  'Demon',
  'Demonic',
  'Panda',
  'Cat',
  'Kitty',
  'Kitten',
  'Zero',
  'Memory',
  'Trooper',
  'XX',
  'Bandit',
  'Fear',
  'Light',
  'Glow',
  'Tread',
  'Deep',
  'Deeper',
  'Deepest',
  'Mine',
  'Your',
  'Worst',
  'Enemy',
  'Hostile',
  'Force',
  'Video',
  'Game',
  'Donkey',
  'Mule',
  'Colt',
  'Cult',
  'Cultist',
  'Magnum',
  'Gun',
  'Assault',
  'Recon',
  'Trap',
  'Trapper',
  'Redeem',
  'Code',
  'Script',
  'Writer',
  'Near',
  'Close',
  'Open',
  'Cube',
  'Circle',
  'Geo',
  'Genome',
  'Germ',
  'Spaz',
  'Shot',
  'Echo',
  'Beta',
  'Alpha',
  'Gamma',
  'Omega',
  'Seal',
  'Squid',
  'Money',
  'Cash',
  'Lord',
  'King',
  'Duke',
  'Rest',
  'Fire',
  'Flame',
  'Morrow',
  'Break',
  'Breaker',
  'Numb',
  'Ice',
  'Cold',
  'Rotten',
  'Sick',
  'Sickly',
  'Janitor',
  'Camel',
  'Rooster',
  'Sand',
  'Desert',
  'Dessert',
  'Hurdle',
  'Racer',
  'Eraser',
  'Erase',
  'Big',
  'Small',
  'Short',
  'Tall',
  'Sith',
  'Bounty',
  'Hunter',
  'Cracked',
  'Broken',
  'Sad',
  'Happy',
  'Joy',
  'Joyful',
  'Crimson',
  'Destiny',
  'Deceit',
  'Lies',
  'Lie',
  'Honest',
  'Destined',
  'Bloxxer',
  'Hawk',
  'Eagle',
  'Hawker',
  'Walker',
  'Zombie',
  'Sarge',
  'Capt',
  'Captain',
  'Punch',
  'One',
  'Two',
  'Uno',
  'Slice',
  'Slash',
  'Melt',
  'Melted',
  'Melting',
  'Fell',
  'Wolf',
  'Hound',
  'Legacy',
  'Sharp',
  'Dead',
  'Mew',
  'Chuckle',
  'Bubba',
  'Bubble',
  'Sandwich',
  'Smasher',
  'Extreme',
  'Multi',
  'Universe',
  'Ultimate',
  'Death',
  'Ready',
  'Monkey',
  'Elevator',
  'Wrench',
  'Grease',
  'Head',
  'Theme',
  'Grand',
  'Cool',
  'Kid',
  'Boy',
  'Girl',
  'Vortex',
  'Paradox',
  'Minimalist',
  'MiniMan',
];
