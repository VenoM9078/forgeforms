// import { TypeAnimation } from 'react-type-animation';
import { WindupChildren } from "windups";

const TextLoadingAnimatiom = ({query}) => {

    // let splitQuery = query.data.toString().split(" ");
    // console.log(splitQuery)

    return (
      // <TypeAnimation
      // sequence={[
      //   'One',
      //   'Two', 
      //   'Two Three'
      // ]}
      //   wrapper="span"
      //   cursor={true}
      //   repeat={0}
      //   style={{ fontSize: '1em' }}
      // />
      <WindupChildren>
      <p>{query.data}</p>
    </WindupChildren>
    );
  };
  
export default TextLoadingAnimatiom;