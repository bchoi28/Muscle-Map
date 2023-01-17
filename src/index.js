
document.addEventListener('DOMContentLoaded', () => {
    const humanBody = document.querySelector('.human-body');
    humanBody.addEventListener('click', (event) => {
        if (event.target.matches('.muscle-block')) {
            switch (event.target.id) {
                case 'chest-left':
                    handleChestLeftClick();
                    break;
                case 'shoulder-left':
                    handleShoulderLeftClick();
                    break;
                // add more cases for other muscle blocks
            }
        }
    });
});

function handleChestLeftClick() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '77bc8cf14dmsh3bcf905be22b505p150b37jsndd4d64ef3661',
            'X-RapidAPI-Host': 'exerciseapi3.p.rapidapi.com'
        }
    };

    fetch('https://exerciseapi3.p.rapidapi.com/search/?primaryMuscle=pectoralis%20major', options)
        .then(response => response.json())
        .then(data => {
            const randomIndex = Math.floor(Math.random() * data.length);
            const randomExercise = data[randomIndex];
            const exerciseInfo = d3.select("#exercise-info");

            const primaryMuscles = randomExercise["Primary Muscles"].toString();
            const formattedPrimaryMuscles = primaryMuscles.split(',').map(muscle => {
                const words = muscle.split(" ");
                return words.map(w => w[0].toUpperCase() + w.slice(1)).join(" ");
            }).join(", ");

            const secondaryMuscles = randomExercise["SecondaryMuscles"].toString();
            const formattedSecondaryMuscles = secondaryMuscles.split(',').map(muscle => {
                const words = muscle.split(" ");
                return words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
            }).join(", ");

            exerciseInfo.append("p")
                .attr("class", "exercise-name")
                .text(`Exercise Name: ${randomExercise.Name}`);

            exerciseInfo.append("p")
                .attr("class", "primary-muscles")
                .text(`Primary Muscles: ${formattedPrimaryMuscles}`);

            exerciseInfo.append("p")
                .attr("class", "secondary-muscles-title")
                .text(`Secondary Muscles: ${formattedSecondaryMuscles}`);

            console.log(exerciseInfo);
        })
        .catch(err => console.error(err));
}


function handleShoulderLeftClick() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '77bc8cf14dmsh3bcf905be22b505p150b37jsndd4d64ef3661',
            'X-RapidAPI-Host': 'exerciseapi3.p.rapidapi.com'
        }
    };

    fetch('https://exerciseapi3.p.rapidapi.com/search/?primaryMuscle=deltoid', options)
        .then(response => response.json())
        .then(data => {
            const randomIndex = Math.floor(Math.random() * data.length);
            const randomExercise = data[randomIndex];
            console.log(randomExercise.Name);
            console.log(randomExercise["Primary Muscles"]);
            console.log(randomExercise.SecondaryMuscles);
        })
        .catch(err => console.error(err));
}
