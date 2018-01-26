#!/bin/bash

# arg=$1

# if [ ! -e ${thumbdir}/${thumb} ]; then
#     exit 1
# fi

# web dir
w_dir=$1; shift

# img dir
i_dir=$1; shift

# web thumb dir
t_dir=$1; shift

suffix=$1; shift

images=$@

function gen_html() {
  idx=$1; shift

  i=$(basename $1); shift

  t=$(basename $(echo ${i} | sed -e "s/\.${suffix}/_t\.${suffix}/"))

  title=$(exiftool -p '$Title' -Title ${i_dir}/${i})

  caption=$(exiftool -p '$Description' -Description ${i_dir}/${i})

  i_width=$(identify -format '%w' ${i_dir}/${i})

  i_height=$(identify -format '%h' ${i_dir}/${i})

  t_width=$(identify -format '%w' ${t_dir}/${t})

  t_height=$(identify -format '%h' ${t_dir}/${t})

cat > gallery/img_$(printf "%04d" ${idx}).html << EOF
  <figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject">
    <a href="${w_dir}/${i}" itemprop="contentUrl" data-size="${i_width}x${i_height}" data-index="${idx}">
      <img src="${t_dir}/${t}" width="${t_width}" height="${t_height}" itemprop="thumbnail" alt="${title}"/>
    </a>
  </figure>
EOF
}

idx=0
for img in ${images}; do
  gen_html ${idx} ${img}
  idx=$(($idx+1))
done



# function gen_json() {
# cat << EOF
# {
#   src: '${origimg}',
#   w: ${width},
#   h: ${height},
#   title: ${title},
#   caption: ${caption}
# }
# EOF
# }

# if [ $arg = 'html' ]; then
#     gen_html
# else
#     gen_json
# fi
