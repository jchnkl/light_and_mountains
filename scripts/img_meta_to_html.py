#!/usr/bin/env python3

# html_template = '''\
# <figure class="lam-gallery-item" itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject">
# <a data-fancybox="lam-gallery" href="{{w_dir}}/{{i}}" itemprop="contentUrl"
#         data-size="{{i_width}}x{{i_height}}" data-index="{{idx}}">
#   <img src="{{t_dir}}/{{t}}" width="{{t_width}}" height="{{t_height}}" itemprop="thumbnail" alt="{{title}}"/>
# </a>
# </figure>
# '''

# <div class="lam-gallery-item" style="width:{{t_width}}px; height:{{t_height}}px;">

# html_template = '''\
# <div class="lam-gallery-item" style="width:{{t_width}}px; height:{{t_height}}px;">
# <div style="background-color:#00ff00; width:{{inner_width}}px;
#   height:{{inner_height}}px; margin: {{margin_l}}px {{margin_t}}px;">
# </div>
# </div>
# '''

html_template = '''\
<div class="lam-gallery-item">
  <div class="lam-gallery-item-content">
    <img src="{{t_dir}}/{{t}}" itemprop="thumbnail" alt="{{title}}"/>
  </div>
</div>
'''
  # <div id="item-{{idx}}" style="background-color:{{color}}; width:{{t_width}}px; height:{{t_height}}px;">
  # </div>

  # <img src="{{w_dir}}/{{i}}" alt="{{title}}"/>
# <div style="background-color:#00ff00; width:{{inner_width}}px;
#   height:{{inner_height}}px; margin: {{margin_l}}px {{margin_t}}px;">
# </div>

  # <img src="{{t_dir}}/{{t}}" width="{{t_width}}" height="{{t_height}}" itemprop="thumbnail" alt="{{title}}"/>
  # <img src="{{w_dir}}/{{i}}" alt="{{title}}"/>

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
                                      , w_dir=d['w_dir']
                                      , t_dir=d['t_dir']
                                      , title=d['title']
                                      , caption=d['caption']
                                      , i_width=d['i_width']
                                      , i_height=d['i_height']
                                      , t_width=d['t_width']
                                      , t_height=d['t_height']
                                      , inner_width=d['t_width'] * 0.66
                                      , inner_height=d['t_height'] * 0.66
                                      , margin_t=(d['t_width'] - d['t_width'] * 0.66) / 2
                                      , margin_l=(d['t_height'] - d['t_height'] * 0.66) / 2
                                      , color="#" + ("%02x" % (255-d['idx'])) + ("%02x" % (255-d['idx'])) + ("%02x" % (255-d['idx']))
                                      ))
