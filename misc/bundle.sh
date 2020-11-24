 #!/bin/bash
mkdir -p ./bundle;

for i in `seq 1 248`; do 
	#Create folder for each person
	mkdir -p ./bundle/$i;

	#Copy 4 images in respective folders
	cp ./raw/raw_$i.png ./bundle/$i/raw.png;
	cp ./idcards/id_$i.png ./bundle/$i/id_card.png;
	cp ./skeleton/shape_$i.png ./bundle/$i/shape.png;
	cp ./zoom_bg/zoom_$i.png ./bundle/$i/zoom_bg.png;

	#Zip 4 images in Zip file
	cd ./bundle/$i/;
	zip -r lumen.zip ./*.png;
	cd ../..;
done