// backend/app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// 引入路由
const genericRoutes = require('./routes/generic');
const projectRoutes = require('./routes/projects');
const userRoutes = require('./routes/users');
const roleRoutes = require('./routes/roles');

// 使用中间件
app.use(cors());
app.use(express.json());

// 路由注册
app.use('/api/v1/generic', genericRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/roles', roleRoutes);

// MongoDB 连接
mongoose.connect('mongodb://localhost:27017/db_platform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected successfully!');
}).catch(error => {
  console.error('Error connecting to MongoDB:', error.message);
});

app.listen(3000, () => console.log('Backend running on http://localhost:3000'));
