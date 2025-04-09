import React, { useState, useEffect } from 'react';
import { Text } from "@inlet/react-pixi";
import { TextStyle } from "@pixi/text";
import { white, black } from "../../utils/colors";
import InputBox from "../InputBox";
import RectButton from "../RectButton";
import { blue, red, green, orange, pink, } from "../../utils/colors";

// =========== HANDLER FUNCTIONS ===========

function handleCurricularName(key) {
  const existingValue = localStorage.getItem(key);
  const newValue = prompt("Please name your Game:", existingValue);
  if (newValue !== null) {
    localStorage.setItem(key, newValue);
  }
}

function handleCurricularKeywords(key) {
  const existingValue = localStorage.getItem(key);
  const newValue = prompt("Keywords make your search easier:", existingValue);
  if (newValue !== null) {
    localStorage.setItem(key, newValue);
  }
}

function handleCurricularAuthor(key) {
  const existingValue = localStorage.getItem(key);
  const newValue = prompt("Please add an Author name:", existingValue);
  if (newValue !== null) {
    localStorage.setItem(key, newValue);
  }
}

function handlePinInput(key) {
  let pin = prompt("Enter a code PIN", localStorage.getItem(key));
  if (pin && !isNaN(pin)) {
    localStorage.setItem(key, pin);
  } else if (pin !== null) {
    alert("PIN must be numeric.");
  }
}
// =========== CREATOR FUNCTIONS ===========

function createInputBox(
  charLimit,
  scaleFactor,
  widthMultiplier,
  xMultiplier,
  yMultiplier,
  textKey,
  totalWidth,
  totalHeight,
  callback
) {
  const existingValue = localStorage.getItem(textKey) || "undefined";
  const truncatedValue =
    existingValue.slice(0, charLimit) +
    (existingValue.length > charLimit ? "..." : "");

  const boxHeight = totalHeight * scaleFactor;
  const boxWidth = totalWidth * widthMultiplier;
  const xPos = totalWidth * xMultiplier;
  const yPos = totalHeight * yMultiplier;

  return (
    <InputBox
      key={textKey}
      height={boxHeight}
      width={boxWidth}
      x={xPos}
      y={yPos}
      color={white}
      fontSize={totalWidth * 0.012}
      fontColor={black}
      text={truncatedValue}
      fontWeight={500}
      outlineColor={black}
      callback={() => callback(textKey)}
    />
  );
}

function createTextElement(
  text,
  xMultiplier,
  yMultiplier,
  fontSizeMultiplier,
  totalWidth,
  totalHeight
) {
  return (
    <Text
      key={text}
      text={text}
      x={totalWidth * xMultiplier}
      y={totalHeight * yMultiplier}
      style={
        new TextStyle({
          align: "left",
          fontFamily: "Arial",
          fontSize: totalWidth * fontSizeMultiplier,
          fontWeight: "bold",
          fill: [blue],
        })
      }
    />
  );
}

/**
 * If you want to display a list of Conjectures in your Story Editor,
 * copy the logic from your CurricularModuleBoxes. If not, remove this entire function.
 */
function drawCurriculum(
  xMultiplier,
  yMultiplier,
  fontSizeMultiplier,
  totalWidth,
  totalHeight,
  conjectureCallback
) {
  // Example logic for pagination
  const [currentPage, setCurrentPage] = useState(0);

  // If you still want to reference Curriculum, uncomment:
  // const conjectureList = Curriculum.getCurrentConjectures();
  // For now, let's assume an empty array to avoid errors:
  const conjectureList = [];

  const conjecturesPerPage = 6;
  const totalPages = Math.ceil(conjectureList.length / conjecturesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = currentPage * conjecturesPerPage;
  const currentConjectures = conjectureList.slice(
    startIndex,
    startIndex + conjecturesPerPage
  );

  if (conjectureList.length === 0) {
    return null;
  }

  // Example UI
  return (
    <>
      {currentConjectures.map((conjecture, index) => (
        <RectButton
          key={`author-${index}`}
          height={totalHeight / 2 * yMultiplier}
          width={totalWidth * xMultiplier * 4}
          x={totalWidth * xMultiplier * 0.25}
          y={
            totalHeight * (index + 1) * 4 * fontSizeMultiplier +
            totalHeight * yMultiplier
          }
          color={white}
          fontSize={totalWidth * (fontSizeMultiplier / 1.3)}
          fontColor={blue}
          text={conjecture["Text Boxes"]["Author Name"] || "No Author"}
          fontWeight="bold"
          callback={() => {
          }}
        />
      ))}
      {/* Additional columns or buttons (move up/down, remove) as needed... */}

      <RectButton
        height={totalHeight * 0.13}
        width={totalWidth * 0.26}
        x={totalWidth * 0.02}
        y={totalHeight * 0.93}
        color={blue}
        fontSize={totalWidth * 0.014}
        fontColor={white}
        text={"PREVIOUS"}
        fontWeight={800}
        callback={prevPage}
      />
      <RectButton
        height={totalHeight * 0.13}
        width={totalWidth * 0.26}
        x={totalWidth * 0.14}
        y={totalHeight * 0.93}
        color={blue}
        fontSize={totalWidth * 0.014}
        fontColor={white}
        text={"NEXT"}
        fontWeight={800}
        callback={nextPage}
      />
    </>
  );
}

// =========== MAIN COMPONENT (COPY OF CurricularContentEditor) ===========

export const StoryEditorContentEditor = (props) => {
  const { height, width, conjectureCallback, dialogues, onMoveUp, onMoveDown, 
          onAddDialogue, onRemoveDialogue, onEditDialogue, onChangeType, idToSprite,
          onChangeCharacter, chapters, onChangeChapter,} = props;
  
  //Local state to track which row is open for Character
  const [openDropdownIndex, setOpenDropdownIndex] = useState(-1);

  //Local state to track which row is open for Chapter
  const [openDropdownIndexChapter, setOpenDropdownIndexChapter] = useState(-1);

  //Array of all sprite keys
  const allSprites = Object.keys(idToSprite);
  
  return (
    <>
      {createInputBox(
        60,
        0.10,
        0.55,
        0.123 + 0.10,
        0.136 - 0.03,
        "CurricularName",
        width,
        height,
        handleCurricularName
      )}
      {createInputBox(
        180,
        0.10,
        1,
        0.21,
        0.17,
        "CurricularKeywords",
        width,
        height,
        handleCurricularKeywords
      )}
      {createInputBox(
        220,
        0.10,
        0.8,
        0.46 + 0.09,
        0.136 - 0.03,
        "CurricularAuthor",
        width,
        height,
        handleCurricularAuthor
      )}
      {createInputBox(
        4,
        0.10,
        0.3,
        0.73,
        0.175,
        "CurricularPIN",
        width,
        height,
        handlePinInput
      )}

      {/* For the text input boxes */}
      {createTextElement("Story Editor", 0.43, 0.03, 0.025, width, height)}
      {createTextElement("Keywords:", 0.11, 0.17, 0.018, width, height)}
      {createTextElement("Pin:", 0.69, 0.17, 0.018, width, height)}
      {createTextElement("Author:", 0.48, 0.105, 0.018, width, height)}
      {createTextElement("Game Name:", 0.11, 0.10, 0.018, width, height)}

      {/* To label the narritives */}
      {createTextElement("Chapter", 0.04, 0.32, 0.015, width, height)}
      {createTextElement("Character", 0.13, 0.32, 0.015, width, height)}
      {createTextElement("In/Out", 0.25, 0.32, 0.015, width, height)}
      {createTextElement("Dialogue Preview", 0.45, 0.32, 0.015, width, height)}

      {/* ========== DIALOGUE ROWS ========== */}
      {dialogues?.map((dialogue, index) => {
        const rowY = 0.40 + index * 0.06; // adjust spacing as needed

        return (
          <React.Fragment key={index}>

            {/* Example: Dialogue text preview */}
            <RectButton
              height={height * 0.1}
              width={width * 1}
              x={width * 0.31}
              y={height * rowY}
              color={white}
              fontSize={width * 0.015}
              fontColor={black}
              text={
                dialogue.text.length > 40
                  ? dialogue.text.slice(0, 40) + "..."
                  : dialogue.text
              }
              fontWeight={500}
              callback={() => onEditDialogue(index)}
            />
            {/* Intro/Outro */}
            <RectButton
              height={height * 0.1}
              width={width * .15}
              x={width * 0.245}
              y={height * rowY}
              color={white}
              fontSize={width * 0.015}
              fontColor={black}
              text={`${dialogue.type} ▼`}
              fontWeight={500}
              callback={() => onChangeType(index)}
            />

            {/* ========== Character Button & Dropdown ========== */}
            <RectButton
              height={height * 0.1}
              width={width * .365}
              x={width * 0.0945}
              y={height * rowY}
              color={white}
              fontSize={width * 0.015}
              fontColor={black}
              text={`${dialogue.character || 1} ▼`}
              fontWeight={500}
              callback={() => {
                // If the dropdown is already open for this row, close it; otherwise open it
                setOpenDropdownIndex(openDropdownIndex === index ? -1 : index);
              }}
            />
            {/* If openDropdownIndex === index, show the dropdown menu */}
            {openDropdownIndex === index && (
              <React.Fragment>
                {allSprites.map((charID, spriteIdx) => {
                  // For each possible character, render a small button
                  return (
                    <RectButton
                      key={charID}
                      height={height * 0.1}
                      width={width * .365}
                      x={width * 0.0945}
                      y={
                        // place each item below the "Character" button
                        // e.g. rowY + spriteIdx * (some vertical spacing)
                        (height * rowY) +
                        (spriteIdx + 1) * (height * 0.04)
                      }
                      color={white}
                      fontSize={width * 0.012}
                      fontColor={0x000000}
                      text={charID}
                      callback={() => {
                        // Call parent handler to update the character
                        onChangeCharacter(index, charID);
                        // Close dropdown
                        setOpenDropdownIndex(-1);
                      }}
                    />
                  );
                })}
              </React.Fragment>
            )}
            
            {/* ========== Chapter Button & Dropdown ========== */}
            <RectButton
              height={height * 0.1}
              width={width * 0.1}
              x={width * 0.05}
              y={height * rowY}
              color={white}
              fontSize={width * 0.015}
              fontColor={black}
              // show the current dialogue.chapter or default "1"
              text={`${dialogue.chapter || "1"} ▼`}
              fontWeight={500}
              callback={() => {
                // Toggle the chapter dropdown
                setOpenDropdownIndexChapter(
                  openDropdownIndexChapter === index ? -1 : index
                );
              }}
            />

            {/* If openDropdownIndexChapter === index, show the chapters */}
            {openDropdownIndexChapter === index && chapters && (
              <React.Fragment>
                {chapters.map((chVal, chIdx) => {
                  // chVal is numberic, e.g. 1, 2, 3
                  return (
                    <RectButton
                      key={chVal}
                      height={height * 0.1}
                      width={width * 0.1}
                      x={width * 0.05}
                      y={(height * rowY) + (chIdx + 1) * (height * 0.04)}
                      color={white}
                      fontSize={width * 0.012}
                      fontColor={0x000000}
                      text={String(chVal)}
                      callback={() => {
                        onChangeChapter(index, chVal);
                        setOpenDropdownIndexChapter(-1);
                      }}
                    />
                  );
                })}
              </React.Fragment>
            )}

            {/* Remove button */}
            <RectButton
              height={height * 0.1}
              width={width * 0.2}
              x={width * 0.87}
              y={height * rowY}
              color={orange}
              fontSize={width * 0.01}
              fontColor={white}
              text={"Remove"}
              fontWeight ={800}
              callback={() => onRemoveDialogue(index)}
            />
            <RectButton
            height={height * 0.1}
            width={width * 0.15}
            x={width * 0.715}
            y={height * rowY}
            color={pink}
            fontSize={width * 0.01}
            fontColor={white}
            text={"Edit"}
            fontWeight={800}
            callback={null}
          />
          <RectButton
              height={height * 0.1}
              width={width * 0.1}
              x={width * 0.825}
              y={height * rowY}
              color={red}
              fontSize={width * 0.01}
              fontColor={white}
              text={"V"}
              fontWeight={800}
              callback={() => onMoveDown(index)}
          />
          <RectButton
              height={height * 0.1}
              width={width * 0.1}
              x={width * 0.78}
              y={height * rowY}
              color={green}
              fontSize={width * 0.01}
              fontColor={white}
              text={"Λ"}
              fontWeight={800}
              callback={() => onMoveUp(index)}
          />
          </React.Fragment>
        );
      })}
    </>
  );
};
