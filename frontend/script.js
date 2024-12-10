const modules = {
  users: {
    name: '用户管理',
    fields: ['username', 'phone', 'email', 'password', 'role'],
    apiEndpoint: 'http://localhost:3000/api/v1/users',
  },
  projects: {
    name: '项目管理',
    fields: ['name', 'description', 'created_by', 'userGroup'],
    apiEndpoint: 'http://localhost:3000/api/v1/projects',
  },
  roles: {
    name: '角色管理',
    fields: ['roleName', 'permissions'],
    apiEndpoint: 'http://localhost:3000/api/v1/roles',
  },
  tables: {
    name: '表单管理',
    fields: ['formName', 'fields'],
    apiEndpoint: 'http://localhost:3000/api/v1/generic',
  },
};

document.getElementById('module-select').addEventListener('change', selectModule);

let currentModule = 'users';

function selectModule() {
  currentModule = document.getElementById('module-select').value;
  generateForm();
  fetchAndDisplayData();
}

function generateForm() {
  const form = document.getElementById('data-form');
  form.innerHTML = '';

  modules[currentModule].fields.forEach(field => {
    const label = document.createElement('label');
    label.textContent = `${field}: `;
    const input = document.createElement('input');
    
    // 处理手机号字段
    input.type = field === 'phone' ? 'tel' : 'text';

    // 如果字段包含 "date"，将输入类型设置为 "date"
    if (field.includes('date')) {
      input.type = 'date';
    }

    input.id = field;
    input.name = field;
    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(document.createElement('br'));
  });

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = '提交';
  form.appendChild(submitButton);

  form.addEventListener('submit', handleSubmit);
}

function fetchAndDisplayData() {
  const table = document.getElementById('data-table');
  const thead = table.querySelector('thead');
  const tbody = table.querySelector('tbody');
  thead.innerHTML = '';
  tbody.innerHTML = '';

  const headerRow = thead.insertRow();
  modules[currentModule].fields.forEach(field => {
    const th = document.createElement('th');
    th.textContent = field;
    headerRow.appendChild(th);
  });

  const actionsTh = document.createElement('th');
  actionsTh.textContent = '操作';
  headerRow.appendChild(actionsTh);

  axios.get(modules[currentModule].apiEndpoint)
    .then(response => {
      response.data.forEach(item => {
        const row = tbody.insertRow();
        modules[currentModule].fields.forEach(field => {
          const cell = row.insertCell();

          // 检查字段是否为关联字段并提取子字段值
          if (field === 'created_by' && item[field]) {
            cell.textContent = item[field].username; // 提取关联字段的 username
          } else if (field === 'userGroup' && item[field]) {
            cell.textContent = item[field].groupName; // 提取关联字段的 groupName
          } else {
            cell.textContent = item[field] || ''; // 处理其他字段
          }
        });

        const actionsCell = row.insertCell();
        const editBtn = document.createElement('button');
        editBtn.textContent = '编辑';
        editBtn.addEventListener('click', () => editItem(item));
        actionsCell.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '删除';
        deleteBtn.addEventListener('click', () => deleteItem(item._id));
        actionsCell.appendChild(deleteBtn);
      });
    })
    .catch(error => console.error(error));
}


function handleSubmit(event) {
  event.preventDefault();

  const data = {};
  let valid = true;
  let errorMessage = "";

  // 清除之前的错误提示
  document.getElementById('error-message').innerText = '';

  modules[currentModule].fields.forEach(field => {
    const value = document.getElementById(field).value;
    if (!value) {
      valid = false;
      errorMessage = `${field} 是必填项`;
    }
    data[field] = value;
  });

  if (!valid) {
    document.getElementById('error-message').innerText = errorMessage;
    return;
  }

  console.log("Sending data to server:", { data }); // 打印发送的数据

  // 提交数据
  axios.post(modules[currentModule].apiEndpoint, { data })
    .then(() => {
      fetchAndDisplayData();
      document.getElementById('data-form').reset();
    })
    .catch(error => {
      console.error('Error in POST request:', error);
      document.getElementById('error-message').innerText = error.response?.data?.error || "服务器错误，请稍后再试。";
    });
}


function editItem(item) {
  modules[currentModule].fields.forEach(field => {
    const input = document.getElementById(field);

    // 如果是关联字段，显示子字段值
    if (field === 'created_by' && item[field]) {
      input.value = item[field].username;
    } else if (field === 'userGroup' && item[field]) {
      input.value = item[field].groupName;
    } else {
      input.value = item[field] || '';
    }
  });

  document.getElementById('data-form').addEventListener('submit', function updateData(event) {
    event.preventDefault();
    const updatedData = {};
    modules[currentModule].fields.forEach(field => {
      updatedData[field] = document.getElementById(field).value;
    });

    axios.put(`${modules[currentModule].apiEndpoint}/${item._id}`, { data: updatedData })
      .then(() => {
        fetchAndDisplayData();
        this.removeEventListener('submit', updateData);
        this.reset();
      })
      .catch(error => console.error(error));
  });
}


function deleteItem(id) {
  if (confirm('确定删除该数据项？')) {
    axios.delete(`${modules[currentModule].apiEndpoint}/${id}`)
      .then(() => fetchAndDisplayData())
      .catch(error => console.error(error));
  }
}

selectModule();
