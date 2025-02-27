/**
 * Used for screens inside settings
 */

const BackButton = ({ dismiss }: { dismiss: () => void }) => {
    return (
        <div onClick={dismiss} className="text-grey absolute top-0 left-0 p-5 cursor-pointer flex items-center gap-4">
            <svg className="cursor-pointer" width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.6041 5.99957L7.3291 10.7246L6.40035 11.6533L0.746601 5.99957L6.40035 0.345819L7.3291 1.27457L2.6041 5.99957Z" fill="#A7A7B0"></path></svg>
            <div className="text-grey text-sm leading-none absolute left-11">Settings</div>
        </div>
    )
}

export default BackButton;