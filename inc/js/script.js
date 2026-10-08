$(document).ready(function() {
   $('.usr_menu').click(function() {
      $('.usr_menu_list').toggleClass('show');
      $('.usr_menu > .material-symbols-outlined').toggleClass('rotate');
   });

   $('.ring_cnt').first().show();
   
   $('a.d1').click(function(e) {
      //e.preventDefault();
      const $targetCnt = $(this).closest('.ring').parent().next('.ring_cnt');
      $('.ring_cnt').slideUp(200);
      $targetCnt.stop().slideDown(200);
   });

   function renderProgressRing($container) {
    // jQuery 객체가 아닌 일반 엘리먼트가 넘어왔을 경우를 대비해 래핑
    const $el = $($container);

    // jQuery의 .data()는 dataset 속성을 자동으로 숫자로 변환해 읽어옵니다.
    const total = parseInt($el.data('total'), 10);
    const current = parseInt($el.data('current'), 10) || 0;
    const stepNum = $el.data('step');

    const radius = 15.5;
    const circumference = 2 * Math.PI * radius; // 약 97.38
    const gap = 3; // 조각 사이 간격 (px 단위 길이)

    // 한 조각당 실제 선 길이 = (전체둘레 / 전체조각) - 간격
    const segmentLength = (circumference / total) - gap;

    // 1. 전체 조각(회색 배경) dasharray
    const baseDashArray = `${segmentLength} ${gap}`;

    // 2. 완료된 조각(초록색) dasharray 구성
    let activeDashes = [];
    for (let i = 0; i < current; i++) {
        activeDashes.push(segmentLength);
        if (i < current - 1) {
        activeDashes.push(gap);
        }
    }

    const activeLength = (segmentLength * current) + (gap * (current - 1));
    const remainingCircumference = circumference - activeLength;
    const activeDashArray = current === 0 ? "0 999" : `${activeDashes.join(' ')} ${remainingCircumference}`;

    // SVG 및 숫자 텍스트 삽입 (.html())
    $el.html(`
        <svg viewBox="0 0 36 36" style="width: 24px; height: 24px; transform: rotate(-90deg);">
        <!-- 미완료 배경 -->
        <circle cx="18" cy="18" r="${radius}" fill="none" stroke="#4e8be6" stroke-width="3.5" 
                stroke-dasharray="${baseDashArray}" />
        <!-- 완료 트랙 -->
        <circle cx="18" cy="18" r="${radius}" fill="none" stroke="#fae100" stroke-width="3.5" 
                stroke-dasharray="${activeDashArray}" />
        </svg>
        <span style="position: absolute; color: #fff; font-weight: 500; font-size: 1.2rem;">${stepNum}</span>
    `);

    // 컨테이너 스타일 지정 (.css())
    $el.css({
        'position': 'relative',
        'display': 'inline-flex',
        'align-items': 'center',
        'justify-content': 'center'
    });
    }

   $('.svg-ring-container').each(function() {
        renderProgressRing($(this));
    });
});

