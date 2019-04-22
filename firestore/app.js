const ulElement = document.querySelector('#cafe-list');

function renderData(doc) {
    const li = document.createElement('li');
    const name = document.createElement('span');
    const city = document.createElement('span');
    const div = document.createElement('div');
    const icon = document.createElement('i');

    li.setAttribute('data-id', doc.id);

    
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    icon.className = 'material-icons blue';
    icon.textContent = 'delete'
    
    li.appendChild(name);
    li.appendChild(city);

    div.appendChild(icon);
    li.appendChild(div);

    ulElement.appendChild(li);

    icon.addEventListener('click', (e) => {
        e.stopPropagation();
        db.collection('cafes').doc(li.getAttribute('data-id')).delete();
    })
}

// db.collection('cafes').orderBy('name').get().then(snapchsot => {
//     snapchsot.docs.forEach(doc => {
//         renderData(doc)
//     });
// })

const form = document.querySelector('#add-cafe-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let cafeName = document.querySelector('#cafe-name');
    let cafeCity = document.querySelector('#cafe-city');
    console.log(cafeName.value);
    db.collection('cafes').add({
        name: cafeName.value,
        city: cafeCity.value
    })
    .then((docRef) => {
        console.log('add data successful, doc ref id: ' + docRef.id);
    })
    .catch(e => {
        console.log('Error: ' + e)
    })

    cafeName.value = cafeCity.value = '';

})

db.collection('cafes').onSnapshot(snapshot => {
    // console.log(snapshot.docChanges());    
    // snapshot.docs.forEach(doc => console.log(doc));

    snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
            renderData(change.doc);
        } else if (change.type === 'removed') {
            const li = ulElement.querySelector('[data-id=' + change.doc.id + ']');
            ulElement.removeChild(li);
        }
    })
})