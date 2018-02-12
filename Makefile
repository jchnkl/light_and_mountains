all: index.html

index.html: gen_html.py templates/base.html templates/pswp.html
	./gen_html.py > index.html

flickr-justified-layout:
	make -C js/flickr-justified-layout

html:
	scripts/gen_img_meta.py img img img/tns jpg m img/*.jpg img/*.jpg img/*.jpg img/*.jpg img/*.jpg img/*.jpg img/*.jpg img/*.jpg img/*.jpg img/*.jpg | scripts/img_meta_to_html.py html

clean:
	rm index.html

.PHONY: clean html
