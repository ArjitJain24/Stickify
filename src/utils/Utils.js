export const autoGrow = (textAreaRef) => {
  const { current } = textAreaRef;
  current.style.height = "0"; // reset the height
  current.style.height = current.scrollHeight + "px"; // set the new height
};

export const setNewOffset = (current, mouseMoveDirection = { x: 0, y: 0 }) => {
  const newX = current.offsetLeft - mouseMoveDirection.x;
  const newY = current.offsetTop - mouseMoveDirection.y;
  return { x: newX < 0 ? 0 : newX, y: newY < 0 ? 0 : newY };
};

export const setZIndex = (selectedCard) => {
  selectedCard.style.zIndex = 999;

  Array.from(document.getElementsByClassName("card")).forEach((card) => {
    if (card !== selectedCard) {
      card.style.zIndex = selectedCard.style.zIndex - 1;
    }
  });
};

export const bodyParser = (value) => {
  try {
    // a valid json string
    return JSON.parse(value);
  } catch (error) {
    // not a valid json string so just return the value
    return value;
  }
};
