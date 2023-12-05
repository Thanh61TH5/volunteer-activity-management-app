<script setup lang="ts">
definePageMeta({
  layout: "sidebar-admin",
  middleware: "auth"
})
const emit = defineEmits(['ok','close'])

const client = useSupabaseClient();
const value1 = ref('');
const value2 = ref('')
const isDialogDashboard1Visible = ref(true);
const search = ref('');
const users = ref<User[]>([]);
const pageSize = 20;
const currentPage = ref(1);
const startYear = ref<number | null>(null);
const startMonth = ref<number | null>(null);
const endYear = ref<number | null>(null);
const endMonth = ref<number | null>(null);
const resetData = () => {
  value1.value = "";
  value2.value = "";
  search.value = "";
  users.value = [];
  startYear.value = null;
  startMonth.value = null;
  endYear.value = null;
  endMonth.value = null;
  currentPage.value = 1;
};


async function fetchUserData() {
  if (startYear.value === null || startMonth.value === null || endYear.value === null || endMonth.value === null) {
    console.error('Invalid date values');
    return;
  }

  const formatDate = (year, month) => {
    return `${year}-${month < 10 ? '0' : ''}${month}-01`;
  };

  const { data: usersData, count, error } = await client
      .from('accounts')
      .select('*', { count: 'exact' }) // Include count in the result
      .eq('status', 'TRUE')
      .eq('role', 'Người cần hỗ trợ')
      .gte('created_at', formatDate(startYear.value, startMonth.value))
      .lt('created_at', formatDate(endYear.value, endMonth.value))
      .order('id', { ascending: true });

  if (error) {
    console.log(error);
  } else {
    users.value = usersData;
    const totalCount = count;
    console.log('Total Count:', totalCount);
  }
}


const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Bạn có chắc chắn muốn thoát chức năng này không?', 'Xác nhận', {
    confirmButtonText: 'Có',
    cancelButtonText: 'Không',
    type: 'warning'
  })
      .then(() => {
        value1.value = "";
        value2.value ="";
        resetData();
        fetchUserData()
        emit('close');
        done()
      })
      .catch(() => {
        // catch error
      })
}

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}


const tableData = computed(() =>
    users.value.filter(
        (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase())

    )
);


function handlePageChange(newPage: number) {
  currentPage.value = newPage;
  fetchUserData();
}

const currentPageData = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return tableData.value.slice(startIndex, endIndex);
})

const handleCount = () => {
  const date1 = new Date(value1.value);
  const date2 = new Date(value2.value);

  startYear.value = date1.getFullYear();
  startMonth.value = date1.getMonth() + 1; // Months are zero-based

  endYear.value = date2.getFullYear();
  endMonth.value = date2.getMonth() + 1; // Months are zero-based
  fetchUserData()
};


</script>
<template>
  <el-dialog v-model="isDialogDashboard1Visible" :before-close="handleClose">
    <div class="flex flex-col justify-center items-center">
      <h1 class="text-gray-600 sm:text-xl text-md font-medium pb-2">Thống kê số lượng người cần hỗ trợ theo tháng</h1>
      <div class="demo-date-picker">
        <div class="block flex flex-col justify-center items-center space-y-5">
          <span class="demonstration">Mời chọn mốc thời gian bắt đầu</span>
          <el-date-picker
              v-model="value1"
              type="month"
              start-placeholder="Tháng bắt đầu"
              end-placeholder="Tháng kết thúc"
              format='YYYY/MM'
          />
        </div>
        <div class="block flex flex-col justify-center items-center space-y-5">
          <span class="demonstration">Mời chọn mốc thời gian kết thúc</span>
          <el-date-picker
              v-model="value2"
              type="month"
              start-placeholder="Tháng bắt đầu"
              end-placeholder="Tháng kết thúc"
              format='YYYY/MM'
          />
        </div>
      </div>


      <div class="flex flex-col items-center justify-center mb-5">
        <button class="bg-blue-500 rounded text-white px-5 py-2 hover:bg-blue-400 m-5" @click="handleCount">
          Thống kê
        </button>
        <div class="border border-gray-500 rounded p-3">
          <p>Kết quả: {{tableData.length}}</p>
        </div>
      </div>

      <el-table v-if="tableData.length > 0" :data="currentPageData" style="width: 100%" :pagination="{
      pageSize: 10,
      layout: 'total, sizes, prev, pager, next, jumper',
      total: tableData.length
    }">
        <el-table-column label="ID" prop="id" />
        <el-table-column label="Họ tên" prop="name" />
        <el-table-column label="Email" prop="email" />
        <el-table-column label="Mật khẩu" prop="password" />
        <el-table-column label="Loại tài khoản" prop="role" />
      </el-table>

      <div class="text-center" v-else>
        <p>Không tìm thấy dữ liệu người dùng</p>
      </div>
      <el-pagination class="mt-10" layout="prev, pager, next" :total="tableData.length" @current-change="handlePageChange"></el-pagination>
    </div>
  </el-dialog>
</template>

<style scoped>
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}
.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}
.demo-date-picker .block:last-child {
  border-right: none;
}
</style>