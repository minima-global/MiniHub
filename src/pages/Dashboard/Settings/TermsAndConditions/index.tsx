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
            <div className="text-2xl mt-6 mb-6">Terms And Conditions</div>
            <div className="flex flex-col space-y-4">
              <p>
                IT IS IMPORTANT YOU READ THESE TERMS CAREFULLY BEFORE USING ANY MINIDAPP OR OTHERWISE DEALING IN MINIMA.
                BY USING A MINIDAPP (OR OTHERWISE DEALING IN MINIMA), YOU INDICATE THAT YOU ACCEPT THESE TERMS AND AGREE
                TO COMPLY WITH THEM. IF YOU USE A MINIDAPP OR OTHERWISE DEAL IN MINIMA IN THE COURSE OF YOUR BUSINESS OR
                WORK, YOU ARE ALSO AGREEING TO THESE TERMS ON BEHALF OF THAT BUSINESS. IF YOU DO NOT AGREE TO THESE
                TERMS, YOU MUST NOT USE ANY MINIDAPP OR OTHERWISE DEAL IN MINIMA.
              </p>
              <p>
                YOU SHOULD CAREFULLY CONSIDER WHETHER USING MINIDAPPS AND DEALING IN MINIMA IS SUITABLE FOR YOU IN LIGHT
                OF YOUR OWN SITUATION AND ATTITUDE TO RISK, AS EVALUATED BY YOU CAREFULLY. WE DO NOT MAKE ANY
                REPRESENTATIONS OR RECOMMENDATIONS REGARDING THE ADVISABILITY OR OTHERWISE OF USING MINIDAPPS OR DEALING
                IN CRYPTOASSETS (INCLUDING MINIMA). IF YOU ARE UNSURE AS TO WHETHER USING MINIDAPPS OR OTHERWISE DEALING
                IN CRYPTOASSETS (INCLUDING MINIMA) IS APPROPRIATE FOR YOU, YOU SHOULD SEEK INDEPENDENT ADVICE PRIOR TO
                DOING SO.
              </p>
              <p>
                DEALING IN CRYPTOASSETS (INCLUDING MINIMA) MAY NOT BE SUBJECT TO ANY INVESTOR PROTECTION, AND MAY
                INVOLVE A HIGH DEGREE OF RISK TO YOUR CAPITAL, AND YOU MAY LOSE THE FULL VALUE YOU HOLD IN ANY
                CRYPTOASSETS (INCLUDING MINIMA) YOU DEAL IN.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SlideScreen>
  );
}

export default TermsAndConditions;
