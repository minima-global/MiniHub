import SlideScreen from '../../../../components/UI/SlideScreen';

type TermsAndConditionsProps = {
  display: boolean;
  dismiss: () => void;
};

export function TermsAndConditions({ display, dismiss }: TermsAndConditionsProps) {


  return (
    <SlideScreen display={display}>
      <div className="flex flex-col h-full w-full bg-black">
        <div className="pt-20 px-4 lg:px-0 w-full pb-6 flex flex-col bg-black">
          <div className="max-w-xl mx-auto">
            <div onClick={dismiss} className="sticky top-0 cursor-pointer flex items-center">
              <svg
                className="mt-0.5 mr-4"
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.90017 13.1693L0.730957 7.00009L6.90017 0.830872L7.79631 1.72701L2.52324 7.00009L7.79631 12.2732L6.90017 13.1693Z"
                  fill="#F9F9FA"
                />
              </svg>
              Settings
            </div>
            <div className="text-2xl mt-6 mb-6">
              Terms And Conditions
            </div>
            <div className="flex flex-col gap-5">
                <div className='flex justify-center items-center gap-2'>
                    <label htmlFor="terms">
                        If you are using Minima you agree to these terms and conditions.
                    </label>
                </div>
                <a href="./assets/terms.docx.html" target="_blank">View terms and conditions</a>
            </div>
          </div>
        </div>
      </div>
    </SlideScreen>
  );
}

export default TermsAndConditions;
