#!/bin/bash

thumbdir=$1

img=$2

declare -A sizes

sizes[t]=100
sizes[m]=240
sizes[n]=320
sizes[z]=640
sizes[c]=800
sizes[b]=1024
sizes[h]=1600
sizes[k]=2048

for suffix in t m n z c b h k; do

    thumb=$(basename $(echo ${img} | sed -e "s/\.jpg/_${suffix}\.jpg/"))
    if [ ! -e ${thumbdir}/${thumb} ]; then
        convert \
          -strip \
          -interlace Plane \
          -sampling-factor 4:2:0 \
          -define jpeg:dct-method=float \
          -quality 75% \
          -geometry ${sizes[${suffix}]}x \
          ${img} \
          ${thumbdir}/${thumb}
    fi
    if [ ${suffix} = t ]; then
        pushd ${thumbdir}
        ln -s ${thumb} $(basename ${img})
        popd
    fi

done
