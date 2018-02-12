#!/usr/bin/env python3

# html_template = '''\
# <figure class="grid-item{{grid_5}}{{grid_aspect}}"
#         itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject">
#     <a data-fancybox="grid" href="{{w_dir}}/{{i}}" itemprop="contentUrl"
#        data-size="{{i_width}}x{{i_height}}" data-index="{{idx}}">
#         <img class="grid-item-thumbnail" width="{{t_width}}" height="{{t_height}}"
#              src="{{t_dir}}/{{t}}" itemprop="thumbnail" alt="{{title}}"/>
#     </a>
# </figure>
# '''

html_template = '''\
<img class="grid-box"
     alt="{{title}}"
     longdesc="{{caption}}"
     data-aspect="{{i_aspect}}"
     data-src="{{t_dir}}/{{thumbnails['640']}}"
     data-srcset="{{t_dir}}/{{thumbnails['100']}} 100w
                  {{t_dir}}/{{thumbnails['240']}} 240w
                  {{t_dir}}/{{thumbnails['320']}} 320w
                  {{t_dir}}/{{thumbnails['640']}} 640w
                  {{t_dir}}/{{thumbnails['800']}} 800w
                  {{t_dir}}/{{thumbnails['1024']}} 1024w
                  {{t_dir}}/{{thumbnails['1600']}} 1600w
                  {{t_dir}}/{{thumbnails['2048']}} 2048w"
>

'''
     # width="{{t_width}}" height="{{t_height}}">

from os.path import sep
from sys import argv, stdin
from json import loads
from jinja2 import Template

out_dir = argv[1]

img_data = loads(stdin.read())

def gen_item_html(data):
    grid_5 = ""
    grid_aspect = ""

    if data['exif']['rating'] == "5":
      grid_5 = " grid-item--5stars"
    elif data['i_width'] > data['i_height']:
      grid_aspect = " grid-item--aspect"

    template = Template(html_template)
    return template.render( idx=data['idx']
                          , i=data['i']
                          , t=data['t']
                          , w_dir=data['w_dir']
                          , t_dir=data['t_dir']
                          , title=data['exif']['title']
                          , caption=data['exif']['caption']
                          , rating=data['exif']['rating']
                          , i_width=data['i_width']
                          , i_height=data['i_height']
                          , t_width=data['t_width']
                          , t_height=data['t_height']
                          , inner_width=data['t_width'] * 0.66
                          , inner_height=data['t_height'] * 0.66
                          , margin_t=(data['t_width'] - data['t_width'] * 0.66) / 2
                          , margin_l=(data['t_height'] - data['t_height'] * 0.66) / 2
                          , color="#" + ("%02x" % (255-data['idx'])) + ("%02x" % (255-data['idx'])) + ("%02x" % (255-data['idx']))
                          , grid_aspect=grid_aspect
                          , grid_5=grid_5
                          , i_aspect=data['i_aspect']
                          , thumbnails=data['thumbnails']
                          )

def one_file_per_item():
    for idx, data in enumerate(img_data):
        with open(out_dir + sep + 'img_' + '{0:04d}'.format(idx) + '.html', 'w') as out_file:
            out_file.write(gen_item_html(data))

def batch_items(n):
    mode = 'w'
    count = 0
    for idx, data in enumerate(img_data):

        with open(out_dir + sep + 'img_' + '{0:04d}'.format(count) + '.html', mode) as out_file:
            out_file.write(gen_item_html(data))

        if (idx + 1) % n == 0:
            count = count + 1
            mode = 'w'
        else:
            mode = 'a'

if __name__ ==  "__main__":
    batch_items(100)
    # one_file_per_item()
