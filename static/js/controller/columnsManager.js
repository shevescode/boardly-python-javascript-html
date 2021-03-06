import {dataHandler} from "../data/dataHandler.js";
import {buttonTypes, htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager, mode} from "../view/domManager.js";
import {buttonsManager} from "./buttonsManager.js";
import {cardsManager} from "./cardsManager.js";

export let columnsManager = {
    loadColumnTemplate: function (boardId, columnId, selectedMode, position) {
        const columnBuilder = htmlFactory(htmlTemplates.column);
        const loadedColumn = columnBuilder(boardId, columnId);
        if (selectedMode === mode.appendLast) {
            domManager.addChild(`#board-${boardId}-column-container`, loadedColumn);
        } else if (selectedMode === mode.insertBeforeLast) {
            domManager.insertBeforeLast(`#board-${boardId}-column-container`, loadedColumn);
        } else if (selectedMode === mode.insertBeforePosition) {
            domManager.insertBeforePosition(`#board-${boardId}-column-container`, loadedColumn, position);
        }
    },
    loadColumnContent: function (boardId, columnId, columnName, selectedMode, position){
        this.loadColumnTemplate(boardId, columnId, selectedMode, position);
        buttonsManager.createAddCardButton(boardId, columnId);
        buttonsManager.createColumnNameButtonGroup(boardId, columnId, "");
        domManager.setInnerHTML(`#board-${boardId}-column-${columnId}-name`, columnName);
    },
    createPlaceholderColumns: function (boardData){
        const boardId = boardData['id'];
        for (let columnId of boardData['statuses']){
            this.loadColumnTemplate(boardId, columnId, mode.appendLast);
            buttonsManager.createAddCardButton(boardId, columnId, true);
            buttonsManager.createColumnNameButtonGroup(boardId, columnId, true);
            domManager.disableButton(`#settings-board-${boardId}-column-${columnId}`);
            cardsManager.createPlaceholderCards(boardId, columnId);
        }
        buttonsManager.createAddColumnButton(boardId, true);
    },
    createNewColumn: async function (name, formContainer, columnContainer) {
        const boardId = columnContainer.parentElement.dataset.boardId;
        const payload = {'title': name, 'board_id': boardId};
        const boardData = await dataHandler.createNewColumn(payload);
        domManager.removeElement(`#${formContainer.id}`);
        buttonsManager.createAddColumnButton(boardId);
        if (boardData['status'] !== 'ok') {
            return;
        }
        const columnId = boardData['id'];
        const columnName = boardData['title'];
        this.loadColumnContent(boardId, columnId, columnName, mode.insertBeforeLast);
    },
    changeColumnName: async function (newName, oldName, parent, targetForm) {
        const boardId = parent.dataset.boardId;
        const columnId = parent.dataset.columnId;
        const payload = {'column_id': columnId, 'board_id': boardId, 'title': newName};
        const boardData = await dataHandler.changeColumnName(payload);

        domManager.removeElement(`#${targetForm.id}`);
        buttonsManager.createColumnNameButtonGroup(boardId, columnId);

        if (boardData['status'] === 'empty_title') {
            domManager.setInnerHTML(`#board-${boardId}-column-${columnId}-name`, oldName);

        } else if (boardData['status'] === 'ok'){
            domManager.setInnerHTML(`#board-${boardId}-column-${columnId}-name`, newName);

        } else if (boardData['status'] === 'id_change'){
            const cards = boardData['cards'];
            domManager.removeElement(`#board-${boardId}-column-${columnId}-container`);
            this.loadColumnContent(boardId, boardData['column_id'], newName, mode.insertBeforePosition, boardData['position']);
            for (let card of cards) {
                cardsManager.loadCardContent(boardId, boardData['column_id'], card['id'], card['title'], mode.appendLast);
            }
        }
    },
    deleteColumn: async function (boardId, columnId) {
        const payload = {'column_id': columnId, 'board_id': boardId};
        await dataHandler.deleteColumn(payload);
        domManager.removeElement(`#board-${boardId}-column-${columnId}-container`);
    }
}
