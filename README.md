# yjin0588_9103_tut3

# Quiz 8

## Part 1: Imaging Technique Inspiration

**Imaging technology:** Pixel Sorting  

**Inspiration:** [Link](https://dribbble.com/shots/3577112-Pixel-sorting-experiment)

**Note:**  
Drawing on the work's horizontally fractured banding and color layering, I'll use pixel reordering to stretch pixels along scan lines by brightness and hue, and manipulate time to create a slow-moving, fractured, and recomposed effect. Pixel reordering facilitates parameterized and abstract design, such as direction, threshold, intensity, and real-time interactivity. This allows for dynamic and controllable manipulation while preserving the original work's abstract composition. Therefore, I'll choose this imaging method, as it will allow me to easily replicate and expand upon the visual effects in code for my final project.

![high-quality screenshot 01](Picture/screenshot01.png)  
![high-quality screenshot 02](Picture/screenshot02.png)

## Part 2: Coding Technique Exploration

**Note:**  
This code uses GPU parallel processing to sort pixel values ​​bit by bit using a radix algorithm. By controlling how pixels are split, scanned, and merged (`computeRadixSplit`, `computeScan`, `computeMerge`), it efficiently reorders image data based on brightness or color. This structured pixel rearrangement produces the characteristic glitches and artifacts of pixel sorting, achieving the desired abstract visual effect in real time.

**Existing code & Explaination:** [Link](https://lukecochrane.com/blog/pixel-sorting?utm_source=chatgpt.com)

![existing code](Picture/screenshot03.png)  
![existing code](Picture/screenshot04.png)  
![existing code](Picture/screenshot05.png)  
![existing code](Picture/screenshot06.png)