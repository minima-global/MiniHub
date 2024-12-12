import { useState } from "react";
import bip39 from "../bip39";

const ConfirmWord = ({ index, word, callback }: { index: number, word: string | undefined, callback: (index: number, value: string | undefined) => void }) => {
    const [_focus, setFocus] = useState(false);
    const [error, setError] = useState(false);
    const [value, setValue] = useState(word);
    const [validated, setValidated] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const isDesktop = window.innerWidth > 768;

    const handleFocus = (e) => {
        e.persist();
        setFocus(true);
    };

    const handleOnChange = (evt: any) => {
        const value = evt.target.value.toUpperCase().trim();
        setValue(value);
        setValidated(bip39.includes(value));

        if (value.length > 2) {
            setSuggestions(bip39.filter((i) => i.startsWith(value)).slice(0, 5));
        } else {
            setSuggestions([]);
        }

        console.log(1);

        if (bip39.includes(value)) {
            callback(index, value);
        } else {
            callback(index, undefined);
        }
    };

    const handleOnClick = (value: any) => {
        setError(false);
        setValue(value);
        setValidated(bip39.includes(value));
        setSuggestions([]);

        if (bip39.includes(value)) {
            callback(index, value);
        } else {
            callback(index, undefined);
        }
    };

    const handleBlur = (evt: any) => {
        setFocus(false);
        setError(
            evt.target.value === "" ? false : !bip39.includes(evt.target.value)
        );

        if (value && bip39.includes(value)) {
            callback(index, value);
        } else {
            callback(index, undefined);
        }
    };

    return (
        <>
            <div
                className={`flex bg-contrast-1 p-0.5 pr-4 border ${error ? "border-red-500" : "border-transparent"}`}
            >
                <label className="py-2 pl-3 text-sm">
                    {index + 1}.
                </label>
                <input
                    type="text"
                    className={`w-full py-2 px-2 text-white outline-none bg-transparent font-bold text-sm`}
                    value={value}
                    autoFocus={isDesktop}
                    onFocus={(e) => handleFocus(e)}
                    onChange={(evt) => handleOnChange(evt)}
                    onBlur={(evt) => handleBlur(evt)}
                />
            </div>
            {suggestions && !validated && (
                <div className="absolute top-[100%] z-10 w-full flex flex-col gap-1 mt-1">
                    {suggestions.map((i) => (
                        <button key={i} type="button" className="w-full flex bg-black text-black text-white p-3 text-sm" onClick={() => handleOnClick(i)}>{i}</button>
                    ))}
                </div>
            )}
        </>
    )
}

const ConfirmSeedPhrase: React.FC<{ seedPhrase: (string | undefined)[], setSeedPhrase: React.Dispatch<React.SetStateAction<(string | undefined)[]>> }> = ({ seedPhrase, setSeedPhrase }) => {
    const callback = (index: number, seedPhrasePart: string | undefined) => {
        setSeedPhrase(prevState => {
            const newState = [...prevState];
            newState[index] = seedPhrasePart;
            return newState;
        });
    }

    return (
        <div>
            <div>
                <div className="grid grid-cols-12 w-full gap-3">
                    {new Array(24).fill(0).map((_i, index) => (
                        <div key={index} className="relative col-span-4 w-full flex items-center">
                            <ConfirmWord index={index} word={seedPhrase[index]} callback={callback} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ConfirmSeedPhrase;