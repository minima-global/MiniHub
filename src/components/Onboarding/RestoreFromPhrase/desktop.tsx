import { useContext } from "react";
import OnboardingWrapper from "../OnboardingWrapper";
import ConfirmSeedPhrase from "./ConfirmSeedPhrase";
import STEPS from "../steps";
import OnboardingModal from "../OnboardingModal";
import OnboardingTitle from "../OnboardingTitle";
import { buttonClassName, inputClassName, optionClassName } from "../styling";
import { restoreFromPhraseContext } from "./_context";

const RestoreFromPhrase: React.FC = () => {
    const {
        step,
        action,
        error,
        isLoading,
        seedPhrase,
        setSeedPhrase,
        showSecretKey,
        secretKeyOne,
        setSecretKeyOne,
        secretKeyTwo,
        setSecretKeyTwo,
        secretKeyThree,
        setSecretKeyThree,
        secretKeyFour,
        setSecretKeyFour,
        secretKeyFive,
        setSecretKeyFive,
        toggleShowSecretKey,
        onSecretKeyPaste,
        handleSecretKeyKeyUp,
        customPhrase,
        showCustomPhrase,
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
        <div>
            <OnboardingWrapper display={step === STEPS.IMPORT_SEED_PHRASE_OPTIONS}>
                <OnboardingModal display={step === STEPS.IMPORT_SEED_PHRASE_OPTIONS}>
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
                </OnboardingModal>
            </OnboardingWrapper>
            <OnboardingWrapper display={step === STEPS.IMPORT_SEED_PHRASE_ENTER_SEED_PHRASE}>
                <OnboardingModal display={step === STEPS.IMPORT_SEED_PHRASE_ENTER_SEED_PHRASE}>
                    <OnboardingTitle title="Enter your seed phrase" icon="RESTORE_FROM_SEED_PHRASE" />
                    <div className="text-white w-full max-w-2xl">
                        <p className="mb-8">Please review your entry carefully before continuing</p>
                        <div className="mb-8">
                            <ConfirmSeedPhrase seedPhrase={seedPhrase} setSeedPhrase={setSeedPhrase} />
                        </div>
                        <button onClick={goToNumberOfKeys} disabled={disableContinueWithSeedPhrase} className={buttonClassName}>
                            Continue
                        </button>
                    </div>
                </OnboardingModal>
            </OnboardingWrapper>
            <OnboardingWrapper display={step === STEPS.IMPORT_SEED_PHRASE_ENTER_SECRET_KEY}>
                <OnboardingModal display={step === STEPS.IMPORT_SEED_PHRASE_ENTER_SECRET_KEY}>
                    <form>
                        <OnboardingTitle title="Enter your 20 character secret" icon="RESTORE_FROM_SEED_PHRASE" />
                        <div className="text-white w-full max-w-2xl">
                            <p className="mb-8">Please review your entry carefully before continuing</p>
                            <div className="flex items-center gap-2 mb-8 w-full h-[40px]">
                                <input id="phrase-1" type={showSecretKey ? 'text' : 'password'} maxLength={4} value={secretKeyOne} onChange={(e) => setSecretKeyOne(e.target.value)} onPaste={onSecretKeyPaste} onKeyUp={handleSecretKeyKeyUp} className="bg-contrast-1 text-xl font-bold text-center w-full p-3 outline-none placeholder-gray-500" />
                                <span className="text-white opacity-50 font-bold">-</span>
                                <input id="phrase-2" type={showSecretKey ? 'text' : 'password'} maxLength={4} value={secretKeyTwo} onChange={(e) => setSecretKeyTwo(e.target.value)} onPaste={onSecretKeyPaste} onKeyUp={handleSecretKeyKeyUp} className="bg-contrast-1 text-xl font-bold text-center w-full p-3 outline-none placeholder-gray-500" />
                                <span className="text-white opacity-50 font-bold">-</span>
                                <input id="phrase-3" type={showSecretKey ? 'text' : 'password'} maxLength={4} value={secretKeyThree} onChange={(e) => setSecretKeyThree(e.target.value)} onPaste={onSecretKeyPaste} onKeyUp={handleSecretKeyKeyUp} className="bg-contrast-1 text-xl font-bold text-center w-full p-3 outline-none placeholder-gray-500" />
                                <span className="text-white opacity-50 font-bold">-</span>
                                <input id="phrase-4" type={showSecretKey ? 'text' : 'password'} maxLength={4} value={secretKeyFour} onChange={(e) => setSecretKeyFour(e.target.value)} onPaste={onSecretKeyPaste} onKeyUp={handleSecretKeyKeyUp} className="bg-contrast-1 text-xl font-bold text-center w-full p-3 outline-none placeholder-gray-500" />
                                <span className="text-white opacity-50 font-bold">-</span>
                                <input id="phrase-5" type={showSecretKey ? 'text' : 'password'} maxLength={4} value={secretKeyFive} onChange={(e) => setSecretKeyFive(e.target.value)} onPaste={onSecretKeyPaste} onKeyUp={handleSecretKeyKeyUp} className="bg-contrast-1 text-xl font-bold text-center w-full p-3 outline-none placeholder-gray-500" />
                                <div onClick={toggleShowSecretKey} className="cursor-pointer bg-contrast-2 hover:bg-contrast-3 active:scale-[99%] rounded w-full ml-2 flex grow items-center justify-center h-[52px]">
                                    {showSecretKey && (
                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                    )}
                                    {!showSecretKey && (
                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                                    )}
                                </div>
                            </div>
                        </div>
                        <button type="submit" disabled={disableContinueWithSecretKey} onClick={goToNumberOfKeys} className={buttonClassName}>
                            Continue
                        </button>
                    </form>
                </OnboardingModal>
            </OnboardingWrapper>
            <OnboardingWrapper display={step === STEPS.IMPORT_SEED_PHRASE_ENTER_CUSTOM_PHRASE}>
                <OnboardingModal display={step === STEPS.IMPORT_SEED_PHRASE_ENTER_CUSTOM_PHRASE}>
                    <OnboardingTitle title="Enter your custom phrase" icon="RESTORE_FROM_SEED_PHRASE" />
                    <form className="text-white w-full max-w-2xl">
                        <p className="mb-8">Please review your entry carefully before continuing</p>
                        <div className="mb-8 flex gap-4">
                            <input type={showCustomPhrase ? 'text' : 'password'} value={customPhrase} onChange={handleCustomPhraseChange} className={inputClassName} placeholder="Enter your custom phrase" />
                            <div onClick={toggleShowCustomPhrase} className="cursor-pointer w-[80px] bg-contrast-2 hover:bg-contrast-3 active:scale-[99%] rounded ml-2 flex grow items-center justify-center h-[52px]">
                                {showCustomPhrase && (
                                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                )}
                                {!showCustomPhrase && (
                                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                                )}
                            </div>
                        </div>
                        <button type="submit" disabled={disableContinueWithCustomPhrase} onClick={goToNumberOfKeys} className={buttonClassName}>
                            Continue
                        </button>
                    </form>
                </OnboardingModal>
            </OnboardingWrapper>
            <OnboardingWrapper display={step === STEPS.IMPORT_SEED_PHRASE_NUMBER_OF_KEYS}>
                <OnboardingModal display={step === STEPS.IMPORT_SEED_PHRASE_NUMBER_OF_KEYS}>
                    <form>
                        <OnboardingTitle title="Number of Keys" icon="RESTORE_FROM_SEED_PHRASE" />
                        <div className="text-white w-full max-w-2xl">
                            <p className="mb-4">Enter the number of wallet addresses (keys) to create.</p>
                            <p className="mb-4">All Minima nodes are start with 64 addresses by default. If you previously manually created more, you can set the number of addresses to create here.</p>
                            <p className="mb-8 text-sm">Note that in future you should always create at least this many addresses to ensure all your coins are recovered.</p>
                            <div className="mb-8">
                                <label className="block mb-3">Enter number of keys</label>
                                <input type="number" value={keys} onChange={handleKeysChange} className={inputClassName} placeholder="Enter number of keys" />
                            </div>
                            <button type="submit" onClick={goToKeyUses} className={buttonClassName}>
                                Continue
                            </button>
                        </div>
                    </form>
                </OnboardingModal>
            </OnboardingWrapper>
            <OnboardingWrapper display={step === STEPS.IMPORT_SEED_PHRASE_KEY_USES}>
                <OnboardingModal display={step === STEPS.IMPORT_SEED_PHRASE_KEY_USES}>
                    <OnboardingTitle title="Key uses" icon="RESTORE_FROM_SEED_PHRASE" />
                    <form className="text-white w-full max-w-2xl">
                        <p className="mb-4 text-sm">
                            This number should be <strong>higher than the total times your node has generated a signature</strong>. A signature is created each time you spend from a wallet address, including all transactions, consolidating, and splitting coins. Some transactions may involve multiple signatures.
                        </p>
                        <p className="mb-8 text-sm italic">If unsure, use the default value provided if you believe you have not generated more than 1,000 signatures.</p>
                        <div className="mb-8">
                            <label className="block mb-3">Enter the number of times you have signed with your keys</label>
                            <input type="number" value={keyUses} onChange={handleKeyUsesChange} className={inputClassName} placeholder="Enter number of keys" />
                        </div>
                        <button type="submit" onClick={goToRecoverWithMegaNodeOptions} className={buttonClassName}>
                            Continue
                        </button>
                    </form>
                </OnboardingModal>
            </OnboardingWrapper>
            <OnboardingWrapper display={step === STEPS.IMPORT_SEED_PHRASE_RECOVER_WITH_MEGA_NODE_OPTIONS}>
                <OnboardingModal display={step === STEPS.IMPORT_SEED_PHRASE_RECOVER_WITH_MEGA_NODE_OPTIONS}>
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
                </OnboardingModal>
            </OnboardingWrapper>
            <OnboardingWrapper display={step === STEPS.IMPORT_SEED_PHRASE_RECOVER_WITH_MEGA_NODE_MANUALLY}>
                <OnboardingModal display={step === STEPS.IMPORT_SEED_PHRASE_RECOVER_WITH_MEGA_NODE_MANUALLY}>
                    <OnboardingTitle title="Connect to a Mega node" icon="RESTORE_FROM_SEED_PHRASE" />
                    <form className="text-white w-full max-w-2xl">
                        <div className="mb-8">
                            <label className="mb-3 block">
                                Please enter the url:port or ip:port of a Mega node.
                            </label>
                            <input type="text" value={ip} onChange={handleIpChange} placeholder="" className={inputClassName} />
                            {error && (
                                <div className={`mt-4 mb-6 ${error ? 'opacity-100' : 'opacity-0 h-0'} transition-opacity duration-300 mx-auto text-red-500 font-bold text-[13px] border border-red-600/50 rounded px-3 py-2 bg-red-500/[5%]`}>
                                    {error}
                                </div>
                            )}
                        </div>
                        <p className="mb-8">The node will shutdown once the restore has completed. Please restart the node to access your restored node.</p>
                        <div className="flex flex-col gap-3">
                            <button type="submit" disabled={isLoading || disableIfNotIPAndHost} onClick={restoreFromIp} className={buttonClassName}>
                                Restore
                            </button>
                        </div>
                    </form>
                </OnboardingModal>
            </OnboardingWrapper>
            <OnboardingWrapper display={step === STEPS.IMPORT_SEED_PHRASE_RECOVER_WITH_MEGA_NODE_AUTO_CONNECT}>
                <OnboardingModal display={step === STEPS.IMPORT_SEED_PHRASE_RECOVER_WITH_MEGA_NODE_AUTO_CONNECT}>
                    <OnboardingTitle title="Confirmation" icon="RESTORE_FROM_SEED_PHRASE" />
                    <div className="text-white w-full max-w-2xl">
                        <p className="mb-6">You are about to import your {action === 'phrase' && 'seed phrase'}{action === 'secret' && 'secret key'}{action === 'custom' && 'custom phrase'} to this node and restore all coins.</p>
                        <p className="mb-8">The node will shutdown once the restore has completed. Please restart the node to access your restored node.</p>
                        <div className="flex flex-col gap-3">
                            <div onClick={autoConnectAndRestore} className={buttonClassName}>
                                Start restore
                            </div>
                        </div>
                    </div>
                </OnboardingModal>
            </OnboardingWrapper>
            <OnboardingWrapper display={step === STEPS.IMPORT_SEED_PHRASE_RESTORING_FROM_PHRASE}>
                <OnboardingModal display={true} width="max-w-[572px]">
                    <div className="block flex items-center justify-center mb-8">
                        <img src="./icons/loader3.gif" className="w-[64px] h-[64px]" alt="Loading" />
                    </div>
                    <div className="text-center text-white mb-4">
                        Restoring your node...
                    </div>
                </OnboardingModal>
            </OnboardingWrapper>
        </div>
    )
}

export default RestoreFromPhrase;  