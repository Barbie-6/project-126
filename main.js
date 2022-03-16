peter_pan_music = '';
harry_potter_music = '';

left_wrist_x = '';
left_wrist_y = '';

right_wrist_x = '';
right_wrist_y = '';

leftWrist_score = '';
rightWrist_score = '';

function preload() {
    peter_pan_music = loadSound("music2.mp3");
    harry_potter_music = loadSound("music.mp3");
}
function setup() {
    canvas = createCanvas(500, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)
}
function draw() {
    image(video, 0, 0, 500, 400);

    peter_pan_status = peter_pan_music.isPlaying();
    harry_potter_status = harry_potter_music.isPlaying();

    fill("blue");
    stroke("blue");
    if(leftWrist_score > 0.2){
        circle(left_wrist_x, left_wrist_y, 20);
        if(peter_pan_status == false){
            peter_pan_music.play();
            document.getElementById("status").innerHTML = "Playing peter pan music";
            harry_potter_music.stop();
        }
        
    }

    if(rightWrist_score > 0.2){
        circle(right_wrist_x, right_wrist_y, 20);
        if(harry_potter_status == false){
            harry_potter_music.play();
            document.getElementById("status").innerHTML = "Playing Harry potter music";
            peter_pan_music.stop();
        }
        
    }


}
function modelLoaded() {
    console.log("model is loaded!!");
}
function gotPoses(results) {
if(results.length > 0){
    console.log(results);

    left_wrist_x = results[0].pose.leftWrist.x;
    left_wrist_y = results[0].pose.leftWrist.y;

    right_wrist_x = results[0].pose.rightWrist.x;
    right_wrist_x = results[0].pose.rightWrist.y;

    leftWrist_score = results[0].pose.keypoints[9].score;
    rightWrist_score = results[0].pose.keypoints[10].score;

    console.log("Left wrist x- " + left_wrist_x + " left wrist y- " + left_wrist_y);
    console.log("right wrist x- " + right_wrist_x + " right wrist y- " + right_wrist_y);
}
}