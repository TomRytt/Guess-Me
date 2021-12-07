var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
const STORAGE_KEY = 'questDB';

function createQuestsTree() {
	var questions = loadFromStorage(STORAGE_KEY);
	if (!questions) {
		questions = createQuest('Male?');
		questions.yes = createQuest('Gandhi');
		questions.no = createQuest('Rita');
	}
	gQuestsTree = questions;
	gCurrQuest = gQuestsTree;
	gPrevQuest = null;
	_saveQuestionsToStorage();
}

function createQuest(txt) {
	return {
		txt: txt,
		yes: null,
		no: null,
	};
}

function isChildless(node) {
	return node.yes === null && node.no === null;
}

function moveToNextQuest(res) {
	// TODO: update the gPrevQuest, gCurrQuest global vars
	gPrevQuest = gCurrQuest;
	gCurrQuest = gCurrQuest[res];
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
	const nextQuest = createQuest(newQuestTxt);
	nextQuest.yes = createQuest(newGuessTxt);
	nextQuest.no = gCurrQuest;
	gPrevQuest[lastRes] = nextQuest;
	_saveQuestionsToStorage();
	gCurrQuest = gQuestsTree;

	// TODO: Create and Connect the 2 Quests to the quetsions tree
}

function getCurrQuest() {
	return gCurrQuest;
}

function _saveQuestionsToStorage() {
	saveToStorage(STORAGE_KEY, gQuestsTree);
}
