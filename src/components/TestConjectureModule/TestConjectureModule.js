// USED FOR TESTING THE CONJECTURES THAT WE UPLOAD
import Background from "../Background";
import { green, neonGreen, black, blue, white, pink, orange, red, transparent, turquoise } from "../../utils/colors";
import Button from "../Button";
import RectButton from "../RectButton";

// import { TestConjectureMachine } from "../../machines/TestConjectureMachine";


const TestConjectureModule = (props) => {
    const { height, width, columnDimensions, rowDimensions, editCallback, mainCallback } = props;
    // const [state, send] = useMachine(TestConjectureMachine);

    return(
    <>
        < Background height={height * 1.1} width={width} />

        {/* TEST Back Button */}
        <RectButton
            height={height * 0.13}
            width={width * 0.26}
            x={width * 0.15}
            y={height * 0.93}
            color={black}
            fontSize={width * 0.015}
            fontColor={white}
            text={"Back Button"}
            fontWeight={800}
            callback={mainCallback}
        />

    </>
    );



};

export default TestConjectureModule;