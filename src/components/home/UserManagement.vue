<template>
  <el-main>
    <el-form :inline="true" label-width="80px" class="user-management-form">
      <!-- 姓名 -->
      <el-form-item :label="$t('searchheader.name')">
        <el-input
          :placeholder="$t('searchheader.m_name')"
          v-model="searchCriteria.username"
          clearable
          class="input-field"
        ></el-input>
      </el-form-item>

      <!-- 性别 -->
      <el-form-item :label="$t('searchheader.gender')">
        <el-select
          v-model="searchCriteria.gender"
          :placeholder="$t('searchheader.m_gender')"
          clearable
          class="input-field"
        >
          <el-option :label="$t('option.male')" :value="0"></el-option>
          <el-option :label="$t('option.female')" :value="1"></el-option>
        </el-select>
      </el-form-item>

      <!-- 入职日期 -->
      <el-form-item :label="$t('searchheader.time')">
        <el-date-picker
          v-model="searchCriteria.createdTime"
          type="date"
          :placeholder="$t('searchheader.m_time')"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          clearable
          class="input-field"
        ></el-date-picker>
      </el-form-item>

      <!-- 查询按钮 -->
      <el-form-item>
        <el-button type="primary" @click="handleSearch">{{
          $t("searchheader.button")
        }}</el-button>
      </el-form-item>
    </el-form>
    <!-- 分割线 -->
    <el-divider style="margin: 10px 0"></el-divider>
    <!-- 添加用户的按钮 -->
    <el-button
      text
      bg
      key="primary"
      type="primary"
      @click="openDialog('add')"
      >{{ $t("button.add") }}</el-button
    >

    <!-- 批量删除用户的按钮 -->
    <el-button text bg key="danger" type="danger" @click="handleDeleteUsers">{{
      $t("button.delete")
    }}</el-button>
    <!-- 用户列表 -->
    <el-table
      :data="users"
      stripe
      height="480px"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" width="50" />
      <el-table-column
        prop="username"
        :label="$t('table.name')"
      ></el-table-column>
      <el-table-column
        prop="password"
        :label="$t('table.password')"
      ></el-table-column>
      <el-table-column :label="$t('table.type')">
        <template #default="scope">
          <span v-if="scope.row.role === 0">{{ $t("option.common") }}</span>
          <span v-else>{{ $t("option.vip") }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.gender')">
        <template #default="scope">
          <span v-if="scope.row.gender === 0">{{ $t("option.male") }}</span>
          <span v-else>{{ $t("option.female") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="email"
        :label="$t('table.email')"
      ></el-table-column>
      <el-table-column
        prop="phone"
        :label="$t('table.phone')"
      ></el-table-column>
      <el-table-column
        prop="createdTime"
        :label="$t('table.create')"
        :formatter="formatDate"
      ></el-table-column>
      <el-table-column
        prop="updatedTime"
        :label="$t('table.update')"
        :formatter="formatDate"
      ></el-table-column>
      <el-table-column :label="$t('table.operation')" width="200">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="openDialog('edit', scope.row)"
            style="font-size: 14px"
            >{{ $t("button.edit") }}</el-button
          >
          <el-button
            link
            type="danger"
            size="small"
            @click="handleDeleteUser(scope.row.id)"
            style="font-size: 14px"
            >{{ $t("button.del") }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="totalItems > 0"
      background
      layout="total, prev, pager, next, jumper"
      :current-page="page"
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
      @close="handleDialogClose"
    >
      <el-form :model="currentUser" :rules="userRules" ref="userForm">
        <el-form-item
          :label="$t('searchheader.name')"
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input v-model="currentUser.username"></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('searchheader.password')"
          :label-width="formLabelWidth"
          prop="password"
        >
          <el-input v-model="currentUser.password"></el-input>
        </el-form-item>
        <el-form-item :label="$t('searchheader.type')" :label-width="formLabelWidth" prop="role">
          <el-select v-model="currentUser.role" :placeholder="$t('searchheader.m_role')">
            <el-option :label="$t('option.common')" :value="0"></el-option>
            <el-option :label="$t('option.vip')" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('searchheader.gender')" :label-width="formLabelWidth" prop="gender">
          <el-select v-model="currentUser.gender" :placeholder="$t('searchheader.m_gender')">
            <el-option :label="$t('option.male')" :value="0"></el-option>
            <el-option :label="$t('option.female')" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('searchheader.email')" :label-width="formLabelWidth" prop="email">
          <el-input v-model="currentUser.email"></el-input>
        </el-form-item>
        <el-form-item :label="$t('searchheader.phone')" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="currentUser.phone"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button
            text
            bg
            key="danger"
            type="danger"
            @click="isDialogVisible = false"
            >{{$t('button.cancel')}}</el-button
          >
          <el-button
            text
            bg
            key="primary"
            type="primary"
            @click="saveUser"
            :loading="isSaving"
            >{{$t('button.save')}}</el-button
          >
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
const page = ref(1);
const pageSize = ref(6);
const isDialogVisible = ref(false);
const dialogTitle = ref("添加用户");

// 定义搜索条件的响应式对象
const searchCriteria = ref({
  username: "",
  gender: null,
  createdTime: null,
});

// 对话框的数据
const currentUser = ref({
  id: null,
  username: "",
  password: "",
  role: null,
  gender: null,
  email: "",
  phone: "",
});
// 验证规则集
const userRules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 16, message: "密码长度应为6到16个字符", trigger: "blur" },
    {
      pattern: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d\W_]{6,16}$/,
      message: "密码必须包含字母和数字，且不包含中文字符",
      trigger: "blur",
    },
    { pattern: /^\S+$/, message: "密码不能包含空格", trigger: "blur" },
  ],
  role: [{ required: true, message: "请选择用户类型", trigger: "blur" }],
  gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
  email: [
    {
      required: true,
      type: "email",
      message: "请输入正确的邮箱地址",
      trigger: "blur",
    },
  ],
  phone: [
    { required: true, message: "请输入电话号码", trigger: "blur" },
    {
      pattern: /^[0-9]{11}$/,
      message: "电话号码应为11位数字",
      trigger: "blur",
    },
  ],
};

// 删除用户的id列表
const delete_user_ids = ref([]);
const formLabelWidth = "80px";
// 加载用户数据
const loadUsers = async () => {
  try {
    const params = {
      page: page.value,
      pageSize: pageSize.value,
      ...searchCriteria.value,
    };
    const response = await UserService.fetchUsers(params);
    users.value = response.data.rows;
    totalItems.value = response.data.total;
  } catch (error) {
    ElMessage.error("加载用户数据失败");
  }
};

// 搜索用户
const handleSearch = () => {
  page.value = 1; // 搜索时重置到第一页
  loadUsers();
};

// 分页处理
const handlePageChange = (newpage) => {
  page.value = newpage;
  loadUsers();
};

// 表单引用
const userForm = ref(null);
// 每次对话框关闭时，清除验证状态和表单数据
const handleDialogClose = () => {
  if (userForm.value) {
    userForm.value.resetFields(); // 重置表单字段
  }
};
// 打开对话框
const openDialog = (action, user = null) => {
  if (userForm.value) {
    userForm.value.resetFields(); // 重置表单字段
  }
  if (action === "edit" && user) {
    currentUser.value = { ...user };
    dialogTitle.value = "编辑用户";
  } else {
    currentUser.value = {
      id: null,
      username: "",
      password: "",
      role: null,
      gender: null,
      email: "",
      phone: "",
    };
    dialogTitle.value = "添加用户";
  }
  isDialogVisible.value = true;
};

const isSaving = ref(false); // 控制按钮的 loading 状态
// 保存用户
const saveUser = async () => {
  isSaving.value = true; // 开始显示按钮的 loading 状态
  try {
    const userFormRef = userForm.value;
    const isValid = await userFormRef.validate(); // 使用 async/await 进行表单验证
    if (isValid) {
      if (currentUser.value.id) {
        // 编辑用户
        await UserService.updateUser(currentUser.value);
        ElMessage({
          type: "success",
          message: "更新用户成功!",
        });
        loadUsers(); // 更新列表
      } else {
        // 添加新用户
        await UserService.createUser(currentUser.value);
        ElMessage({
          type: "success",
          message: "添加用户成功!",
        });
        loadUsers(); // 更新列表
      }
      isDialogVisible.value = false;
    }
  } catch (error) {
    ElMessage.error("保存用户失败");
  } finally {
    isSaving.value = false; // 请求结束后关闭按钮的 loading 状态
  }
};

// 将选择的用户的 id 存储到 delete_user_ids 中
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
    return true; // 返回 true 表示用户确认删除
  } catch (error) {
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
    try {
      await UserService.deleteUser(delete_user_ids.value);
      loadUsers(); // 更新列表
    } catch (error) {
      ElMessage.error("删除用户失败");
    }
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
    }
  }
};
// 简单的日期格式化函数
const formatDate = (row, column, cellValue) => {
  if (!cellValue) return "";
  const date = new Date(cellValue);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
onMounted(loadUsers);
</script>

<style scoped>
.user-management-form {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px; /* 使用 gap 控制元素间距 */
  height: 50px; /* 调整表单的高度 */
}
.input-field {
  width: 200px;
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