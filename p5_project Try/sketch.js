let video;
let segmenter;
let segmentation;
let bgImg;  
let isModelReady = false;

function preload() {
  // 加载背景图片（可以换成你自己的路径）
  bgImg = loadImage('assets/Edvard_Munch_The_Scream.jpeg');
}

function setup() {
  //画布创建
  createCanvas(480, 600);
  //按钮创建
  let saveBtn = createButton('💾 Save your scream');
  saveBtn.position(10, 10);//位置
  saveBtn.mousePressed(saveSnapshot);
  
  //视频参数
  let constraints = {
    video: {
      width: 100,    // 宽度
      height: 100    // 高度
    },
    audio: false
  };

  video = createCapture(constraints);
  video.size(100, 100);
  video.hide();

  // 加载 UNet 实时人体分割模型
  segmenter = ml5.uNet('person', modelReady);
}
//模型调用
function modelReady() {
  console.log('✅ Model loaded!');
  isModelReady = true;
}

function draw() {
  //背景图片
  background(bgImg);

  if (isModelReady) {
    segmenter.segment(video, gotResult);
  }

  if (segmentation) {

    image(segmentation.backgroundMask, 50, 200, 400, 400);
  }
  
  drawStatusText();
  
  applyPixelation(10);

  
}

function applyPixelation(pixelSize) {
  // 创建一个更小的临时画布
  let smallGraphics = createGraphics(width / pixelSize, height / pixelSize);
  smallGraphics.noSmooth();

  // 将当前画面缩小绘制到小画布中
  smallGraphics.image(get(), 0, 0, smallGraphics.width, smallGraphics.height);

  // 再把它放大回原尺寸形成像素风
  noSmooth();
  image(smallGraphics, 0, 0, width, height);
  smooth();
}
//不要改动这一块
function gotResult(err, result) {
  if (err) {
    console.error(err);
    return;
  }
  segmentation = result;
}
//截屏功能
function saveSnapshot() {
  saveCanvas('myCanvas', 'png');
}
//I forget ddl 字体样式
function drawStatusText() {
  fill(255);
  textSize(80);
  textAlign(CENTER, CENTER);
  text("I forgot ddl", width / 2, height*1 / 4);

}