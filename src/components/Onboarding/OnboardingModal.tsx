const OnboardingModal: React.FC<React.PropsWithChildren<{ display: boolean, width?: string }>> = ({ display, children, width }) => {
    return (
        <div className={`w-full h-full flex items-center justify-center transition-all duration-500 ${display ? 'opacity-100' : 'pointer-events-none opacity-0 translate-y-2'}`}>
            <div className={`mx-auto w-full bg-core-black p-[40px] text-sm rounded-[24px] ${width ? width : 'max-w-2xl'}`}>
                {children}
            </div>
        </div>
    )
}

export default OnboardingModal;