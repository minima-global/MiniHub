import { useContext } from "react";
import { onboardingContext } from ".";
import { buttonClassName } from "./styling";

const OnboardingPrompt = () => {
    const { prompt, setPrompt } = useContext(onboardingContext);

    const dismiss = () => {
        setPrompt({ display: false, title: prompt.title, description: prompt.description });
    }

    return (
        <div className={`fixed top-0 left-0 z-20 h-screen w-screen flex items-center justify-center transition-all duration-100 ${prompt.display ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
            <div className="relative z-10 bg-contrast-1 p-6 lg:p-8 flex flex-col gap-6 w-full mx-4 lg:mx-0 max-w-[472px]">
                <h5 className="text-base">{prompt.title}</h5>
                <p className="text-sm mb-2">{prompt.description}</p>
                <button className={buttonClassName} onClick={dismiss}>Dismiss</button>
            </div>
            <div className="absolute top-0 left-0 bg-black/60 w-full h-full" />
        </div>
    )
}

export default OnboardingPrompt;