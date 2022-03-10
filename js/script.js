
// Helper Functions
//**********************************************************************************************

// Insert a node before another one
//=================================
function insertBefore(el, referenceNode) {
  referenceNode.parentNode.insertBefore(el, referenceNode);
}

// Insert a node after another one
//================================
function insertAfter(newNode, existingNode) {
  existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

//**********************************************************************************************

// Find the theme name
//====================
function findTheme () {
  const sections = document.querySelectorAll ('.ui-layout__section.ui-layout__section--primary .ui-card');
  let section;
  // Have to use an ordinary loop because the breaks statement not allow in forEach
  for (let i = 0; i < sections.length; i++) {
    const sect = sections[i];
    const firstLink = sect.querySelector ('a');
    if (firstLink && firstLink.getAttribute('href') == '#themes') {
      section = sect;
      break;
    }
  }
  const themes = section.querySelectorAll ('a');
  const theme = themes[2];
  themeName = theme.textContent.replace ('(opens a new window)', '').trim ();
}

// Disable all categories in the dropdown except for Design and Design Policy
//===========================================================================
function disableCategories() {

  document.querySelectorAll("#internal_note_category option").forEach((item) => {
    if (item.value.toLowerCase() != "design" && item.value.toLowerCase() != "design policy") {
      item.disabled = true;
    }
  });

}

// Get the design time and design
//===============================
function processCard () {

  const designTime = document.querySelector('dd#design-time');
  let designTimeUsed = designTime.textContent.toString().replace("\n      ", "");
  designTimeUsed = designTimeUsed.replace (/minutes| |\n.*/g, "")
//  designTimeUsed = designTimeUsed.match(/\d/g);
  const designTimeToDate = Number (designTimeUsed);
  const card6 = document.querySelector ('.ui-card.box-card:nth-child(6)');
  const card3 = document.querySelector ('.ui-card.box-card:nth-child(3)');

  // Set the card shadow and text colour
  //====================================
  card6.style.color = "#fff";
  card6.style.boxShadow = "-4px 4px 10px #645d5d";

  // Make the background colour of the card contingent on the time used
  // < 45 minutes: green, >= 45 and < 60: orange, >=60: red
  //===================================================================
  console.log(`designTimeToDate: ${typeof designTimeToDate}`);
  console.log(`designTimeToDate: ${designTimeToDate}`);
  console.log(`designTimeUsed: ${designTimeUsed}`);
  if (designTimeToDate >= 60) {
    card6.style.backgroundColor = "#d72c2c";
  } else if (designTimeToDate >= 45) {
    card6.style.backgroundColor = "#f5a614";
  } else {
    card6.style.backgroundColor = "#008060";
  }

  // Relocate the Design Time card to the top of the screen
  //=======================================================
  insertBefore(card6, card3);

  // Now add the Theme name to the Design Time card (card6)
  //=======================================================
  designTimeParent = designTime.parentNode;
  const themeHeaderNode = document.createElement('dt');
  themeHeaderNode.style = 'margin-top: 7px;';
  const themeNameNode = document.createElement('dd');
  themeHeaderNode.textContent = `Theme:`;
  themeNameNode.textContent = themeName;
  insertAfter(themeHeaderNode, designTimeParent.lastElementChild);
  insertAfter(themeNameNode, designTimeParent.lastElementChild);

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

// Main processing processing
//===========================
let themeName;

findTheme ();
disableCategories ();
processDashPage();
//============================
//  End of main processing
