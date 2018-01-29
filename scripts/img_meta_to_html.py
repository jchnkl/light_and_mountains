#!/usr/bin/env python3

html_template = '''\
<figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject">
<a data-fancybox="lam-gallery" href="{{w_dir}}/{{i}}" itemprop="contentUrl"
        data-size="{{i_width}}x{{i_height}}" data-index="{{idx}}">
  <img src="{{t_dir}}/{{t}}" width="{{t_width}}" height="{{t_height}}" itemprop="thumbnail" alt="{{title}}"/>
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
        out_file.write(template.render( idx=d['idx']
                                      , i=d['i']
                                      , t=d['t']
                                      , title=d['title']
                                      , caption=d['caption']
                                      , i_width=d['i_width']
                                      , i_height=d['i_height']
                                      , t_width=d['t_width']
                                      , t_height=d['t_height']
                                      ))
