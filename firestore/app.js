const ulElement = document.querySelector('#cafe-list');

function renderData(doc) {
    const li = document.createElement('li');
    const name = document.createElement('span');
    const city = document.createElement('span');

    li.setAttribute('data-sid', doc.id);

    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    
    li.appendChild(name);
    li.appendChild(city);

    ulElement.appendChild(li);
}

db.collection('cafes').get().then(snapchsot => {
    snapchsot.docs.forEach(doc => {
        renderData(doc)
    });
})