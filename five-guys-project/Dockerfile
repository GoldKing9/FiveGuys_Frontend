# Node.js 18 버전을 기반으로 하는 이미지를 사용합니다.
FROM node:18-alpine

# 작업 디렉토리를 생성하고 설정합니다.
WORKDIR /five-guys-project

# 앱 종속성을 설치합니다.
COPY package*.json ./
RUN npm install

# 앱 소스 코드를 복사합니다.
COPY . .

# 리스닝 포트 3000으로 설정
EXPOSE 3000

# Vite 개발 서버를 시작합니다.
CMD ["npm", "run", "dev"]