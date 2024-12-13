const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

// 引入现有路由
const genericRoutes = require('./routes/generic');
const projectRoutes = require('./routes/projects');
const userRoutes = require('./routes/users');
const roleRoutes = require('./routes/roles');
const metadataRoutes = require('./routes/metadata');
const centralControlRoutes = require('./routes/centralControl');
const permissionRoutes = require('./routes/permissions');
const userDefinedJSONRoutes = require('./routes/userDefinedJSON');

// 引入新增路由
const userGroupsRouter = require('./routes/userGroups');

// 使用中间件
app.use(cors());
app.use(express.json());

// 设置 Swagger 文档
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AI 展览云系统 API',
      version: '1.0.0',
      description: 'API documentation for AI-based exhibition and management system',
    },
  },
  apis: ['./routes/*.js'], // 指定哪些路由文件需要生成文档
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));  // API 文档访问路径

// 注册现有路由
app.use('/api/v1/generic', genericRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/roles', roleRoutes);
app.use('/api/v1/metadata', metadataRoutes);
app.use('/api/v1/centralControl', centralControlRoutes);
// 注册新增路由
app.use('/api/v1/userGroups', userGroupsRouter);
app.use('/api/v1/permissions', permissionRoutes);
app.use('/api/v1/userDefinedJSON', userDefinedJSONRoutes);

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
