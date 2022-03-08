console.log (`Starting the extension`);

disableCategories ();
processDashPage();

function disableCategories() {

  document.querySelectorAll("#internal_note_category option").forEach((item) => {
    if (item.value.toLowerCase() != "design" && item.value.toLowerCase() != "design policy") {
      item.disabled = true;
    }
  });

}

function insertBefore(el, referenceNode) {
  referenceNode.parentNode.insertBefore(el, referenceNode);
}

function processCard () {
  const designTime = document.querySelector('dd#design-time');
  let designTimeUsed = designTime.textContent.toString().replace("\n      ", "");
  designTimeUsed = designTimeUsed.replace (/minutes| |\n.*/g, "")
  const designTimeToDate = Number (designTimeUsed);
  const card6 = document.querySelector ('.ui-card.box-card:nth-child(6)');
  const card3 = document.querySelector ('.ui-card.box-card:nth-child(3)');

  card6.style.color = "#fff";
  card6.style.boxShadow = "-4px 4px 10px #645d5d";

  if (designTimeUsed >= 60) {
    card6.style.backgroundColor = "#d72c2c";
  } else if (designTimeUsed >= 45) {
    card6.style.backgroundColor = "#f5a614";
  } else {
    card6.style.backgroundColor = "#008060";
  }


  insertBefore(card6, card3);

}

///////////// Process the Dash page to find design time /////////////////
function processDashPage() {

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((addedNode) => {
          const addedNodeId = addedNode.id;
          if (addedNodeId == 'active-subscription-card') {
             observer.disconnect;
             processCard();
          }
          
        });
    });
  });
  
  observer.observe(document.querySelector(".ui-layout__section--secondary"), { subtree: true, childList: true });

}
