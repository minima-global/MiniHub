type OnboardingTitleProps = {
    title?: string;
    icon: "CREATE_NEW_ACCOUNT" | "RESTORE_FROM_SEED_PHRASE" | "RESTORE_FROM_BACKUP";
}

const OnboardingTitle = ({ title, icon }: OnboardingTitleProps) => (
    <div>
        <div className="grid grid-cols-12 gap-3 -mt-2 mb-8 w-full">
            <div className="col-span-8 flex items-center text-left text-white">
                <h1 className="text-2xl">{title}</h1>
            </div>
            <div className="col-span-4 flex justify-end">
                {icon === "CREATE_NEW_ACCOUNT" && (
                    <img src="./icons/create_a_new_account.svg" alt="Create a new account" className="w-10 h-10" />
                )}
                {icon === "RESTORE_FROM_SEED_PHRASE" && (
                    <img src="./icons/restore_from_phrase.svg" alt="Restore from seed phrase" className="w-10 h-10" />
                )}
                {icon === "RESTORE_FROM_BACKUP" && (
                    <img src="./icons/restore_from_backup.svg" alt="Restore from backup" className="w-10 h-10" />
                )}
            </div>
        </div>
    </div>
)

export default OnboardingTitle;
