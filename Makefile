all: index.html

index.html: gen_html.py templates/base.html templates/pswp.html
	./gen_html.py > index.html

clean:
	rm index.html
