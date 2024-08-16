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
    </div>
    <!-- 添加用户的按钮 -->
    <el-button text bg key="primary" type="primary" @click="openDialog('add')"
      >添加用户</el-button
    >

    <!-- 批量删除用户的按钮 -->
    <el-button text bg key="danger" type="danger" @click="handleDeleteUsers"
      >批量删除</el-button
    >

    <el-table
      :data="users"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" width="50" />
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="role" label="角色"></el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="openDialog('edit', scope.row)"
            >编辑</el-button
          >
          <el-button
            link
            type="danger"
            size="small"
            @click="handleDeleteUser(scope.row.id)"
            >删除</el-button
          >
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
      class="custom-pagination"
    ></el-pagination>
    <!-- 对话框 -->
    <el-dialog
      :header="dialogTitle"
      v-model="isDialogVisible"
      width="500"
      draggable
    >
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
import { ref, onMounted, markRaw } from "vue";
import { UserService } from "@/api/users";
import { ElMessage, ElMessageBox } from "element-plus";
import { Delete } from "@element-plus/icons-vue";

const users = ref([]);
const totalItems = ref(0);
const currentPage = ref(1);
const pageSize = ref(8);
const searchQuery = ref("");
const isDialogVisible = ref(false);
const dialogTitle = ref("添加用户");
// 对话框的数据
const currentUser = ref({
  id: null,
  name: "",
  email: "",
  role: "",
});
// 删除用户的id列表
const delete_user_ids = ref([]);
const formLabelWidth = "80px";
// 加载用户数据
const loadUsers = async () => {
  try {
    const params = {
      page: currentPage.value,
      limit: pageSize.value,
      search: searchQuery.value,
    };
    // const response = await fetchUsers(params);
    // users.value = response.data;
    // totalItems.value = response.total;
    users.value = [
      { id: 8, name: "张三", email: "123", role: "admin" },
      { id: 8, name: "李四", email: "456", role: "user" },
      { id: 8, name: "王五", email: "789", role: "admin" },
      { id: 8, name: "赵六", email: "101112", role: "user" },
      { id: 8, name: "张三", email: "123", role: "admin" },
      { id: 8, name: "李四", email: "456", role: "user" },
      { id: 8, name: "王五", email: "789", role: "admin" },
      { id: 8, name: "赵六", email: "101112", role: "user" },
    ];
    totalItems.value = 8;
  } catch (error) {
    console.error("加载用户数据失败", error);
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
  if (action === "edit" && user) {
    currentUser.value = { ...user };
    dialogTitle.value = "编辑用户";
  } else {
    currentUser.value = { id: null, name: "", email: "", role: "" };
    dialogTitle.value = "添加用户";
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
    console.error("保存用户失败", error);
  }
};

// 选择框
const handleSelectionChange = (user_list) => {
  delete_user_ids.value = user_list.map((user) => user.id);
};

// 封装确认对话框的函数
const confirmDelete = async () => {
  try {
    await ElMessageBox.confirm("此操作将永久删除该记录, 是否继续?", "警告", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      icon: markRaw(Delete),
    });
    // 用户确认删除
    ElMessage({
      type: "success",
      message: "删除成功!",
    });
    return true; // 返回 true 表示用户确认删除
  } catch (error) {
    // 用户取消操作
    ElMessage({
      type: "info",
      message: "已取消删除",
    });
    return false; // 返回 false 表示用户取消删除
  }
};

// 批量删除的操作
const handleDeleteUsers = async () => {
  if (delete_user_ids.value.length === 0) {
    return;
  }
  const confirmed = await confirmDelete();
  if (confirmed) {
    console.log("执行删除操作");
    try {
      await UserService.deleteUser(delete_user_ids.value);
      loadUsers(); // 更新列表
    } catch (error) {
      ElMessage.error("删除用户失败");
      console.error("删除用户失败", error);
    }
  } else {
    console.log("删除操作已取消");
  }
};

// 删除用户
const handleDeleteUser = async (id) => {
  const confirmed = await confirmDelete();
  if (confirmed) {
    try {
      const ids = [id];
      await UserService.deleteUser(ids);
      loadUsers(); // 更新列表
    } catch (error) {
      ElMessage.error("删除用户失败");
      console.error("删除用户失败", error);
    }
  } else {
    console.log("删除操作已取消");
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