//https://teachablemachine.withgoogle.com/models/6B5uOW5Dy/
speak_data1 = "";
speak_data2 = "";

Webcam.set ({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 100
});
camera = document.getElementById("camera");
Webcam.attach("camera");

function capture() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_image' src="+data_uri+">";
    });
}
console.log("ml5version", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/6B5uOW5Dy/model.json", modeluploaded);

function modeluploaded() {
    console.log("model Loaded");
}

function speech() {
    var synth = window.speechSynthesis;
    data1 = "The first prediction is " + speak_data1;
    data2 = "The second prediction is " + speak_data2;
    var utterance = new SpeechSynthesisUtterance(data1 + data2);
    synth.speak(utterance);
}

function identify() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, result) {
    if (error) {
        console.log(error);
    } else {
        console.log(result);
        speak_data1 = result[0].label;
        speak_data2 = result[1].label;
        document.getElementById("emotion1").innerHTML = speak_data1;
        document.getElementById("emotion2").innerHTML = speak_data2;
        speech();
        if (speak_data1 == "Happy") {
            document.getElementById("updateemoji1").innerHTML = "&#128522;";
        } else if (speak_data1 == "Sad") {
            document.getElementById("updateemoji1").innerHTML = "&#128532;";
        } else if (speak_data1 == "Angry") {
            document.getElementById("updateemoji1").innerHTML = "&#128545;";
        }
        if (speak_data2 == "Happy") {
            document.getElementById("updateemoji2").innerHTML = "&#128522;";
        } else if (speak_data2 == "Sad") {
            document.getElementById("updateemoji2").innerHTML = "&#128532;";
        } else if (speak_data2 == "Angry") {
            document.getElementById("updateemoji2").innerHTML = "&#128545;";
        }
    }
}