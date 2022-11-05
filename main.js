prediction1="";

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});

camera=document.getElementById("camera");
Webcam.attach("#camera");

function EmojiTake(){
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML="<img id='captured_img' src='"+data_uri+"'>";
    })
}

console.log("ml5version", ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/SmF0_3xnq/model.json", model_loaded);

function model_loaded(){
    console.log("model loaded done bye");
}

function speak(){
    var synthesis=window.speechSynthesis;
    speak_data1="First Prediction: "+prediction1;

    var utter=new SpeechSynthesisUtterance(speak_data1);
    synthesis.speak(utter);
}

function Identify(){
    img=document.getElementById("captured_img");
    classifier.classify(img, got_result);
}

function got_result(error, result){
    if (error){
        console.error(error);
    }
    else {
        console.log(result);
        document.getElementById("result_emotion_name").innerHTML=result[0].label;

        prediction1=result[0].label;

        speak()

        if (result[0].label=="THUMBSUP"){
            document.getElementById("update_emoji").innerHTML="&#128077;";
        }
        if (result[0].label=="GOOD"){
            document.getElementById("update_emoji").innerHTML="&#128076;";
        }
        if (result[0].label=="FIST"){
            document.getElementById("update_emoji").innerHTML="&#9994;";
        }

    }
}