img = "";
status = "";
objects = [];
function preload(){
    img = loadImage('AC.jpeg');
    img2 = loadImage('Bedroom.jpeg');
    img3 = loadImage('Bottles.jpeg');
    img4 = loadImage('TV.jpeg');
}
function setup(){
    canvas = createCanvas(640,420);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Object detecting";
}
function draw(){
    image(img,0,0,640,420);
    if(status != ""){
        for(i = 0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Object Detected";
            fill("#FF0001");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+" "+ percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("#FF0001");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
        }
    }    
}
function modelLoaded(){
    console.log("Model has been Loaded!");
    status = true;
    objectDetector.detect(img,gotResult);
}
function gotResult(error,results){
    if (error) {
     console.log(error);   
    } 
    console.log(results);
    objects = results;
}