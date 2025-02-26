import SlideScreen from '../../../../components/UI/SlideScreen';
import BackButton from '../_BackButton';

type TermsAndConditionsProps = {
  display: boolean;
  dismiss: () => void;
};

export function TermsAndConditions({ display, dismiss }: TermsAndConditionsProps) {


  return (
    <SlideScreen display={display}>
      <BackButton dismiss={dismiss} />
      <div className="flex flex-col h-full w-full bg-black">
        <div className="pt-20 px-4 lg:px-0 w-full pb-6 flex flex-col bg-black">
          <div className="max-w-xl mx-auto">
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
