type OnboardingWrapperProps = {
    display: boolean;
}

const OnboardingWrapper: React.FC<React.PropsWithChildren<OnboardingWrapperProps>> = ({ display, children }) => {
    return (
        <div className={`fixed left-0 top-0 w-screen h-screen flex items-center justify-center ${display ? '' : 'pointer-events-none'}`}>
            <div className={`relative w-full h-full lg:mx-0 ${display ? 'opacity-100' : 'opacity-0'} transition-all duration-150`}>
                {children}
            </div>
        </div>
    )
};

export default OnboardingWrapper;