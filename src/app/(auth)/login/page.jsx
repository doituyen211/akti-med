export default function LogInPage() {
  return (
    <div class="page" id="page-login">
      <div class="auth-page">
        <div class="auth-card">
          <h2>Đăng nhập</h2>
          <p>Chào mừng trở lại! Vui lòng chọn vai trò và đăng nhập.</p>
          <div class="form-group">
            <div class="form-label">Vai trò</div>
            <div class="role-grid">
              <div
                class="role-btn selected"
                onclick="selectRole(this,'admin')"
                id="roleAdmin"
              >
                <i class="ti ti-crown ri"></i>Admin
              </div>
              <div
                class="role-btn"
                onclick="selectRole(this,'doctor')"
                id="roleDoctor"
              >
                <i class="ti ti-stethoscope ri"></i>Bác sĩ
              </div>
              <div
                class="role-btn"
                onclick="selectRole(this,'nurse')"
                id="roleNurse"
              >
                <i class="ti ti-nurse ri"></i>Y tá
              </div>
              <div
                class="role-btn"
                onclick="selectRole(this,'patient')"
                id="rolePatient"
              >
                <i class="ti ti-user ri"></i>Bệnh nhân
              </div>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Email</label>
            <input
              class="form-input"
              type="email"
              placeholder="bsnguyenvan@hospital.vn"
              id="loginEmail"
            />
          </div>
          <div class="form-group">
            <label class="form-label">Mật khẩu</label>
            <input
              class="form-input"
              type="password"
              placeholder="••••••••"
              id="loginPass"
            />
          </div>
          <button
            class="btn btn-primary"
            style="width:100%;height:44px;margin-top:8px"
            onclick="doLogin()"
          >
            Đăng nhập
          </button>
          <p style="text-align:center;margin-top:16px;font-size:13px;color:var(--muted)">
            Chưa có tài khoản?{" "}
            <span
              style="color:var(--ink);cursor:pointer;font-weight:600"
              onclick="showNotif('Liên hệ admin để tạo tài khoản')"
            >
              Liên hệ admin
            </span>
          </p>
          <div style="margin-top:12px;padding:12px;background:var(--cream-soft);border-radius:var(--r-md);font-size:12px;color:var(--muted)">
            <b>Demo:</b> Chọn vai trò → bấm Đăng nhập (mật khẩu bất kỳ)
          </div>
        </div>
      </div>
    </div>
  );
}
