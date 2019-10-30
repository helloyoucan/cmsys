FROM node
RUN mkdir /app \
COPY . /app/
RUN cd /app \
npm run start
EXPOSE 8000