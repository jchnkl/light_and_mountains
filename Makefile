all: index.html

index.html: gen_html.py templates/base.html templates/pswp.html
	./gen_html.py > index.html

flickr-justified-layout:
	make -C js/flickr-justified-layout

clean:
	rm index.html
