#!/usr/bin/env python3

from jinja2 import Environment, FileSystemLoader, select_autoescape

env = Environment(
  loader = FileSystemLoader('templates'),
  autoescape = select_autoescape(['html'])
)

template = env.get_template('pswp.html')

gallery = open('gallery.html')

print(template.render(gallery = gallery.read()))

gallery.close()
