export const MobileOnboardingWrapper: React.FC<React.PropsWithChildren<{display: boolean}>> = ({ display, children }) => {
    if (!display) return null;
    
    return (
        <div>{children}</div>
    )
}

export const MobileOnboardingContent: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <div className="min-h-screen w-full">
            <div className="min-h-screen p-6 flex flex-col">
                {children}
            </div>
        </div>
    )
}

export default MobileOnboardingWrapper;
