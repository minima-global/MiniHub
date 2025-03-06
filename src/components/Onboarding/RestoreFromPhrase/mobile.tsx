import ConfirmSeedPhrase from "./ConfirmSeedPhrase";
import STEPS from "../steps";
import OnboardingTitle from "../OnboardingTitle";
import { buttonClassName, greyButtonClassName, inputClassName, optionClassName } from "../styling";
import MobileOnboardingWrapper, { MobileOnboardingContent } from "../OnboardingMobileWrapper";
import OnboardingBackButton from "../OnboardingBackButton";
import { restoreFromPhraseContext } from "./_context";
import { useContext } from "react";

const MobileRestoreFromPhrase: React.FC = () => {
    const {
        step,
        action,
        error,
        isLoading,
        seedPhrase,
        setSeedPhrase,
        showSecretKey,
        secretKey,
        handleSecretKeyChange,
        customPhrase,
        showCustomPhrase,
        toggleShowSecretKey,
        toggleShowCustomPhrase,
        handleCustomPhraseChange,
        keys,
        handleKeysChange,
        keyUses,
        handleKeyUsesChange,
        ip,
        handleIpChange,
        restoreFromIp,
        autoConnectAndRestore,
        /**
         * Gotos
         */
        goToKeyUses,
        goToNumberOfKeys,
        goToRestoreFromPhrase,
        goToRestoreFromSecretKey,
        goToRestoreFromCustomPhrase,
        goToRecoverWithMegaNodeOptions,
        goToRecoverWithMegaNodeManually,
        goToRecoverWithMegaNodeAutoConnect,
        /**
         * Disabled states
         */
        disableContinueWithSeedPhrase,
        disableContinueWithSecretKey,
        disableContinueWithCustomPhrase,
        disableIfNotIPAndHost,
    } = useContext(restoreFromPhraseContext);

    return (
        <div className="text-sm">
            <MobileOnboardingWrapper display={step === STEPS.IMPORT_SEED_PHRASE_OPTIONS}>
                <MobileOnboardingContent>
                    <OnboardingBackButton />
                    <OnboardingTitle title="Import seed phrase" icon="RESTORE_FROM_SEED_PHRASE" />
                    <div className="text-center text-white w-full max-w-2xl">
                        <div>
                            <div className="flex flex-col gap-3 text-sm">
                                <div onClick={goToRestoreFromPhrase} className={optionClassName}>
                                    I have a 24 word seed phrase
                                </div>
                                <div onClick={goToRestoreFromSecretKey} className={optionClassName}>
                                    I have a Web Wallet secret key
                                </div>
                                <div onClick={goToRestoreFromCustomPhrase} className={optionClassName}>
                                    I want to use a custom seed phrase
                                </div>
                            </div>
                        </div>
                    </div>
                </MobileOnboardingContent>
            </MobileOnboardingWrapper>
            <MobileOnboardingWrapper display={step === STEPS.IMPORT_SEED_PHRASE_ENTER_SEED_PHRASE}>
                <MobileOnboardingContent>
                    <div className="grow text-white w-full max-w-2xl">
                        <OnboardingBackButton />
                        <OnboardingTitle title="Enter your seed phrase" icon="RESTORE_FROM_SEED_PHRASE" />
                        <div className="text-white w-full max-w-2xl">
                            <p className="mb-8">Please review your entry carefully before continuing</p>
                            <div className="mb-8">
                                <ConfirmSeedPhrase seedPhrase={seedPhrase} setSeedPhrase={setSeedPhrase} />
                            </div>
                        </div>
                    </div>
                    <button onClick={goToNumberOfKeys} disabled={disableContinueWithSeedPhrase} className={buttonClassName}>
                        Continue
                    </button>
                </MobileOnboardingContent>
            </MobileOnboardingWrapper>
            <MobileOnboardingWrapper display={step === STEPS.IMPORT_SEED_PHRASE_ENTER_SECRET_KEY}>
                <MobileOnboardingContent>
                    <form className="grow flex flex-col h-full">
                        <div className="grow text-white w-full max-w-2xl">
                            <OnboardingBackButton />
                            <OnboardingTitle title="Enter your 20 character secret" icon="RESTORE_FROM_SEED_PHRASE" />
                            <p className="mb-8">Please review your entry carefully before continuing</p>
                            <div>
                                <input id="phrase" type={showSecretKey ? 'text' : 'password'} maxLength={24} value={secretKey} onChange={handleSecretKeyChange} className="bg-contrast-1 text-left font-bold w-full p-3 outline-none placeholder-gray-500" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <button type="button" onClick={toggleShowSecretKey} className={greyButtonClassName}>
                                {!showSecretKey ? "Show secret key" : "Hide secret key"}
                            </button>
                            <button type="submit" disabled={disableContinueWithSecretKey} onClick={goToNumberOfKeys} className={buttonClassName}>
                                Continue
                            </button>
                        </div>
                    </form>
                </MobileOnboardingContent>
            </MobileOnboardingWrapper>
            <MobileOnboardingWrapper display={step === STEPS.IMPORT_SEED_PHRASE_ENTER_CUSTOM_PHRASE}>
                <MobileOnboardingContent>
                    <form className="grow flex flex-col h-full">
                        <div className="grow">
                            <OnboardingBackButton />
                            <OnboardingTitle title="Enter your custom phrase" icon="RESTORE_FROM_SEED_PHRASE" />
                            <p className="mb-8">Please review your entry carefully before continuing</p>
                            <div className="mb-8 flex gap-4">
                                <input type={showCustomPhrase ? 'text' : 'password'} value={customPhrase} onChange={handleCustomPhraseChange} className={inputClassName} placeholder="Enter your custom phrase" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <button type="button" onClick={toggleShowCustomPhrase} className={greyButtonClassName}>
                                {!showCustomPhrase ? "Show custom phrase" : "Hide custom phrase"}
                            </button>
                            <button type="submit" disabled={disableContinueWithCustomPhrase} onClick={goToNumberOfKeys} className={buttonClassName}>
                                Continue
                            </button>
                        </div>
                    </form>
                </MobileOnboardingContent>
            </MobileOnboardingWrapper>
            <MobileOnboardingWrapper display={step === STEPS.IMPORT_SEED_PHRASE_NUMBER_OF_KEYS}>
                <MobileOnboardingContent>
                    <form className="grow flex flex-col h-full">
                        <div className="grow">
                            <OnboardingBackButton />
                            <OnboardingTitle title="Number of Keys" icon="RESTORE_FROM_SEED_PHRASE" />
                            <div className="text-white w-full max-w-2xl">
                                <p className="mb-4">Enter the number of wallet addresses (keys) to create.</p>
                                <p className="mb-4">All Minima nodes start with 64 addresses by default. If you previously manually created more, you can set the number of addresses to create here.</p>
                                <p className="mb-8 text-sm">Note that in future you should always create at least this many addresses to ensure all your coins are recovered.</p>
                                <div className="mb-8">
                                    <label className="block mb-3">Enter number of keys</label>
                                    <input type="number" value={keys} onChange={handleKeysChange} className={inputClassName} placeholder="Enter number of keys" />
                                </div>
                            </div>
                        </div>
                        <button type="submit" onClick={goToKeyUses} className={buttonClassName}>
                            Continue
                        </button>
                    </form>
                </MobileOnboardingContent>
            </MobileOnboardingWrapper>
            <MobileOnboardingWrapper display={step === STEPS.IMPORT_SEED_PHRASE_KEY_USES}>
                <MobileOnboardingContent>
                    <form className="grow flex flex-col h-full">
                        <div className="grow">
                            <OnboardingBackButton />
                            <OnboardingTitle title="Key uses" icon="RESTORE_FROM_SEED_PHRASE" />
                            <div className="text-white w-full max-w-2xl">
                                <p className="mb-4 text-sm">
                                    This number should be <strong>higher than the total times your node has generated a signature</strong>. A signature is created each time you spend from a wallet address, including all transactions, consolidating, and splitting coins. Some transactions may involve multiple signatures.
                                </p>
                                <p className="mb-8 text-sm italic">If unsure, use the default value provided if you believe you have not generated more than 1,000 signatures.</p>
                                <div className="mb-8">
                                    <label className="block mb-3">Enter the number of times you have signed with your keys</label>
                                    <input type="number" value={keyUses} onChange={handleKeyUsesChange} className={inputClassName} placeholder="Enter number of keys" />
                                </div>
                            </div>
                        </div>
                        <button type="submit" onClick={goToRecoverWithMegaNodeOptions} className={buttonClassName}>
                            Continue
                        </button>
                    </form>
                </MobileOnboardingContent>
            </MobileOnboardingWrapper>
            <MobileOnboardingWrapper display={step === STEPS.IMPORT_SEED_PHRASE_RECOVER_WITH_MEGA_NODE_OPTIONS}>
                <MobileOnboardingContent>
                    <OnboardingBackButton />
                    <OnboardingTitle title="Connect to a Mega node" icon="RESTORE_FROM_SEED_PHRASE" />
                    <div className="text-white w-full max-w-2xl">
                        <p className="mb-8">To import your {action === 'phrase' && 'seed phrase'}{action === 'secret' && 'secret key'}{action === 'custom' && 'custom phrase'}, you will need to connect to a Mega node to restore your coins and join the network.</p>
                        {error && (
                            <div className={`mt-4 mb-6 ${error ? 'opacity-100' : 'opacity-0 h-0'} transition-opacity duration-300 mx-auto text-red-500 font-bold text-[13px] border border-red-600/50 rounded px-3 py-2 bg-red-500/[5%]`}>
                                {error}
                            </div>
                        )}
                        <div className="flex flex-col gap-3">
                            <button disabled={isLoading} onClick={goToRecoverWithMegaNodeManually} className={optionClassName}>
                                Enter manually
                            </button>
                            <button disabled={isLoading} onClick={goToRecoverWithMegaNodeAutoConnect} className={optionClassName}>
                                Use auto-connect
                            </button>
                        </div>
                    </div>
                </MobileOnboardingContent>
            </MobileOnboardingWrapper>
            <MobileOnboardingWrapper display={step === STEPS.IMPORT_SEED_PHRASE_RECOVER_WITH_MEGA_NODE_MANUALLY}>
                <MobileOnboardingContent>
                    <form className="grow flex flex-col h-full">
                        <OnboardingBackButton />
                        <OnboardingTitle title="Connect to a Mega node" icon="RESTORE_FROM_SEED_PHRASE" />
                        <div className="grow text-white w-full max-w-2xl">
                            <div className="mb-6">
                                <label className="mb-3 block">
                                    Please enter the url:port or ip:port of a Mega node.
                                </label>
                                <input type="text" value={ip} onChange={handleIpChange} placeholder="" className={inputClassName} />
                            </div>
                            {error && (
                                <div className={`mt-4 mb-6 ${error ? 'opacity-100' : 'opacity-0 h-0'} transition-opacity duration-300 mx-auto text-red-500 font-bold text-[13px] border border-red-600/50 rounded px-3 py-2 bg-red-500/[5%]`}>
                                    {error}
                                </div>
                            )}
                            <p className="mb-6">The node will shutdown once the restore has completed. Please restart the node to access your restored node.</p>                      </div>
                        <button disabled={isLoading || disableIfNotIPAndHost} onClick={restoreFromIp} className={buttonClassName}>
                            Restore
                        </button>
                    </form>
                </MobileOnboardingContent>
            </MobileOnboardingWrapper>
            <MobileOnboardingWrapper display={step === STEPS.IMPORT_SEED_PHRASE_RECOVER_WITH_MEGA_NODE_AUTO_CONNECT}>
                <MobileOnboardingContent>
                    <div className="grow">
                        <OnboardingBackButton />
                        <OnboardingTitle title="Confirmation" icon="RESTORE_FROM_SEED_PHRASE" />
                        <div className="text-white w-full max-w-2xl">
                            <p className="mb-6">You are about to import your {action === 'phrase' && 'seed phrase'}{action === 'secret' && 'secret key'}{action === 'custom' && 'custom phrase'} to this node and restore all coins.</p>
                            <p className="mb-6">The node will shutdown once the restore has completed. Please restart the node to access your restored node.</p>
                        </div>
                    </div>
                    <div onClick={autoConnectAndRestore} className={buttonClassName}>
                        Start restore
                    </div>
                </MobileOnboardingContent>
            </MobileOnboardingWrapper>
            <MobileOnboardingWrapper display={step === STEPS.IMPORT_SEED_PHRASE_RESTORING_FROM_PHRASE}>
                <MobileOnboardingContent>
                    <div className="grow flex items-center justify-center">
                        <div>
                            <div className="block flex items-center justify-center mb-6">
                                <img src="./icons/loader3.gif" className="w-[64px] h-[64px]" alt="Loading" />
                            </div>
                            <div className="text-center text-white mb-4">
                                Restoring your node...
                            </div>
                        </div>
                    </div>
                </MobileOnboardingContent>
            </MobileOnboardingWrapper>
        </div>
    )
}

export default MobileRestoreFromPhrase;  