document.addEventListener("DOMContentLoaded", () => {
    let filterOn = false;
    function fetchPups() {
      fetch('http://localhost:3000/pups')
        .then(response => response.json())
        .then(pups => updateDogBar(pups));
    }
  
    function updateDogBar(pups) {
      const dogBar = document.getElementById("dog-bar");
      dogBar.innerHTML = ""; 
  
      const filteredPups = filterOn ? pups.filter(pup => pup.isGoodDog) : pups;
  
      filteredPups.forEach(pup => {
        const span = document.createElement("span");
        span.textContent = pup.name;
        span.addEventListener("click", () => showPupInfo(pup));
        dogBar.appendChild(span);
      });
    }
  
    function showPupInfo(pup) {
      const dogInfo = document.getElementById("dog-info");
      dogInfo.innerHTML = ""; 

      const img = document.createElement("img");
      img.src = pup.image;
  
      const h2 = document.createElement("h2");
      h2.textContent = pup.name;
  
      const button = document.createElement("button");
      button.textContent = pup.isGoodDog ? "Good Dog!" : "Bad Dog!";
      button.addEventListener("click", () => toggleGoodDog(pup, button));
  
      dogInfo.append(img, h2, button);
    }
  
    function toggleGoodDog(pup, button) {
      const newStatus = !pup.isGoodDog;
  
      button.textContent = newStatus ? "Good Dog!" : "Bad Dog!";
  
      fetch(`http://localhost:3000/pups/${pup.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isGoodDog: newStatus }),
      })
      .then(response => response.json())
      .then(updatedPup => {
        pup.isGoodDog = updatedPup.isGoodDog;
      });
    }

    const filterButton = document.getElementById("good-dog-filter");
    filterButton.addEventListener("click", () => {
      filterOn = !filterOn;
      filterButton.textContent = `Filter good dogs: ${filterOn ? "ON" : "OFF"}`;

      fetch('http://localhost:3000/pups')
        .then(response => response.json())
        .then(pups => updateDogBar(pups));
    });
    fetchPups();
  });
  
