# Sử dụng image Node.js 20.16.0 chính thức
FROM node:20.16.0

# Tạo thư mục ứng dụng trong container
WORKDIR /usr/src/app

# Copy file package*.json trước (để tận dụng cache)
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Expose cổng mà ứng dụng sử dụng (thường là 3000 hoặc 8080)
EXPOSE 49154

# Lệnh chạy ứng dụng (chỉnh lại nếu dùng pm2 hoặc yarn)
CMD ["npm", "start"]