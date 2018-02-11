#!/usr/bin/env python3

html_template = '''\
<figure class="grid-item{{grid_5}}{{grid_aspect}}"
        itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject">
    <a data-fancybox="grid" href="{{w_dir}}/{{i}}" itemprop="contentUrl"
       data-size="{{i_width}}x{{i_height}}" data-index="{{idx}}">
        <img class="grid-item-thumbnail" width="{{t_width}}" height="{{t_height}}"
             src="{{t_dir}}/{{t}}" itemprop="thumbnail" alt="{{title}}"/>
    </a>
</figure>
'''

from os.path import sep
from sys import argv, stdin
from json import loads
from jinja2 import Template

out_dir = argv[1]

img_data = loads(stdin.read())

template = Template(html_template)

for idx, d in enumerate(img_data):
    with open(out_dir + sep + 'img_' + '{0:04d}'.format(idx) + '.html', 'w') as out_file:

        grid_5 = ""
        grid_aspect = ""

        if d['exif']['rating'] == "5":
          grid_5 = " grid-item--5stars"
        elif d['i_width'] > d['i_height']:
          grid_aspect = " grid-item--aspect"

        out_file.write(template.render( idx=d['idx']
                                      , i=d['i']
                                      , t=d['t']
                                      , w_dir=d['w_dir']
                                      , t_dir=d['t_dir']
                                      , title=d['exif']['title']
                                      , caption=d['exif']['caption']
                                      , rating=d['exif']['rating']
                                      , i_width=d['i_width']
                                      , i_height=d['i_height']
                                      , t_width=d['t_width']
                                      , t_height=d['t_height']
                                      , inner_width=d['t_width'] * 0.66
                                      , inner_height=d['t_height'] * 0.66
                                      , margin_t=(d['t_width'] - d['t_width'] * 0.66) / 2
                                      , margin_l=(d['t_height'] - d['t_height'] * 0.66) / 2
                                      , color="#" + ("%02x" % (255-d['idx'])) + ("%02x" % (255-d['idx'])) + ("%02x" % (255-d['idx']))
                                      , grid_aspect=grid_aspect
                                      , grid_5=grid_5
                                      ))
