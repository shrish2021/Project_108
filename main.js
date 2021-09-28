function startClassification()
{
    navigator.mediaDevices.getUserMedia({audio: true});
    classifier = ml5.soundClassifier('https://teachablemachine.withgoogle.com/models/DQcqAfkbX/model.json', modelReady);
}

function modelReady()
{
    classifier.classify(gotResuslts);
}

dog = 0;
cat = 0;
tiger = 0;
cow = 0;
bn = 0;

function gotResuslts(error, results)
{
    if(error) {
        console.error(error);
    }
    else {
        console.log(results);

        r = Math.floor(Math.random() * 255) + 1;
        g = Math.floor(Math.random() * 255) + 1;
        b = Math.floor(Math.random() * 255) + 1;

        document.getElementById("hear").innerHTML = "Detected noise of - " + results[0].label;
        document.getElementById("accuracy").innerHTML = "Detected background noise - " + bn + " Detected noise of dog - " + dog + " Detected noise of cat - " + cat + " Detected noise of tiger - " + tiger + " Detected noise of cow - " + cow; 
        document.getElementById("hear").style.color = "rgb("+r+","+g+","+b+")";
        document.getElementById("accuracy").style.color = "rgb("+r+","+g+","+b+")";

        img = document.getElementById("animalImage");

        if(results[0].label == "Barking")
        {
           img.src = "bark.gif";
           dog = dog + 1;
        }
        else if(results[0].label == "Meow")
        {
            img.src = "meow.gif";
           cat = cat + 1;
        }
        else if(results[0].label == "Roar")
        {
            img.src = "tiger.gif";
            tiger = tiger + 1; 
        }
        else if(results[0].label == "Moo"){
            img.src = "cow.gif";
           cow = cow + 1;
        }
        else{
            img.src = "listen.gif"
            bn = bn + 1;
        }
    }
}
