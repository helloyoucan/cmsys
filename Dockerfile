FROM node
RUN mkdir /app \
COPY ./cmsys /app/
RUN npm run start
EXPOSE 8000