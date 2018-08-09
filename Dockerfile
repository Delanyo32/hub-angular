# Use node 4.4.5 LTS
FROM node:latest
ENV LAST_UPDATED 20160605T165400

# Copy source code
COPY . /app

# Change working directory
WORKDIR /app

# Install dependencies
RUN npm install


RUN npm run build

# Install elasticsearch
#RUN npm install elasticsearch --save

# Expose API port to the outside
EXPOSE 4000

# Launch application
CMD ["npm","start"]