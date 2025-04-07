import propTypes from 'prop-types';
import MitenMenee from './assets/MitenMenee';

const Greeting = (props) => {
  function handleButtonClick() {
    alert('Klikki');
  }
  return (
    <>
      <h3>Moi, {props.name}</h3>
      <MitenMenee />
      <button onClick={handleButtonClick}>nappi</button>
    </>
  );
};

Greeting.prototype = {
  name: propTypes.string.isRequired,
};

export default Greeting;
