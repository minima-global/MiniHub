import { useState } from "react";
import bip39 from "../bip39";

const ConfirmWord = ({
  index,
  seedPhrase,
  setSeedPhrase,
  errorBag,
  setErrorBag,
  activeIndex,
  setActiveIndex
}: {
  index: number;
  seedPhrase: (string | undefined)[];
  setSeedPhrase: React.Dispatch<React.SetStateAction<(string | undefined)[]>>;
  errorBag: (boolean | undefined)[];
  setErrorBag: React.Dispatch<React.SetStateAction<(boolean | undefined)[]>>;
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
    const [_focus, setFocus] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const isDesktop = window.innerWidth > 768;

    const handleFocus = (e) => {
        e.persist();
        setFocus(true);
        setActiveIndex(index);
    };

    const handleOnChange = (evt: any) => {
        const value = evt.target.value.toUpperCase().trim();

        if (value.length > 2) {
            setSuggestions(bip39.filter((i) => i.startsWith(value)).slice(0, 5));
        } else {
            setSuggestions([]);
        }

        setSeedPhrase(prevState => {
            const newState = [...prevState];
            newState[index] = value;
            return newState;
        });
    };

    const handleOnClick = (value: any) => {
        setSuggestions([]);

        setSeedPhrase(prevState => {
            const newState = [...prevState];
            newState[index] = value;
            return newState;
        });
        setErrorBag(prevState => {
            const newState = [...prevState];
            newState[index] = false;
            return newState;
        });
    };

    const handleBlur = (evt: any) => {
        setFocus(false);
        setActiveIndex(null);
        setTimeout(() => {
            setErrorBag(prevState => {
                const newState = [...prevState];
                newState[index] = !bip39.includes(evt.target.value);
                return newState;
            });
        }, 100);
    };

    const handleOnPaste = (evt: any) => {
        evt.preventDefault();
        const text = evt.clipboardData.getData('text/plain');

        if (text.trim().split(' ').length === 24) {
            setActiveIndex(null);
            setErrorBag(Array(24).fill(undefined));
            return setSeedPhrase(text.trim().split(' '));
        }

        setSeedPhrase(prevState => {
            const newState = [...prevState];
            newState[index] = text;
            return newState;
        });
    }

    return (
        <>
            <div
                className={`flex bg-contrast-1 p-0.5 pr-4 border ${errorBag[index] === true && seedPhrase[index] ? "border-red-500" : "border-transparent"} transition-opacity duration-200 ${activeIndex !== null ? activeIndex === index ? "opactity-100" : "opacity-[30%]" : ""}`}
            >
                <label className="py-2 pl-3 text-sm">
                    {index + 1}.
                </label>
                <input
                    type="text"
                    className={`w-full py-2 px-2 text-white outline-none bg-transparent font-bold text-sm`}
                    value={seedPhrase[index] || ""}
                    autoFocus={isDesktop}
                    onFocus={(e) => handleFocus(e)}
                    onChange={(evt) => handleOnChange(evt)}
                    onBlur={(evt) => handleBlur(evt)}
                    onPaste={(evt) => handleOnPaste(evt)}
                />
            </div>
            {suggestions && (
                <div className="absolute top-[100%] z-10 w-full flex flex-col gap-[1px] bg-contrast-1">
                    {suggestions.map((i) => (
                        <button key={i} type="button" className="w-full flex bg-contrast-2 text-black text-white p-3 text-sm" onClick={() => handleOnClick(i)}>{i}</button>
                    ))}
                </div>
            )}
        </>
    )
}

const ConfirmSeedPhrase: React.FC<{ seedPhrase: (string | undefined)[], setSeedPhrase: React.Dispatch<React.SetStateAction<(string | undefined)[]>> }> = ({ seedPhrase, setSeedPhrase }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [errorBag, setErrorBag] = useState<(boolean | undefined)[]>([]);

    return (
        <div>
            <div>
                <div className="grid grid-cols-12 w-full gap-3">
                    {new Array(24).fill(0).map((_i, index) => (
                        <div key={index} className="relative col-span-6 lg:col-span-4 w-full flex items-center">
                            <ConfirmWord
                                index={index}
                                seedPhrase={seedPhrase}
                                setSeedPhrase={setSeedPhrase}
                                errorBag={errorBag}
                                setErrorBag={setErrorBag}
                                activeIndex={activeIndex}
                                setActiveIndex={setActiveIndex}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ConfirmSeedPhrase;