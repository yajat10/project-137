find_status=""
object=[]
function setup(){
canvas=createCanvas(400,300)
canvas.center()
video=createCapture(VIDEO)
video.hide()
}

function start_function(){
    object_detection=ml5.objectDetector('cocossd',modelLoaded)
    document.getElementById("status").innerHTML="Status:- Detecting Object";
    input_value=document.getElementById("input").value;
   
}

function modelLoaded(){
    console.log("Model is loaded!");
    find_status=true;
}
function draw(){
    image(video,0,0,400,300)
    if(find_status!=""){
        for(i=0;i<object.length;i++){
            fill("red")
            percent=floor(object[i].confidence * 100);
            text(object[i].label+" "+percent+'%',object[i].x,object[i].y)
            noFill()
            stroke("red")
            rect(object[i].x,object[i].y,object[i].width,object[i].height)
            if(object[i].label==input_value){
                video.stop()
                objectDetector.detect(gotresult)
                document.getElementById("status").innerHTML="Status: Detected Object!";
                document.getElementById("number_of_objects").innerHTML=object[0].label+" Found!"
                synth=window.speechSynthesis;
                data=object[0].label+" Found!";
                speak_this=new SpeechSynthesisUtterance(data);
                synth.speak(speak_this)
            }else{
                document.getElementById("number_of_objects").innerHTML="Object Not Found"
            }
        }
    }
}
function gotresult(error,result){
if(error){
    console.log(error);
}else{
    console.log(result);
    object=result
}
}