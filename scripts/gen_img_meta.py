#!/usr/bin/env python3

from sys import argv
from os.path import basename, sep
from pyexiv2 import ImageMetadata
from PIL import Image
from json import dumps
from jinja2 import Template

# web dir
w_dir = argv[1]

# img dir
i_dir = argv[2]

# web thumb dir
t_dir = argv[3]

# img suffix, .e.g. png
suffix = argv[4]

images = argv[5:]

img_data = []

idx = 0

for image in images:
    i = basename(image)
    t = i.replace('.' + suffix, '_z.' + suffix)

    metadata = ImageMetadata(i_dir + sep + i)
    metadata.read()

    try:
        title = metadata['Xmp.dc.title'].value['x-default']
    except:
        title = None

    try:
        caption = metadata['Exif.Image.ImageDescription'].value
    except:
        caption = None

    img = Image.open(i_dir + sep + i)

    i_width = img.size[0]
    i_height = img.size[1]

    img.close()

    img = Image.open(t_dir + sep + t)

    t_width = img.size[0]
    t_height = img.size[1]

    img_data.append(
            { 'idx': idx
            , 'i': i
            , 't': t
            , 'w_dir': w_dir
            , 't_dir': t_dir
            , 'title': title
            , 'caption': caption
            , 'i_width': i_width
            , 'i_height': i_height
            , 't_width': t_width
            , 't_height': t_height
            }
        )

    idx = idx + 1

print(dumps(img_data))
