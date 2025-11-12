let video;
let segmenter;
let segmentation;
let bgImg;  
let isModelReady = false;

function preload() {
  // 加载背景图片
  bgImg = loadImage('Edvard_Munch_The_Scream.jpeg');
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
  //background(bgImg);
  //perlin noise 2
  //drawWavyBackground(bgImg, 200, 0.02);
  //perlin noise 3
  //let dynamicStrength = 30 + sin(frameCount * 0.02) * 15;
  //drawWavyBackground(bgImg, dynamicStrength, 0.02);
  //perlin 4
  // 动态波动强度：随时间上下律动
let dynamicStrength = 80 + sin(frameCount * 0.05) * 40;
// 噪声流动速度（y方向更快一点，像瀑布）
let dynamicSpeed = 0.02 + abs(sin(frameCount * 0.01)) * 0.03;
//perlin noise 5
//drawWavyBackgroundFull(bgImg, 60, 0.02, 6, 15);



// 调用扭曲函数
drawWavyBackground(bgImg, dynamicStrength, dynamicSpeed);


  if (isModelReady) {
    segmenter.segment(video, gotResult);
  }

  if (segmentation) {

    image(segmentation.backgroundMask, 50, 200, 400, 400);
  }
  
  drawStatusText();

//   //perlin noise 1
//   let noiseOffset = 0;  // 噪声偏移量

// function applyPerlinDistortion(strength = 20, detail = 0.02) {
//   loadPixels();
//   // 对每一行像素进行水平抖动
//   for (let y = 0; y < height; y++) {
//     let n = noise(y * detail, noiseOffset) * strength; // 计算当前行的偏移量
//     let line = get(0, y, width, 1); // 取出这一行
//     image(line, n - strength / 2, y); // 绘制到新的位置，造成“波动感”
//   }
//   noiseOffset += 0.01; // 慢慢流动
// }

  
  applyPixelation(10);

  // //perlin noise 1
  // applyPerlinDistortion(30, 0.015);

  
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

//perlin noise 2
// let yoff = 0; // 噪声随时间推进

// function drawWavyBackground(img, waveStrength = 15, noiseScale = 0.02) {
//   // 在一个离屏画布中绘制扭曲后的背景
//   let pg = createGraphics(width, height);
//   pg.loadPixels();
//   img.loadPixels();

//   for (let y = 0; y < height; y++) {
//     // 使用 Perlin noise 计算这一行的水平偏移量
//     let xOffset = noise(y * noiseScale, yoff) * waveStrength - waveStrength / 2;
//     // 把原背景的这一行取出并在偏移后绘制
//     let row = img.get(0, y, width, 1);
//     pg.image(row, xOffset, y);
//   }

//   yoff += 0.01; // 时间偏移（动画推进）
//   image(pg, 0, 0, width, height); // 绘制最终扭曲背景
// }

//perlin noise 3
// // 🌀 Perlin Noise 垂直流动背景（瀑布效果）
// let yoff = 0; // 时间偏移量

// function drawWavyBackground(img, waveStrength = 20, noiseScale = 0.02) {
//   let pg = createGraphics(width, height);
//   pg.loadPixels();
//   img.loadPixels();

//   for (let x = 0; x < width; x++) {
//     // 使用 Perlin noise 计算每一列的垂直偏移量
//     let yOffset = noise(x * noiseScale, yoff) * waveStrength - waveStrength / 2;
//     // 获取原图中这一列的像素
//     let col = img.get(x, 0, 1, height);
//     // 把整列稍微上下偏移，形成竖直流动感
//     pg.image(col, x, yOffset);
//   }

//   yoff += 0.01; // 时间推进，形成动态流动
//   image(pg, 0, 0, width, height);
// }

//perlin noise 4
let yoff = 0; // 时间偏移量

function drawWavyBackground(img, waveStrength = 20, noiseScale = 0.02) {
  let pg = createGraphics(width, height);
  img.loadPixels();

  for (let x = 0; x < width; x++) {
    // Perlin noise 生成每一列的竖直偏移量
    let n = noise(x * noiseScale, yoff);
    // 波动幅度随时间周期性变化，增加节奏感
    let dynamicWave = waveStrength + sin(frameCount * 0.05 + x * 0.1) * (waveStrength / 2);
    let yOffset = map(n, 0, 1, -dynamicWave, dynamicWave);

    // 获取该列像素
    let col = img.get(x, 0, 1, height);
    // 将整列在竖直方向偏移
    pg.image(col, x, yOffset);
  }

  // 时间偏移量推进，形成动态动画
  yoff += 0.01;

  image(pg, 0, 0, width, height);
}

//perlin noise 5