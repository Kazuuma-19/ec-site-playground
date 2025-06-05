open:
	cd frontend && cursor .
	cd backend && idea64.exe .

front-ready:
	cd frontend && npm install

back-ready:
	cd backend && ./gradlew clean build

ready:
	make front-ready
	make back-ready

front:
	cd frontend && npm run dev

back:
	cd backend && ./gradlew bootRun