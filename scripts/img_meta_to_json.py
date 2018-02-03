#!/usr/bin/env python3

from os.path import sep
from sys import argv, stdin
from json import loads, dumps

out_dir = argv[1]

img_data = loads(stdin.read())

for idx, d in enumerate(img_data):
    with open(out_dir + sep + 'img_' + '{0:04d}'.format(idx) + '.json', 'w') as out_file:
        out_file.write(dumps(d))
