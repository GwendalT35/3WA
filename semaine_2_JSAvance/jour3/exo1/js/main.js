import Rectangle from "./classes/rectangle.js";
import Circle from "./classes/circle.js";

const canvas = document.getElementById("canvas");
if (canvas && canvas.getContext) {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        console.error("2D context not available for canvas.");
    }

    getJson("./data.json")
        .then(jsonShapes => {
            if (jsonShapes && jsonShapes.shapes) {
                jsonShapes.shapes.forEach(element => {
                    switch (element.type.toLowerCase()) {
                        case "rectangle":
                            let r = new Rectangle([...element.properties], element.color);
                            r.draw(ctx);
                            break;
                        case "circle":
                            let c = new Circle([...element.properties], element.color);
                            c.draw(ctx);
                            break;
                        default:
                            console.warn(`Unknown shape type: ${element.type}`);
                    }
                });
            } else {
                console.error("Invalid or missing shapes data in JSON.");
            }
        })
        .catch(error => {
            console.error("Error fetching JSON:", error);
        });
}

async function getJson(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Fetch error:", error);
        return null;
    }
}
