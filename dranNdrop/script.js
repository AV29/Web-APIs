function addListenersForDragging(element) {
    element.addEventListener('dragstart', handleDragStart);
    element.addEventListener('drag', handleDrag);
    element.addEventListener('dragend', handleDragEnd);
}

document.querySelectorAll('.draggable-item').forEach(addListenersForDragging);

document.querySelectorAll('.drop-target').forEach(function (element) {
    element.addEventListener('drop', handleDrop);
    element.addEventListener('dragover', handleDragOver);
    element.addEventListener('dragleave', handleDragLeave);
});

function handleDragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
    event.target.classList.add('is-drag-started');
    //event.dataTransfer.setDragImage(document.getElementById("panel"), 20, 20);
    //event.dataTransfer.dropEffect = "move";
}

function handleDragOver(event) {
    event.preventDefault(); // preventing touch and pointer events
    event.target.classList.add('is-over');
    event.dataTransfer.dropEffect = "move";
}

function handleDrop(event) {
    event.preventDefault();
    const dataItems = event.dataTransfer.items; //DataTransferItemList object
    for (let i = 0; i < dataItems.length; i += 1) {
        if (dataItems[i].kind === 'string' && dataItems[i].type.match('^text/plain')) {
            dataItems[i].getAsString(function (s) {
                console.log("... Drop: Text");
                event.target.appendChild(document.getElementById(s));
            });
        } else if (dataItems[i].kind === 'string' && dataItems[i].type.match('^text/html')) {
            console.log("... Drop: HTML");
        } else if (dataItems[i].kind === 'string' && dataItems[i].type.match('^text/uri-list')) {
            console.log("... Drop: URI");
        } else if (dataItems[i].kind === 'file' && dataItems[i].type.match('^image/')) {
            const f = dataItems[i].getAsFile();
            const reader = new FileReader();
            reader.onload = ({target: {result}}) => {
                const image = document.createElement('img');
                image.src = result;
                image.draggable = true;
                image.id = `fileImg-${Date.now()}`;
                addListenersForDragging(image);
                event.target.appendChild(image);
            };

            reader.readAsDataURL(f);
            console.log("... Drop: File ");


        }
    }
    event.target.classList.remove('is-over');
}

function handleDragLeave(event) {
    event.target.classList.remove('is-over');
}

function handleDrag(event) {
    event.target.classList.add('is-dragged');
}

function handleDragEnd(event) {
    event.target.classList.remove('is-dragged');
    event.target.classList.remove('is-drag-started');
}

function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    const files = evt.dataTransfer.files; // FileList object.

    // files is a FileList of File objects. List some properties.
    const output = [];
    for (let i = 0, f; f = files[i]; i++) {
        output.push('<li><strong>', f.name, '</strong> (', f.type || 'n/a', ') - ',
            f.size, ' bytes, last modified: ',
            f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
            '</li>');
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
}