Iofel_Benjamin_CS546_A.zip: $(wildcard *.js *.json *.html) views
	zip -r $@ $^
