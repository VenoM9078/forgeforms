import { TypeAnimation } from 'react-type-animation';

const TextLoadingAnimatiom = ({query}) => {

  const regex = /[,\s]+/;
    let splitQuery = query.toString().split(regex);
    console.log("Split query: " + splitQuery)

    return (
      <TypeAnimation
        sequence={splitQuery}
        wrapper="p"
        cursor={true}
        repeat={0}
        style={{ fontSize: '1em' }}
      />
    );
  };
  
export default TextLoadingAnimatiom;