// USED FOR TESTING THE CONJECTURES THAT WE UPLOAD
import Background from "../Background";
import { green, neonGreen, black, blue, white, pink, orange, red, transparent, turquoise } from "../../utils/colors";
import Button from "../Button";
import RectButton from "../RectButton";

// import { TestConjectureMachine } from "../../machines/TestConjectureMachine";


const TestConjectureModule = (props) => {
    console.log("I AM THE WINNER");
    const { height, width, columnDimensions, rowDimensions, editCallback, mainCallback } = props;
    // const [state, send] = useMachine(TestConjectureMachine);

    return(
    <>
        < Background height={height * 1.1} width={width} />

    </>
    );



};

export default TestConjectureModule;