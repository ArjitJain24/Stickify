export const autoGrow = (textAreaRef) => {
  const { current } = textAreaRef;
  current.style.height = "0"; // reset the height
  current.style.height = current.scrollHeight + "px"; // set the new height
};

export const setZIndex = (selectedCard) => {
  selectedCard.style.zIndex = 999;

  Array.from(document.getElementsByClassName("card")).forEach((card) => {
    if (card !== selectedCard) {
      card.style.zIndex = selectedCard.style.zIndex - 1;
    }
  });
};