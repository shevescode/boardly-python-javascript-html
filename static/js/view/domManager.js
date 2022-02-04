export let domManager = {
    addChild(parentIdentifier, childContent) {
        const parent = document.querySelector(parentIdentifier);
        if (parent) {
            parent.appendChild(childContent)
        } else {
            console.error("could not find such html element: " + parentIdentifier);
        }
    },
    insertFirstChild(parentIdentifier, childContent) {
        const parent = document.querySelector(parentIdentifier);
        if (parent) {
            parent.insertBefore(childContent, parent.children[0]);
        } else {
            console.error("could not find such html element: " + parentIdentifier);
        }
    },
    insertSecondChild(parentIdentifier, childContent) {
        const parent = document.querySelector(parentIdentifier);
        if (parent) {
            parent.insertBefore(childContent, parent.children[1]);
        } else {
            console.error("could not find such html element: " + parentIdentifier);
        }
    },
    insertBeforeLast(parentIdentifier, childContent){
        const parent = document.querySelector(parentIdentifier);
        if (parent) {
            parent.insertBefore(childContent, parent.children[parent.children.length - 1]);
        } else {
            console.error("could not find such html element: " + parentIdentifier);
        }
    },
    insertAtPosition(parentIdentifier, childContent, position) {
        const parent = document.querySelector(parentIdentifier);
        if (parent) {
            parent.insertBefore(childContent, parent.children[position]);
        } else {
            console.error("could not find such html element: " + parentIdentifier);
        }
    },
    enableButton(elementIdentifier){
        const element = document.querySelector(elementIdentifier);
        if (element) {
            element.classList.remove('disabled');
        } else {
            console.error("could not find such html element: " + elementIdentifier);
        }
    },
    disableButton(elementIdentifier){
        const element = document.querySelector(elementIdentifier);
        if (element) {
            element.classList.add('disabled');
        } else {
            console.error("could not find such html element: " + elementIdentifier);
        }
    },
    setDataLoaded(elementIdentifier){
        const element = document.querySelector(elementIdentifier);
        if (element) {
            element.setAttribute('data-loaded', 'true');
        } else {
            console.error("could not find such html element: " + elementIdentifier);
        }
    },
    purgeContainer(elementIdentifier){
        const element = document.querySelector(elementIdentifier);
        if (element) {
            element.innerHTML = "";
        } else {
            console.error("could not find such html element: " + elementIdentifier);
        }
    },
    removeElement(elementIdentifier){
        const element = document.querySelector(elementIdentifier);
        if (element) {
            element.remove()
        } else {
            console.error("could not find such html element: " + elementIdentifier);
        }
    },
    setInnerHTML(elementIdentifier, content){
        const element = document.querySelector(elementIdentifier);
        if (element) {
            element.innerHTML = content;
        } else {
            console.error("could not find such html element: " + elementIdentifier);
        }
    },
    addEventListener(elementIdentifier, eventType, eventHandler) {
        const parent = document.querySelector(elementIdentifier);
        if (parent) {
            parent.addEventListener(eventType, eventHandler);
        } else {
            console.error("could not find such html element: " + elementIdentifier);
        }
    },
    setDraggable(elementIdentifier) {
        const parent = document.querySelector(elementIdentifier);
        if (parent) {
            parent.setAttribute('draggable', "true");
        } else {
            console.error("could not find such html element: " + elementIdentifier);
        }
    },
    setOnDragStartHandler(elementIdentifier, onDragStartHandler) {
        const parent = document.querySelector(elementIdentifier);
        if (parent) {
            parent.ondragstart = onDragStartHandler;
        } else {
            console.error("could not find such html element: " + elementIdentifier);
        }
    },
    setOnDragEndHandler(elementIdentifier, onDragEndHandler) {
        const parent = document.querySelector(elementIdentifier);
        if (parent) {
            parent.ondragend = onDragEndHandler;
        } else {
            console.error("could not find such html element: " + elementIdentifier);
        }
    },
    setDraggedElement(elementIdentifier){
        const draggedElement = document.querySelector(elementIdentifier);
        if (draggedElement) {
            draggedElement.style = `width: ${draggedElement.offsetWidth}px`;
            draggedElement.style.top = "-1000px";
            draggedElement.classList.add('position-absolute');
        } else {
            console.error("could not find such html element: " + elementIdentifier);
        }
    },
    addCardHoverHalfZones(cardIdentifier, topHalfZone, bottomHalfZone){
        const card = document.querySelector(cardIdentifier);
        if (card) {
            card.appendChild(topHalfZone)
            card.appendChild(bottomHalfZone)
        } else {
            console.error("could not find such html element: " + cardIdentifier);
        }
    }
};

export const mode = {
    appendLast: 'append',
    insertBeforeLast: 'insert before last',
    insertAtPosition: 'insert at position'
}
