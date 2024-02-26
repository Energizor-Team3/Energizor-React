import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


export const printDocument = (contentId) => {
    const input = document.getElementById(contentId);
    if (!input) {
      console.error(`ID가 '${contentId}'인 요소를 찾을 수 없습니다.`);
      return;
    }
  
    // 스크롤이 있는 요소의 원래 스타일을 저장합니다.
    const originalStyles = {
      overflowY: input.style.overflowY,
      height: input.style.height,
      maxHeight: input.style.maxHeight,
    };
  
    // 스크롤 전체 내용이 보이도록 스타일을 임시로 변경합니다.
    input.style.overflowY = 'visible';
    input.style.height = 'auto';
    input.style.maxHeight = 'none';
  
    html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
      });
  
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width / (canvas.height / pdfHeight);
      const imgHeight = pdfHeight; // 페이지 높이에 맞춤
      const x = (pdfWidth - imgWidth) / 2; // 이미지를 페이지 중앙에 위치시키기 위해 계산
  
      pdf.addImage(imgData, 'PNG', x, 0, imgWidth, imgHeight);
      pdf.save('document.pdf');
  
      // 캡처 후 요소의 스타일을 원래대로 복원합니다.
      Object.assign(input.style, originalStyles);
    }).catch((error) => {
      console.error("PDF 생성 중 오류 발생:", error);
      // 에러 발생 시에도 스타일을 원래대로 복원합니다.
      Object.assign(input.style, originalStyles);
    });
  };