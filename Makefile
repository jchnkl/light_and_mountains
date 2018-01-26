all: index.html gallery.html

index.html: gen_html.py gallery.html templates/base.html templates/pswp.html
	./gen_html.py > index.html

# gallery.html: gen_img_html.sh
# 	./gen_img_html.sh img img img/tns jpg img/*.jpg img/*.jpg img/*.jpg img/*.jpg img/*.jpg img/*.jpg #> gallery.html

clean:
	rm index.html
	rm gallery.html
