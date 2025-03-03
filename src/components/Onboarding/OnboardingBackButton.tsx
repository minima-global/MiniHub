import { useCallback, useContext, useMemo } from "react";
import { onboardingContext } from "../Onboarding";
import STEPS from "./steps";

const BACKWARD_STEPS: Record<string | number, string | number> = {
    [STEPS.FRESH_NODE_SETUP]: 1,
    [STEPS.FRESH_NODE_CONNECT_OPTIONS]: STEPS.FRESH_NODE_SETUP,
    [STEPS.FRESH_NODE_ADD_CONNECTIONS]: STEPS.FRESH_NODE_CONNECT_OPTIONS,
    [STEPS.FRESH_NODE_AUTO_CONNECT]: STEPS.FRESH_NODE_CONNECT_OPTIONS,
    [STEPS.FRESH_NODE_SKIP]: STEPS.FRESH_NODE_CONNECT_OPTIONS,
    [STEPS.IMPORT_SEED_PHRASE_OPTIONS]: 1,
    [STEPS.IMPORT_SEED_PHRASE_ENTER_SEED_PHRASE]: STEPS.IMPORT_SEED_PHRASE_OPTIONS,
    [STEPS.IMPORT_SEED_PHRASE_ENTER_SECRET_KEY]: STEPS.IMPORT_SEED_PHRASE_OPTIONS,
    [STEPS.IMPORT_SEED_PHRASE_ENTER_CUSTOM_PHRASE]: STEPS.IMPORT_SEED_PHRASE_OPTIONS,
    [STEPS.IMPORT_SEED_PHRASE_NUMBER_OF_KEYS]: STEPS.IMPORT_SEED_PHRASE_OPTIONS,
    [STEPS.IMPORT_SEED_PHRASE_KEY_USES]: STEPS.IMPORT_SEED_PHRASE_NUMBER_OF_KEYS,
    [STEPS.IMPORT_SEED_PHRASE_RECOVER_WITH_MEGA_NODE_OPTIONS]: STEPS.IMPORT_SEED_PHRASE_KEY_USES,
    [STEPS.IMPORT_SEED_PHRASE_RECOVER_WITH_MEGA_NODE_MANUALLY]: STEPS.IMPORT_SEED_PHRASE_RECOVER_WITH_MEGA_NODE_OPTIONS,
    [STEPS.IMPORT_SEED_PHRASE_RECOVER_WITH_MEGA_NODE_AUTO_CONNECT]: STEPS.IMPORT_SEED_PHRASE_RECOVER_WITH_MEGA_NODE_OPTIONS,

    [STEPS.RESTORE_FROM_BACKUP_SELECT_FILE]: 1,
    [STEPS.RESTORE_FROM_BACKUP_PASSWORD]: STEPS.RESTORE_FROM_BACKUP_SELECT_FILE,
    [STEPS.RESTORE_FROM_BACKUP_KEY_USES]: STEPS.RESTORE_FROM_BACKUP_PASSWORD,
    [STEPS.RESTORE_FROM_BACKUP_RECOVER_WITH_MEGA_NODE_OPTIONS]: STEPS.RESTORE_FROM_BACKUP_KEY_USES,
    [STEPS.RESTORE_FROM_BACKUP_RECOVER_WITH_MEGA_NODE_MANUALLY]: STEPS.RESTORE_FROM_BACKUP_RECOVER_WITH_MEGA_NODE_OPTIONS,
    [STEPS.RESTORE_FROM_BACKUP_RECOVER_WITH_MEGA_NODE_AUTO_CONNECT]: STEPS.RESTORE_FROM_BACKUP_RECOVER_WITH_MEGA_NODE_OPTIONS,
}

const OnboardingBackButton = () => {
    const { step, setStep } = useContext(onboardingContext);

    const previousStep = useCallback(() => {
        if (step && BACKWARD_STEPS[step]) {
            setStep(BACKWARD_STEPS[step]);
        }
    }, [step, setStep]);

    const showBackButton = useMemo(() => {
        const backButtonSteps = [
            STEPS.FRESH_NODE_SETUP,
            STEPS.FRESH_NODE_CONNECT_OPTIONS,
            STEPS.FRESH_NODE_ADD_CONNECTIONS,
            STEPS.FRESH_NODE_AUTO_CONNECT,
            STEPS.FRESH_NODE_SKIP,

            STEPS.IMPORT_SEED_PHRASE_OPTIONS,
            STEPS.IMPORT_SEED_PHRASE_ENTER_SEED_PHRASE,
            STEPS.IMPORT_SEED_PHRASE_ENTER_SECRET_KEY,
            STEPS.IMPORT_SEED_PHRASE_ENTER_CUSTOM_PHRASE,
            STEPS.IMPORT_SEED_PHRASE_NUMBER_OF_KEYS,
            STEPS.IMPORT_SEED_PHRASE_KEY_USES,
            STEPS.IMPORT_SEED_PHRASE_RECOVER_WITH_MEGA_NODE_OPTIONS,
            STEPS.IMPORT_SEED_PHRASE_RECOVER_WITH_MEGA_NODE_MANUALLY,
            STEPS.IMPORT_SEED_PHRASE_RECOVER_WITH_MEGA_NODE_AUTO_CONNECT,

            STEPS.RESTORE_FROM_BACKUP_SELECT_FILE,
            STEPS.RESTORE_FROM_BACKUP_PASSWORD,
            STEPS.RESTORE_FROM_BACKUP_KEY_USES,
            STEPS.RESTORE_FROM_BACKUP_RECOVER_WITH_MEGA_NODE_OPTIONS,
            STEPS.RESTORE_FROM_BACKUP_RECOVER_WITH_MEGA_NODE_MANUALLY,
            STEPS.RESTORE_FROM_BACKUP_RECOVER_WITH_MEGA_NODE_AUTO_CONNECT,
        ];
        return backButtonSteps.includes(step as string);
    }, [step]);

    return (
        <>
            <div onClick={previousStep} className={`block lg:hidden mb-10 ${showBackButton ? "opacity-100" : "opacity-0 pointer-events-none"} text-white text-sm cursor-pointer relative z-50 flex items-center gap-2`}>
                <img src="./icons/chevron_backward.svg" alt="Back" className="w-4 h-4" />
                Back
            </div>
            <div onClick={previousStep} className={`hidden lg:flex ${showBackButton ? "opacity-100" : "opacity-0 pointer-events-none"} absolute z-[60] top-6 left-4 lg:top-10 lg:left-14 text-white text-sm cursor-pointer relative z-50 flex items-center gap-2`}>
                <img src="./icons/chevron_backward.svg" alt="Back" className="w-4 h-4" />
                Back
            </div>
        </>
    );
};

export default OnboardingBackButton;
