export default function PricingPage() {
  return (
    <div class="page" id="page-pricing">
      <div class="pricing">
        <div class="section-label">Bảng giá</div>
        <h1 style="font-family:var(--font-display);font-size:40px;font-weight:700;letter-spacing:-1px;margin-bottom:8px">
          Đơn giản, minh bạch
        </h1>
        <p style="font-size:16px;color:var(--muted);margin-bottom:0">
          Trả theo nhu cầu thực tế, không phí ẩn.
        </p>
        <div class="pricing-grid">
          <div class="pcard">
            <h3>Starter</h3>
            <p style="font-size:13px;color:var(--muted)">Cho phòng khám nhỏ</p>
            <div class="price">
              <sup>₫</sup>0
            </div>
            <div class="period">Mãi mãi miễn phí</div>
            <ul>
              <li>
                <i class="ti ti-check"></i>50 ca khám/tháng
              </li>
              <li>
                <i class="ti ti-check"></i>SOAP Note cơ bản
              </li>
              <li>
                <i class="ti ti-check"></i>1 bác sĩ
              </li>
              <li>
                <i class="ti ti-check"></i>Lưu trữ 7 ngày
              </li>
            </ul>
            <button
              class="btn btn-secondary"
              style="width:100%"
              onclick="navigate('login')"
            >
              Bắt đầu
            </button>
          </div>
          <div class="pcard pcard-featured">
            <div
              class="badge"
              style="background:var(--mint);color:var(--teal);margin-bottom:12px"
            >
              Phổ biến nhất
            </div>
            <h3 style="color:#fff">Pro</h3>
            <p style="font-size:13px;color:rgba(255,255,255,.6)">
              Cho phòng khám trung bình
            </p>
            <div class="price" style="color:#fff">
              <sup>₫</sup>1.2M
            </div>
            <div class="period">/tháng/bác sĩ</div>
            <ul>
              <li>
                <i class="ti ti-check"></i>Không giới hạn ca khám
              </li>
              <li>
                <i class="ti ti-check"></i>SOAP Note nâng cao
              </li>
              <li>
                <i class="ti ti-check"></i>5 bác sĩ
              </li>
              <li>
                <i class="ti ti-check"></i>Lưu trữ 1 năm
              </li>
              <li>
                <i class="ti ti-check"></i>Agent đa tác vụ
              </li>
            </ul>
            <button
              class="btn btn-primary"
              style="width:100%;background:var(--cream);color:var(--ink)"
              onclick="navigate('login')"
            >
              Dùng thử 30 ngày
            </button>
          </div>
          <div class="pcard">
            <h3>Clinic</h3>
            <p style="font-size:13px;color:var(--muted)">Cho bệnh viện nhỏ</p>
            <div class="price">
              <sup>₫</sup>4.5M
            </div>
            <div class="period">/tháng</div>
            <ul>
              <li>
                <i class="ti ti-check"></i>Không giới hạn ca khám
              </li>
              <li>
                <i class="ti ti-check"></i>Tất cả tính năng Pro
              </li>
              <li>
                <i class="ti ti-check"></i>20 bác sĩ
              </li>
              <li>
                <i class="ti ti-check"></i>Tích hợp HIS/EMR
              </li>
              <li>
                <i class="ti ti-check"></i>API riêng
              </li>
            </ul>
            <button
              class="btn btn-secondary"
              style="width:100%"
              onclick="showNotif('Liên hệ sales@mediscribe.ai')"
            >
              Liên hệ
            </button>
          </div>
          <div class="pcard">
            <h3>Enterprise</h3>
            <p style="font-size:13px;color:var(--muted)">Cho bệnh viện lớn</p>
            <div class="price" style="font-size:28px">
              Liên hệ
            </div>
            <div class="period">Tuỳ chỉnh theo nhu cầu</div>
            <ul>
              <li>
                <i class="ti ti-check"></i>Không giới hạn người dùng
              </li>
              <li>
                <i class="ti ti-check"></i>Triển khai on-premise
              </li>
              <li>
                <i class="ti ti-check"></i>SLA 99.9%
              </li>
              <li>
                <i class="ti ti-check"></i>Hỗ trợ 24/7
              </li>
              <li>
                <i class="ti ti-check"></i>Training tùy chỉnh
              </li>
            </ul>
            <button
              class="btn btn-primary"
              style="width:100%"
              onclick="showNotif('Liên hệ enterprise@mediscribe.ai')"
            >
              Tư vấn ngay
            </button>
          </div>
        </div>
      </div>
      <footer style="margin-top:96px">
        <div
          class="footer-copy"
          style="max-width:1280px;margin:0 auto;padding:24px 32px;border-top:1px solid var(--hairline)"
        >
          <p>© 2025 MediScribeAI</p>
          <div style="display:flex;gap:16px">
            <span
              style="cursor:pointer;font-size:13px;color:var(--muted)"
              onclick="navigate('terms')"
            >
              Điều khoản
            </span>
            <span
              style="cursor:pointer;font-size:13px;color:var(--muted)"
              onclick="navigate('privacy')"
            >
              Riêng tư
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
