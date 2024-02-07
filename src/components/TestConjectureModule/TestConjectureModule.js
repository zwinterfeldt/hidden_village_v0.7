// USED FOR TESTING THE CONJECTURES THAT WE UPLOAD
import Background from "../Background";
import { green, neonGreen, black, blue, white, pink, orange, red, transparent, turquoise } from "../../utils/colors";
import Button from "../Button";
import RectButton from "../RectButton";
import { getConjectureDataByUUID } from "../../firebase/database";

// import { TestConjectureMachine } from "../../machines/TestConjectureMachine";


export const getPoseDataByConjUUID = async (UUID) => {
    try {
        const conjectureData = await getConjectureDataByUUID(UUID);
        let conjectureKey;
        for (const key in conjectureData) {
        if (key.startsWith('Conjecture')) {
            conjectureKey = key;
            break;
        }
        }
        return conjectureData[conjectureKey]['Start Pose']['poseData'];
    } catch (error) {
        throw error;
    }
};


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

        <RectButton
            height={height * 0.13}
            width={width * 0.26}
            x={width * 0.35}
            y={height * 0.93}
            color={black}
            fontSize={width * 0.015}
            fontColor={white}
            text={"TEST Pose UUID"}
            fontWeight={800}
            callback={() => {
            const UUID = "15ff9cc4-f39d-4db9-be04-bcad5907f876"; // nates user id
            getPoseDataByConjUUID(UUID).then((poseData) => {
                console.log('Pose Data:', poseData);
            }).catch((error) => {
                console.error('Error getting pose data: ', error);
                    }
                );
            }}
        />

    </>
    );



};

export default TestConjectureModule;