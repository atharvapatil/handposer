const config = {
                video: 
                  { width: 640, 
                    height: 420, 
                    fps: 30 
                  }
              };

let x = 480;
let y = 320;
let brushSize = 6;
let cnv;

const gestureStrings = {
  'point_left': '👈',
  'point_right': '👉',
  'point_up': '👆',
  'point_down': '👇'
};
    
const pointLeftGesture = new fp.GestureDescription('point_left');
  pointLeftGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl);
  pointLeftGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.HorizontalLeft, 1.0);
  pointLeftGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl);
  pointLeftGesture.addDirection(fp.Finger.Index, fp.FingerDirection.HorizontalLeft, 1.0);
  pointLeftGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.FullCurl);
  pointLeftGesture.addDirection(fp.Finger.Middle, fp.FingerDirection.HorizontalLeft, 1.0);
  pointLeftGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl);
  pointLeftGesture.addDirection(fp.Finger.Ring, fp.FingerDirection.HorizontalLeft, 1.0);
  pointLeftGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl);
  pointLeftGesture.addDirection(fp.Finger.Pinky, fp.FingerDirection.HorizontalLeft, 1.0);

const pointRightGesture = new fp.GestureDescription('point_right');
  pointRightGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl);
  pointRightGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.HorizontalRight, 1.0);
  pointRightGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl);
  pointRightGesture.addDirection(fp.Finger.Index, fp.FingerDirection.HorizontalRight, 1.0);
  pointRightGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.FullCurl);
  pointRightGesture.addDirection(fp.Finger.Middle, fp.FingerDirection.HorizontalRight, 1.0);
  pointRightGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl);
  pointRightGesture.addDirection(fp.Finger.Ring, fp.FingerDirection.HorizontalRight, 1.0);
  pointRightGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl);
  pointRightGesture.addDirection(fp.Finger.Pinky, fp.FingerDirection.HorizontalRight, 1.0);

const pointUpGesture = new fp.GestureDescription('point_up');
  pointUpGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl);
  pointUpGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 0.9);
  pointUpGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 0.9);
  pointUpGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 0.9);
  pointUpGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl);
  pointUpGesture.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 0.9);
  pointUpGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpLeft, 0.9);
  pointUpGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpRight, 0.9);
  pointUpGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.FullCurl);
  pointUpGesture.addDirection(fp.Finger.Middle, fp.FingerDirection.VerticalUp, 0.9);
  pointUpGesture.addDirection(fp.Finger.Middle, fp.FingerDirection.DiagonalUpLeft, 0.9);
  pointUpGesture.addDirection(fp.Finger.Middle, fp.FingerDirection.DiagonalUpRight, 0.9);
  pointUpGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl);
  pointUpGesture.addDirection(fp.Finger.Ring, fp.FingerDirection.VerticalUp, 0.9);
  pointUpGesture.addDirection(fp.Finger.Ring, fp.FingerDirection.DiagonalUpLeft, 0.9);
  pointUpGesture.addDirection(fp.Finger.Ring, fp.FingerDirection.DiagonalUpRight, 0.9);
  pointUpGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl);
  pointUpGesture.addDirection(fp.Finger.Pinky, fp.FingerDirection.VerticalUp, 0.9);
  pointUpGesture.addDirection(fp.Finger.Pinky, fp.FingerDirection.DiagonalUpLeft, 0.9);
  pointUpGesture.addDirection(fp.Finger.Pinky, fp.FingerDirection.DiagonalUpRight, 0.9);

const pointDownGesture = new fp.GestureDescription('point_down');
  pointDownGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl);
  pointDownGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalDown, 0.9);
  pointDownGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalDownLeft, 0.9);
  pointDownGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalDownRight, 0.9);
  pointDownGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl);
  pointDownGesture.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalDown, 0.9);
  pointDownGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalDownLeft, 0.9);
  pointDownGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalDownRight, 0.9);
  pointDownGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.FullCurl);
  pointDownGesture.addDirection(fp.Finger.Middle, fp.FingerDirection.VerticalDown, 0.9);
  pointDownGesture.addDirection(fp.Finger.Middle, fp.FingerDirection.DiagonalDownLeft, 0.9);
  pointDownGesture.addDirection(fp.Finger.Middle, fp.FingerDirection.DiagonalDownRight, 0.9);
  pointDownGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl);
  pointDownGesture.addDirection(fp.Finger.Ring, fp.FingerDirection.VerticalDown, 0.9);
  pointDownGesture.addDirection(fp.Finger.Ring, fp.FingerDirection.DiagonalDownLeft, 0.9);
  pointDownGesture.addDirection(fp.Finger.Ring, fp.FingerDirection.DiagonalDownRight, 0.9);
  pointDownGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl);
  pointDownGesture.addDirection(fp.Finger.Pinky, fp.FingerDirection.VerticalDown, 0.9);
  pointDownGesture.addDirection(fp.Finger.Pinky, fp.FingerDirection.DiagonalDownLeft, 0.9);
  pointDownGesture.addDirection(fp.Finger.Pinky, fp.FingerDirection.DiagonalDownRight, 0.9);

 



    async function main() {

      const video = document.querySelector("#pose-video");
      const canvas = document.querySelector("#pose-canvas");
      const ctx = canvas.getContext("2d");

      const resultLayer = document.querySelector("#pose-result");

    
       //custom gesture
      const thumbsDownGesture = new fp.GestureDescription('thumbs_down');
      thumbsDownGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl);
      thumbsDownGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalDown, 1.0);

      const knownGestures = [
        pointLeftGesture,
        pointRightGesture,
        pointUpGesture,
        pointDownGesture
      ];
      const GE = new fp.GestureEstimator(knownGestures);

      // load handpose model
      const model = await handpose.load();
      if(model != null){
        document.getElementById('loading').style.display = "none"
        document.getElementById('main-content').style.display = "grid"
      }

      // main estimation loop
      const estimateHands = async () => {

        // clear canvas overlay
        ctx.clearRect(0, 0, config.video.width, config.video.height);
        resultLayer.innerText = '';

        const predictions = await model.estimateHands(video, true);

        for(let i = 0; i < predictions.length; i++) {

          const est = GE.estimate(predictions[i].landmarks, 9);

          if(est.gestures[0] !== undefined){
            // console.log(est.gestures[0].name);

            if(est.gestures[0].name == 'point_left'){
              x = x - 1 ;
            } else if(est.gestures[0].name == 'point_right'){
              x = x + 1 ;
            }

            if (est.gestures[0].name == 'point_up') {
              y = y - 1 ;
            } else if (est.gestures[0].name == 'point_down') {
              y = y + 1;
            //   console.log(est.gestures[0].name + " x: " + x.toFixed(2) + ", y: " + y.toFixed(2));
            }

            
            
          }


          if(est.gestures.length > 0) {

            // find gesture with highest match score
            let result = est.gestures.reduce((p, c) => { 
              return (p.score > c.score) ? p : c;
            });
            
            // document.getElementById('fingpose').innerText = gestureStrings[result.name];
            resultLayer.innerText = gestureStrings[result.name];
          } 
          
         

          // update debug info
          // updateDebugInfo(est.poseData);
        }

        // ...and so on
        setTimeout(() => { estimateHands(); }, 1000 / config.video.fps);
      };

      estimateHands();
      // console.log("Starting predictions");
    }

    async function initCamera(width, height, fps) {

      const constraints = {
        audio: false,
        video: {
          facingMode: "user",
          width: width,
          height: height,
          frameRate: { max: fps }
        }
      };

      const video = document.querySelector("#pose-video");
      video.width = width;
      video.height = height;

      // get video stream
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      video.srcObject = stream;

      return new Promise(resolve => {
        video.onloadedmetadata = () => { resolve(video) };
      });
    }

    function drawPoint(ctx, x, y, r, color) {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
    }

    function updateDebugInfo(data) {
      for(let fingerIdx in data) {
        document.getElementById("curl-" + fingerIdx).innerText = data[fingerIdx][1];
        document.getElementById("dir-" + fingerIdx).innerText = data[fingerIdx][2];
      }
    }

    window.addEventListener("DOMContentLoaded", () => {

      initCamera(
        config.video.width, config.video.height, config.video.fps
      ).then(video => {
        video.play();
        video.addEventListener("loadeddata", event => {
          // console.log("Camera is ready");
          main();
        });
      });

      const canvas = document.querySelector("#pose-canvas");
      canvas.width = config.video.width;
      canvas.height = config.video.height;
      // console.log("Canvas initialized");
    });


function setup() {
  cnv = createCanvas(960, 640);
  cnv.parent('cnv-id');
  frameRate(30);
  background(36, 41, 46);
  fill(255);
  noStroke()
  ellipse(480, 320, brushSize, brushSize);
}

function draw() {
  ellipse(x, y, brushSize, brushSize);
}

function saveSketch() {
  saveCanvas(cnv, "pose-sketch", "png"); 
}

function resetSketch() {
  background(36, 41, 46);
  x = 480;
  y = 320; 
  fill(255);
  noStroke()
  ellipse(480, 320, brushSize, brushSize);
}
