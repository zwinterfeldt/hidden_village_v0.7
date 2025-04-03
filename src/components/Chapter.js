import CursorMode from "./CursorMode.js";
import Background from "./Background.js";
import Character from "./Character.js";
import TextBox from "./TextBox.js";
import Pose from "./Pose/index.js";
import { useEffect, useState } from "react";
import { useMachine, useSelector, assign } from "@xstate/react";
import ChapterMachine from "../machines/chapterMachine.js";
import { Sprite } from "@inlet/react-pixi";
import Experiment from "./Experiment.js";
import script from "../scripts/chapters.toml";

const characterRenderOrder = {
  aboveground: 1,
  background: 2,
  midground: 3,
  foreground: 4,
};

const defaultFacePositions = {
  circle: [-20, -30],
  equilateralTriangle: [50, 0],
  rectangle: [70, 50],
  scaleneTriangle: [5, 100],
  trapezoid: [70, 50],
  square: [70, 50],
};

const defaultHeights = {
  circle: 0.1,
  equilateralTriangle: 0.2,
  rectangle: 0.5,
  scaleneTriangle: 0.2,
  trapezoid: 0.15,
  square: 0.3,
};

import { pink, blue, green } from "../utils/colors.js";
const colorMap = {
  pink: pink,
  blue: blue,
  green: green,
};

export const idToSprite = {
  // "circle": "../assets/circle.png",
  player: new URL("../assets/player_sprite.png", import.meta.url).href,
  equilateralTriangle: new URL(
    "../assets/equilateralTriangle_sprite.png",
    import.meta.url
  ).href,
  circle: new URL("../assets/circle_sprite.png", import.meta.url).href,
  square: new URL("../assets/square_sprite.png", import.meta.url).href,
  trapezoid: new URL("../assets/trapezoid_sprite.png", import.meta.url).href,
  scaleneTriangle: new URL(
    "../assets/scaleneTriangle_sprite.png",
    import.meta.url
  ).href,
  rectangle: new URL("../assets/rectangle_sprite.png", import.meta.url).href,
};

const createScene = (sceneConfig, columnDimensions, rowDimensions) => {
  return sceneConfig
    .sort((a, b) => {
      return (
        characterRenderOrder[a.distance] - characterRenderOrder[b.distance]
      );
    })
    .map((characterConfig, idx) => {
      let placementText = characterConfig.distance
        ? characterConfig.distance
        : "foreground";
      placementText += characterConfig.placement
        ? ` ${characterConfig.placement}`
        : " left";
      return (
        <Character
          type={characterConfig.id}
          color={colorMap[characterConfig.color]}
          placementText={placementText}
          facePosition={
            characterConfig.facePosition ||
            defaultFacePositions[characterConfig.id]
          }
          height={columnDimensions.height * defaultHeights[characterConfig.id]}
          mood={characterConfig.mood}
          rowDimensions={rowDimensions}
          colDimensions={columnDimensions}
          key={characterConfig.id}
        />
      );
    });
};

const selectCurrentText = (state) => state.context.currentText;
const selectCursorMode = (state) => state.context.cursorMode;

const Chapter = (props) => {
  const {
    rowDimensions,
    columnDimensions,
    height,
    width,
    poseData,
    chapterConjecture,
    nextChapterCallback,
    currentConjectureIdx,
  } = props;
<<<<<<< HEAD
  let context;
  if (script[`chapter-${currentConjectureIdx + 1}`]) {
    const { intro, outro, scene } =
      script[`chapter-${currentConjectureIdx + 1}`];
    context = {
      introText: intro && intro.length > 0 ? intro : [{ speaker: "player", text: "This is a fallback intro to confirm it's rendering!" }],
      outroText: outro ? outro : [],
      scene: scene ? scene : [],
      currentText: null,
      lastText: [],
      cursorMode: true,
    };
  } else {
    context = {
      introText: [{ speaker: "player", text: "This is a fallback intro to confirm it's rendering!" }],
      outroText: [],
      scene: [],
      currentText: null,
      lastText: [],
      cursorMode: true,
    };
  }
=======
  
  // Replace static script context with dynamic state
  const [dialogueData, setDialogueData] = useState({
    intro: [],
    outro: [],
    scene: []
  });
  
>>>>>>> a3744c68a99458414212529334b949bb3809e0db
  const [characters, setCharacters] = useState(undefined);
  const [displayText, setDisplayText] = useState(null);
  const [speaker, setSpeaker] = useState(null);
  const [currentConjecture, setCurrentConjecture] = useState(chapterConjecture);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize with empty context
  let context = {
    introText: dialogueData.intro || [],
    outroText: dialogueData.outro || [],
    scene: dialogueData.scene || [],
    currentText: null,
    lastText: [],
    cursorMode: true,
  };

  const [state, send, service] = useMachine(ChapterMachine, { context });
  const currentText = useSelector(service, selectCurrentText);
  const cursorMode = useSelector(service, selectCursorMode);

  // New effect to load dialogues from Firebase
  useEffect(() => {
    const loadDialogues = async () => {
      setIsLoading(true);
      const gameId = Curriculum.getCurrentUUID();
      if (!gameId) {
        console.warn("No valid game ID found. Cannot load dialogues.");
        setIsLoading(false);
        return;
      }

      try {
        const allDialogues = await loadGameDialoguesFromFirebase(gameId);
        if (allDialogues) {
          // Format current chapter name
          const currentChapterName = `chapter-${currentConjectureIdx + 1}`;
          
          // Filter dialogues for current chapter
          const chapterDialogues = allDialogues.filter(
            dialogue => dialogue.chapter === currentChapterName
          );
          
          // Separate intros and outros
          const intros = chapterDialogues
            .filter(dialogue => dialogue.type === "Intro")
            .map(dialogue => ({ 
              text: dialogue.text, 
              speaker: dialogue.character || "player"
            }));
            
          const outros = chapterDialogues
            .filter(dialogue => dialogue.type === "Outro")
            .map(dialogue => ({
              text: dialogue.text, 
              speaker: dialogue.character || "player"
            }));
          
          // For scene, we'll use a default or extract from dialogues if available
          const scene = [];
          // You might want to define a method to create scene data from dialogues
          
          setDialogueData({
            intro: intros,
            outro: outros,
            scene: scene
          });
          
          // Update the state machine with the new data
          send({
            type: "RESET_CONTEXT",
            introText: intros,
            outroText: outros,
            scene: scene,
            currentText: null,
            lastText: [],
            cursorMode: true,
          });
        }
      } catch (error) {
        console.error("Error loading dialogues:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDialogues();
  }, [currentConjectureIdx]); // Reload when chapter changes

  useEffect(() => {
    if (dialogueData.scene && !isLoading) {
      setCharacters(
        createScene(state.context.scene, columnDimensions(1), rowDimensions(1))
      );
    }
  }, [dialogueData, isLoading]);

  useEffect(() => {
    setCurrentConjecture(chapterConjecture);
  }, [chapterConjecture]);

  // Remove the old effect that used script data
  /* useEffect(() => {
    let [intro, outro, scene] = [[], [], []];
    if (script[`chapter-${currentConjectureIdx + 1}`]) {
      intro = script[`chapter-${currentConjectureIdx + 1}`].intro
        ? script[`chapter-${currentConjectureIdx + 1}`].intro
        : [];
      outro = script[`chapter-${currentConjectureIdx + 1}`].outro
        ? script[`chapter-${currentConjectureIdx + 1}`].outro
        : [];
      scene = script[`chapter-${currentConjectureIdx + 1}`].outro
        ? script[`chapter-${currentConjectureIdx + 1}`].outro
        : [];
    }
    send({
      type: "RESET_CONTEXT",
      introText: intro,
      outroText: outro,
      scene: scene,
      currentText: null,
      lastText: [],
      cursorMode: true,
    });
  }, [currentConjectureIdx]); */

  // Effect to update the current text being displayed
  useEffect(() => {
    const subscription = service.subscribe((state) => {
      if (state.context.currentText) {
        setDisplayText(state.context.currentText.text);
      }
    });

    return subscription.unsubscribe;
  }, [service]);

  useEffect(() => {
    if (characters && currentText) {
      setSpeaker(
        <Sprite
          image={idToSprite[currentText.speaker]}
          x={0}
          y={0}
          anchor={0}
        />
      );
    }
  }, [characters, currentText]);

  // Show loading state
  if (isLoading) {
    return (
      <>
        <Background height={height} width={width} />
        <TextBox
          text="Loading chapter data..."
          rowDimensionsCallback={rowDimensions}
        />
      </>
    );
  }

  // Rest of the component remains the same
  return (
    <>
      <Background height={height} width={width} />
      {characters}
      {["intro", "outro", "loadingNextChapter"].includes(state.value) && (
        <Pose poseData={poseData} colAttr={columnDimensions(3)} />
      )}
      {/* Rest of JSX unchanged */}
    </>
  );
};

export default Chapter;