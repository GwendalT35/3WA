let btn = document.getElementById("btn");
let container = document.getElementById("container");

btn.addEventListener("click", () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${longitude}&lat=${latitude}`)
            .then(res => res.json())
            .then(res => {
                let addr = document.createElement("p");
                console.log(res.features[0].properties.label);
                
                addr.innerText = res.features[0].properties.label;
                container.appendChild(addr);
            })
        });
    }
});