<template>
  <el-main>
    <div class="user-management-header">
      <el-input
        placeholder="搜索用户"
        v-model="searchQuery"
        prefix-icon="el-icon-search"
        @input="handleSearch"
        clearable
      ></el-input>
      <el-button text bg key = "primary" type="primary" @click="openDialog('add')">添加用户</el-button>
    </div>

    <el-table :data="users" stripe style="width: 100%">
      <el-table-column prop="id" label="ID" width="50"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="role" label="角色"></el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="openDialog('edit', scope.row)">编辑</el-button>
          <el-button link  type="danger" size="small" @click="handleDeleteUser(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="totalItems > 0"
      background
      layout="total, prev, pager, next, jumper"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="totalItems"
      @current-change="handlePageChange"
      class = "custom-pagination"
    ></el-pagination>

    <el-dialog :header="dialogTitle" v-model="isDialogVisible" width="500">
      <el-form :model="currentUser">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="currentUser.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="currentUser.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select v-model="currentUser.role" placeholder="请选择角色">
            <el-option label="管理员" value="admin"></el-option>
            <el-option label="用户" value="user"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
        <el-button @click="isDialogVisible = false">取消</el-button>
        <el-button link type="primary" @click="saveUser">保存</el-button>
      </div>
    </template>
    </el-dialog>
  </el-main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchUsers, createUser, updateUser, deleteUser } from '@/api/users';

const users = ref([]);
const totalItems = ref(0);
const currentPage = ref(1);
const pageSize = ref(8);
const searchQuery = ref('');
const isDialogVisible = ref(false);
const dialogTitle = ref('添加用户');
const currentUser = ref({
  id: null,
  name: '',
  email: '',
  role: ''
});

const formLabelWidth = '80px';

// 加载用户数据
const loadUsers = async () => {
  try {
    const params = {
      page: currentPage.value,
      limit: pageSize.value,
      search: searchQuery.value
    };
    // const response = await fetchUsers(params);
    // users.value = response.data;
    // totalItems.value = response.total;
    users.value = [
      { id: 1, name: '张三', email: '123', role: 'admin' },
      { id: 2, name: '李四', email: '456', role: 'user' },
      { id: 3, name: '王五', email: '789', role: 'admin' },
      { id: 4, name: '赵六', email: '101112', role: 'user' },
      { id: 5, name: '张三', email: '123', role: 'admin' },
      { id: 6, name: '李四', email: '456', role: 'user' },
      { id: 7, name: '王五', email: '789', role: 'admin' },
      { id: 8, name: '赵六', email: '101112', role: 'user' },
  ];
  totalItems.value = 8;
  } catch (error) {
    console.error('加载用户数据失败', error);
  }
};

// 搜索用户
const handleSearch = () => {
  currentPage.value = 1; // 搜索时重置到第一页
  loadUsers();
};

// 分页处理
const handlePageChange = (page) => {
  currentPage.value = page;
  loadUsers();
};

// 打开对话框
const openDialog = (action, user = null) => {

  if (action === 'edit' && user) {
    currentUser.value = { ...user };
    dialogTitle.value = '编辑用户';
  } else {
    currentUser.value = { id: null, name: '', email: '', role: '' };
    dialogTitle.value = '添加用户';
  }
  isDialogVisible.value = true;
};

// 保存用户
const saveUser = async () => {
  try {
    if (currentUser.value.id) {
      // 编辑用户
      // await updateUser(currentUser.value.id, currentUser.value);
      loadUsers(); // 更新列表
    } else {
      // 添加新用户
      // await createUser(currentUser.value);
      loadUsers(); // 更新列表
    }
    isDialogVisible.value = false;
  } catch (error) {
    console.error('保存用户失败', error);
  }
};

// 删除用户
const handleDeleteUser = async (id) => {
  try {
    // await deleteUser(id);
    loadUsers(); // 更新列表
  } catch (error) {
    console.error('删除用户失败', error);
  }
};

onMounted(loadUsers);
</script>

<style scoped>
.user-management-header {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
} 
.dialog-footer {
  text-align: right;
}
/* 为分页小组件添加间距 */
.custom-pagination .el-pagination__item {
  margin: 0 50px;
}

.custom-pagination .el-pagination__prev,
.custom-pagination .el-pagination__next {
  margin: 0 50px;
}

.custom-pagination .el-pagination__sizes,
.custom-pagination .el-pagination__jump {
  margin: 0 100px;
}
</style>