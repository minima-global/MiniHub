import { useContext } from 'react';
import { appContext } from '../../AppContext';
import { animated, config, useSpring } from 'react-spring';

const Tooltip = () => {
  const { _tooltip, promptTooltip } = useContext(appContext);

  const springProps = useSpring({
    opacity: _tooltip ? 1 : 0,
    transform: _tooltip ? 'translateY(0%) scale(1)' : 'translateY(-50%) scale(0.8)',
    config: config['wobbly'],
  });

  if (!_tooltip) {
    return null;
  }

  return (
    <animated.div
      onMouseEnter={() => promptTooltip(_tooltip, 2000)}
      onMouseLeave={() => promptTooltip(null)}
      style={springProps}
      className="fixed bottom-4 right-4 z-[20000]"
    >
      <div className="text-center bg-teal-400 px-8 py-4 text-black font-bold text-lg rounded-md absolute bottom-10 right-0">
        {_tooltip}
      </div>
    </animated.div>
  );
};

export default Tooltip;
