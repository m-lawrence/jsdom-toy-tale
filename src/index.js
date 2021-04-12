let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


function renderOneToy(toyObj) {
  const toyCard = document.createElement('div')
  toyCard.classList.add('card')
  toyCard.dataset.id = toyObj.id 

  toyCard.innerHTML = `<h2>${toyObj.name}</h2>
  <img src=${toyObj.image} width="250" height="300"/>
  <p>${toyObj.likes} Likes </p>
  <button class="like-btn">Like <3</button>`

  const toyCollection = document.querySelector('div#toy-collection')
  toyCollection.append(toyCard)
}

function renderAllToys() {
  fetch('http://localhost:3000/toys')
    .then((response) => response.json())
    .then((toysArr) => {
      toysArr.forEach(toyObject => {
        renderOneToy(toyObject)
      })
    })
}

const newToyForm = document.querySelector('form.add-toy-form')

newToyForm.addEventListener('submit', event => {
  event.preventDefault() 

  const newToyObj = {
    name: event.target.name.value,
    image: event.target.image.value,
    likes: 0
  }

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
  "Content-Type": "application/json",
  "Accept": "application/json"
  },
  body: JSON.stringify(newToyObj)
  })
  .then(response => response.json())
  .then(newToyData => { renderOneToy(newToyData)})

  form.reset()

})

const allToysDiv = document.querySelector('div#toy-collection')

allToysDiv.addEventListener('click', event => {
  const toyDiv = event.target.closest('div')
  const likesP = event.target.previousElementSibling
  const currLikes = parseInt(likesP.textContent)
  likesP.textContent = `${currLikes + 1} Likes`
  
  fetch(`http://localhost:3000/toys/${toyDiv.dataset.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: currLikes + 1
    })
  })
})


renderAllToys()