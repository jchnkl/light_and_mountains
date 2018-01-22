#!/bin/sh

imgdir=$1

thumbdir=$2

origimg=$3

thumb=$(basename $(echo ${origimg} | sed -e 's/\.jpg/_t\.jpg/'))

title=$(exiftool -p '$Title' -Title ${origimg})

caption=$(exiftool -p '$Description' -Description ${origimg})

width=$(identify -format '%w' ${origimg})

height=$(identify -format '%h' ${origimg})

geom=$(identify -format 'height="%h" width="%w"' ${thumbdir}/${thumb})

if [ ! -e ${thumbdir}/${thumb} ]; then
    exit 1
fi

function html() {
cat << EOF
<a href="${origimg}">
<img alt="${title}"
     src="${thumbdir}/${img}" ${geom}/>
</a>
EOF
}

function json() {
cat << EOF
{
  src: '${origimg}',
  w: ${width},
  h: ${height},
  title: ${title},
  caption: ${caption}
}
EOF
}

json
