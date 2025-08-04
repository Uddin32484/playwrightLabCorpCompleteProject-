FROM mcr.microsoft.com/playwright:v1.54.1-noble

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx playwright install --with-deps

ENV CI=true
ENV HEADLESS=true

RUN mkdir -p testData
RUN echo "jobTitle,jobLocation,searchKeyword,url\nSenior Software Engineer,San Francisco CA USA,Software Developer,https://careers.labcorp.com" > testData/jobSearchData.csv

EXPOSE 9323

CMD ["npm", "test"]