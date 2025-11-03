---
title: Convert an Image into Colourful Ascii Art
description: A step-by-step guide on generating ASCII art from images using Python
cover: assets/imgs/blog-cover-1.jpg
author: Linyun Liu
keywords:
  - ascii
  - python
  - art
topic: Computer Science
link: auto
active: "false"
date: 2025-11-02
---

![image](assets/imgs/blog-cover-1.jpg)

## Introduction
All the images we see on a screen are made up of tiny units called pixels. These pixels are usually so small that they're invisible to the human eye. But what if we could read each individual pixel and translate it into an ASCII character? By doing this, we can recreate an image in a unique, text-based style—where each character acts as a stand-in for a pixel. Of course, everything on screen is still rendered with RGB pixels in the end, but this transformation gives the image a distinctive and stylish look.

> This is a quote example

## Prerequisite
1. We will be using Python for this project, you can install it by downloading the official installer from [this is a link](https://python.org), or alternatively, you can install it through the terminal, platform-specific instructions are widely available online.
2. Create a project folder and open it with VS Code or your preferred code editor
3. Initiate a virtual environment in your terminal (recommended). Run `python3 -m venv env` to add the environment, and then we can run `source env/bin/activate` to activate it. On windows, you need to type in `.\env\Scripts\activate` instead.

### Look at this video
<iframe
  src="https://www.youtube.com/embed/rELhF5GFcII"
  title="video player"
  frameborder="0"
  allowfullscreen>
</iframe>

## The libraries
**Pillow**: Pillow is a Python library for image processing. It's a modern fork of the original PIL (Python Imaging Library), maintained and more feature-rich. And we can do a lot with this powerful library: 
- Open and display images.
- *Access and manipulate individual pixels* (This is what we will be using)
- Convert between formats (e.g., PNG to JPEG).
- Resize, crop, rotate, flip, and filter images.
- Draw text or shapes on images.
- Apply effects like blur, contrast, sharpen.

**Rich**:  ~~A Python library for beautiful formatting in the terminal. It supports:~~
- *Coloured text*
- Progress bars
- Tables
- Markdown
- Syntax highlighting
- Tracebacks (better error display)

==Combine these two library we can make our idea come true, Let's get started!==

## Basic Idea
We use the Pillow library to read an image and extract the RGB values of each pixel. With this information, we can print ASCII characters in the corresponding colours to recreate the image. However, images typically contain hundreds or even thousands of pixels, making it impractical to render each one as a separate character. The terminal window, or even the entire screen, wouldn’t be large enough to display them all, and doing so would significantly impact performance. To address this, we **divide the image into a grid** (as shown below) and **use an ASCII character to represent each cell**, effectively compressing the visual data while preserving the overall structure.

[^1]As shown in the example image above (with enlarged grid squares for visual clarity), the main idea is to **calculate the average color of each square** and use that color for the ASCII character representing it. The concept is simple, but it does involve some basic yet slightly tricky math. As you might imagine, the final result will look “pixelated” — but that’s exactly what gives it its unique, stylish charm.

## Create a Converter Class

| Libraries     | Description                                                                                                                 |
| ------------- | --------------------------------------------------------------------------------------------------------------------------- |
| pixels        | an array containing all the pixels of the image; each pixel represents an RGB value (Red, Green, Blue) accessible by index. |
| width, height | the dimensions of the image in pixels (for example, 1080p × 720p).                                                          |
| square_size   | the width and height (in pixels) of each square in our grid, your decision                                                  |
| data          | a 2D array used to temporarily store squares with each one containing all the pixels within that square.                    |


```python
from PIL import Image
from rich.console import Console 

class AsciiArtConverter:
    def __init__(self, image_path, square_size, char):
        self.image = Image.open(image_path)
        self.pixels = self.image.load()
        self.width, self.height = self.image.size
        self.square_size = square_size
        self.W = self.width // self.square_size
        self.H = self.height // self.square_size
        self.data = []
        self.new_data = []
        self.char = char
```

## Final Words
Welcome to this very first official blog post of Alcyonite! We hope you find it clear and easy to follow. If it sparks your creativity, feel free to share it with your friends. And don’t hesitate to send us your feedback — it helps us improve and create even better content for you in the future!

[^1]: This is a footnote
