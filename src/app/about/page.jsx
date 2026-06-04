export default function AboutPage() {
  return (
    <div class="page" id="page-about">
      <div class="about-hero">
        <div class="badge badge-teal" style="margin-bottom:16px">
          Về chúng tôi
        </div>
        <h1>
          Xây dựng tương lai
          <br />
          của y tế Việt Nam
        </h1>
        <p style="font-size:18px;color:var(--body);max-width:600px;margin:0 auto">
          Chúng tôi tin rằng AI có thể giúp bác sĩ tập trung vào điều quan trọng
          nhất: chăm sóc bệnh nhân.
        </p>
        <div class="team-grid" style="max-width:900px;margin:48px auto 0">
          <div class="team-card">
            <div class="team-avatar" style="background:var(--teal)">
              TL
            </div>
            <div style="font-weight:600;font-size:15px;margin-bottom:4px">
              Trần Lâm
            </div>
            <div style="font-size:13px;color:var(--muted)">
              CEO & Co-founder
            </div>
            <div style="font-size:12px;color:var(--muted);margin-top:4px">
              MD, OUCRU
            </div>
          </div>
          <div class="team-card">
            <div class="team-avatar" style="background:var(--pink)">
              NH
            </div>
            <div style="font-weight:600;font-size:15px;margin-bottom:4px">
              Nguyễn Hà
            </div>
            <div style="font-size:13px;color:var(--muted)">CTO</div>
            <div style="font-size:12px;color:var(--muted);margin-top:4px">
              AI/ML Engineer
            </div>
          </div>
          <div class="team-card">
            <div class="team-avatar" style="background:var(--lavender)">
              PD
            </div>
            <div style="font-weight:600;font-size:15px;margin-bottom:4px">
              Phạm Duy
            </div>
            <div style="font-size:13px;color:var(--muted)">Head of Product</div>
            <div style="font-size:12px;color:var(--muted);margin-top:4px">
              Ex-Vinmec
            </div>
          </div>
          <div class="team-card">
            <div class="team-avatar" style="background:var(--ochre)">
              LK
            </div>
            <div style="font-weight:600;font-size:15px;margin-bottom:4px">
              Lý Kim
            </div>
            <div style="font-size:13px;color:var(--muted)">Medical Advisor</div>
            <div style="font-size:12px;color:var(--muted);margin-top:4px">
              Prof. Y Hà Nội
            </div>
          </div>
        </div>
      </div>
      <section style="padding:0 32px 96px;max-width:800px;margin:0 auto">
        <h2 style="font-family:var(--font-display);font-size:28px;font-weight:700;margin-bottom:16px">
          Sứ mệnh
        </h2>
        <p style="font-size:16px;color:var(--body);line-height:1.7;margin-bottom:16px">
          MediScribeAI ra đời từ nỗi trăn trở của những bác sĩ phải dành hàng
          giờ mỗi ngày để ghi chép hồ sơ bệnh án thay vì tập trung chữa bệnh.
        </p>
        <p style="font-size:16px;color:var(--body);line-height:1.7">
          Chúng tôi sử dụng AI tiên tiến nhất để tự động hóa công việc hành
          chính, giúp bác sĩ có thêm thời gian cho bệnh nhân — đây là điều thực
          sự quan trọng.
        </p>
      </section>
    </div>
  );
}
