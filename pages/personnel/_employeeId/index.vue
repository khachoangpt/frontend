<template>
  <div>
    <el-page-header @back="back"> </el-page-header>
    <el-row>
      <el-col class="detail-page-left" :span="4">
        <div class="grid-content bg-purple personnel-detail__left">
          <div class="detail-basic">
            <div
              class="detail-basic__avatar"
              :style="{
                backgroundImage: 'url(' + personnelDetail[0].avatar + ')',
              }"
            >
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <span class="detail-basic__name">{{
              personnelDetail[0].full_name
            }}</span>
            <span class="detail-basic__job">{{
              personnelDetail[0].grade
            }}</span>
          </div>
          <div class="detail__contact">
            <ul class="detail__contact-list">
              <li class="detail__contact-item">
                <i class="el-icon-success"></i>
                <span> 5 năm 4 tháng làm việc</span>
              </li>
              <li class="detail__contact-item">
                <i class="el-icon-s-grid"></i>
                <span> {{ personnelDetail[0].employee_id }} </span>
              </li>
              <li class="detail__contact-item">
                <i class="el-icon-suitcase"></i>
                <span> {{ personnelDetail[0].office_name }} </span>
              </li>
              <li class="detail__contact-item">
                <i class="el-icon-message"></i>
                <span> {{ personnelDetail[0].company_email }} </span>
              </li>
              <li class="detail__contact-item">
                <i class="el-icon-phone-outline"></i>
                <span> {{ personnelDetail[0].phone_number }} </span>
              </li>
            </ul>
          </div>
          <div class="detail__bookmark">
            <ul class="detail__bookmark-list">
              <li
                class="detail__bookmark-item"
                :class="{ 'detail__bookmark-item--active': activeSubTab === 1 }"
                @click="activeSubTab = 1"
              >
                <i class="el-icon-user bookmark-item__icon"></i>
                <div>
                  <p class="bookmark-item__text-head">Thông tin cá nhân</p>
                  <p class="bookmark-item__text-detail">
                    Thông tin cá nhân, pháp lý và lý lịch
                  </p>
                </div>
              </li>
              <li
                class="detail__bookmark-item"
                :class="{ 'detail__bookmark-item--active': activeSubTab === 2 }"
                @click="activeSubTab = 2"
              >
                <i class="el-icon-data-analysis bookmark-item__icon"></i>
                <div>
                  <p class="bookmark-item__text-head">Thông tin công việc</p>
                  <p class="bookmark-item__text-detail">
                    Công việc, sự nghiệp, tuyển dụng
                  </p>
                </div>
              </li>
              <li
                class="detail__bookmark-item"
                :class="{ 'detail__bookmark-item--active': activeSubTab === 3 }"
                @click="activeSubTab = 3"
              >
                <i class="el-icon-money bookmark-item__icon"></i>
                <div>
                  <p class="bookmark-item__text-head">Lương & phúc lợi</p>
                  <p class="bookmark-item__text-detail">
                    Bảng lương và phúc lợi
                  </p>
                </div>
              </li>
              <li
                class="detail__bookmark-item"
                :class="{ 'detail__bookmark-item--active': activeSubTab === 4 }"
                @click="activeSubTab = 4"
              >
                <i class="el-icon-document bookmark-item__icon"></i>
                <div>
                  <p class="bookmark-item__text-head">Hợp đồng & văn bản</p>
                  <p class="bookmark-item__text-detail">Hợp đồng và văn bản</p>
                </div>
              </li>
              <li
                class="detail__bookmark-item"
                :class="{ 'detail__bookmark-item--active': activeSubTab === 5 }"
                @click="activeSubTab = 5"
              >
                <i class="el-icon-date bookmark-item__icon"></i>
                <div>
                  <p class="bookmark-item__text-head">
                    Lịch làm việc & nghỉ phép
                  </p>
                  <p class="bookmark-item__text-detail">
                    Timesheets, Checkins & Timeoffs
                  </p>
                </div>
              </li>
              <li
                class="detail__bookmark-item"
                :class="{ 'detail__bookmark-item--active': activeSubTab === 6 }"
                @click="activeSubTab = 6"
              >
                <i class="el-icon-warning-outline bookmark-item__icon"></i>
                <div>
                  <p class="bookmark-item__text-head">Vi phạm</p>
                  <p class="bookmark-item__text-detail">
                    Các vi phạm quy định làm việc
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple personnel-detail__right">
          <h2 class="detail-right__header">Thông tin cá nhân</h2>
          <div class="detail-right__main-info">
            <div class="main-info-header">
              <span class="main-info-header__text">Thông tin chính</span>
              <span class="main-info-header__edit">Sửa thông tin chính</span>
            </div>
            <el-row class="main-info__content">
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <div class="main-info__content-item">
                    <span class="content-item__head">Họ và tên</span>
                    <span class="content-item__detail">{{
                      personnelDetail[0].full_name
                    }}</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple-light">
                  <div class="main-info__content-item">
                    <span class="content-item__head">Mã nhân sự</span>
                    <span class="content-item__detail">{{
                      personnelDetail[0].employee_id
                    }}</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <div class="main-info__content-item">
                    <span class="content-item__head">Ngày bắt đầu</span>
                    <span class="content-item__detail">{{
                      personnelDetail[0].start_date
                    }}</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <div class="main-info__content-item">
                    <span class="content-item__head">Ngày chính thức</span>
                    <span class="content-item__detail">28/12/2016</span>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row class="main-info__content">
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <div class="main-info__content-item">
                    <span class="content-item__head">Tình trạng việc làm</span>
                    <span class="content-item__detail working-status--active">{{
                      personnelDetail[0].working_status
                    }}</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple-light">
                  <div class="main-info__content-item">
                    <span class="content-item__head">Hợp đồng hiện tại</span>
                    <span class="content-item__detail">{{
                      personnelDetail[0].contract_url
                    }}</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <div class="main-info__content-item">
                    <span class="content-item__head">Số điện thoại</span>
                    <span class="content-item__detail">{{
                      personnelDetail[0].phone_number
                    }}</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <div class="main-info__content-item">
                    <span class="content-item__head">Chức danh</span>
                    <span class="content-item__detail">{{
                      personnelDetail[0].grade
                    }}</span>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row class="main-info__content">
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <div class="main-info__content-item">
                    <span class="content-item__head">Ngày sinh</span>
                    <span class="content-item__detail">{{
                      personnelDetail[0].birth_date
                    }}</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple-light">
                  <div class="main-info__content-item">
                    <span class="content-item__head">Email</span>
                    <span class="content-item__detail">{{
                      personnelDetail[0].personal_email
                    }}</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <div class="main-info__content-item">
                    <span class="content-item__head">Giới tính</span>
                    <span class="content-item__detail">
                      <i class="el-icon-female content-item__detail-icon"></i>
                      {{ personnelDetail[0].gender }}
                    </span>
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <div class="main-info__content-item">
                    <span class="content-item__head">Tình trạng hôn nhân</span>
                    <span class="content-item__detail">{{
                      personnelDetail[0].marital_status
                    }}</span>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row class="main-info__content">
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <div class="main-info__content-item">
                    <span class="content-item__head">Văn phòng</span>
                    <span class="content-item__detail">
                      <i class="el-icon-office-building"></i>
                      {{ personnelDetail[0].office_name }}
                    </span>
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple-light">
                  <div class="main-info__content-item">
                    <span class="content-item__head">Lịch làm việc</span>
                    <span class="content-item__detail">
                      <i class="el-icon-date"></i>
                      {{ personnelDetail[0].working_name }}
                    </span>
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <div class="main-info__content-item">
                    <span class="content-item__head">Chuyên môn</span>
                    <span class="content-item__detail">
                      <i class="el-icon-folder-checked"></i>
                      Quản lý
                    </span>
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <div class="main-info__content-item">
                    <span class="content-item__head">Phân loại nhân sự</span>
                    <span class="content-item__detail">
                      <i class="el-icon-collection-tag"></i>
                      Full time Employee
                    </span>
                  </div>
                </div>
              </el-col>
            </el-row>
            <div class="main-info__protect">
              <div class="main-info-header">
                <span class="main-info-header__text">Thuế và bảo hiểm</span>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'PersonnelDetailPage',
  layout: 'main',
  data() {
    return {
      imageUrl: '',
      activeSubTab: 1,
    }
  },
  computed: {
    ...mapGetters('user', ['personnelDetail']),
  },
  beforeMount() {
    this.getPersonnelDetail(this.$route.params.employeeId)
  },
  methods: {
    ...mapActions('user', ['getPersonnelDetail']),
    back() {
      this.$router.go(-1)
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('Avatar picture must be JPG format!')
      }
      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 2MB!')
      }
      return isJPG && isLt2M
    },
  },
}
</script>

<style>
.el-page-header__left::after {
  display: none;
}

.el-page-header__title {
  color: #4d77ff;
}

.el-icon-back {
  color: #4d77ff;
}

.personnel-detail__left {
  margin-top: 24px;
}

.detail-basic {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.detail-basic__avatar {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  /* background-image: url('static/avatar.jpg'),
    url('https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'); */
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border: 2px solid #4d77ff;
}

.detail-basic__avatar:hover {
  opacity: 0.6;
  cursor: pointer;
}

.detail-basic__avatar:hover .avatar-uploader {
  display: flex;
}

.detail-page-left {
  border-right: 2px solid #ccc;
  font-size: 14px;
  height: calc(100vh - 125px); /* or any value */
  overflow-y: auto;
}

.detail-page-left::-webkit-scrollbar {
  display: none;
}

.detail-basic__name {
  margin-top: 8px;
  font-size: 20px;
}

.detail-basic__job {
  font-size: 13px;
  color: #8ba9cb;
}

.detail__contact {
  margin-top: 24px;
}

.detail__contact-list {
  list-style: none;
  padding: 0;
}

.el-icon-success {
  color: #67c23a;
}

.detail__contact-item {
  margin-bottom: 8px;
}

.detail__bookmark {
  margin-top: 32px;
}

.detail__bookmark-list {
  padding: 0;
}

.detail__bookmark-item {
  display: flex;
  justify-content: left;
  align-items: center;
  margin-bottom: 24px;
  cursor: pointer;
}

.bookmark-item__icon {
  font-size: 30px;
  margin-right: 6px;
}

.bookmark-item__text-head {
  margin: 0;
  font-weight: 500;
}

.bookmark-item__text-detail {
  margin: 0;
  font-size: 12px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 160px;
  color: #8ba9cb;
}

.detail__bookmark-item--active {
  color: #204ee7 !important;
  border-right: 3px solid #4d77ff;
}

.personnel-detail__right {
  margin-left: 16px;
  height: calc(100vh - 125px);
  overflow: auto;
}

.personnel-detail__right::-webkit-scrollbar {
  display: none;
}

.detail-right__header {
  font-size: 24px;
  color: #67c23a;
  border-bottom: 2px solid #ccc;
  padding-bottom: 16px;
}

.detail-right__main-info {
  margin-top: 16px;
}

.main-info-header {
  margin-top: 24px;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.main-info-header__text {
  font-size: 22px;
  font-weight: 600;
}

.main-info__content {
  margin-top: 24px;
}

.main-info__content-item {
  display: flex;
  flex-direction: column;
  margin: 12px 0;
}

.content-item__head {
  color: #8ba9cb;
  font-size: 14px;
  margin-bottom: 8px;
}

.content-item__detail {
  font-weight: 600;
}

.working-status--active {
  color: #67c23a;
}

.content-item__detail-icon {
  font-weight: 600;
  color: #8ba9cb;
}

.main-info__protect {
  border-top: 2px solid #ccc;
  margin-top: 32px;
}

.main-info-header__edit {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  margin-right: 24px;
  font-weight: 600;
  cursor: pointer;
}

.main-info-header__edit:hover {
  color: #4d77ff;
}

.avatar-uploader {
  width: 100%;
  height: 100%;
  display: none;
  justify-content: center;
  align-items: center;
}

.el-upload {
  position: relative;
}

.avatar-uploader-icon {
  font-size: 24px;
  font-weight: 600;
}
</style>
