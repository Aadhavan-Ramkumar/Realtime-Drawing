NoseX = 0;
NoseY = 0;
Difference = 0;
RightWristX = 0;
LeftWristX = 0;

function setup() {
    video = createCapture(VIDEO);
    video.size(550, 500);

    canvas = createCanvas(500, 500);
    canvas.position(560, 125);

    poseNet = ml5.poseNet(video, function () {
        console.log("PoseNet is ready!");
    });
    poseNet.on("pose", GetPoses);
}

function GetPoses(Results) {
    if (Results.length > 0) {
        NoseX = Results[0].pose.nose.x;
        NoseY = Results[0].pose.nose.y;
        LeftWristX = Results[0].pose.leftWrist.x;
        RightWristX = Results[0].pose.rightWrist.x;
        Difference = floor(LeftWristX - RightWristX);
    }
}

function draw() {
    background("#969A97");
    fill("#F90093");
    stroke("#F90093");
    square(NoseX, NoseY, Difference);
    document.getElementById("SquareSize").innerHTML = "The Square's side is " + Difference + "px";
}